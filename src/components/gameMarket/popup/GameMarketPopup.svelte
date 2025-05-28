<script>
    import { onDestroy, onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { userInfo, isLoggedIn, isAdmin } from "../../../utils/auth";
    import { NEOPLE_API, SLACK_API, WEB_SOCKET_API } from '../../../constants/api';
    import { apiFetch, handleApiError } from '../../../utils/apiFetch';
    import { AUCTION_STATE } from '../../../constants/auctionState';
    import { SLACK_NOTICE_TYPE } from "../../../constants/slack";
    import { updatePagination } from "../../../utils/gameMarket/paging";

    // WebSocket 통신을 위한 impoprt
    import SockJS, { load } from 'sockjs-client/dist/sockjs.js';
    import { Client } from "@stomp/stompjs";

    import SlackInfoModal from "../popup/SlackInfoModal.svelte";
    import LoginPrompt from "./LoginPrompt.svelte";
    import SearchSection from "../search/SearchSection.svelte";
    import WatchSection from "../watch/WatchSection.svelte";
  

    const PAGE_SIZE         = 5; // 한 페이지에 표시할 아이템 수
    const GROUP_PAGING_SIZE = 5; // 한 그룹에 표시할 페이지 번호 개수

    const dispatch       = createEventDispatcher();
    let   maxNoticeCount = 5; // 한 번에 추적할 수 있는 최대 판매 알림 개수 (백엔드에서 몇 개 등록 가능한지 받아옴)

    let search = {
        list:         [],
        displayed:    [],
        groupPages:   [],
        currentPage:   1,
        totalPage:     1,
        pageSize:      PAGE_SIZE,
        groupPageSize: GROUP_PAGING_SIZE,
    };

    let watch = {
        list:         [],
        displayed:    [],
        groupPages:   [],
        currentPage:   1,
        totalPage:     1,
        pageSize:      PAGE_SIZE,
        groupPageSize: GROUP_PAGING_SIZE,
    };

    let slackInfo;
    let slackBotInstallUrl;
    let slackErrorExists = false;
    let isApiLoaded      = false;

    let client;

    onMount(async () => {
        // 유저 경매 정보 확인
        await fetchUserAuctionNotice();

        // 유저 Slack 채널 정보 확인
        await fetchUserSlackInfo();

        connectWebSocket();
        isApiLoaded = true;
    });

    async function fetchUserAuctionNotice() {
        const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.READ($userInfo), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            maxNoticeCount = response.data.maxNoticeCount;
            watch.list     = response.data.noticeList;
            updatePagination(watch);
            return;
        }

        console.log('fetchUserAuctionNotice() error');
        return;
    }

    async function fetchUserSlackInfo() {
        const slackResponse = await apiFetch(SLACK_API.CHANNEL.READ($userInfo, SLACK_NOTICE_TYPE.AUCTION), {
            method: "GET",
        }).catch(handleApiError);

        if (slackResponse.success) {
            slackInfo          = slackResponse.data.userSlackInfo;
            slackBotInstallUrl = slackResponse.data.slackBotInstallUrl;
            return;
        }

        slackErrorExists = true;
        console.log('fetchUserSlackInfo() error');
        return;
    }

    onDestroy(async () => {
        // 웹소켓 연결 해제
        if (client && client.active) {
            await client.deactivate();
        }
    });

    function connectWebSocket() {
        client = new Client({
            brokerURL: "", // 직접 WebSocket 쓰지 않고 sockjs 로
            webSocketFactory: () => new SockJS(WEB_SOCKET_API.FACTORY), // Spring Boot WebSocket 연결
            reconnectDelay: 5000, // 연결 끊겼을 때 재연결

            onConnect: () => {
                client.subscribe(WEB_SOCKET_API.AUCTION_STATE, (message) => {
                    const response = JSON.parse(message.body);
                    handleAuctionStateChange(response); // 판매완료/기간만료 처리
                });
            },

            onStompError: (frame) => {
                console.error('[WebSocket error] Broker reported error: ' + frame.headers['message']);
                console.error('[WebSocket error] Additional details: ' + frame.body);
            }
        });

        client.activate();
    }

    function handleAuctionStateChange(response) {
        const watchIndex = watch.list.findIndex(item => item.itemInfo.auctionNo === response.itemInfo.auctionNo);
        if (watchIndex != -1) {
            watch.list[watchIndex].auctionState = response.auctionState;
        }

        const searchIndex = search.list.findIndex(item => item.itemInfo.auctionNo === response.itemInfo.auctionNo);
        if (searchIndex != -1) {
            search.list[searchIndex].auctionState = response.auctionState;
        }

        return;
    }

    async function toggleWatch(item) {
        const index = watch.list.findIndex(w => w.itemInfo.auctionNo === item.itemInfo.auctionNo);
        if (index === -1) {
            await registerNotice(item);
            return;
        }
        
        await deleteNotice(item);
        return;
    }

    let loadingButtonMap = {}; // (auctionNo: true/false)

    async function registerNotice(item) {
        const sellingCount = watch.list.filter(w => w.auctionState == AUCTION_STATE.SELLING).length;
        if(sellingCount >= maxNoticeCount) {
            alert(`한 번에 추적 가능한 판매 알림은 최대 ${maxNoticeCount}개입니다.\n판매 완료 이후 혹은 알림 해제 후 다시 시도해 주세요.`);
            return;
        }

        loadingButtonMap[item.itemInfo.auctionNo] = true;

        const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.CREATE, {
            method: "POST",
            body: JSON.stringify({
                "isAdminMode": $isAdmin,
                "userId":      $userInfo,
                "itemImg":     item.imgUrl,
                "itemInfo":    item.itemInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            loadingButtonMap[item.itemInfo.auctionNo] = false;
            item.auctionState = AUCTION_STATE.SELLING;
            watch.list        = [item, ...watch.list];
            updatePagination(watch);
            return;
        }

        loadingButtonMap[item.itemInfo.auctionNo] = false;
        alert('판매 알림 등록에 실패하였습니다');
        return;
    }

    async function deleteNotice(item) {
        loadingButtonMap[item.itemInfo.auctionNo] = true;

        const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.DELETE, {
            method: "DELETE",
            body: JSON.stringify({
                "isAdminMode": $isAdmin,
                "userId":      $userInfo,
                "itemInfo":    item.itemInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            loadingButtonMap[item.itemInfo.auctionNo] = false;
            watch.list = watch.list.filter(w => w.itemInfo.auctionNo !== item.itemInfo.auctionNo);
            updatePagination(watch);
            return;
        }

        loadingButtonMap[item.itemInfo.auctionNo] = false;
        alert('판매 알림 해제에 실패하였습니다');
        return;
    }

    let isSlackInfoOpen = false;

    function closeSlackInfo() {
        isSlackInfoOpen = false;
    }

    function closingSlackInfo(event) {
        if (event.detail.slackInfo == null) {
            slackInfo = null;
            return;
        }

        slackInfo = event.detail.slackInfo;
        return;
    }

    // watch.list 가 바뀔 때마다 자동으로 watchAuctionNoMap 갱신
    $: watchAuctionNoMap = new Set(watch.list.map(item => item.itemInfo.auctionNo));
</script>


<div class="ly_login_info" id="loginLayer">
    <div class="ly_logbox {$isLoggedIn ? 'logged-in' : 'logged-out'}">
        <!-- 버튼 (뒤로가기, 닫기) -->
        {#if isSlackInfoOpen}
            <article class="paging back-button-wrapper">
                <a class="prev" on:click={ closeSlackInfo }>PREV</a>
            </article>
        {/if}
        <a on:click={() => dispatch("close")} class="ly_clse">닫기</a>
        
        {#if !$isLoggedIn}
            <!-- 로그인 -->
            <LoginPrompt />
        {:else if isSlackInfoOpen}
            <!-- 슬랙 연동 -->
            <SlackInfoModal
                slackBotInstallUrl={ slackBotInstallUrl } 
                slackInfo={ slackInfo } 
                onClose={ closeSlackInfo } 
                on:close={ closingSlackInfo }
            />
        {:else}
            <!-- 검색 -->
            <SearchSection 
                bind:search={ search }
                bind:watch={ watch }
                bind:watchAuctionNoMap={ watchAuctionNoMap }
                loadingButtonMap={ loadingButtonMap }
                toggleWatch={ toggleWatch }
            />

            <!-- 여백 -->
            <div class="blank-space"></div>
            
            <!-- 판매 알림 -->
            <WatchSection
                bind:watch={ watch }
                bind:isSlackInfoOpen={ isSlackInfoOpen }
                loadingButtonMap={ loadingButtonMap }
                isApiLoaded={ isApiLoaded }
                slackInfoExists={ slackInfo != null }
                slackErrorExists={ slackErrorExists }
                toggleWatch={ toggleWatch }
            />
        {/if}
    </div>
</div>


<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    .ly_login_info {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ly_login_info h3 {
        all: unset;
        color: #151518;
        font-size: 18px;
        font-weight: 500;
    }

    .ly_login_info p {
        color: #6a6e76;
        font-size: 14px;
        line-height: 1.6;
    }

    .ly_login_info .ly_logbox {
        background: #fff;
        padding: 40px;
        width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        text-align: center;
    }

    .ly_login_info .ly_logbox.logged-in {
        min-height: 400px;
    }

    .ly_login_info .ly_logbox a.ly_clse {
        position: absolute;
        right: 14px;
        top: 15px;
        width: 18px;
        height: 18px;
        background: url('#{$DF_UI}/img/login/ly_clse.png') no-repeat;
        text-indent: -9999px;
        cursor: pointer;
    }

    // 모달 내부 뒤로가기 버튼
    .ly_login_info .ly_logbox .back-button-wrapper {
        position: absolute;
        top: 8px;
        left: 6px;
        margin: 0;
    }

    .paging {
        position: relative;
        font-size: 0;
        text-align: center;
        vertical-align: top;
        overflow: hidden;
        margin-top: 5px;
        margin-bottom: 30px;
    }

    .paging a {
        text-decoration: none;
        cursor: pointer;
    }

    .paging a.prev {
        margin-right: 14px;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat 0 0;
        text-indent: -9999px;
    }

    .paging a, .paging span {
        display: inline-block;
        padding: 0 10px;
        min-width: 38px;
        height: 36px;
        line-height: 35px;
        color: #6a6e76;
        font-size: 14px;
    }

    // 여백 조정
    .blank-space {
        margin-bottom: 50px;
    }
</style>

<script>
    import { onDestroy, onMount } from "svelte";
    import { PATHS } from "../constants/paths";
    import { createEventDispatcher } from "svelte";
    import { userInfo, isLoggedIn, isAdmin } from "../utils/auth";
    import { NEOPLE_API, SLACK_API, WEB_SOCKET_API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { AUCTION_STATE } from '../constants/auctionState';
    import { SLACK_NOTICE_TYPE } from "../constants/slack";

    import SlackStatusButton from "./SlackStatusButton.svelte";
    import SlackInfoModal from "./SlackInfoModal.svelte";
    import Spinner from "./Spinner.svelte";
  
    // WebSocket 통신을 위한 impoprt
    import SockJS from 'sockjs-client/dist/sockjs.js';
    import { Client } from "@stomp/stompjs";

    const PAGE_SIZE         = 5; // 한 페이지에 표시할 아이템 수
    const GROUP_PAGING_SIZE = 5; // 한 그룹에 표시할 페이지 번호 개수

    const dispatch = createEventDispatcher(); // TODO new 를 사용할 때와 그렇지 않을 떄의 차이점 확인 필요
    let searchInput;
    let maxNoticeCount = 5; // 한 번에 추적할 수 있는 최대 판매 알림 개수 (백엔드에서 몇 개 등록 가능한지 받아옴)

    let search = {
        list:       [],
        displayed:  [],
        currentPage: 1,
        totalPage:   1,
        groupPages: [],
    };

    let watch = {
        list:       [],
        displayed:  [],
        currentPage: 1,
        totalPage:   1,
        groupPages: [],
    };

    let slackInfo;
    let slackBotInstallUrl;
    let slackErrorExists = false;
    let isApiLoaded      = false;

    let client;

    onMount(async () => {
        searchInput?.focus();
        // 유저 경매 정보 확인
        const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.READ($userInfo), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            maxNoticeCount = response.data.maxNoticeCount;
            watch.list     = response.data.noticeList;
            updatePagination(watch);
        }

        // 유저 Slack 채널 정보 확인
        const slackResponse = await apiFetch(SLACK_API.CHANNEL.READ($userInfo, SLACK_NOTICE_TYPE.AUCTION), {
            method: "GET",
        }).catch(handleApiError);

        if (slackResponse.success) {
            slackInfo          = slackResponse.data.userSlackInfo;
            slackBotInstallUrl = slackResponse.data.slackBotInstallUrl;
        } else {
            slackErrorExists = true;
        }

        connectWebSocket();
        isApiLoaded = true;
    });

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

    let isSearching = false;

    async function searchItems() {
        const searchKeyWord = searchInput?.value.trim();
        if (!searchKeyWord) {
            alert('검색할 아이템명을 입력해 주세요.');
            return;
        }

        isSearching = true;

        const response = await apiFetch(NEOPLE_API.AUCTION.LIST(searchKeyWord), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            search.list = response.data;
            if (search.list.length === 0) {
                alert(searchKeyWord + ' 와 관련된 등록 물품이 없습니다.');
            }

            // === 판매 등록 알림 현황 상태를 검색 결과에도 반영 ===
            search.list.forEach(searchItem => {
                const watchedItem = watch.list.find(watchItem => watchItem.itemInfo.auctionNo === searchItem.itemInfo.auctionNo);
                if (watchedItem) {
                    searchItem.auctionState = watchedItem.auctionState;
                }
            });

            search.currentPage = 1;
            updatePagination(search);
            isSearching = false;
            return;
        }

        isSearching = false;
        alert('경매 아이템 검색에 실패하였습니다.');
        return;
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchItems();
        }
    }

    let loadingButtonMap = {}; // (auctionNo: true/false)

    async function toggleWatch(item) {
        const index = watch.list.findIndex(w => w.itemInfo.auctionNo === item.itemInfo.auctionNo);
        if (index === -1) {
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

    function extractTime(datetime) {
        return datetime.split(" ")[0].slice(5) + " " + datetime.split(" ")[1];
    }

    function updatePagination(target) {
        const totalPage   = Math.ceil(target.list.length / PAGE_SIZE) || 1;
        const currentPage = Math.min(target.currentPage, totalPage);

        const start = (currentPage - 1) * PAGE_SIZE;
        const end   = start + PAGE_SIZE;

        const displayed  = target.list.slice(start, end);
        const groupPages = derivePagination(currentPage, totalPage);

        // 최신 정보로 교체
        target.totalPage   = totalPage;
        target.currentPage = currentPage;
        target.displayed   = displayed;
        target.groupPages  = groupPages;
    }

    function changePage(target, pageNo) {
        if (pageNo >= 1 && pageNo <= target.totalPage) {
            const updated = {
                ...target,
                currentPage: pageNo,
            };
            updatePagination(updated);

            if (target === search) {
                search = updated;
            } else if (target === watch) {
                watch = updated;
            }
        }
    }

    function derivePagination(currentPage, totalPage) {
        const groupStart = Math.floor((currentPage - 1) / GROUP_PAGING_SIZE) * GROUP_PAGING_SIZE + 1;
        const groupEnd   = Math.min(groupStart + GROUP_PAGING_SIZE - 1, totalPage);
        return Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);
    }

    // watch.list 가 바뀔 때마다 자동으로 watchAuctionNoMap 갱신
    $: watchAuctionNoMap = new Set(watch.list.map(item => item.itemInfo.auctionNo));

    let isSlackInfoOpen = false;

    function onClickSlackStatusButton() {
        isSlackInfoOpen = true;
    }

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

    function formatItemName(name) {
        const words       = name.trim().split(/\s+/); // 공백 문자 (띄어쓰기, 탭, 줄바꿈 포함) 기준으로 단어 나누기
        const totalWords  = words.length;
        const totalLength = name.replace(/\s+/g, '').length; // 띄어쓰기 제외 글자 수

        // 단어 5개 이상 또는 글자수 14자 이상이면 3줄, 아니면 2줄
        const targetLineCount = (totalWords >= 5 || totalLength >= 14) ? 3 : 2;

        const lines = Array.from({ length: targetLineCount }, () => []);

        words.forEach((word, index) => {
            const lineIndex = Math.floor(index * targetLineCount / totalWords);
            lines[lineIndex].push(word);
        });

        return lines.map(lineWords => lineWords.join(' ')).join('<br>');
    }
</script>


<div class="ly_login_info" id="loginLayer">
    <div class="ly_logbox { $isLoggedIn ? 'logged-in' : 'logged-out' }">
        {#if isSlackInfoOpen}
            <article class="paging back-button-wrapper">
                <a class="prev" on:click={ closeSlackInfo }>PREV</a>
            </article>
        {/if}
        <a on:click={() => dispatch("close")} class="ly_clse">닫기</a>
        
        {#if !$isLoggedIn}
            <p class="txtarea">
                <span>로그인 후 이용하여 주세요.
                    <br>경매장에 등록된 아이템의 판매 알림을 받을 수 있습니다.
                </span>
            </p>
            <p class="btnarea">
                <a href={ PATHS.ACCOUNT.LOGIN_ADMIN } class="btn btn_n">관리자모드 로그인</a>
                <a href={ PATHS.ACCOUNT.LOGIN }       class="btn btn_b">일반모드 로그인</a>
            </p>
        {:else if isSlackInfoOpen}
            <SlackInfoModal
                slackBotInstallUrl={ slackBotInstallUrl } 
                         slackInfo={ slackInfo } 
                           onClose={ closeSlackInfo } 
                          on:close={ closingSlackInfo }
            />
        {:else}
            <div class="search-box">
                <input type="text"
                       bind:this={ searchInput } 
                       placeholder="던전앤파이터 경매 아이템 검색" 
                       on:keydown={ handleKeyDown } />
                <button class="btn-search" on:click={ searchItems }>검색</button>
            </div>

            <div class="result-list">
                <h3>검색 결과</h3>
                {#if isSearching}
                    <Spinner margin_bottom="5px"/>
                    <p>검색 중입니다.</p>
                {:else}
                    {#if search.list.length === 0}
                        <p>검색 결과 없음</p>
                    {:else}
                        <ul>
                            {#each search.displayed as item}
                                <li class={ item.auctionState == AUCTION_STATE.SOLD_OUT || item.auctionState == AUCTION_STATE.EXPIRED ? 'completed' : '' }>
                                    <!-- 아이템 이미지 -->
                                    <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
                
                                    <!-- 아이템 이름 -->
                                    <span class="item-name">
                                        { @html formatItemName(item.itemInfo.itemName) }
                                        {#if item.itemInfo.count > 1}
                                            (x{ item.itemInfo.count })
                                        {/if}
                                    </span>
                                    
                                    <!-- 가격 -->
                                    <span class="item-price">
                                        { item.itemInfo.currentPrice.toLocaleString() } G
                                        {#if item.itemInfo.count > 1}
                                            ({(item.itemInfo.currentPrice/item.itemInfo.count).toLocaleString()})
                                        {/if}
                                    </span>
                
                                    <!-- 등록일 -->
                                    <span class="item-date">{ extractTime(item.itemInfo.regDate) }</span>
                
                                    <!-- 버튼 -->
                                    {#if item.auctionState == AUCTION_STATE.SOLD_OUT}
                                        <span class="status-wrap">
                                            <span class="completed">판매 완료</span>
                                        </span>
                                    {:else if item.auctionState == AUCTION_STATE.EXPIRED}
                                        <span class="status-wrap">
                                            <span class="expired">기간 만료</span>
                                        </span>
                                    {:else}
                                        <button class={ watchAuctionNoMap.has(item.itemInfo.auctionNo) ? "btn-remove" : "btn-register" } 
                                            on:click={ () => toggleWatch(item) }>
                                                {#if loadingButtonMap[item.itemInfo.auctionNo]}
                                                    <Spinner colorTheme="white" margin_right="9px" margin_top="1px" margin_bottom="0"/>
                                                    { watchAuctionNoMap.has(item.itemInfo.auctionNo) ? "알림 해제" : "알림 등록" }
                                                {:else}
                                                    { watchAuctionNoMap.has(item.itemInfo.auctionNo) ? "판매 알림 해제" : "판매 알림 등록" }
                                                {/if}
                                        </button>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                {/if}
            </div>
            <!-- TODO 페이징 버튼은 별도 컴포넌트화 하는 게 어떨지 고려해 보기 -->
            {#if search.list.length > 0}
                <article class="paging">
                    <a class="first" on:click={() => changePage(search, 1)}>FIRST</a>
                    <a class="prev"  on:click={() => changePage(search, search.currentPage - 1)}>PREV</a>
                
                    {#each search.groupPages as pageNo}
                        {#if pageNo === search.currentPage}
                            <span>{ search.currentPage }</span>
                        {:else}
                            <a on:click={() => changePage(search, pageNo)}>{ pageNo }</a>
                        {/if}
                    {/each}
                
                    <a class="next" on:click={() => changePage(search, search.groupPages.at(-1) + 1)}>NEXT</a>
                    <a class="end"  on:click={() => changePage(search, search.totalPage)}>END</a>
                </article>
            {/if}

            <div class="blank-space"></div>
            
            <div class="watch-list">
                <div class="watch-list-header">
                    <h3>판매 알림 등록 목록</h3>
                    {#if isApiLoaded}
                        <SlackStatusButton 
                            slackInfoExists={ slackInfo != null } 
                           slackErrorExists={ slackErrorExists } 
                                    onClick={ onClickSlackStatusButton }
                        />
                    {:else}
                        <Spinner margin_top="4px"/>
                    {/if}
                </div>
                {#if !isApiLoaded}
                    <p>판매 알림 목록을 불러오는 중입니다.</p>
                {:else}
                    {#if watch.list.length === 0}
                        <p>등록된 판매 알림이 없습니다.</p>
                    {:else}
                        <ul>
                            {#each watch.displayed as item}
                                <li class={ item.auctionState == AUCTION_STATE.SOLD_OUT || item.auctionState == AUCTION_STATE.EXPIRED ? 'completed' : '' }>
                                    <!-- 아이템 이미지 -->
                                    <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
                
                                    <!-- 아이템 이름 -->
                                    <span class="item-name">{ @html formatItemName(item.itemInfo.itemName) }</span>
                                    
                                    <!-- 가격 -->
                                    <span class="item-price">{ item.itemInfo.currentPrice.toLocaleString() } G</span>
                                    
                                    <!-- 등록일 -->
                                    <span class="item-date">{ extractTime(item.itemInfo.regDate) }</span>
                                    
                                    <!-- 버튼 -->
                                    {#if item.auctionState == AUCTION_STATE.SOLD_OUT}
                                        <span class="status-wrap">
                                            <span class="completed">판매 완료</span>
                                            <button class="btn-x" on:click={() => toggleWatch(item)}>
                                                {#if loadingButtonMap[item.itemInfo.auctionNo]}
                                                    <Spinner colorTheme="white" margin_left="3px" margin_bottom="2px"/>
                                                {:else}
                                                    ×
                                                {/if}
                                            </button>
                                        </span>
                                    {:else if item.auctionState == AUCTION_STATE.EXPIRED}
                                        <span class="status-wrap">
                                            <span class="expired">기간 만료</span>
                                            <button class="btn-x" on:click={() => toggleWatch(item)}>
                                                {#if loadingButtonMap[item.itemInfo.auctionNo]}
                                                    <Spinner colorTheme="white" margin_left="3px" margin_bottom="2px"/>
                                                {:else}
                                                    ×
                                                {/if}
                                            </button>
                                        </span>
                                    {:else}
                                        <button class="btn-remove" on:click={() => toggleWatch(item)}>
                                            {#if loadingButtonMap[item.itemInfo.auctionNo]}
                                                <Spinner colorTheme="white" margin_right="9px" margin_top="1px" margin_bottom="0"/>
                                                알림 해제
                                            {:else}
                                                판매 알림 해제
                                            {/if}
                                        </button>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                {/if}
            </div>
            {#if watch.list.length > 0}
                <article class="paging">
                    <a class="first" on:click={() => changePage(watch, 1)}>FIRST</a>
                    <a class="prev"  on:click={() => changePage(watch, watch.currentPage - 1)}>PREV</a>
                
                    {#each watch.groupPages as pageNo}
                        {#if pageNo === watch.currentPage}
                            <span>{ watch.currentPage }</span>
                        {:else}
                            <a on:click={() => changePage(watch, pageNo)}>{ pageNo }</a>
                        {/if}
                    {/each}
                
                    <a class="next" on:click={() => changePage(watch, watch.groupPages.at(-1) + 1)}>NEXT</a>
                    <a class="end"  on:click={() => changePage(watch, watch.totalPage)}>END</a>
                </article>
            {/if}
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
        min-height: 350px;
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

    .ly_login_info .btnarea {
        padding: 0;
        margin: 30px 0 0 0;
    }

    .btnarea {
        text-align: center;
        font-size: 0;
    }

    .ly_login_info .btnarea a {
        display: inline-block;
        padding: 0;
        margin: 0;
        width: 165px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        font-weight: 500;
    }

    .ly_login_info .btnarea a.btn_n {
        background: #303544;
        color: #fff;
    }

    .ly_login_info .btnarea a.btn_b {
        background: #3392ff;
        color: #fff;
    }

    .search-box {
        display: flex;
        margin-bottom: 10px;
    }

    input {
        flex: 1;
        padding: 8px;
        border-right: none;
        outline: none;
        font-size: 15px;
    }

    input:focus {
        border: 2px solid #3392ff;
    }

    button {
        padding: 8px;
        background: #3392ff;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 15px;
    }

    button:hover {
        background: #2673cc;
    }

    .result-list ul, .watch-list ul {
        padding: 0;
    }

    .result-list ul li, .watch-list ul li {
        display: grid;
        grid-template-columns: 50px 2fr 100px 100px auto;
        align-items: start;
        gap: 10px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
    }

    .result-list ul li:last-child, .watch-list ul li:last-child {
        border-bottom: none;
    }

    .watch-list-header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        column-gap: 8px;
    }

    .item-img {
        width: 46px;
        height: 46px;
        background-size: cover;
        background-position: center;
    }

    .item-name {
        color: #333;
        white-space: normal;
        word-wrap: break-word;
        font-size: 14px;
        font-weight: 500;
    }

    .item-price {
        text-align: right;
        color: #2a9d8f;
        font-size: 14px;
    }

    .item-date {
        text-align: right;
        font-size: 13px;
        color: #777;
    }

    .btn-remove, .btn-register {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 112px;
        height: 36px;
        padding: 0 12px;
        font-size: 14px;
    }

    .btn-remove {
        background: #5c6377;
    }

    .btn-remove:hover {
        background: #484f61;
    }

    .blank-space {
        margin-bottom: 25px;
    }

    .status-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 112px;
        gap: 6px;
    }

    .completed {
        background-color: #f5f5f5;
        opacity: 0.6;
        

        &:hover {
            background-color: #f0f0f0;
        }

        .item-name,
        .item-price,
        .item-date {
            color: #999;
        }
    }

    span.completed {
        margin-left: 10px;
    }

    .expired {
        opacity: 0.6;
        color: #ff4d4d;
    }

    .btn-x {
        display: inline-block;
        opacity: 1;
        padding: 0;
        height: 30px;
        width: 30px;
        background: #ccc;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        border: none;
        cursor: pointer;
    }

    .btn-x:hover {
        background: #999;
    }

    /* 페이징 네비게이션 */
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

    .paging a.first {
        margin-right: 0;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat -50px 0;
        text-indent: -9999px;
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

    .paging span {
        background: #303544;
        color: #fff;
    }

    .paging a.next {
        margin-left: 14px;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat 0 -50px;
        text-indent: -9999px;
    }

    .paging a.end {
        margin-left: 0;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat -50px -50px;
        text-indent: -9999px;
    }
</style>

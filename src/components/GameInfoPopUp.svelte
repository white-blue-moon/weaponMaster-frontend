<script>
    import { onMount } from "svelte";
    import { PATHS } from "../constants/paths";
    import { createEventDispatcher } from "svelte";
    import { userInfo, isLoggedIn } from "../utils/auth";
    import { API, NEOPLE_API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { AUCTION_STATE } from '../constants/auctionState';
    
    const PAGE_SIZE         = 5; // 한 페이지에 표시할 아이템 수
    const GROUP_PAGING_SIZE = 5; // 한 그룹에 표시할 페이지 번호 개수

    const dispatch = createEventDispatcher();
    let searchInput;

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

    // TODO [ 임시 메모 ]
    // regDate      : 물품 최초 등록일
    // expireDate   : 물품 등록 만료일
    // regCount     : 최초 등록 개수
    // count        : 현재 남은 개수
    // currentPrice : 현재 일괄 구매 가격
    // unitPrice    : 개별 가격
    // 단일 등록 상품 -> count = 1, currentPrice = unitPrice 그리고 regCount 키값 없음

    onMount(async () => {
        searchInput?.focus();
        const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.READ($userInfo), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            watch.list = response.data;
            updatePagination(watch);
        }
    });

    async function searchItems() {
        const searchKeyWord = searchInput?.value.trim();
        if (!searchKeyWord) {
            alert('검색할 아이템명을 입력해 주세요.');
            return;
        }

        const response = await apiFetch(NEOPLE_API.AUCTION.LIST(searchKeyWord), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            search.list = response.data;
            if (search.list.length === 0) {
                alert(searchKeyWord + ' 와 관련된 등록 물품이 없습니다.');
            }
            updatePagination(search);
            return;
        }

        alert('경매 아이템 검색에 실패하였습니다.');
        return;
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchItems();
        }
    }

    async function toggleWatch(item) {
        const index = watch.list.findIndex(w => w.itemInfo.auctionNo === item.itemInfo.auctionNo);
        if (index === -1) {
            const response = await apiFetch(NEOPLE_API.AUCTION_NOITCE.CREATE, {
                method: "POST",
                body: JSON.stringify({
                    "userId": $userInfo,
                    "itemImg": item.imgUrl,
                    "itemInfo": item.itemInfo,
                }),
            }).catch(handleApiError);

            if (response.success) {
                watch.list = [item, ...watch.list];
                updatePagination(watch);
                return;
            }

            alert('판매 알림 등록에 실패하였습니다');
            return;
        }

        // TODO 판매 알림 해제 API 호출
        watch.list = watch.list.filter(w => w.itemInfo.auctionNo !== item.itemInfo.auctionNo);
        updatePagination(watch);
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
</script>

<div class="ly_login_info" id="loginLayer">
    <div class="ly_logbox">
        <a on:click={() => dispatch("close")} class="ly_clse">닫기</a>
        {#if !$isLoggedIn}
            <p class="txtarea">
                <span>로그인 후 이용하여 주세요.
                    <br>경매장에 등록된 아이템의 판매 알림을 받을 수 있습니다.
                </span>
            </p>
            <p class="btnarea">
                <a href={ PATHS.ACCOUNT.LOGIN } class="btn btn_n">관리자모드 로그인</a>
                <a href={ PATHS.ACCOUNT.LOGIN } class="btn btn_b">일반모드 로그인</a>
            </p>
        {:else}
            <div class="search-box">
                <input type="text"
                       bind:this={ searchInput } 
                       placeholder="아이템 검색" 
                       on:keydown={ handleKeyDown } />
                <button class="btn-search" on:click={ searchItems }>검색</button>
            </div>

            <div class="result-list">
                <h3>검색 결과</h3>
                {#if search.list.length === 0}
                    <p>검색 결과 없음</p>
                {:else}
                    <ul>
                        {#each search.displayed as item}
                            <li>
                                <!-- 아이템 이미지 -->
                                <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
            
                                <!-- 아이템 이름 -->
                                <span class="item-name">
                                    { item.itemInfo.itemName }
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
                                <button class={ watchAuctionNoMap.has(item.itemInfo.auctionNo) ? "btn-remove" : "" } 
                                on:click={ () => toggleWatch(item) }>
                                    { watchAuctionNoMap.has(item.itemInfo.auctionNo) ? "판매 알림 해제" : "판매 알림 등록" }
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
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
            
            <div class="watch-list">
                <h3>판매 알림 등록 목록</h3>
                {#if watch.list.length === 0}
                    <p>등록된 판매 알림이 없습니다.</p>
                {:else}
                    <ul>
                        {#each watch.displayed as item}
                            <li class={ item.completed ? 'completed' : '' }>
                                <!-- 아이템 이미지 -->
                                <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
            
                                <!-- 아이템 이름 -->
                                <span class="item-name">{ item.itemInfo.itemName }</span>
                                
                                <!-- 가격 -->
                                <span class="item-price">{ item.itemInfo.currentPrice.toLocaleString() } G</span>
                                
                                <!-- 등록일 -->
                                <span class="item-date">{ extractTime(item.itemInfo.regDate) }</span>
                                
                                {#if item.auctionState == AUCTION_STATE.SOLD_OUT }
                                    <span class="completed">판매 완료</span>
                                {:else}
                                    <button class="btn-remove" on:click={ () => toggleWatch(item) }>판매 알림 해제</button>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
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

    .ly_login_info .ly_logbox {
        background: #fff;
        padding: 40px;
        width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        text-align: center;
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

    .search-box {
        display: flex;
        margin-bottom: 10px;
    }

    input {
        flex: 1;
        padding: 8px;
        border-right: none;
        outline: none;
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
    }

    button:hover {
        background: #2673cc;
    }

    .result-list ul, .watch-list ul {
        padding: 0;
    }

    .result-list ul li, .watch-list ul li {
        display: grid;
        grid-template-columns: 50px 2fr 100px 100px auto; /* 이미지 | 이름 (넓게) | 가격 | 등록일 | 버튼 */
        align-items: start;  /* 자동 줄바꿈 시 UI 정렬 유지 */
        gap: 10px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    .result-list ul li:last-child, .watch-list ul li:last-child {
        border-bottom: none;
    }

    .item-img {
        width: 46px;
        height: 46px;
        background-size: cover;
        background-position: center;
    }

    .item-name {
        font-weight: bold;
        color: #333;
        white-space: normal;  /* 자동 줄바꿈 허용 */
        word-wrap: break-word;
    }

    .item-price {
        text-align: right;
        font-weight: bold;
        color: #2a9d8f;
    }

    .item-date {
        text-align: right;
        font-size: 14px;
        color: #777;
    }

    .btn-remove {
        background: #ff4d4d;
    }

    .btn-remove:hover {
        background: #cc0000;
    }

    /* 페이징 네비게이션 */
    .paging {
        position: relative;
        font-size: 0;
        text-align: center;
        vertical-align: top;
        overflow: hidden;
        margin-bottom: 25px;
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

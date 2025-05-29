<script>
    import { onMount } from "svelte";
    import { AUCTION_STATE } from "../../../constants/auctionState"; 
    import { updatePagination } from "../../../utils/gameMarket/paging";
    import { formatItemName } from "../../../utils/gameMarket/itemName";
    import { apiFetch, handleApiError } from "../../../utils/apiFetch";
    import { NEOPLE_API } from "../../../constants/api";
    import { isAuctionCompleted } from "../../../utils/gameMarket/auctionStateUtil";

    import Spinner from "../../Spinner.svelte";
    import Pagination from "../common/Pagination.svelte";
  
    export let search = {};       // bind 필요
    export let watch  = {};       // bind 필요
    export let watchAuctionNoMap; // bind 필요
    export let loadingButtonMap;
    export let toggleWatch = () => {};
    
    let searchInput;
    let searchKeyword; 

    onMount(() => {
        searchInput?.focus();
    });

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchItems();
        }
    }

    let isSearching = false;

    async function searchItems() {
        // 검색 중이면 중복 호출 차단
        if(isSearching) {
            return;
        }

        if (!searchKeyword.trim()) {
            alert('검색할 아이템명을 입력해 주세요.');
            return;
        }

        isSearching = true;

        const response = await apiFetch(NEOPLE_API.AUCTION.LIST(searchKeyword.trim()), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            search.list = response.data;
            if (search.list.length === 0) {
                alert(searchKeyword + ' 와 관련된 등록 물품이 없습니다.');
            }

            // === 판매 등록 알림 현황 상태를 검색 결과에도 반영 ===
            search.list.forEach(searchItem => {
                const watchedItem = watch.list.find(watchItem => watchItem.itemInfo.auctionNo === searchItem.itemInfo.auctionNo);
                if (watchedItem) {
                    searchItem.auctionState = watchedItem.auctionState;
                }
            });

            search.currentPage = 1;
            search = updatePagination(search);
            isSearching = false;
            return;
        }

        isSearching = false;
        alert('경매 아이템 검색에 실패하였습니다.');
        return;
    }

    function getLeftTime(expireDateStr) {
        const expireDate = new Date(expireDateStr);
        const now        = new Date();
        const diffMs     = expireDate - now; // 남은 시간 ms 단위

        if (diffMs <= 0) {
            return "판매마감";
        }

        const diffMinutes = Math.ceil(diffMs / (1000 * 60));      // 남은 시간 분 단위 올림
        const diffHours   = Math.ceil(diffMs / (1000 * 60 * 60)); // 남은 시간 시간 단위 올림

        if (diffMinutes <= 10) {
            return "마감임박";
        }

        if (diffMinutes <= 59) {
            return "1시간";
        }

        // 1시간 이상부터는 시간 단위로 표시
        return diffHours + "시간";
    }

    function clearSearch() {
        searchKeyword = "";
    }
</script>


<div class="search-box">
    <input 
        type="text" 
        placeholder="던전앤파이터 경매 아이템 검색" 
        bind:this={ searchInput }
        bind:value={ searchKeyword }
        on:keydown={ handleKeyDown } 
    />
    <a class="btn_del" style:display={ searchKeyword ? 'block' : 'none' } on:click={ clearSearch }>삭제</a>
    <button class="btn-search" on:click={ searchItems }>검색</button>
</div>

<div class="result-list">
    <h3>검색 결과</h3>

    <div class="table-header">
        <span class="image-header"></span>
        <span class="name-header">이름</span>
        <span class="price-header">가격(골드)</span>
        <span class="deadline-header">마감</span>
        <span class="status-header">상태</span>
    </div>
      
    {#if isSearching}
        <div class="loading-result">
            <p><Spinner margin_bottom="4px"/>검색 중입니다.</p>
        </div>
    {:else}
        {#if search.list.length === 0}
            <p class="no-result">검색 결과 없음</p>
        {:else}
            <ul>
                {#each search.displayed as item}
                    <li class:completed={ isAuctionCompleted(item.auctionState) }>
                        <!-- 아이템 이미지 -->
                        <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
    
                        <!-- 아이템 이름 -->
                        <span class="item-name">
                            {@html formatItemName(item.itemInfo.itemName)}
                            {#if item.itemInfo.count > 1}
                                (x{ item.itemInfo.count })
                            {/if}
                        </span>
                        
                        <!-- 가격 -->
                        <span class="item-price">
                            { item.itemInfo.currentPrice.toLocaleString() } 골드
                            {#if item.itemInfo.count > 1}
                                ({(item.itemInfo.currentPrice/item.itemInfo.count).toLocaleString()})
                            {/if}
                        </span>
    
                        <!-- 남은 마감 시간 -->
                        <span class="item-date">{ getLeftTime(item.itemInfo.expireDate) }</span>
    
                        <!-- 버튼 -->
                        {#if item.auctionState == AUCTION_STATE.SOLD_OUT}
                            <span class="status-wrap">
                                <span class="completed">판매 완료</span>
                            </span>
                        {:else if item.auctionState == AUCTION_STATE.EXPIRED}
                            <span class="status-wrap">
                                <span class="expired" style="margin-left: 10px;">기간 만료</span>
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

{#if search.list.length > 0}
    <Pagination bind:pagingTarget={ search } />
{/if}


<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
    }

    .table-header {
        width: 520px;
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 0 5px 0 5px;
        gap: 10px;
    }

    .table-header span {
        display: flex;
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center;     /* 세로 중앙 정렬 */
        font-size: 12px;
        height: 40px;
    }

    .image-header {
        width: 50px;
    }

    .name-header {
        width: 108px;
    }

    .price-header {
        padding-left: 20px;
        width: 100px;
    }

    .deadline-header, .register-header {
        width: 100px;
    }

    .status-header {
        width: 112px;
    }

    .no-result, .loading-result {
        padding-top: 10px;
    }

    .search-box {
        display: flex;
        position: relative;
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

    a.btn_del {
        display: none;
        position: absolute;
        margin-left: auto;
        padding-top: 41px;
        right: 48px;
        width: 30px;
        height: 30px;
        background: url("#{$DF_UI}/img/btn/btn_clse_18x18.png") no-repeat 50%;
        font-size: 0;
        text-indent: -999px;
        cursor: pointer;
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
        padding: 5px;
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
        font-size: 13px;
        font-weight: 500;
    }

    .item-price {
        text-align: right;
        color: #2a9d8f;
        font-size: 13px;
        font-weight: 500;
    }

    .item-date {
        text-align: center;
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
        margin-bottom: 50px;
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
</style>

<script>
    import { AUCTION_STATE } from "../../../constants/auctionState"; 
    import { formatItemName } from "../../../utils/gameMarket/itemName";
    import { isAuctionCompleted } from "../../../utils/gameMarket/auctionStateUtil";
    import { formatDateTimeShort } from "../../../utils/time";

    import Spinner from "../../Spinner.svelte";
    import Pagination from "../common/Pagination.svelte";
    import SlackStatusButton from "../common/SlackStatusButton.svelte";
 
  
    export let watch = {};       // bind 필요
    export let isSlackInfoOpen;  // bind 필요
    
    export let loadingButtonMap;
    export let isApiLoaded;
    export let slackInfoExists;
    export let slackErrorExists;
    export let toggleWatch = () => {};
</script>


<div class="watch-list">
    <div class="watch-list-header">
        <h3>판매 알림 등록 목록</h3>
        {#if isApiLoaded}
            <SlackStatusButton 
                slackInfoExists={ slackInfoExists } 
                slackErrorExists={ slackErrorExists } 
                onClick={() => {isSlackInfoOpen = true}}
            />
        {:else}
            <Spinner margin_top="4px"/>
        {/if}
    </div>

    <div class="table-header">
        <span class="image-header"></span>
        <span class="name-header">이름</span>
        <span class="price-header">가격(골드)</span>
        <span class="register-header">경매 등록일</span>
        <span class="status-header">상태</span>
    </div>
    
    {#if !isApiLoaded}
        <p class="loading-result">판매 알림 목록을 불러오는 중입니다.</p>
    {:else}
        {#if watch.list.length === 0}
            <p class="no-result">등록된 판매 알림이 없습니다.</p>
        {:else}
            <ul>
                {#each watch.displayed as item}
                    <li class:completed={ isAuctionCompleted(item.auctionState) }>
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
                            { item.itemInfo.currentPrice.toLocaleString() } 골드
                            {#if item.itemInfo.count > 1}
                                ({(item.itemInfo.currentPrice/item.itemInfo.count).toLocaleString()})
                            {/if}
                        </span>
                        
                        <!-- 판매 등록일 -->
                        <span class="item-date">{ formatDateTimeShort(item.itemInfo.regDate) }</span>
                        
                        <!-- 버튼 -->
                        <!-- 판매 완료 -->
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
                        <!-- 기간 만료 -->
                        {:else if item.auctionState == AUCTION_STATE.EXPIRED}
                            <span class="status-wrap">
                                <span class="expired" style="margin-left: 10px;">기간 만료</span>
                                <button class="btn-x" on:click={() => toggleWatch(item)}>
                                    {#if loadingButtonMap[item.itemInfo.auctionNo]}
                                        <Spinner colorTheme="white" margin_left="3px" margin_bottom="2px"/>
                                    {:else}
                                        ×
                                    {/if}
                                </button>
                            </span>
                        <!-- 판매 중 -->    
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
    <Pagination bind:pagingTarget={ watch } />
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

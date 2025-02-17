<script>
    import { PATHS } from "../constants/paths";
    import { createEventDispatcher } from "svelte";
    import { isLoggedIn } from "../utils/auth";
    
    const dispatch = createEventDispatcher();
    
    let searchQuery = "";
    let searchResults = [];
    let watchList = [];

    // TODO
    // regDate      : 물품 최초 등록일
    // expireDate   : 물품 등록 만료일
    // regCount     : 최초 등록 개수
    // count        : 현재 남은 개수
    // currentPrice : 현재 일괄 구매 가격
    // unitPrice    : 개별 가격

    // 단일 등록 상품 -> count = 1, currentPrice = unitPrice 그리고 regCount 키값 없음

    function searchItems() {
        const mockData = [
            { id: 1, itemName: "마법의 검", price: 5000, regDate: "2025-02-01" },
            { id: 2, itemName: "신비한 갑옷", price: 12000, regDate: "2025-02-02" },
            { id: 3, itemName: "전설의 방패", price: 8000, regDate: "2025-02-03" },
            { id: 4, itemName: "마법의 검", price: 4300, regDate: "2025-02-01" },
            { id: 5, itemName: "마법의 검", price: 4700, regDate: "2025-02-01" },
            { id: 6, itemName: "마법의 검", price: 3900, regDate: "2025-02-01" },
        ];
        
        searchResults = mockData.filter(item => item.itemName.includes(searchQuery));
    }

    function toggleWatch(item) {
        const index = watchList.findIndex(w => w.id === item.id);
        if (index === -1) {
            watchList = [...watchList, item];
        } else {
            watchList = watchList.filter(w => w.id !== item.id);
        }
    }

    function removeCompleted(item) {
        watchList = watchList.filter(w => w.id !== item.id);
    }
</script>

<div class="ly_login_info" id="loginLayer">
    <div class="ly_logbox">
        <a on:click={() => dispatch("close")} class="ly_clse">닫기</a>
        {#if !$isLoggedIn}
            <p class="txtarea">
                <span>로그인 후 이용하여 주세요.<br>경매장에 등록된 아이템의 판매 알림을 받을 수 있습니다.</span>
            </p>
            <p class="btnarea">
                <a href={PATHS.ACCOUNT.LOGIN} class="btn btn_n">관리자모드 로그인</a>
                <a href={PATHS.ACCOUNT.LOGIN} class="btn btn_b">일반모드 로그인</a>
            </p>
        {:else}
            <div class="search-box">
                <input type="text" bind:value={searchQuery} placeholder="아이템 검색" />
                <button class="btn-search" on:click={searchItems}>검색</button>
            </div>

            <div class="result-list">
                <h3>검색 결과</h3>
                {#if searchResults.length === 0}
                    <p>검색 결과 없음</p>
                {:else}
                    <ul>
                        {#each searchResults as item}
                            <li>
                                <span>{item.itemName} - {item.price} G (등록일: {item.regDate})</span>
                                <button class={watchList.some(w => w.id === item.id) ? "btn-remove" : ""} on:click={() => toggleWatch(item)}>
                                    {watchList.some(w => w.id === item.id) ? "판매 알림 해제" : "판매 알림 등록"}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <div class="watch-list">
                <h3>판매 알림 등록 목록</h3>
                {#if watchList.length === 0}
                    <p>등록된 판매 알림이 없습니다.</p>
                {:else}
                    <ul>
                        {#each watchList as item}
                            <li class={item.completed ? 'completed' : ''}>
                                <span>{item.itemName} - {item.price} G (등록일: {item.regDate})</span>
                                {#if item.completed}
                                    <span class="completed">알림 완료</span>
                                {:else}
                                    <button class="btn-remove" on:click={() => toggleWatch(item)}>판매 알림 해제</button>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

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

    .ly_login_info .txtarea {
        display: table;
        width: 520px;
        height: 140px;
        border: 1px solid rgba(225, 230, 238, 0.5);
        background: #f8f9fb;
        color: #36393f;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -1px;
    }

    .ly_login_info .txtarea span {
        display: table-cell;
        vertical-align: middle;
    }

    .ly_login_info .btnarea {
        padding: 0;
        margin: 30px 0 0 0;
        text-align: center;
        font-size: 0;
    }

    .btn {
        position: relative;
    }

    .ly_login_info .btnarea a {
        display: inline-block;
        padding: 0;
        margin: 0;
        width: 165px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }

    .ly_login_info .btnarea a.btn_n {
        background: #303544;
        color: #fff;
    }

    .ly_login_info .btnarea a.btn_b {
        background: #3392ff;
        color: #fff;
    }

    /* 검색 박스 */
    .search-box {
        display: flex;
        margin-bottom: 10px;
    }

    input {
        flex: 1;
        padding: 8px;
        border-radius: 0;
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
        border-radius: 0;
        cursor: pointer;
    }

    button:hover {
        background: #2673cc;
    }

    .btn-search {
        width: 60px;
    }

    /* 검색 결과 및 판매 알림 목록 */
    .result-list, .watch-list {
        margin-top: 20px;
        text-align: left;
        border: 1px solid #ccc;
        padding: 10px;
        background: #f9f9f9;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    li:last-child {
        border-bottom: none;
    }

    /* 알림 완료 스타일 */
    .completed {
        color: green;
        font-weight: bold;
    }

    .watch-list .completed {
        background: #e6ffe6;
    }

    /* 버튼 스타일 */
    .btn-remove {
        background: #ff4d4d;
        color: white;
    }

    .btn-remove:hover {
        background: #cc0000;
    }
</style>

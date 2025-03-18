<script>
    import { onMount } from "svelte";
    import { PATHS } from "../constants/paths";
    import { createEventDispatcher } from "svelte";
    import { isLoggedIn } from "../utils/auth";
    import { API, NEOPLE_API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    
    const dispatch = createEventDispatcher();
    
    let searchResults = [];
    let watchList     = [];
    let searchInput; // 검색창을 참조할 변수

    // 모달이 열리면 검색창 자동 포커스
    onMount(() => {
        searchInput?.focus();
    });

    async function searchItems() {
        const searchKeyWord = searchInput?.value.trim();
        if (!searchKeyWord) {
            alert('검색할 아이템명을 입력해 주세요.')
            return;
        }
        
        const response = await apiFetch(NEOPLE_API.AUCTION.LIST(searchKeyWord), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            searchResults = response.data;

            // TODO 임시 검색 결과 없음 처리
            if (searchResults.length == 0) {
                alert(searchKeyWord + ' 와 관련된 등록 물품이 없습니다.')
            }

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

    function toggleWatch(item) {
        const index = watchList.findIndex(w => w.id === item.id);
        if (index === -1) {
            watchList = [...watchList, item];
        } else {
            watchList = watchList.filter(w => w.id !== item.id);
        }
    }

    // 2025-03-18 16:23:02 -> 03-18 16:23:02
    function extractTime(datetime) {
        return datetime.split(" ")[0].slice(5) + " " + datetime.split(" ")[1];
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
                {#if searchResults.length === 0}
                    <p>검색 결과 없음</p>
                {:else}
                    <ul>
                        {#each searchResults as item}
                            <li>
                                <!-- 아이템 이미지 -->
                                <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
            
                                <!-- 아이템 이름 -->
                                <span class="item-name">{ item.itemInfo.itemName }</span>
            
                                <!-- 가격 -->
                                <span class="item-price">{ item.itemInfo.currentPrice.toLocaleString() } G</span>
            
                                <!-- 등록일 -->
                                <span class="item-date">{ extractTime(item.itemInfo.regDate) }</span>
            
                                <!-- 버튼 -->
                                <button class={watchList.some(w => w.id === item.id) ? "btn-remove" : ""} 
                                        on:click={ () => toggleWatch(item) }>
                                    { watchList.some(w => w.id === item.id) ? "판매 알림 해제" : "판매 알림 등록" }
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
                            <li class={ item.completed ? 'completed' : '' }>
                                <!-- 아이템 이미지 -->
                                <span class="item-img" style="background-image: url('{ item.imgUrl }');"></span>
            
                                <!-- 아이템 이름 -->
                                <span class="item-name">{ item.itemInfo.itemName }</span>
                                
                                <!-- 가격 -->
                                <span class="item-price">{ item.itemInfo.currentPrice.toLocaleString() } G</span>
                                
                                <!-- 등록일 -->
                                <span class="item-date">{ extractTime(item.itemInfo.regDate) }</span>
                                
                                {#if item.completed}
                                    <span class="completed">알림 완료</span>
                                {:else}
                                    <button class="btn-remove" on:click={ () => toggleWatch(item) }>판매 알림 해제</button>
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

    .result-list {
        margin-bottom: 25px;
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
</style>

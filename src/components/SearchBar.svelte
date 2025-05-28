<script>
    export let searchKeyword = '';
    export let handleSearch  = () => {};
    export let clearSearch   = () => {};
</script>
  

<!-- 검색 바 -->
<div class="board_srch">
    <div class="select_gy" style="width:120px">
        <div class="select">
            <!-- <select id="searchType">
                <option value="1">제목+본문</option>
                <option value="2">제목</option>
            </select> -->
            <div class="select-element">
                <span class="active-option">제목</span>
                <!-- <div class="option-list" style="max-height: 205px; height: 84px;">
                    <ul>
                        <li data-value="1">제목+본문</li>
                        <li data-value="2">제목</li>
                    </ul>
                </div> -->
            </div>
        </div>
    </div>
    <div class="bs_ipt">
        <input
            type="text"
            id="searchKeyword"
            class="search_input"
            autocomplete="off"
            bind:value={ searchKeyword }
            on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        >
        <a class="btn_del" style:display={ searchKeyword ? 'block' : 'none' } on:click={ clearSearch }>삭제</a>
        <label id="searchButton" on:click={ handleSearch }></label>
    </div>
</div>


<style lang="scss">
    .board_srch {
        display: flex;
        position: relative;
        margin-left: auto;
        width: 380px;
    }

    // 검색 타입 드롭다운 
    .board_srch .select_gy {
        display: flex;
    }

    .select {
        position: relative;
        width: 100%;
        height: 42px;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #6a6e76;
        z-index: 1;
    }

    select {
        display: none;
    }

    .select .active-option {
        width: 100%;
        height: 42px;
        background: #fff;
        border: 1px solid #e7e8ed;
        color: #6a6e76;
        line-height: 39px;
        cursor: pointer;
        padding-left: 13px;
        display: block;
    }

    .select .active-option:before {
        content: "";
        position: absolute;
        top: 14px;
        right: 10px;
        width: 15px;
        height: 15px;
        background: url("#{$DF_UI}/img/form/select.png") no-repeat;
    }

    .select_gy .select .active-option {
        background: #f8f9fb;
        border-color: #e7e8ed;
    }

    .option-list {
        position: absolute;
        width: 100%;
        visibility: hidden;
        z-index: 100;
    }

    .select .option-list {
        border: 1px solid #e7e8ed;
        overflow-y: auto;
    }

    .select .option-list ul {
        max-height: 245px;
        color: #6a6e76;
    }

    .select_gy .select .option-list ul li.on {
        background: #fff;
    }

    .option-list li {
        width: 100%;
        height: 41px;
        line-height: 39px;
        border-bottom: 1px solid #e7e8ed;
        padding-left: 13px;
        cursor: pointer;
    }

    // 검색 입력창
    .board_srch .bs_ipt {
        display: flex;
        align-items: center;
        width: 260px;
        height: 42px;
        border: 1px solid #e7e8ed;
        border-left: none;
        background: #f8f9fb;
        font-size: 0;
    }

    .board_srch .bs_ipt input[type="text"] {
        width: calc(100% - 60px);
        height: 40px;
        padding: 0;
        margin: 0;
        background: #f8f9fb;
        border: none;
        color: #6a6e76;
        font-size: 14px;
        outline: none; /* 포커스 스타일 제거 */
    }

    input[type="text"] {
        display: block;
        line-height: 53px;
        text-indent: 20px;
    }

    .board_srch .bs_ipt a.btn_del {
        display: none;
        position: relative;
        margin-left: auto;
        width: 30px;
        height: 30px;
        background: url("#{$DF_UI}/img/btn/btn_clse_18x18.png") no-repeat 50%;
        font-size: 0;
        text-indent: -999px;
        cursor: pointer;
    }

    .board_srch .bs_ipt label {
        margin-left: auto;
        width: 30px;
        height: 30px;
        background: url("#{$DF_UI}/img/btn/btn_srch_30x30.png") no-repeat;
        cursor: pointer;
    }
</style>
  
<script>
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from "svelte";
    import { ARTICLE_DETAIL_TYPE, ARTICLE_TYPE_TEXT, CATEGORY_TYPE_TEXT } from '../constants/articles';
    import { getArticleFilter, getArticleFilterText, getPage } from '../utils/page';

    import GnbPublisher from "./GnbPublisher.svelte";
    import Gnb from "./Gnb.svelte";
    import HeaderBanner from "./HeaderBanner.svelte";
    import Menu2nd from './Menu2nd.svelte';
    import Footer from "./Footer.svelte";

    export let categoryType;
    export let articleType;

    let page = getPage(categoryType, articleType);
    let articles = [];
    async function fetchArticles() {
        const response = await apiFetch(API.ARTICLES.LIST(categoryType, articleType), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            articles = response.articles;
        }
    }

    onMount(async ()=> {
        await fetchArticles();
    });

    const articleFilters = getArticleFilter(categoryType, articleType);
</script>


<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner
            isLogoVisible={ false }
            bannerText={ CATEGORY_TYPE_TEXT[categoryType] }
            bannerBackground={ page.bannerBackground }
        />
    </div>
</div>
<Menu2nd categoryType={ categoryType } articleType={ articleType }/>

<section class="content news">
    <h3>{ ARTICLE_TYPE_TEXT[categoryType][articleType] }</h3>
    <article class="news_header">
        <div class="category_type_c">
            {#each articleFilters as articleFilter}
                    <a has-detail-type={ articleFilter.hasDetailType } filter-type={ articleFilter.filterType }>
                        { articleFilter.filterText }
                    </a>
            {/each}
        </div> 
        <div class="board_srch">
            <div class="select_gy" style="width:120px">
                <div class="select">
                    <select id="searchType">
                        <option value="1">제목+본문</option>
                        <option value="2">제목</option>
                    </select>
                    <div class="select-element">
                        <span class="active-option">제목+본문</span>
                        <div class="option-list" style="max-height: 205px; height: 84px;">
                            <ul>
                                <li data-value="1">제목+본문</li>
                                <li data-value="2">제목</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bs_ipt">
                <input type="text" id="searchKeyword" name="" class="search_input" autocomplete="off">
                <a class="btn_del">삭제</a>
                <label id="searchButton"></label>
            </div>
        </div>
    </article>

    <article class="board_list news_list">
        {#each articles as article}
            <ul class:notice={ article.isPinned }>
                <li class="category">
                    {#if article.articleDetailType === ARTICLE_DETAIL_TYPE.NEWS.NOTICE.INSPECTION}
                        <b>{ getArticleFilterText(article.categoryType, article.articleType, article.articleDetailType) }</b>
                    {:else}
                        { getArticleFilterText(article.categoryType, article.articleType, article.articleDetailType) }
                    {/if}
                </li>
                <li class="title" data-no={ article.id }>
                    <a href={ page.readPath(article.id) }>{ article.title }</a>
                    {#if article.commentCount > 0}
                        <b>({ article.commentCount })</b>
                    {/if}
                    <div class="iconset"></div>
                </li>
                <li class="date">{ article.createDate.split('T')[0] }</li>
                <li class="hits">{ article.viewCount.toLocaleString() }</li>
            </ul>
        {/each}
    </article>
    

    <!-- TODO 관리자모드 접속자에게만 보이도록 하기 -->
    <article class="btnarea_r mt30">
        <a href="{ page.writePath }" class="btn btntype_bu46 bold" id="newArticleButton" style="width:160px">글쓰기</a>
    </article>

    <article class="paging mt60">
        <a href="javascript:void(0);" class="first" data-page="1">FIRST</a>
        <a href="javascript:void(0);" class="prev" data-page="1">PREV</a>

        <span>1</span>
        <a href="javascript:void(0);" data-page="2">2</a>
        <a href="javascript:void(0);" data-page="3">3</a>
        <a href="javascript:void(0);" data-page="4">4</a>
        <a href="javascript:void(0);" data-page="5">5</a>
        <a href="javascript:void(0);" data-page="6">6</a>
        <a href="javascript:void(0);" data-page="7">7</a>
        <a href="javascript:void(0);" data-page="8">8</a>
        <a href="javascript:void(0);" data-page="9">9</a>
        <a href="javascript:void(0);" data-page="10">10</a>

        <a href="javascript:void(0);" class="next" data-page="11">NEXT</a>
        <a href="javascript:void(0);" class="end" data-page="488">END</a>
    </article>
</section>

<!-- TODO 별도 컴포넌트로 빼기 -->
<a class="top" style="position: fixed; display: inline;" id="gnbTopBtn">TOP</a>

<div class="footer">
    <Footer />
</div>


<style lang="scss">
    * {
        margin: 0;
        box-sizing: border-box;
    }

    .menu {
        position: relative;
        height: 300px;
    }
    
    .menu .header-banner {
        position: absolute;
        width: 100%;
        top: 0;
    }

    a {
        text-decoration: none;
    }

    .news {
        position: relative;
    }

    .content {
        position: relative;
        margin: 63px auto 0 auto;
        width: 1300px;
        min-height: 500px;
    }

    .content h3 {
        color: #151518;
        font-size: 26px;
        line-height: 34px;
        font-weight: 300;
    }

    .news_header {
        position: relative;
        margin-top: 23px;
        width: 1300px;
        height: 58px;
        border-bottom: 1px solid #eeedf2;
    }

    .category_type_c {
        position: relative;
        float: left;
        margin-right: 40px;
        font-size: 0;
    }

    .category_type_c a:first-child {
        margin-left: 0;
    }

    .category_type_c a {
        display: inline-block;
        margin-left: -1px;
        width: 120px;
        height: 42px;
        line-height: 39px;
        background: #f8f9fb;
        border: 1px solid #e0e2ec;
        color: #a2a5ac;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        vertical-align: top;
        text-align: center;
    }

    .category_type_c a::before {
        content: '';
        display: inline-block;
        margin-right: 5px;
        width: 11px;
        height: 8px;
        background: url("#{$DF_UI}/img/board/arrow_tri_dn_11x7.png") no-repeat 0 0;
    }

    .board_srch {
        display: flex;
        margin-left: auto;
        position: relative;
        width: 380px;
    }

    .board_srch .select_gy {
        display: flex;
    }

    .select {
        position: relative;
        margin: 0;
        width: 100%;
        height: 42px;
        z-index: 99;
        font-size: 14px;
        font-weight: 400;
        color: #6a6e76;
        z-index: 1;
    }

    select {
        display: none;
    }

    .select_gy .select .active-option {
        background: #f8f9fb;
        border-color: #e7e8ed;
    }

    .select .active-option {
        width: 100%;
        height: 42px;
        background: #fff;
        border: 1px solid #e7e8ed;
        color: #6a6e76;
        line-height: 39px;
        cursor: pointer;
    }

    .active-option {
        padding: 0 0 0 13px;
        width: 100%;
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

    .select .option-list {
        border: 1px solid #e7e8ed;
        overflow-y: auto;
    }

    .option-list {
        width: 100%;
        position: absolute;
        visibility: hidden;
        z-index: 100;
    }

    .select .option-list ul {
        color: #6a6e76;
        max-height: 245px;
    }

    .select_gy .select .option-list ul li.on {
        background: #fff;
    }

    .option-list li {
        padding: 0 0 0 13px;
        width: 100%;
        height: 41px;
        line-height: 39px;
        border-bottom: 1px solid #e7e8ed;
        cursor: pointer;
    }

    li {
        list-style: none;
    }

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
        padding: 0;
        margin: 0;
        width: calc(100% - 60px);
        height: 40px;
        border: none;
        background: #f8f9fb;
        color: #6a6e76;
        font-size: 14px;
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
        cursor: pointer;
        font-size: 0;
        text-indent: -999px;
    }

    .board_srch .bs_ipt label {
        margin-left: auto;
        width: 30px;
        height: 30px;
        background: url("#{$DF_UI}/img/btn/btn_srch_30x30.png") no-repeat;
        cursor: pointer;
    }

    /* 공지사항 리스트 영역 */
    .news_list {
        border-top: none;
    }

    .board_list {
        position: relative;
        width: 1300px;
        border-top: 1px solid #eeedf2;
        clear: both;
    }

    .board_list ul.notice {
        padding: 12px 0 14px 0;
        background: #fbfbfd;
    }

    .board_list ul {
        display: flex;
        align-items: center;
        padding: 17px 0 16px 0;
        border-bottom: 1px solid #eeedf2;
    }

    .board_list ul li.category {
        width: 120px;
        font-weight: 500;
    }

    .board_list ul li {
        color: #898c92;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }

    .board_list ul.notice li.title {
        font-weight: 500;
    }

    .news_list ul li.title {
        width: 870px;
    }

    .board_list ul li.title {
        text-align: left;
        font-size: 15px;
        cursor: pointer;
    }

    .board_list ul li.title a {
        color: #36393f;
    }

    .board_list ul li.title b {
        color: #3392ff;
        font-weight: 500;
    }

    .news_list ul li.date {
        width: 200px;
        font-size: 13px;
    }

    .board_list ul li {
        color: #898c92;
        font-weight: 400;
        text-align: center;
    }

    .board_list ul li.hits {
        width: 110px;
        padding-left: 24px;
        background: url("#{$DF_UI}/img/board/board_ico_view.png") no-repeat 0 calc(50% + 1px);
        text-align: left;
        font-size: 13px;
    }

    .board_list ul li {
        color: #898c92;
        font-weight: 400;
    }

    .news_list ul li.category b {
        color: #d50000;
        font-weight: 500;
    }

    /* 페이징 네비게이션 */
    .paging {
        position: relative;
        font-size: 0;
        text-align: center;
        vertical-align: top;
        overflow: hidden;
    }

    .mt60 {
        margin-top: 60px !important;
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

    /* 글쓰기 버튼 */
    .btnarea_r {
        text-align: right;
        font-size: 0;
    }

    .mt30 {
        margin-top: 30px !important;
    }

    .btntype_bu46 {
        height: 46px;
        line-height: 45px;
        background: #3392ff;
        color: #fff;
        font-size: 13px;
    }

    .btn {
        position: relative;
        display: inline-block;
        min-width: 90px;
        text-align: center;
    }

    .bold {
        font-weight: 500 !important;
    }

    /* top 버튼 */
    .top {
        display: none;
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 70px;
        height: 70px;
        background: #484e5f;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.12);
        text-align: center;
        color: #fff;
        font-size: 13px;
        line-height: 70px;
        cursor: pointer;
        z-index: 100;
    }

    .footer {
        margin-top: 160px !important;
        padding-top: 50px;
        border-top: 1px solid #e0e2ec;
    }
</style>
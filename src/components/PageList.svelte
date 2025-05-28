<script>
    import { onMount } from "svelte";
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { CATEGORY_TYPE, CATEGORY_TYPE_TEXT, ARTICLE_TYPE_TEXT } from '../constants/articles';
    import { getArticleFilter, getPage } from '../utils/page';
    import { isAdmin, isLoggedIn } from '../utils/auth';

    import GnbPublisher from "./GnbPublisher.svelte";
    import Gnb from "./Gnb.svelte";
    import HeaderBanner from "./HeaderBanner.svelte";
    import Menu2nd from './Menu2nd.svelte';
    import Footer from "./Footer.svelte";
    import Spinner from "./Spinner.svelte";
    import Top from "./Top.svelte";
    import ArticleRow from "./ArticleRow.svelte";
    import SearchBar from "./SearchBar.svelte";

    export let categoryType;
    export let articleType;

    let   page           = getPage(categoryType, articleType);
    const articleFilters = getArticleFilter(categoryType, articleType);

    const PAGE_SIZE         = 20;   // 한 페이지에 표시할 게시물 수
    const GROUP_PAGING_SIZE = 10;   // 한 그룹에 표시할 페이지 번호 개수

    let articles          = [];
    let pinnedArticles    = [];
    let displayedArticles = [];
    let articlesMap       = new Map(); // 필터 키별로 게시물 리스트를 미리 저장

    let totalPageNum      = 1;
    let currentPageNum    = 1;

    let searchKeyword     = "";

    let selectedFilters   = new Set(); // 게시물 필터 버튼 상태 관리 (ex: 미답변/답변완료)

    let isLoading = false;

    onMount(async () => {
        isLoading = true;

        const response = await apiFetch(API.ARTICLES.LIST(categoryType, articleType), {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            isLoading      = false;
            articles       = response.data;
            pinnedArticles = articles.filter(article => article.isPinned); 

            buildArticlesMap();
            updateDisplayedArticles();

            return;
        }

        isLoading = false;
        return;
    });

    // 필터 기준에 따라 Map 생성
    function buildArticlesMap() {
        articlesMap.clear();
  
        for (const article of articles) {
            const key = (categoryType === CATEGORY_TYPE.COMMUNITY)
            ? String(article.articleType)
            : String(article.articleDetailType);

            if (!articlesMap.has(key)) {
                articlesMap.set(key, []);
            }
            articlesMap.get(key).push(article);
        }
    }

    // 필터 버튼 토글
    function toggleFilter(filterKey) {
        filterKey = String(filterKey);

        const newSet = new Set(selectedFilters); // 반응성을 위해 기존 Set 복사
        if (newSet.has(filterKey)) {
            newSet.delete(filterKey);
        } else {
            newSet.add(filterKey);
        }
        selectedFilters = newSet;  // 재할당으로 반응성 유도

        currentPageNum = 1;        // 필터 변경 시 페이지 리셋
        updateDisplayedArticles(); // 다시 첫 페이지부터 필터링된 결과 출력
    }

    // 필터와 검색어에 따라 표시할 게시글 갱신
    function updateDisplayedArticles() {
        let filtered = [];

        if (selectedFilters.size > 0) {
            for (const key of selectedFilters) {
                if (articlesMap.has(key)) {
                    filtered.push(...articlesMap.get(key));
                }
            }
        } else {
            filtered = [...articles];
        }

        if (searchKeyword.trim()) {
            filtered = filtered.filter(article => article.title.includes(searchKeyword.trim()));
        }

        const start       = (currentPageNum - 1) * PAGE_SIZE;
        const end         = currentPageNum * PAGE_SIZE;
        displayedArticles = filtered.slice(start, end);
        totalPageNum      = Math.ceil(filtered.length / PAGE_SIZE);
    }

    function changePage(pageNum) {
        if (pageNum >= 1 && pageNum <= totalPageNum) {
            currentPageNum = pageNum;
            updateDisplayedArticles();
        }
    }

    function handleSearch() {
        currentPageNum = 1;
        updateDisplayedArticles();
    }

    function clearSearch() {
        searchKeyword = "";
        updateDisplayedArticles();
    }

    function canUserWrite() {
        const isNews = categoryType === CATEGORY_TYPE.NEWS;

        if (isNews && $isAdmin && $isLoggedIn) {
            return true;
        }

        if (!isNews && $isLoggedIn) {
            return true;
        }

        return false;
    }

    $: currentGroupStart = Math.floor((currentPageNum - 1) / GROUP_PAGING_SIZE) * GROUP_PAGING_SIZE + 1;
    $: currentGroupEnd   = Math.min(currentGroupStart + GROUP_PAGING_SIZE - 1, totalPageNum);
    $: currentGroupPages = Array.from({ length: currentGroupEnd - currentGroupStart + 1 }, (_, i) => currentGroupStart + i);
</script>


<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner isLogoVisible={ false } bannerText={ CATEGORY_TYPE_TEXT[categoryType] } bannerBackground={ page.bannerBackground } />
    </div>
</div>
<Menu2nd categoryType={ categoryType } articleType={ articleType }/>

<section class="content news">
    <h3>{ ARTICLE_TYPE_TEXT[categoryType][articleType] }</h3>
    <article class="news_header">

        <!-- 필터링 버튼 -->
        <div class="category_type_c">
            {#each articleFilters as articleFilter}
                <a class:selected={selectedFilters.has(String(articleFilter.filterType))} on:click={() => toggleFilter(articleFilter.filterType)}>
                    { articleFilter.filterText }
                </a>
            {/each}
        </div>

        <!-- 검색 바 -->
        <SearchBar bind:searchKeyword={ searchKeyword } handleSearch={ handleSearch } clearSearch={ clearSearch } />
    </article>

    <!-- 게시물 목록 -->
    <article class="board_list news_list">
        {#if isLoading}
            <ul>
                <li><Spinner /> 게시물 정보를 불러오는 중입니다.</li>
            </ul>
        {:else}
            <!-- 고정 게시물은 항상 출력 -->
            {#each pinnedArticles as article}
                <ArticleRow article={ article } articleUrl={ page.readPath(article.id) } isPinned={ true } />
            {/each}
    
            {#if displayedArticles.length > 0}
                {#each displayedArticles as article}
                    <ArticleRow article={ article } articleUrl={ page.readPath(article.id) } />
                {/each}
            {:else}
                <ul class="nodata">
                    <li>검색 결과가 없습니다.</li>
                </ul>
            {/if}
        {/if}
    </article>
    
    <!-- 글쓰기 버튼 -->
    {#if canUserWrite()}
        <article class="btnarea_r mt30">
            <a href="{ page.writePath }" class="btn btntype_bu46 bold" style="width:160px">글쓰기</a>
        </article>
    {/if}

    <!-- 페이징 -->
    <article class="paging mt60">
        <a class="first" on:click={ () => changePage(1) }>FIRST</a>
        <a class="prev"  on:click={ () => changePage(currentPageNum - 1) }>PREV</a>

        {#each currentGroupPages as pageNum}
            {#if pageNum === currentPageNum}
                <span>{ currentPageNum }</span>
            {:else}
                <a on:click={ () => changePage(pageNum) }>{ pageNum }</a>
            {/if}
        {/each}

        <a class="next" on:click={ () => changePage(currentGroupEnd + 1) }>NEXT</a>
        <a class="end"  on:click={ () => changePage(totalPageNum) }>END</a>
    </article>
</section>
<Top />
<Footer />


<style lang="scss">
    * {
        margin: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    li {
        list-style: none;
    }

    ul {
        display: flex;
        align-items: center;
        padding: 17px 0 16px 0;
        border-bottom: 1px solid #eeedf2;
    }

    ul li {
        color: #898c92;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
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

    .category_type_c a.selected {
        background-color: #3392ff;
        border-color: #247ce1;
        color: white;              
    }

    .category_type_c a.selected::before {
        background-position: 0 -50px; // 체크 이미지 하얀색으로 변경 (이미지 내 위치 이동)            
    }

    .board_list {
        position: relative;
        width: 1300px;
        clear: both;
    }

    .board_list ul.nodata {
        cursor: default;
    }

    .board_list ul.nodata li {
        width: 1300px;
        height: 200px;
        color: #36393f;
        font-size: 26px;
        font-weight: 300;
        text-align: center;
        line-height: 200px;
    }

    .board_list ul.nodata:hover {
        background: none;
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

    .footer {
        margin-top: 160px !important;
        padding-top: 19px;
        border-top: 1px solid #e0e2ec;
    }
</style>
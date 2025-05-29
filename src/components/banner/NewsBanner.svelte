<script>
    import { onMount } from "svelte";
    import { ARTICLE_TYPE } from '../../constants/articles';
    import { PATHS } from '../../constants/paths';
    import { getArticleFilterText } from '../../utils/page';


    export let width    = "400px";
    export let height   = "280px";
    export let articles = [];

    let tabs = {
        all:     { label: "전체",     news: [] },
        notice:  { label: "공지사항",  news: [] },
        update:  { label: "업데이트",  news: [] },
        devNote: { label: "개발자노트", news: [] },
    };
    let activeTab = "all";

    onMount(() => {
        fetchArticles();
    });

    function fetchArticles() {
        tabs.all.news     = articles.map(formatArticleTitle);
        tabs.notice.news  = filterByType(ARTICLE_TYPE.NEWS.NOTICE);
        tabs.update.news  = filterByType(ARTICLE_TYPE.NEWS.UPDATE);
        tabs.devNote.news = filterByType(ARTICLE_TYPE.NEWS.DEV_NOTE);
    }

    function formatArticleTitle(article) {
        // 접두사 확인 -> 접두사를 기존 제목 앞에 추가
        const prefix = `[${getArticleFilterText(article)}]`;
        const title  = `${prefix} ${article.title}`.trim();

        return {
            title: title,
            id:    article.id,
        };
    }

    function filterByType(type) {
        return articles
            .filter((article) => article.articleType === type)
            .map(formatArticleTitle);
    }

    // 탭 변경
    function setActiveTab(event, tabKey) {
        event.preventDefault();
        activeTab = tabKey;
        return;
    }
</script>

<section
    class="news_bnrs"
    style="--news-width: {width}; --news-height: {height};"
>
    <div class="news_header">
        <h3>새소식</h3>
        <p class="news_tab">
            {#each Object.entries(tabs) as [tabKey, tab]}
                <a 
                    class:on={activeTab === tabKey} 
                    on:click={(e) => setActiveTab(e, tabKey)}
                >
                    #{tab.label}
                </a>
            {/each}
        </p>
    </div>
    <ul class="news_con">
        <li>
            {#each tabs[activeTab].news as news}
                <a href={ PATHS.NEWS.READ(news.id) }>{ news.title }</a>
            {/each}
        </li>   
    </ul>
</section>

  
<style>
    * {
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    }

    .news_bnrs {
        font-family: Arial, sans-serif;
        width: var(--news-width);
        height: var(--news-height);
        overflow: hidden; /* 전체 배너 영역 넘침 방지 */
    }
  
    .news_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        border-bottom: 1px solid #eeedf2;
    }

    .news_header h3 {
        font-size: 20px;
        font-weight: 400;
        color: #151518;
        margin: 0;
        height: 43px;
        line-height: 38px;
    }

    .news_tab {
        display: flex;
        gap: 14px;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .news_tab a {
        text-decoration: none;
        color: #6a6e76;
        font-size: 0.98em;
        line-height: 1.5;
        transition: color 0.3s;
    }

    .news_tab a:hover {
        cursor: pointer;
        color: #3392ff;
    }

    .news_tab a.on {
        color: #3392ff;
    }
  
    .news_con {
        list-style: none;
        padding: 0;
        max-height: calc(var(--news-height) - 50px); /* 뉴스 영역의 최대 높이 */
    }
  
    .news_con li {
        width: 100%; /* 부모 리스트에 너비 추가 */
    }

    .news_con li a {
        text-decoration: none;
        color: #6a6e76;
        font-size: 15px;
        line-height: 32px;
        
        /* 텍스트 줄임표 처리 */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(var(--news-width) - 15px); /* 최대 너비 설정 */
        display: block;
    }

    .news_con li a:hover {
        color: #3392ff;
    }
</style>

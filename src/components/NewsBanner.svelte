<script>
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from "svelte";
    import { CATEGORY_TYPE, ARTICLE_TYPE, ARTICLE_DETAIL_TYPE } from '../constants/articles';
    import { PATHS } from '../constants/paths';
    import { getArticleFilterText } from '../utils/page';

    export let width = "400px"; // 기본값 설정
    export let height = "280px"; // 기본값 설정

    let activeTab = "전체";
    let articles = [];
    let newsData = {
        전체: [],
        공지사항: [],
        업데이트: [],
        개발자노트: []
    };

    const tabs = ["전체", "공지사항", "업데이트", "개발자노트"];

    // TODO -> 홈에서 한번에 가져오게 하기 (지금은 테스트를 위해 임시로 컴포넌트에서 API 호출)

    // 게시물 데이터 가져오기
    async function fetchArticles() {
        const response = await apiFetch(API.ARTICLES.LIST(CATEGORY_TYPE.NEWS, ARTICLE_TYPE.ALL), {
            method: 'GET',
        }).catch(handleApiError);

        if (response?.success) {
            articles = response.data;

            // newsData 동적 생성
            newsData = {
                전체: articles.map((article) => formatArticleTitle(article)),
                공지사항: articles
                    .filter((article) => article.articleType === ARTICLE_TYPE.NEWS.NOTICE)
                    .map((article) => formatArticleTitle(article)),
                업데이트: articles
                    .filter((article) => article.articleType === ARTICLE_TYPE.NEWS.UPDATE)
                    .map((article) => formatArticleTitle(article)),
                개발자노트: articles
                    .filter((article) => article.articleType === ARTICLE_TYPE.NEWS.DEV_NOTE)
                    .map((article) => formatArticleTitle(article)),
            };
        }
    }

    // 게시물 제목 포맷
    function formatArticleTitle(article) {
        // 접두사 확인
        const prefix = `[${getArticleFilterText(article.categoryType, article.articleType, article.articleDetailType)}]`;

        // 접두사를 기존 제목 앞에 추가
        const title = `${prefix} ${article.title}`.trim();

        return {
            title,
            id: article.id,
        };
    }

    // 탭 변경
    function setActiveTab(tab) {
        activeTab = tab;
    }

    onMount(async () => {
        await fetchArticles();
    });
</script>

<section
    class="news_bnrs"
    style="--news-width: {width}; --news-height: {height};"
>
    <div class="news_header">
        <h3>새소식</h3>
        <p class="news_tab">
            {#each tabs as tab}
                <a
                    href="#"
                    class:on={activeTab === tab}
                    on:click|preventDefault={() => setActiveTab(tab)}
                >
                    #{tab}
                </a>
            {/each}
        </p>
    </div>
    <ul class="news_con">
        <li>
            {#each newsData[activeTab] as news}
                <a href={ PATHS.NEWS.READ(news.id) }>{news.title}</a>
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

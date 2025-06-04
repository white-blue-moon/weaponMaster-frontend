<script>
    import { CATEGORY_TYPE, ARTICLE_DETAIL_TYPE } from '../constants/articles';
    import { getArticleFilterText } from '../utils/page';

    import AdminAuthor from "./AdminAuthor.svelte";

    export let article;
    export let articleUrl;
    export let isPinned = false;

    function isMaintenance() {
        if (article.articleDetailType === ARTICLE_DETAIL_TYPE.NEWS.NOTICE.MAINTENANCE) {
            return true;
        }

        return false;
    }
</script>
  

<ul class:notice={ isPinned }>
    <li class="category">
        <span class:bold={ isMaintenance() }>
            { getArticleFilterText(article, isPinned) }
        </span>
    </li>
  
    <li class="title">
        <a href={ articleUrl }>
            { article.title } 
            {#if article.commentCount > 0} <b>({article.commentCount})</b> {/if}
        </a>
        <div class="iconset"></div>
    </li>    
  
    {#if article.categoryType !== CATEGORY_TYPE.NEWS}
        {#if article.isAdminMode}
            <AdminAuthor />
        {:else}
            <li class="author">{ article.userId }</li>
        {/if}
    {/if}
  
    <li class="date">{ article.createDate.split('T')[0] }</li>
    <li class="hits">{ article.viewCount.toLocaleString() }</li>
</ul>


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

    ul.notice {
        padding: 12px 0 14px 0;
        background: #fbfbfd;
    }

    ul {
        display: flex;
        align-items: center;
        padding: 17px 0 16px 0;
        border-bottom: 1px solid #eeedf2;
    }

    ul li.category {
        border-top: none;
        width: 120px;
        font-weight: 500;
    }

    ul li {
        color: #898c92;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }

    ul li.title {
        text-align: left;
        font-size: 15px;
        cursor: pointer;
        width: 870px;
    }

    ul li.title a {
        color: #36393f;
    }

    ul li.title b {
        color: #3392ff;
        font-weight: 500;
    }

    ul.notice li.title {
        font-weight: 500;
    }

    ul li.author {
        width: 140px;
    }

    ul li.hits {
        width: 110px;
        padding-left: 24px;
        background: url("#{$DF_UI}/img/board/board_ico_view.png") no-repeat 0 calc(50% + 1px);
        text-align: left;
        font-size: 13px;
    }

    ul li.date {
        width: 200px;
        font-size: 13px;
    }

    .bold {
        color: #d50000;
        font-weight: 500;
    }
</style>

<script>
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from "svelte";
    import { getPage, getArticleFilterText } from '../utils/page';
    import { userInfo, isLoggedIn } from "../utils/auth";
    import { formatDate } from "../utils/time";
    import { CATEGORY_TYPE, CATEGORY_TYPE_TEXT, ARTICLE_TYPE_TEXT } from '../constants/articles';
    
    import GnbPublisher from "../components/GnbPublisher.svelte";
    import Gnb from "../components/Gnb.svelte";
    import HeaderBanner from "../components/HeaderBanner.svelte";
    import Menu2nd from './Menu2nd.svelte';
    import Footer from '../components/Footer.svelte';
    import Comment from './Comment.svelte';
    
    let url = window.location.pathname;
    let pageId = url.split('/').pop();
    let page = {};
    let article = null;

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.articles[0];
            page = getPage(article.categoryType, article.articleType);
        }
    }

    onMount(async ()=> {
        await fetchArticle();
    });

    async function handleDelete() {
        const isConfirm = confirm("정말 해당 게시물을 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        const response = await apiFetch(API.ARTICLES.DELETE(pageId), {
            method: 'DELETE',
            body: JSON.stringify({
                "userId": $userInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            alert('게시물이 삭제되었습니다.');
            window.location.href = page.listPath;
            return;
        }
        
        alert('게시물 삭제에 실패하였습니다.');
        return;
    }
</script>


<GnbPublisher />
{#if article}
    <div class="menu">
        <Gnb /> 
        <div class="header-banner">
            <HeaderBanner
                isLogoVisible={ false }
                bannerText={ CATEGORY_TYPE_TEXT[article.categoryType] }
                bannerBackground={ page.bannerBackground }
            />
        </div>
    </div>
    <Menu2nd categoryType={ article.categoryType } articleType={ article.articleType }/>

    <section class="content news">
        <h3>{ ARTICLE_TYPE_TEXT[article.categoryType][article.articleType] }</h3>
        <div class="board_view news_view">
            <dl>
                <dt>{ getArticleFilterText(article.categoryType, article.articleType, article.articleDetailType) }</dt>
                <dd>
                    <p>
                        { article.title }
                        {#if article.commentCount > 0}
                            <span class="comment-count">({article.commentCount})</span>
                        {/if}
                    </p>
                    <p class="sinfo">
                        <span class="arthor">{ article.userId }</span>
                        <span class="date">{ formatDate(article.createDate) }</span>
                        <span class="hits">{ article.viewCount }</span>
                    </p>
                </dd>
            </dl>
            <div class="bd_viewcont">
                <div class="operation_guide">
                    { @html article.contents }
                </div>
            </div>
        </div>

        <!-- TODO 랜덤으로 배너 이미지 띄우도록 바꾸기 -->
        <article class="bdview_bnrarea">
            <a href="/community/news/notice/2838879">
                <img src="https://bbscdn.df.nexon.com/data6/commu/202408/3619ee93-0fa1-455d-ed97-34e61638f387.jpg" alt="지인 사칭 피싱 방지 배너 1">
            </a>
        </article>
        <article class="bdview_btnarea line">
            <div class="btnst1">
                <a href="javascript:void(0);" class="btncopy">텍스트복사</a>
            </div>
            <div class="btnst2">
                <!-- 수정, 삭제는 관리자/소유자에게만 보이기 -->
                <a href={ page.editPath(article.id) } id="editButton" class="btn btntype_bk46 bold" style="width:140px">수정</a>
                <a on:click={ handleDelete } id="deleteButton" class="btn btntype_bk46 bold" style="width:140px">삭제</a>
                <a href={ page.listPath } class="btn btntype_bk46 bold list" style="width:140px">목록</a>
            </div>          
        </article>

        {#if article.categoryType != CATEGORY_TYPE.NEWS}
            <Comment />
        {/if}
    </section>
{/if}

<!-- TODO 하단에 게시물 목록 출력하기 -->

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
    
    .board_view {
        position: relative;
        margin-top: 23px;
        width: 1300px;
    }

    .comment-count {
        margin-left: 5px !important;
        color: #3392ff;
    }
    
    .board_view dl {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .board_view dl dt {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 180px;
        height: 200px;
        border: 1px solid #e0e2ec;
        background: #f8f9fb;
        color: #36393f;
        font-size: 16px;
        font-weight: 400;
    }
    
    .board_view dl dd {
        display: flex;
        flex-direction: column;
        width: 1120px;
        height: 200px;
        border: 1px solid #eeedf2;
        border-left: none;
    }
    
    .board_view dl dd p:nth-child(1) {
        padding-left: 30px;
        height: 139px;
        border-bottom: 1px solid #eeedf2;
        color: #36393f;
        font-size: 22px;
        line-height: 34px;
    }
    
    .board_view dl dd p {
        display: flex;
        align-items: center;
    }
    
    .board_view dl dd p:nth-child(2) {
        padding-right: 45px;
        height: 59px;
        justify-content: end;
        color: #6a6e76;
        font-size: 13px;
        font-weight: 500;
    }
    
    .board_view dl dd p span {
        margin-left: 60px;
    }
    
    .board_view dl dd p span.hits {
      padding-left: 24px;
      background: url("#{$DF_UI}/img/board/board_ico_view.png") no-repeat 0 calc(50% + 1px);
    }
    
    .board_view  .bd_viewcont {
        padding: 45px 0 150px 0;
        color: #36393f;
        font-size: 16px;
        line-height: 30px;
        font-weight: 400;
    }
    
    .operation_guide {
        position: relative;
        color: #36393f;
        font-size: 16px;
        line-height: 30px;
        font-weight: 400;
    }

    :global(.operation_guide p) {
        margin: 0;
    }

    // 기본 블랙인 경우에 한해서만 색상 변경
    :global(.operation_guide p strong[style*="color: rgb(0, 0, 0)"]) {
        color: #36393f !important;
    }

    // color: rgb(57, 132, 198); -> 공홈에서 사용하는 블루 텍스트 값
    :global(.operation_guide p strong[style*="color: rgb(0, 102, 204)"]) {
        color: rgb(57, 132, 198) !important;
    }

    .bdview_bnrarea {
        position: relative;
        margin-bottom: 80px;
        width: 100%;
        height: 200px;
    }
    
    .bdview_btnarea.line {
        padding-bottom: 20px;
        border-bottom: 1px solid #eeedf2;
    }
    
    .bdview_btnarea {
        position: relative;
        vertical-align: top;
        overflow: hidden;
    }
    
    .bdview_btnarea .btnst1 {
        float: left;
    }
    
    .bdview_btnarea .btnst1 a.btncopy {
        margin-right: 25px;
    }
    
    .bdview_btnarea .btnst1 a {
        display: inline-block;
        height: 46px;
        line-height: 46px;
        color: #6a6e76;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }
    
    .btncopy {
        width: 49px;
        background: #484e5f url('#{$DF_UI}/img/board/board_ico_copy.png') no-repeat 50%;
        text-indent: -9999px;
    }
    
    .bdview_btnarea .btnst2 {
        float: right;
        font-size: 0;
    }
    
    .bdview_btnarea .btnst2 a {
        margin-left: 4px;
        cursor: pointer;
    }
    
    .btntype_bk46 {
        height: 46px;
        line-height: 45px;
        background: #484e5f;
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
        padding-top: 50px;
        border-top: 1px solid #e0e2ec;
    }
</style>
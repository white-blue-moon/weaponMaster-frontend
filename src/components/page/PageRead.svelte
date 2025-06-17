<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { onMount } from "svelte";
    import { getPageInfo, getArticleFilterText } from '../../utils/page';
    import { userInfo, isAdmin, adminToken } from "../../utils/auth";
    import { formatDate } from "../../utils/time";
    import { CATEGORY_TYPE, CATEGORY_TYPE_TEXT, ARTICLE_TYPE_TEXT } from '../../constants/articles';
    import { getArticleIdFromUrl } from '../../utils/pathUtiil';

    import GnbPublisher from "../GnbPublisher.svelte";
    import Gnb from '../Gnb.svelte';
    import HeaderBanner from "../banner/HeaderBanner.svelte";
    import Menu2nd from '../Menu2nd.svelte';
    import Footer from '../Footer.svelte';
    import Comment from '../comment/Comment.svelte';
    import Spinner from '../Spinner.svelte';
    import Top from '../Top.svelte';
    import AdminAuthor from '../AdminAuthor.svelte';
    import CopyUrlButton from '../CopyUrlButton.svelte';
    import CampaignBanner from '../banner/CampaignBanner.svelte';
  
    
    let pageId   = getArticleIdFromUrl();
    let pageInfo = {};
    let article;

    let isLoading = false;

    onMount(async ()=> {
        await fetchArticle();
    });

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.data;
            pageInfo = getPageInfo(article.categoryType, article.articleType);
        }
    }

    let isToggling = false;

    async function handleTogglePin(isPinned) {
        let confirmMessage = "정말 해당 게시물을 상단 고정하시겠습니까?";
        if (isPinned) {
            confirmMessage = "정말 해당 게시물의 상단 고정을 해제 하시겠습니까?";
        }

        const isConfirm = confirm(confirmMessage);
        if (!isConfirm) {
            return;
        }

        if(isToggling) {
            return;
        }

        isToggling = true;

        const response = await apiFetch(API.ARTICLES.TOGGLE_PIN(pageId), {
            method: 'PATCH',
            body: JSON.stringify({
                "userId":      $userInfo,
                "isAdminMode": $isAdmin,
                "adminToken":  $adminToken,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isToggling = false;

            let alertMesseage = "게시물을 상단 고정하였습니다."
            if (isPinned) {
                alertMesseage = "게시물 상단 고정을 해제하였습니다."
            }
            alert(alertMesseage);

            window.location.href = pageInfo.listPath;
            return;
        }
        
        isToggling = false;
        alert('게시물 상단 고정 상태 변환에 실패하였습니다.');
        return;
    }

    async function handleDelete() {
        const isConfirm = confirm("정말 해당 게시물을 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        if (isLoading) {
            return;
        }

        isLoading = true;

        const response = await apiFetch(API.ARTICLES.DELETE(pageId), {
            method: 'DELETE',
            body: JSON.stringify({
                "userId":      $userInfo,
                "isAdminMode": $isAdmin,
                "adminToken":  $adminToken,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isLoading = false;
            alert('게시물이 삭제되었습니다.');
            window.location.href = pageInfo.listPath;
            return;
        }
        
        isLoading = false;
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
                bannerBackground={ pageInfo.bannerBackground }
            />
        </div>
    </div>
    <Menu2nd categoryType={ article.categoryType } articleType={ article.articleType }/>

    <section class="content news">
        <h3>{ ARTICLE_TYPE_TEXT[article.categoryType][article.articleType] }</h3>
        <div class="board_view news_view">
            <dl>
                <dt>{ getArticleFilterText(article, article.isPinned) }</dt>
                <dd>
                    <p>
                        { article.title }
                        {#if article.commentCount > 0}
                            <span class="comment-count">({article.commentCount})</span>
                        {/if}
                    </p>
                    <p class="sinfo">
                        <span class="author">
                            {#if article.isAdminMode}
                                <AdminAuthor />
                            {:else}
                                { article.userId }
                            {/if}
                        </span> <!-- TODO 새소식에서는 안 보이는 게 좋을지 고민중 -->
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

        <CampaignBanner />

        <article class="bdview_btnarea line">
            <div class="btnst1">
                <CopyUrlButton />
            </div>
            <div class="btnst2">
                <!-- 수정, 삭제는 관리자/소유자에게만 보이기 -->
                {#if article.userId == $userInfo || $isAdmin}
                    {#if $isAdmin}
                        {#if article.isPinned}
                            <!-- 고정 해제 버튼 -->
                            <a on:click={ handleTogglePin(article.isPinned) } id="pinToggleButton" class="btn btntype_bk46 btntype_unpin bold" style="width:140px">
                                {#if isToggling}<Spinner colorTheme="white"/>{/if} 고정 해제
                            </a>
                        {:else}
                            <!-- 상단 고정 버튼 -->
                            <a on:click={ handleTogglePin(article.isPinned) } id="pinToggleButton" class="btn btntype_bk46 bold" style="width:140px">
                                {#if isToggling}<Spinner colorTheme="white"/>{/if} 상단 고정
                            </a>
                        {/if}
                        
                    {/if}

                    <!-- 수정 버튼 -->
                    <a href={ pageInfo.editPath(article.id) } id="editButton" class="btn btntype_bk46 bold" style="width:140px">수정</a>
                    
                    <!-- 삭제 버튼 -->
                    <a on:click={ handleDelete } id="deleteButton" class="btn btntype_bk46 bold" style="width:140px">
                        {#if isLoading}<Spinner colorTheme="white"/>{/if} 삭제
                    </a>
                {/if}
                <a href={ pageInfo.listPath } class="btn btntype_bk46 bold list" style="width:140px">목록</a>
            </div>          
        </article>

        <!-- 공지사항에는 댓글 기재 불가능 -->
        {#if article.categoryType != CATEGORY_TYPE.NEWS}
            <Comment 
                categoryType={ article.categoryType }
                articleType={ article.articleType }
                author={ article.userId }
            /> 
        {/if}

    </section>
{/if}

<!-- TODO 하단에 게시물 목록 출력하기 -->
<Top />

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

    .board_view dl dd p.sinfo .author {
        margin-left: 0; /* 기본 마진 제거 */
        margin-right: auto; /* 남은 공간을 오른쪽으로 밀어 좌측 정렬 */
        padding-left: 30px;
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

    .btntype_unpin {
        background: #DC143C;
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
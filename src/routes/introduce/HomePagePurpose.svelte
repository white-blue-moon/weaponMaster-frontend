<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { onMount } from "svelte";
    import { getPage } from '../../utils/page';
    import { userInfo, isAdmin } from "../../utils/auth";
    import { formatDate } from "../../utils/time"
    import { CATEGORY_TYPE_TEXT } from '../../constants/articles';
    
    import GnbPublisher from "../../components/GnbPublisher.svelte";
    import Gnb from "../../components/Gnb.svelte";
    import HeaderBanner from "../../components/HeaderBanner.svelte";
    import Menu2nd from '../../components/Menu2nd.svelte';
    import Footer from '../../components/Footer.svelte';
    import Top from '../../components/Top.svelte';
    import AdminAuthor from '../../components/AdminAuthor.svelte';
    import CopyUrlButton from '../../components/CopyUrlButton.svelte';
    import CampaignBanner from '../../components/CampaignBanner.svelte';
    

    const HOME_PAGE_PURPOSE_ARTICLE_ID = 419;
    const ARTICLE_FILTER_TEXT          = "소개";

    let pageId  = HOME_PAGE_PURPOSE_ARTICLE_ID;
    let page    = {};
    let article = null;

    let isLoading = false;

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.data;
            page    = getPage(article.categoryType, article.articleType);
        }
    }

    onMount(async ()=> {
        await fetchArticle();
    });

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

        isToggling = true;

        const response = await apiFetch(API.ARTICLES.TOGGLE_PIN(pageId), {
            method: 'PATCH',
            body: JSON.stringify({
                "isAdminMode": $isAdmin,
                "userId":      $userInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isToggling = false;

            let alertMesseage = "게시물을 상단 고정하였습니다."
            if (isPinned) {
                alertMesseage = "게시물 상단 고정을 해제하였습니다."
            }
            alert(alertMesseage);

            window.location.href = page.listPath;
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

        isLoading = true;

        const response = await apiFetch(API.ARTICLES.DELETE(pageId), {
            method: 'DELETE',
            body: JSON.stringify({
                "isAdminMode": $isAdmin,
                "userId":      $userInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isLoading = false;
            alert('게시물이 삭제되었습니다.');
            window.location.href = page.listPath;
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
                bannerBackground={ page.bannerBackground }
            />
        </div>
    </div>
    <Menu2nd categoryType={ article.categoryType } articleType={ article.articleType }/>

    <section class="content news">
        <div class="board_view news_view">
            <dl>
                <dt>{ ARTICLE_FILTER_TEXT }</dt>
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
                        </span>
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
        <CopyUrlButton />
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

    .bold {
        font-weight: 500 !important;
    }


    .footer {
        margin-top: 160px !important;
        padding-top: 19px;
        border-top: 1px solid #e0e2ec;
    }
</style>
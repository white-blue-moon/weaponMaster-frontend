<script>
    import { DF_UI } from '../../constants/resourcePath';
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { onMount } from "svelte";
    import { ARTICLE_DETAIL_TYPE } from '../../constants/articles'
    import { PATHS } from '../../constants/paths';
    import { userInfo, isLoggedIn } from "../../utils/auth";
    
    import GnbPublisher from "../../components/GnbPublisher.svelte";
    import Gnb from "../../components/Gnb.svelte";
    import HeaderBanner from "../../components/HeaderBanner.svelte";
    import Footer from '../../components/Footer.svelte';

    // 현재 URL 경로 가져오기
    let url = window.location.pathname;

    // 슬래시(`/`)로 구분하여 배열로 분리하고 마지막 부분 가져오기
    let pageId = url.split('/').pop();
    let article = null;

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.articles[0];
        }
    }

    onMount(async ()=> {
        await fetchArticle();
    });

    function getDetailTypeText(detailType) {
        if (detailType == ARTICLE_DETAIL_TYPE.NEWS.NOTICE.NORMAL) {
            return '일반';
        }

        if (detailType == ARTICLE_DETAIL_TYPE.NEWS.NOTICE.INSPECTION) {
            return '점검';
        }

        return '분류 없음';
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate); // 문자열을 Date 객체로 변환

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 값이 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    async function handleDelete() {
        const isConfirm = confirm("정말 해당 게시물을 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        const response = await apiFetch(API.ARTICLES.DELETE(pageId), {
            method: 'DELETE',
            body: JSON.stringify({
                "author": $userInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            alert('게시물이 삭제되었습니다.');
            window.location.href = PATHS.NEWS.LIST; // TODO 카테고리 별 경로로 수정 필요
            return;
        }
        
        alert('게시물 삭제에 실패하였습니다.');
        return;
    }
</script>



<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner
            headerText="새소식"
            isLogoVisible={false}
            bannerBackground="{ DF_UI }/img/visual/bg_news.jpg"
        />
    </div>
</div>

<section class="menu2nd">
    <a class="active" href={ PATHS.NEWS.LIST }>공지사항</a>
    <a href="#">업데이트</a>
    <a href="/news/devnote/list">개발자노트</a>
</section>


<section class="content news">
    {#if article}
        <!-- article_type -->
        <h3>공지사항</h3>
        <div class="board_view news_view">
            <dl>
                <!-- article_detail_type -->
                <dt>{ getDetailTypeText(article.articleDetailType) }</dt>
                <dd>
                    <!-- title -->
                    <p>{ article.title }</p>
                    <p class="sinfo">
                        <!-- createDate -->
                        <span class="date">{ formatDate(article.createDate) }</span>
                        <!-- viewCount -->
                        <span class="hits">{ article.viewCount }</span>
                    </p>
                </dd>
            </dl>
            <!-- contents -->
            <div class="bd_viewcont">
                <div class="operation_guide">
                    { @html article.contents }
                </div>
            </div>
        </div>

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
                <a href={`/news/edit/${ article.id }`} id="editButton" class="btn btntype_bk46 bold" style="width:140px">수정</a>
                <a on:click={ handleDelete } id="deleteButton" class="btn btntype_bk46 bold" style="width:140px">삭제</a>
                <a href={ PATHS.NEWS.LIST } class="btn btntype_bk46 bold list" style="width:140px">목록</a>
            </div>          
        </article>
    {/if}
</section>


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

    .menu2nd {
        position: relative;
        width: 100%;
        height: 80px;
        background: #f8f9fb;
        border: 1px solid #e0e2ec;
        text-align: center;
        font-size: 0;
    }

    .menu2nd a.active {
        color: #36393f;
        border-bottom: 2px solid #36393f;
    }

    .menu2nd a {
        display: inline-block;
        margin: 0 25px;
        color: #898c92;
        font-size: 16px;
        line-height: 77px;
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
<script>
    import { DF_UI } from '../../constants/resourcePath'

    import GnbPublisher from "../../components/GnbPublisher.svelte";
    import Gnb from "../../components/Gnb.svelte";
    import HeaderBanner from "../../components/HeaderBanner.svelte";
    import Footer from '../../components/Footer.svelte';

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
    <a class="active" href="/news/notice/list">공지사항</a>
    <a href="#">업데이트</a>
    <a href="#">이벤트</a>
    <a href="/news/devnote/list">개발자노트</a>
</section>


<section class="content news">
    <!-- article_type -->
    <h3>공지사항</h3>
    <div class="board_view news_view">
        <dl>
            <!-- article_detail_type -->
            <dt>일반</dt>
            <dd>
                <!-- title -->
                <p>1/1(수) 확인된 오류 안내</p>
                <p class="sinfo">
                    <!-- createDate -->
                    <span class="date">2025.01.01 00:24</span>
                    <!-- viewCount -->
                    <span class="hits">11,536</span>
                </p>
            </dd>
        </dl>
        <!-- contents -->
        <div class="bd_viewcont">
            <div class="operation_guide">
                본문 내용
            </div>
        </div>
    </div>
        <article class="bdview_bnrarea">
            <a href="/community/news/notice/2838879">
                <img src="https://bbscdn.df.nexon.com/data6/commu/202408/3619ee93-0fa1-455d-ed97-34e61638f387.jpg" alt="지인 사칭 피싱 방지 배너 1">
            </a>
        </article>
    <article class="bdview_btnarea line">
        <div class="btnst1"><a href="javascript:void(0);" class="btncopy">텍스트복사</a></div>
        <div class="btnst2"><a href="javascript:void(0);" class="btn btntype_bk46 bold list" style="width:140px">목록</a></div>
    </article>
</section>


<!-- TODO 하단에 게시물 목록 출력하기 -->


<div class="footer">
    <Footer />
</div>


<style>
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
    background: url('../img/board/board_ico_view.png') no-repeat 0 calc(50% + 1px);
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
    color: #898c92;
    font-size: 16px;
    line-height: 30px;
    font-weight: 400;
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
    background: #484e5f url('../img/board/board_ico_copy.png') no-repeat 50%;
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
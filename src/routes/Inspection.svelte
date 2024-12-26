<script>
    import FocusBanner from '../components/FocusBanner.svelte';
    import Footer from '../components/Footer.svelte';

    // 임시 이미지 링크
    const imageUrls = [
        "https://bbscdn.df.nexon.com/data6/commu/202412/3e0a78be-a19f-d2d3-5dbf-540aa173cab5.jpg",
        "https://bbscdn.df.nexon.com/data6/commu/202412/eb467836-7628-ea9b-f49c-db53254e8bf4.jpg",
        "https://bbscdn.df.nexon.com/data6/commu/202412/9641f064-a335-a7cd-df77-db9abc6ee8d1.png",
        "https://bbscdn.df.nexon.com/data6/commu/202412/a3390e26-c053-759e-e460-486467f9f3e5.jpg",
        "https://bbscdn.df.nexon.com/data6/commu/202412/0a3b7ce4-cb9c-1144-461d-634afa4f27c7.jpg",
        "https://bbscdn.df.nexon.com/data6/commu/202412/9a10acd4-d732-4002-2bec-c0a09bbfff45.jpg",
    ];
</script>

<header>
    <img 
        src="https://cdn.df.nexon.com/img/insp/2023/logo.png" 
        alt="Dungeon &amp; Fighter" 
    />
    <h3>이 홈페이지는 네오플 포트폴리오 제출용 홈페이지입니다.</h3>
    <h1>홈페이지 점검 시간 입니다.</h1>
    <h2>약속한 시간 내 오픈할 수 있도록 최선을 다하겠습니다.</h2>
</header>

<section class="main_section">
    <article class="open_date">
        <div class="date">
            <span>오픈 예정 시간</span>
            <ul id="openSchedule">
                <li>10</li>
                <li>00</li>
                <li>AM</li>
            </ul>
        </div>
    </article>
    <article class="focus">
        <FocusBanner width="650px" height="650px" imageUrls={imageUrls} />
    </article>
</section>

<section class="banner_section">
    <a href="https://www.dnf-universe.com" target="_blank">
        <img src="https://cdn.df.nexon.com/img/insp/2023/bnr1.png" alt="" />
    </a>
    <a href="https://www.youtube.com/user/dnfilive" target="_blank">
        <img src="https://cdn.df.nexon.com/img/insp/2023/bnr2.png" alt="" />
    </a>
    <a href="#media">
        <img src="https://cdn.df.nexon.com/img/insp/2023/bnr3.png" alt="" />
    </a>
</section>

<section class="content_section">
    <article class="update">
        <div class="bd_viewcont">
            <div class="operation_guide">
                <h1>개선 및 변경사항</h1>
                <p></p>
                <p class="indent1">
                    아름골 지역 NPC 아샤 상점 - 깊은 숲 속의 백목 오라아바타 상자 판매가 중단됩니다.
                </p>
                <p class="indent2">
                    ※ '시들지 않는 은빛 가지'는 2025년 1월 9일 점검 전까지 획득할 수 있습니다. 
                    (상점 판매가는 유지됩니다.)
                </p>
                <p class="indent1 mt20">중천 전조 퀘스트 4종이 삭제됩니다.</p>
                <p class="indent2">
                    - 기존에 퀘스트 수락 상태인 캐릭터의 경우, 퀘스트가 취소됩니다.
                </p>

                <h1 class="mt50">버그수정</h1>
                <h3>캐릭터</h3>
                <p class="indent1 mt20">
                    스트리트파이터(남) - 전직에 맞는 결전의 무기 장착 후 마운트 시전 시 
                    크레이지 발칸이 주변 적을 공격하지 않는 현상이 수정됩니다.
                </p>
                <p class="indent1 mt20">
                    스트리트파이터(남) - 전직에 맞는 결전의 무기 장착 후 마운트 시전 시 
                    크레이지 발칸의 일부 이펙트가 비정상적으로 출력되는 현상이 수정됩니다.
                </p>
            </div>
        </div>
    </article>

    <article class="media" id="media">
        <div class="media_tabm">
            <a class="">던파카툰</a>
            <a class="active">비트비트 8비트</a>
            <a>아라드 버거</a>
        </div>
        <div class="media_tabc">
            <ul class="cartoon show" style="display: none;">
                <li data-cartoon="2846209">
                    <img 
                        src="https://bbscdn.df.nexon.com/data7/commu/202412/35f652b8-9adb-82a8-5e2c-e008cc974a2e.jpg" 
                        alt="" 
                    />
                    <b>아라드 상중하 예고편</b>
                    <span>2024-12-26</span>
                </li>
                <!-- 나머지 항목들도 동일하게 정리 가능 -->
            </ul>
            <ul class="bitbit8" style="display: flex;">
                <li class="bit">
                    <div class="game_t"></div>
                    <div class="game_c">
                        <div 
                            class="ie" 
                            id="nogame-container" 
                            style="display: none;"
                        >
                            <img 
                                src="https://cdn.df.nexon.com/img/insp/2020/8bit_ie.png" 
                                alt="" 
                            />
                        </div>
                        <iframe 
                            id="game-container" 
                            width="1180" 
                            height="664" 
                            frameborder="0" 
                            src="https://webgame.df.nexon.com/bit-bit-8bit/index.html"
                        ></iframe>
                    </div>
                    <div class="game_f">
                        <span class="none">조작키 [W] [A] [S] [D] [Space Bar]</span>
                        <a href="#f" onclick="fullscreen(); return false;">전체화면</a>
                    </div>
                    <p>
                        ※ 본 서비스는 크롬, 엣지, 파이어폭스, 사파리 등 최신 인터넷 브라우저에서 이용 가능합니다.
                    </p>
                </li>
            </ul>
            <ul class="aradburger" style="display: none;">
                <li>
                    <div id="actiondunfang"></div>
                </li>
            </ul>
        </div>
    </article>
</section>

<Footer />

<a 
    href="#" 
    class="top" 
    style="position: fixed; display: block;"
>
    TOP
</a>



<style>
    * {
        margin: 0;
        padding: 0;
        word-spacing: 1.4px;
    }

    header {
        position: relative;
        padding: 55px 0 30px 0;
        border-top: 5px solid #36393f;
        background: #fff;
        text-align: center;
    }

    header img {
        display: block;
        margin: 0 auto;
        width: 230px;
        height: 122px;
    }

    header h1 {
        color: #151518;
        font-size: 62px;
        line-height: 82px;
        letter-spacing: -6.2px;
        text-align: center;
        font-weight: 700;
    }

    header h2 {
        margin-top: 10px;
        color: #36393f;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
        font-weight: 400;
    }

    header h3 {
        margin-top: 10px;
        color: #a2a5ac;
        font-size: 20px;
        line-height: 27px;
        text-align: center;
    }

    .main_section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 1300px;
        height: 650px;
        background: #323643;
    }

    .main_section .open_date {
    padding-bottom: 10px;
    }

    .main_section article {
        width: 650px;
        text-align: center;
    }

    .main_section .date {
        position: relative;
    }

    .main_section .date span {
        display: block;
        color: #bec5cc;
        font-size: 26px;
        line-height: 34px;
        font-weight: 300;
    }

    .main_section .date ul {
        position: relative;
        font-size: 0;
    }

    .main_section .date ul li {
        display: inline-block;
        padding: 0;
        margin: 0;
        height: 82px;
        color: #fff;
        font-size: 62px;
        font-weight: 700;
        vertical-align: top;
        line-height: 82px;
    }

    .main_section .date ul li::after {
        content: '';
        display: inline-block;
        width: 50px;
        height: 82px;
        background: url('https://cdn.df.nexon.com/img/insp/2023/ico_date.png') no-repeat;
        background-size: contain;
        vertical-align: top;
    }

    .main_section .date ul li:last-child::after {
        content: none;
    }

    li {
        list-style: none;
    }

    .banner_section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 1300px;
        background: #fff;
    }

    .banner_section a {
        width: 460px;
    }

    .banner_section a:last-child {
        width: 380px;
    }

    a {
        text-decoration: none;
    }


    img {
        display: block;
        max-width: 100%;
        /* height: 170px; */
    }

    .content_section {
        position: relative;
        margin: 0 auto;
        width: 1300px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
        background: #fff;
    }

    .content_section .update {
        position: relative;
        padding: 80px 60px;
    }

    .operation_guide {
        position: relative;
        color: #898c92;
        font-size: 16px;
        line-height: 30px;
        font-weight: 400;
    }

    .operation_guide h1 {
        position: relative;
        display: inline-block;
        padding: 0 0 8px 0;
        margin: 0 0 20px 0;
        color: #151518;
        font-size: 22px;
        line-height: 29px;
        border-bottom: 1px solid #151518;
        font-weight: 400;
    }

    .operation_guide p {
        color: #36393f;
        font-size: 16px;
        line-height: 30px;
    }

    .operation_guide .indent1 {
        display: block;
        padding-left: 10px;
    }

    .operation_guide .indent2 {
        margin-left: 10px;
    }

    .content_section .bd_viewcont h3 {
        color: #3392ff !important;
        font-size: 18px !important;
        line-height: 30px !important;
        font-weight: 400  !important;
    }

    .mt20 {
        margin-top: 20px !important;
    }

    .mt50 {
        margin-top: 50px !important;
    }

    .content_section .media {
        position: relative;
    }
    
    .content_section .media_tabm {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        background: #f8f9fb;
        border-top: 1px solid #edeef2;
        border-bottom: 1px solid #edeef2;
    }
    
    .content_section .media_tabm a {
        margin: 0 25px;
        color: #898c92;
        font-size: 16px;
        letter-spacing: -.4px;
        cursor: pointer;
        line-height: 78px;
    }
    
    .content_section .media_tabm a.active {
        color: #36393f;
        border-bottom: 2px solid #36393f;
    }
    
    .content_section .media_tabc {
        position: relative;
    }
    
    .content_section .media_tabc ul.cartoon {
        padding: 60px 50px;
    }
    
    .content_section .media_tabc ul.cartoon li {
        margin: 10px;
        width: 280px;
        height: 230px;
        text-align: center;
        cursor: pointer;
    }
    
    .content_section .media_tabc ul.cartoon li img {
        display: block;
        width: 100%;
        height: 134px;
    }
    
    .content_section .media_tabc ul.cartoon li b {
        display: block;
        margin: 20px 0 8px 0;
        padding: 0;
        color: #36393f;
        font-size: 17px;
        line-height: 23px;
    }
    
    .content_section .media_tabc ul.cartoon li span {
        display: block;
        margin: 0;
        padding: 0;
        color: #a2a5ac;
        font-size: 14px;
        line-height: 18px;
    }
    
    .content_section .media_tabc ul.bitbit8 {
        padding: 60px;
    }
    
    .content_section .media_tabc ul.bitbit8 .game_t {
        position: relative;
        height: 80px;
        background: url('https://cdn.df.nexon.com/img/insp/2023/tit_8bit.png') no-repeat;
    }
    
    .content_section .media_tabc ul.bitbit8 .game_c {
        position: relative;
        padding: 0;
        margin: 0;
        line-height: 0;
        font-size: 0;
        height: 664px;
    }
    
    .content_section img {
        display: inline-block;
        vertical-align: middle;
    }
    
    .content_section .media_tabc ul.bitbit8 .game_f {
        position: relative;
        height: 80px;
        background: url('https://cdn.df.nexon.com/img/insp/2023/foot_8bit.png') no-repeat;
    }
    
    .content_section .media_tabc ul.bitbit8 .game_f span {
        display: none;
    }
    
    .content_section .media_tabc ul.bitbit8 .game_f a {
        position: absolute;
        right: 22px;
        bottom: 18px;
        width: 140px;
        height: 45px;
        text-indent: -9999px;
        cursor: pointer;
    }
    
    .content_section .media_tabc ul.bitbit8 li p {
        margin-top: 20px;
        text-align: center;
        color: #898c92;
        font-size: 14px;
        line-height: 18px;
    }
    
    .content_section .media_tabc ul.aradburger {
        position: relative;
        padding: 60px;
    }
    
    .content_section .media_tabc ul.aradburger li {
        width: 1180px;
        height: 708px;
        background: url('https://cdn.df.nexon.com/img/insp/2023/bg_aradburger.png') no-repeat 50% 0;
    }
    
    .content_section .media_tabc ul.aradburger li #actiondunfang {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 49px 0 0 40px;
        width: calc(100% - 80px);
        height: 590px;
        background: #000;
    }

    .top {
        /* display: none; */
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
    }
</style>
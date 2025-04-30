<script>
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from "svelte";
    import { FOCUS_BANNER_TYPE } from '../constants/focusBanner';

    import FocusBanner from '../components/FocusBanner.svelte';
    import Footer from '../components/Footer.svelte';
  

    export let endDate;

    const date    = new Date(endDate);
    let   hours   = date.getHours();
    const minutes = date.getMinutes();

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0이면 12로 변환 (12AM, 12PM)
    
    // 두 자리수로 만들기 위해 0 채움
    const formatHours   = hours   < 10 ? `0${hours}`   : hours; 
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes; 
    
    let bannerImgUrls = [];
    let latestDevNote = {};

    onMount(async () => {
          const response = await apiFetch(API.PAGE.MAINTENANCE(FOCUS_BANNER_TYPE.MAINTENANCE_MAIN), {
              method: "GET",
          }).catch(handleApiError);

          if (response.success) {
            const focusBanner = response.data.focusBanners;
            bannerImgUrls     = focusBanner[FOCUS_BANNER_TYPE.MAINTENANCE_MAIN]?.map(banner => banner.imgUrl);
            latestDevNote     = response.data.devNote;
          }
    });
</script>

<header>
    <img 
        src="images/logo.png" 
        alt="Dungeon &amp; Fighter" 
    />
    <h3>이 홈페이지는 포트폴리오 제출용 홈페이지입니다.</h3>
    <h1>홈페이지 점검 시간 입니다.</h1>
    <h2>약속한 시간 내 오픈할 수 있도록 최선을 다하겠습니다.</h2>
</header>

<section class="main_section">
    <article class="open_date">
        <div class="date">
            <span>오픈 예정 시간</span>
            <ul id="openSchedule">
                <li>{ formatHours }</li>
                <li>{ formatMinutes }</li>
                <li>{ amPm }</li>
            </ul>
        </div>
    </article>
    <article class="focus">
        <!-- {#if bannerImgUrls.length > 0} -->
            <FocusBanner width="650px" height="650px" imageUrls={ bannerImgUrls } />
        <!-- {/if} -->
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
                {#if latestDevNote != null}
                    { @html latestDevNote.contents }
                {:else}
                    loading...
                {/if}
            </div>
        </div>
    </article>

    <article class="media" id="media">
        <div class="media_tabm">
            <!-- <a class="">던파카툰</a> -->
            <a class="active">비트비트 8비트</a>
            <!-- <a>아라드 버거</a> -->
        </div>
        <div class="media_tabc">
            <!-- <ul class="cartoon show" style="display: none;"></ul> -->
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
            <!-- <ul class="aradburger" style="display: none;"></ul> -->
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
        width: 176px;
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
    
    .content_section .media_tabc ul.aradburger li {
        width: 1180px;
        height: 708px;
        background: url('https://cdn.df.nexon.com/img/insp/2023/bg_aradburger.png') no-repeat 50% 0;
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
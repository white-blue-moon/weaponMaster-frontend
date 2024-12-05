<script>
    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/FocusBanner.svelte';
    import NewsBanner from '../components/NewsBanner.svelte';
    import TestText from '../components/TestText.svelte';
    import Footer from '../components/Footer.svelte';
</script>

<GnbPublisher />
<div class="menu">
    <div class="gnb">
        <Gnb />
    </div>
    <div class="focus-banner">
        <FocusBanner width="1450px" height="600px" background="https://bbscdn.df.nexon.com/data6/commu/202411/0a3de54d-8ab7-0919-3ef8-266c04a409e4.jpg"/>
    </div>
</div>

<div class="news-container">
    <div class="news-banner">
        <NewsBanner />
    </div>
    <div class="news-focus-banners">
        <div class="news-left-focus-banner">
            <FocusBanner width="560px" height="280px" background="https://bbscdn.df.nexon.com/data6/commu/202411/094bad7a-b6d9-5c78-f677-e013907b33d6.jpg"/>
        </div>
        <div class="news-right-focus-banner">
            <FocusBanner width="300px" height="280px" background="https://bbscdn.df.nexon.com/data6/commu/202411/4297ef52-57ee-be59-2a83-e926ea732041.jpg"/>
        </div>
    </div>
</div>


<div class="test-text"><TestText /></div> 
<Footer />

<style>
    /* 부모 컨테이너 설정 */
    .menu {
        position: relative; /* Gnb와 FocusBanner의 위치를 기준으로 설정 */
        display: block;
        overflow: hidden; /* 자식 요소들의 absolute 높이를 포함하도록 설정 */
        height: 600px;
    }

    /* Gnb 스타일 설정 */
    .menu .gnb {
        position: relative;
        z-index: 2; /* FocusBanner보다 위에 위치하도록 설정 */
    }

    /* FocusBanner 스타일 설정 */
    .menu .focus-banner {
        position: absolute;
        top: 0;
        left: 50%; /* 부모의 가로 중심으로 이동 */
        transform: translateX(-50%); /* 자신의 너비의 절반만큼 이동 */
        z-index: 1;
    }

    /* 부모 높이를 반영하도록 가상 요소 추가 (clearfix) */
    .menu::after {
        content: "";
        display: block;
        clear: both;
        height: 200px; /* FocusBanner의 height에 맞게 설정 */
    }

    /* TestText 스타일 설정 */
    .test-text {
        margin-top: 20px; /* menu 하단에 충분한 공간을 두기 위한 마진 */
    }

    .news-container {
        margin: 60px;
        display: flex;
        justify-content: space-between;
    }

    .news-banner {
        margin-right: 40px;
    }

    .news-focus-banners {
        display: flex;
        position: relative;
    }
</style>

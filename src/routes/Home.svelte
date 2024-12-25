<script>
    import { onMount } from "svelte";
    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/FocusBanner.svelte';
    import NewsBanner from '../components/NewsBanner.svelte';
    import ListBox from '../components/ListBox.svelte';
    import Footer from '../components/Footer.svelte';
    import { API } from '../constants/api';
    import { FOCUS_BANNER_TYPE } from '../constants/focusBannerType';
    import { apiFetch, handleApiError } from '../utils/apiFetch';

    let focusBanners = [];  // FocusBanner 데이터를 저장할 변수
    let loading = true;  // 데이터 로딩 중 상태를 관리할 변수
    let banners1, banners2, banners3;

    // API 호출
    async function fetchFocusBanners() {
        const response = await apiFetch(API.HOME, {
            method: 'POST',
            body: JSON.stringify({
                "reqBanner": [
                    {"bannerType": 1},
                    {"bannerType": 2},
                    {"bannerType": 3}
                ]
            }),
        }).catch(handleApiError);

        if (response != null) {
            focusBanners = response; // 반환 값을 focusBanners에 저장
            loading = false;  // 로딩이 끝났으므로 로딩 상태를 false로 설정
        }
    }

    // 컴포넌트가 마운트될 때 API 호출
    onMount(async () => {
        await fetchFocusBanners();  // API 호출 완료될 때까지 기다림

        // focusBanners가 업데이트된 후 banners1, banners2, banners3 할당
        banners1 = focusBanners.respBanner.banners[FOCUS_BANNER_TYPE.MAIN]?.map(banner => banner.imgUrl);
        banners2 = focusBanners.respBanner.banners[FOCUS_BANNER_TYPE.NEWS_FIRST]?.map(banner => banner.imgUrl);
        banners3 = focusBanners.respBanner.banners[FOCUS_BANNER_TYPE.NEWS_SECOND]?.map(banner => banner.imgUrl);
    });
</script>

<!-- 페이지 전체 렌더링을 loading 상태가 끝날 때까지 기다림 -->
<GnbPublisher />
<div class="menu">
    <div class="gnb">
        <Gnb />
    </div>
    <div class="focus-banner">
        {#if !loading}
            <!-- 첫 번째 배너 데이터로 FocusBanner 렌더링 -->
            <FocusBanner width="1450px" height="600px" imageUrls={banners1} />
        {:else}
            <!-- 로딩 중 상태 -->
            <p>로딩 중...</p>
        {/if}
    </div>
</div>
<div class="news-container">
    <div class="news-banner">
        <NewsBanner />
    </div>
    <div class="news-focus-banners">
        {#if !loading}
            <!-- 두 번째와 세 번째 배너 데이터로 FocusBanner 렌더링 -->
            <div class="news-left-focus-banner">
                <FocusBanner width="560px" height="280px" imageUrls={banners2} />
            </div>
            <div class="news-right-focus-banner">
                <FocusBanner width="300px" height="280px" imageUrls={banners3} />
            </div>
        {:else}
            <!-- 로딩 중 상태 -->
            <p>로딩 중...</p>
        {/if}
    </div>
</div>
<div class="guide-and-recommand">
    <ListBox />
</div>
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

    .guide-and-recommand {
        margin: 60px;
    }
</style>



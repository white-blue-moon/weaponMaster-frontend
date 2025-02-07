<script>
    import { API } from '../constants/api';
    import { onMount } from "svelte";
    import { FOCUS_BANNER_TYPE } from '../constants/focusBanner';
    import { apiFetch, handleApiError } from '../utils/apiFetch';

    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/FocusBanner.svelte';
    import NewsBanner from '../components/NewsBanner.svelte';
    import ListBox from '../components/ListBox.svelte';
    import Footer from '../components/Footer.svelte';
    import FullBanner from '../components/FullBanner.svelte';
    
    let focusBanners = [];  // FocusBanner 데이터를 저장할 변수
    let loading = true;  // 데이터 로딩 중 상태를 관리할 변수
    let banners1, banners2, banners3;

    // API 호출
    async function fetchFocusBanners() {
        const response = await apiFetch(API.PAGE.HOME, {
            method: 'POST',
            body: JSON.stringify({
                "bannerTypes": [
                    FOCUS_BANNER_TYPE.MAIN,
                    FOCUS_BANNER_TYPE.NEWS_FIRST,
                    FOCUS_BANNER_TYPE.NEWS_SECOND,
                ]
            }),
        }).catch(handleApiError);

        if (response != null) {
            focusBanners = response.data.focusBanners;
            loading = false;  // 로딩이 끝났으므로 로딩 상태를 false로 설정
        }
    }

    // 컴포넌트가 마운트될 때 API 호출
    onMount(async () => {
        await fetchFocusBanners();  // API 호출 완료될 때까지 기다림

        // focusBanners가 업데이트된 후 banners1, banners2, banners3 할당
        banners1 = focusBanners[FOCUS_BANNER_TYPE.MAIN]?.map(banner => banner.imgUrl);
        banners2 = focusBanners[FOCUS_BANNER_TYPE.NEWS_FIRST]?.map(banner => banner.imgUrl);
        banners3 = focusBanners[FOCUS_BANNER_TYPE.NEWS_SECOND]?.map(banner => banner.imgUrl);
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
        {/if}
    </div>
</div>
<div class="guide-and-recommand">
    <ListBox />
</div>
<!-- TODO 풀 배너 이벤트 등록하기 -->
<!-- <FullBanner /> -->
<Footer />

<style>
    .menu {
        position: relative; /* Gnb와 FocusBanner의 위치를 기준으로 설정 */
        height: 600px;
    }
    
    .menu .focus-banner {
        position: absolute;
        top: 0;
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



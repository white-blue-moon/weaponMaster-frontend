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
    
    let focusBanners     = [];
    let newsArticles     = [];
    let bestViewArticles = [];
    
    let mainFocusBanner, newsFirstBanner, newsSecondBanner;
    let loading = true; // 데이터 로딩 중 상태를 관리할 변수

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

        if (response.success) {
            focusBanners     = response.data.focusBanners;
            newsArticles     = response.data.newsArticles;
            bestViewArticles = response.data.bestViewArticles;
            loading          = false;
        }
    }

    onMount(async () => {
        await fetchFocusBanners();

        // focusBanners가 업데이트된 후 각 변수에 할당
        mainFocusBanner  = focusBanners[FOCUS_BANNER_TYPE.MAIN]?.map(banner => banner.imgUrl);
        newsFirstBanner  = focusBanners[FOCUS_BANNER_TYPE.NEWS_FIRST]?.map(banner => banner.imgUrl);
        newsSecondBanner = focusBanners[FOCUS_BANNER_TYPE.NEWS_SECOND]?.map(banner => banner.imgUrl);
    });
</script>


<GnbPublisher />
<div class="menu">
    <div class="gnb">
        <Gnb />
    </div>
    <div class="focus-banner">
        {#if !loading}
            <FocusBanner width="1450px" height="600px" imageUrls={ mainFocusBanner } />
        {:else}
            <!-- 로딩 중 상태 -->
        {/if}
    </div>
</div>
<div class="news-container">
    <div class="news-banner">
        {#if !loading}
            <NewsBanner articles={ newsArticles }/>
        {/if}
    </div>
    <div class="news-focus-banners">
        {#if !loading}
            <!-- 두 번째와 세 번째 배너 데이터로 FocusBanner 렌더링 -->
            <div class="news-left-focus-banner">
                <FocusBanner width="560px" height="280px" imageUrls={newsFirstBanner} />
            </div>
            <div class="news-right-focus-banner">
                <FocusBanner width="300px" height="280px" imageUrls={newsSecondBanner} />
            </div>
        {:else}
            <!-- 로딩 중 상태 -->
        {/if}
    </div>
</div>
<div class="guide-and-recommand">
    {#if !loading}
        <ListBox articles={ bestViewArticles }/>
    {/if}
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



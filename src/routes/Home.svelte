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
    import Spinner from '../components/Spinner.svelte';
    import Top from '../components/Top.svelte';
    import CharacterBanner from '../components/CharacterBanner.svelte';
    
    let focusBanners     = [];
    let newsArticles     = [];
    let bestViewArticles = [];
    
    let mainFocusBanner, newsFirstBanner, newsSecondBanner;
    let isLoading = true; // 데이터 로딩 중 상태를 관리할 변수

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
            isLoading          = false;
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
        {#if !isLoading}
            <FocusBanner width="1450px" height="600px" imageUrls={ mainFocusBanner } />
        {:else}
            <div class="spinner-container">
                <Spinner /> <span class="loading-text">로딩중입니다.</span>
            </div>
        {/if}
    </div>
</div>
<div class="news-container">
    <div class="news-banner">
        {#if !isLoading}
            <NewsBanner articles={ newsArticles }/>
        {/if}
    </div>
    <div class="news-focus-banners">
        {#if !isLoading}
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
    {#if !isLoading}
        <ListBox articles={ bestViewArticles }/>
    {/if}
</div>

<Top />

<CharacterBanner />

<!-- TODO 풀 배너 이벤트 등록하기 -->
<!-- <FullBanner /> -->

<Footer />


<style>
    .menu {
        position: relative;
    }

    .gnb {
        position: absolute;   
        top: 0;         /* 상단에 맞추기 */
        left: 0;        /* 왼쪽에 맞추기 */
        width: 1450px;  
        height: 100px;  
        z-index: 20;    /* focus-banner 위로 올리기 위해 z-index 조정 */
    }

    .focus-banner {
        position: relative;  /* 위치를 상대적으로 설정하여 스피너 컨테이너와 겹치지 않도록 함 */
        width: 1450px;       
        height: 600px;       
    }

    .spinner-container {
        position: absolute;  
        top: 0;     /* 상단에 맞추기 */
        left: 0;    /* 왼쪽에 맞추기 */
        width: 100%;         
        height: 100%;        
        display: flex;       
        justify-content: center;  /* 가로 중앙 정렬 */
        align-items: center;      /* 세로 중앙 정렬 */
        flex-direction: column;   /* 스피너와 텍스트를 세로로 배치 */
        z-index: 10;              /* 다른 요소 위에 올리기 */
    }

    .loading-text {
        font-size: 16px;      
        color: #6a6e76;      
        font-weight: 500;     
        margin-top: 20px;   /* 스피너와 텍스트 사이 간격 */
        text-align: center;   
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

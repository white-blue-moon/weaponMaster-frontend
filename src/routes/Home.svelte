<script>
    import { API } from '../constants/api';
    import { onMount } from "svelte";
    import { FOCUS_BANNER_TYPE } from '../constants/focusBanner';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { PATHS } from '../constants/paths';
    import { WEAPON_ASSETS } from '../constants/resourcePath';

    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/banner/FocusBanner.svelte';
    import NewsBanner from '../components/banner/NewsBanner.svelte';
    import ListBox from '../components/ListBox.svelte';
    import Footer from '../components/Footer.svelte';
    import Spinner from '../components/Spinner.svelte';
    import Top from '../components/Top.svelte';
    import CharacterBanner from '../components/banner/CharacterBanner.svelte';
    import FocusControl from '../components/FocusControl.svelte';
  
  
    let focusBanners     = [];
    let newsArticles     = [];
    let bestViewArticles = [];
    let characterBanners = [];

    let mainBannerProgress     = 0;
    let mainBannerCurrentIndex = 0;
    
    let isLoading = true;

    let isPageRevealed = false;

    onMount(async () => {
        const isFromGate = sessionStorage.getItem('fromAccessGate') === 'true';
        
        if (isFromGate) {
            // 화면이 렌더링될 준비가 되었을 때(show = true) 실행되도록 예약
            // → 이렇게 하면 화면이 '서서히 등장하는' 애니메이션 효과를 줄 수 있음
            requestAnimationFrame(() => isPageRevealed = true);
            sessionStorage.removeItem('fromAccessGate'); // 비밀번호 입력 후 한 번만 연출
        }

        if (!isFromGate) {
            // 즉시 화면을 보여줌 (애니메이션 없이 바로 나타남)
            isPageRevealed = true;
        }

        await fetchFocusBanners();
    });

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
            characterBanners = response.data.characterBanners;

            isLoading        = false;
            return;
        }

        isLoading = false;
        console.log('홈페이지 정보 불러오기에 실패하였습니다.')
        return;
    }

    let mainBannerRef;
    let isMainFocusHovered = false;
  
    function updateHoverState(hovered) {
        isMainFocusHovered = hovered;
    }
</script>

<div class:fade-in={ isPageRevealed } class="home-wrapper">
    <GnbPublisher />
    <div class="menu">
        <div class="gnb">
            <Gnb />
        </div>

        <div class="focus-banner">
            {#if !isLoading}
                <a href={ PATHS.INTRODUCE.PURPOSE }>
                    <FocusBanner 
                        width="100%" 
                        height="600px" 
                        banners={ focusBanners[FOCUS_BANNER_TYPE.MAIN] }
                        isOverlayExist={ true }
                        showDefaultCtrl={ false }
                        bind:this={ mainBannerRef }
                        bind:progress={ mainBannerProgress }
                        bind:currentIndex={ mainBannerCurrentIndex }
                        on:hoverState={event => updateHoverState(event.detail)}
                    />
                </a>
                <FocusControl 
                    bannerRef={ mainBannerRef }
                    progress={ mainBannerProgress }
                    currentIndex={ mainBannerCurrentIndex } 
                    isHovered={ isMainFocusHovered }
                />
            {:else}
                <div class="spinner-container">
                    <img src="{WEAPON_ASSETS}/gif/gunner_loading.gif" alt="콜라보 거너(여) 로딩"/>
                    <p>
                        <Spinner margin_bottom="4px" margin_right="6px"/>
                        <span class="loading-text">로딩중입니다.</span>
                    </p>
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
                    <FocusBanner width="560px" height="280px" banners={ focusBanners[FOCUS_BANNER_TYPE.NEWS_FIRST] } />
                </div>
                <div class="news-right-focus-banner">
                    <FocusBanner width="300px" height="280px" banners={ focusBanners[FOCUS_BANNER_TYPE.NEWS_SECOND] } />
                </div>
            {:else}
                <!-- 로딩 중 상태 -->
            {/if}
        </div>
    </div>
    <div class="guide-and-recommand">
        {#if !isLoading}
            <ListBox articles={ bestViewArticles } />
        {/if}
    </div>

    <Top />

    {#if !isLoading} <CharacterBanner banners={ characterBanners } /> {/if}

    <!-- TODO (추후) 풀 배너 이벤트 등록하기 -->
    <!-- <FullBanner /> -->

    <Footer />
</div>


<style>
    .home-wrapper {
		opacity: 0;
		transition: opacity 2.5s ease-in-out;
	}

	.fade-in {
		opacity: 1;
	}

    .menu {
        position: relative;
    }

    .gnb {
        position: absolute;   
        top: 0;         /* 상단에 맞추기 */
        left: 0;        /* 왼쪽에 맞추기 */
        width: 100%;  
        height: 100px;  
        z-index: 20;    /* focus-banner 위로 올리기 위해 z-index 조정 */
    }

    .focus-banner {
        position: relative;  /* 위치를 상대적으로 설정하여 스피너 컨테이너와 겹치지 않도록 함 */
        width: 100%;       
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

    .spinner-container img {
        position: absolute;
        top: 108px;
        padding-left: 150px;
    }

    .spinner-container p {
        position: absolute;
        top: 328px;
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

<script>
    export let width             = "560px";
    export let height            = "280px";
    export let imageUrls         = [];
    export let isOverlayExist    = false;
    export let isDefaultCtrlShow = true;
    
    let currentIndex   = 0;
    let overlayVisible = true;
    let autoPlayInterval;

    const SLIDE_TERM    = 5000; // 슬라이드 변경 텀 (단위: ms)
    const OVERLAY_TERM  = 200;  // 오버레이 이미지 등장/전환 텀 (단위: ms)

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, SLIDE_TERM);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function nextSlide() {
        overlayVisible = false; // Overlay 숨기기
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % imageUrls.length;
            overlayVisible = true; // Overlay 다시 표시
        }, OVERLAY_TERM);
    }

    function prevSlide() {
        overlayVisible = false;
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
            overlayVisible = true;
        }, OVERLAY_TERM);
    }

    startAutoPlay();
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<section
    on:mouseenter={ stopAutoPlay }
    on:mouseleave={ startAutoPlay }
    style="--swiper-width: {width}; --swiper-height: {height};"
    role="region"
>
    {#if imageUrls.length > 0}
        <li
            class="swiper-slide swiper-slide-active"
            role="group"
            aria-label="{currentIndex + 1} / {imageUrls.length}"
            style="--swiper-background: url('{imageUrls[currentIndex]}');"
        >
            {#if isOverlayExist}
                <a class="swiper-overlay {overlayVisible ? 'visible' : ''}"></a>
            {/if}

            {#if isDefaultCtrlShow}
                <p class="pay_ctrl">
                    <a href="#" 
                        class="arrow_l swiper-button-prev" 
                        tabindex="0" 
                        role="button" 
                        aria-label="Previous slide"
                        on:click|preventDefault={ prevSlide }
                    >
                        <span class="icon prev"></span>
                    </a>

                    <i class="page_cnt swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
                        <span class="swiper-pagination-current">{currentIndex + 1}</span> /
                        <span class="swiper-pagination-total">{imageUrls.length}</span>
                    </i>

                    <a href="#"
                        class="arrow_r swiper-button-next" 
                        tabindex="0" 
                        role="button" 
                        aria-label="Next slide"
                        on:click|preventDefault={ nextSlide }
                    >
                        <span class="icon next"></span>
                    </a>

                    <i class="pause"></i>
                </p>
            {/if}
        </li>
    {/if}
</section>

<style lang="scss">
    .swiper-slide {
        background: var(--swiper-background) 50% 0px no-repeat;
        background-size: cover;
        width: var(--swiper-width);
        height: var(--swiper-height);
        position: relative;
        overflow: hidden;
        list-style: none;
    }

    .swiper-overlay {
        background: url('/images/notice_overlay.png') 50% 0px no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        transform: translateX(5px);
        opacity: 0;
        transition: opacity 0.2s ease-in, transform 0.2s ease-in;
    }

    .swiper-overlay.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .pay_ctrl {
        font-family: Arial, sans-serif;
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(0, 0, 0, 0.7);
        padding: 5px 6px 5px 6px;
        font-size: 13px;
        z-index: 10;
        margin-bottom: 0;
    }

    .arrow_l, .arrow_r {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        z-index: 11;
        text-decoration: none;
    }

    .arrow_l .icon::before {
        content: ""; /* 가상요소 before 에서는 반드시 content를 설정 */
        display: block; /* 블록 요소로 렌더링 */
        background: url('#{$DF_UI}/img/main/focus_prev.png') no-repeat center center;
        background-size: contain; /* 이미지 크기를 부모에 맞춤 */
        width: 41px; /* 아이콘 크기 설정 */
        height: 41px;
    }

    .arrow_r .icon::before {
        content: ""; /* 가상요소 before 에서는 반드시 content를 설정 */
        display: block; /* 블록 요소로 렌더링 */
        background: url('#{$DF_UI}/img/main/focus_next.png') no-repeat center center;
        background-size: contain; /* 이미지 크기를 부모에 맞춤 */
        width: 41px; /* 아이콘 크기 설정 */
        height: 41px;
    }


    .page_cnt {
        padding-top: 1px;
        color: #bec5cc;
        font-size: 13px;
    }

    .swiper-pagination-current {
        color: #007aff;
    }

    .pause {
        margin: 0;
        right: 6px;
        top: 6px;
        background: url('#{$DF_UI}/img/main/sbnr_play.png') no-repeat 0 -50px;
        width: 23px; /* 아이콘 크기 설정 */
        height: 29px;
        cursor: pointer;
    }

    section:hover .pause {
        background-position-y: 0;
    }

    i {
        font-style: normal !important;
    }
</style>

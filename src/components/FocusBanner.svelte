<script>
    export let width = "560px";
    export let height = "280px";
    export let imageUrls = [];
    
    let currentIndex = 0;
    let isPaused = false;
    let autoPlayInterval;
    let overlayVisible = true;

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, 5000); // 5초마다 슬라이드 변경
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function nextSlide() {
        overlayVisible = false; // Overlay 숨기기
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % imageUrls.length;
            overlayVisible = true; // Overlay 다시 표시
        }, 200); // transition 시간에 맞게 설정
    }

    function prevSlide() {
        overlayVisible = false;
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
            overlayVisible = true;
        }, 200);
    }

    function togglePause() {
        isPaused = !isPaused;
    }

    startAutoPlay();
</script>

<section
    on:mouseenter={stopAutoPlay}
    on:mouseleave={startAutoPlay}
    style="--swiper-width: {width}; --swiper-height: {height};"
>
    {#if imageUrls.length > 0}
        <li
            class="swiper-slide swiper-slide-active"
            role="group"
            aria-label="{currentIndex + 1} / {imageUrls.length}"
            style="--swiper-background: url('{imageUrls[currentIndex]}');"
        >
            {#if height == "600px"}
                <a href="#"
                   class="swiper-overlay {overlayVisible ? 'visible' : ''}"></a>
            {/if}

            <p class="pay_ctrl">
                <a href="#" 
                   class="arrow_l swiper-button-prev" 
                   tabindex="0" 
                   role="button" 
                   aria-label="Previous slide"
                   on:click|preventDefault={prevSlide}>
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
                   on:click|preventDefault={nextSlide}>
                    <span class="icon next"></span>
                </a>

                <i class="pause" on:click={togglePause}>
                    {#if isPaused}
                        ||
                    {:else}
                        ▶
                    {/if}
                </i>
            </p>
        </li>
    {/if}
</section>

<style>
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
        gap: 7px;
        background: rgba(0, 0, 0, 0.7);
        padding: 9px 10px;
        font-size: 14px;
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
        content: "<";
        color: #bec5cc;
    }

    .arrow_r .icon::before {
        content: ">";
        color: #bec5cc;
    }

    .page_cnt {
        color: #bec5cc;
        font-size: 14px;
    }

    .swiper-pagination-current {
        color: #007aff;
    }

    .pause {
        cursor: pointer;
        font-size: 18px;
        padding: 2px 5px;
        border-radius: 5px;
        color: #007aff;
    }
</style>

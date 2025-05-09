<script>
    import { onMount, tick } from "svelte";

    export let bannerRef;
    export let isHovered;

    let currentIndex = 0;
    let slideLength  = 0;
    let SLIDE_TERM   = 0;
    let progress     = 0;
    let autoplayInterval;

    const TICK = 10;
    let   PROGRESS_INCREMENT;

    onMount(async () => {
        await tick(); // DOM과 바인딩 완료를 기다림
        if (bannerRef) {
            slideLength        = bannerRef.getSlideLength();
            SLIDE_TERM         = bannerRef.getSlideTerm();
            PROGRESS_INCREMENT = 100 / (SLIDE_TERM / TICK);
        }

        startAutoProgress();
    });


    function handlePrev() {
        progress = 0;
        bannerRef.prevSlide();
        currentIndex = (currentIndex - 1 + slideLength) % slideLength;
        return;
    }

    function handleNext() {
        progress = 0;
        bannerRef.nextSlide();
        currentIndex = (currentIndex + 1) % slideLength;
        return;
    }

    function startAutoProgress() {
        autoplayInterval = setInterval(() => {
            if (!isHovered) {
                progress += PROGRESS_INCREMENT;
                if (progress >= 100) {
                    progress = 0;
                    currentIndex = (currentIndex + 1) % slideLength;
                } 
            }
        }, TICK); // 10ms마다 진행 상태 업데이트
    }

    function handleMouseEnter() {
        bannerRef.stopAutoPlay();
        clearInterval(autoplayInterval);
    }

    function handleMouseLeave() {
        bannerRef.startAutoPlay();
        startAutoProgress(); 
    }
</script>


<div class="focus"
    on:mouseenter={ handleMouseEnter }
    on:mouseleave={ handleMouseLeave }
>
    <div class="focus_ctrl">
        <div class="swiper-button-prev" on:click={ handlePrev } tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-df3ec51c1d70d5df"></div>
        <div class="swiper-pagination swiper-pagination-custom swiper-pagination-horizontal">
            <span class="current">{ currentIndex + 1 }</span>
            <span class="divi"> /</span>
            <span class="total">{ slideLength }</span>
        </div>
        <div class="swiper-button-next" on:click={ handleNext } tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-df3ec51c1d70d5df"></div>
        <div class="pause { isHovered ? "play" : "" }"></div>
        <div class="autoplay-progress">
            <svg viewBox="0 0 100 10" style="--progress: { progress / 100 };">
                <line x1="0" y1="0" x2="207" y2="0"></line>
            </svg>
        </div>    
    </div>
</div>


<style lang="scss">
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.swiper-pagination {
    position: absolute;
    text-align: center;
    transform: translate3d(0px, 0px, 0px);
    z-index: 10;
    transition: opacity 0.3s;
}

.focus .focus_ctrl{display:flex;position:absolute;bottom:0;left:50%;padding:0;margin:0;margin-left:350px;width:227px;height:69px;background:rgba(0,0,0,.8);z-index:11;}
.focus .focus_ctrl .swiper-button-prev{position:absolute;left:10px; top:14px;margin:0;width:41px;height:41px;background:url('#{$DF_UI}/img/main/focus_prev.png') no-repeat;cursor:pointer;text-indent:-9999px }
.focus .focus_ctrl .swiper-button-next{position:absolute;left:120px;top:14px;margin:0;width:41px;height:41px;background:url('#{$DF_UI}/img/main/focus_next.png') no-repeat;cursor:pointer;text-indent:-9999px;}
.focus .focus_ctrl .swiper-pagination{display:flex;align-items:center;justify-content:center;left:51px;top:14px;width:70px;height:41px;color:#bec5cc;font-size:13px;text-align:center}
.focus .focus_ctrl .swiper-pagination span.divi{margin:0 3px}
.focus .focus_ctrl .current{color:#3392ff}
.focus .focus_ctrl .pause{position:absolute;right:16px;top:14px;margin:0;width:41px;height:41px;background:url('#{$DF_UI}/img/main/focus_play.png') no-repeat 0 -50px;text-indent:-9999px;}
.focus .focus_ctrl .pause.play{background-position-y:0}
.focus .focus_ctrl .autoplay-progress{position:absolute;left:10px;bottom:5px;z-index:10;width:207px;height:2px;background-color:rgba(0, 0, 0, 0.1);}
.focus .focus_ctrl .autoplay-progress svg{--progress:0;position:absolute;left:0;top:0;z-index:10;width:100%;stroke-width:1px;stroke:#3392ff;fill:none;stroke-dashoffset:calc(100 * (1 - var(--progress)));stroke-dasharray:100;}


.focus:hover .pause {
    background-position-y:0;
}
</style>
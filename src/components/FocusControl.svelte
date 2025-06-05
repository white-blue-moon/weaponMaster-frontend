<script>
    import { onMount, tick } from "svelte";

    export let bannerRef;
    export let progress = 0;
    export let currentIndex;

    export let isHovered;
    export let showMenu = true;

    let banners          = [];
    let ctrl_margin_left = "350px";

    onMount(async () => {
        await tick(); // DOM과 바인딩 완료를 기다림
        if (bannerRef) {
            banners = bannerRef.getBanners();
        }

        if(!showMenu) {
            ctrl_margin_left = "423px";
        }
    });

    function handlePrev() {
        bannerRef.prevSlide();
        return;
    }

    function handleNext() {
        bannerRef.nextSlide();
        return;
    }

    function handleMouseEnter() {
        bannerRef.stopAutoPlay();
        return;
    }

    function handleMouseLeave() {
        bannerRef.startAutoPlay();
        return;
    }

    let isOpen = false;

	function toggleBannerList() {
		isOpen = !isOpen;
        return;
	}

    function handleBannerListClick(index) {
        bannerRef.moveToSlide(index);
        return;
	}
</script>


<div class="focus">
    <div class="focus_ctrl"
        style="margin-left: { ctrl_margin_left };"
        on:mouseenter={ handleMouseEnter }
        on:mouseleave={ handleMouseLeave }
    >
        <div class="swiper-button-prev" on:click={ handlePrev } tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-df3ec51c1d70d5df"></div>
        <div class="swiper-pagination swiper-pagination-custom swiper-pagination-horizontal">
            <span class="current">{ currentIndex + 1 }</span>
            <span class="divi"> /</span>
            <span class="total">{ banners.length }</span>
        </div>
        <div class="swiper-button-next" on:click={ handleNext } tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-df3ec51c1d70d5df"></div>
        <div class="pause { isHovered ? "play" : "" }"></div>
        <div class="autoplay-progress">
            <svg viewBox="0 0 100 10" style="--progress: { progress / 100 };">
                <line x1="0" y1="0" x2="207" y2="0"></line>
            </svg>
        </div>    
    </div>

    {#if showMenu}
        <div class="bnr_lst">
            <a class="bnr_tot {isOpen ? 'open' : ''}" on:click={ toggleBannerList }></a>
            <div style="display: {isOpen ? 'block' : 'none'};">
                <p>
                    {#each banners as banner, index}
                        <a on:click={ () => handleBannerListClick(index) }>
                            { banner.imgComment }
                        </a>
                    {/each}
                </p>
            </div>
        </div>
    {/if}
</div>


<style lang="scss">
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

.swiper-pagination {
    position: absolute;
    text-align: center;
    transform: translate3d(0px, 0px, 0px);
    z-index: 10;
    transition: opacity 0.3s;
}

.focus .focus_ctrl{display:flex;position:absolute;bottom:0;left:50%;padding:0;margin:0;width:227px;height:69px;background:rgba(0,0,0,.8);z-index:11;}
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

.focus .bnr_lst {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: 350px;
    width: 300px;
    height: 550px;
}

.focus .bnr_lst .bnr_tot {
    z-index: 9;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 73px;
    height: 69px;
    cursor: pointer;
    background: #197cff url('#{$DF_UI}/img/main/bnr_menu.png') no-repeat center center;
}

.focus .bnr_lst .bnr_tot.open {
    background: #f2f4f6 url('#{$DF_UI}/img/main/bnr_menu_close.png') no-repeat center center;
}

.focus .bnr_lst div {
    z-index: 9;
    display: none;
    position: absolute;
    bottom: 69px;
    width: 300px;
    max-height: 381px;
    padding: 25px 10px 25px 20px;
    background: #f2f4f6;
}

.focus .bnr_lst div p {
    max-height: 331px;
    overflow-y: auto;
    overflow-x: hidden;
}

.focus .bnr_lst p a {
    position: relative;
    display: block;
    width: 240px;
    padding-left: 8px;
    border-bottom: 1px solid #e4e5ec;
    color: #6a6e76;
    line-height: 47px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.focus .bnr_lst p a::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #898c92;
}

.focus .bnr_lst p a:hover {
    color: #3392ff;
    cursor: pointer;
}

.focus .bnr_lst p a:last-child {
    border-bottom: none;
}

.focus .bnr_lst ::-webkit-scrollbar {
    width: 10px;
}

.focus .bnr_lst ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: #484e5f;
}

.focus .bnr_lst ::-webkit-scrollbar-track {
    background-color: #d2d4d6;
}
</style>
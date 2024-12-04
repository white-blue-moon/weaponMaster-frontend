<script>
    export let width = "560px"; // 기본값 설정
    export let height = "280px"; // 기본값 설정
</script>

<section>
    <li
        class="swiper-slide swiper-slide-active" 
        role="group"
        aria-label="2 / 15"
        data-swiper-slide-index="1"
        style="--swiper-width: {width}; --swiper-height: {height};"
    >
    </li>
    <p class="pay_ctrl">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="arrow_l swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-f6105f5d6ac27976c">prev</a>
        <i class="page_cnt swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal"><span class="swiper-pagination-current">1</span> / <span class="swiper-pagination-total">6</span></i>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="arrow_r swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-f6105f5d6ac27976c">next</a>
        <i class="pause"></i>
    </p>
</section>

<style>
  .swiper-slide {
    background: url('https://bbscdn.df.nexon.com/data6/commu/202411/0bdd08c0-b79a-9b8e-5cc9-6facb18d0077.jpg') 50% 0px no-repeat;
    background-size: cover;
    width: var(--swiper-width); /* CSS 변수로 값 설정 */
    height: var(--swiper-height); /* CSS 변수로 값 설정 */
    position: relative;
  }
</style>

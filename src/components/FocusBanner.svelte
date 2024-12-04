<script>
    export let width = "560px"; // 기본값 설정
    export let height = "280px"; // 기본값 설정

    let isPaused = false;

    function togglePause() {
        isPaused = !isPaused;
    }
</script>

<section>
    <!-- 슬라이드 -->
    <li
      class="swiper-slide swiper-slide-active" 
      role="group"
      aria-label="2 / 15"
      data-swiper-slide-index="1"
      style="--swiper-width: {width}; --swiper-height: {height};"
    >
      <!-- 컨트롤러 -->
      <p
        class="pay_ctrl"
        on:mouseenter={() => (isPaused = true)}
        on:mouseleave={() => (isPaused = false)}
      >
        <!-- 이전 버튼 -->
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="arrow_l swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide">
          <span class="icon prev"></span>
        </a>
  
        <!-- 페이지 정보 -->
        <i class="page_cnt swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
          <span class="swiper-pagination-current">1</span> / <span class="swiper-pagination-total">6</span>
        </i>
  
        <!-- 다음 버튼 -->
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="arrow_r swiper-button-next" tabindex="0" role="button" aria-label="Next slide">
          <span class="icon next"></span>
        </a>
  
        <!-- 일시정지/재생 버튼 -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <i class="pause" on:click={togglePause}>
          {#if isPaused}
            || <!-- 일시정지 상태 -->
          {:else}
            ▶ <!-- 재생 상태 -->
          {/if}
        </i>
      </p>
    </li>
  </section>
  

<style>
/* 슬라이드 스타일 */
.swiper-slide {
  background: url('https://bbscdn.df.nexon.com/data6/commu/202411/0bdd08c0-b79a-9b8e-5cc9-6facb18d0077.jpg') 50% 0px no-repeat;
  background-size: cover;
  width: var(--swiper-width);
  height: var(--swiper-height);
  position: relative; /* 컨트롤러 배치를 위해 relative 유지 */
  overflow: hidden;
}

/* 컨트롤러 스타일 */
.pay_ctrl {
    font-family: Arial, sans-serif;
    position: absolute;
    bottom: 0; /* 슬라이드 내부 하단 여백 */
    right: 0; /* 슬라이드 내부 우측 여백 */
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(0, 0, 0, 0.7); /* 반투명 배경 */
    padding: 9px 10px;
    font-size: 14px;
    z-index: 10; /* 슬라이드 위에 배치 */
    margin-bottom: 0;
}

/* 화살표 버튼 스타일 */
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

/* 페이지 정보 스타일 */
.page_cnt {
  color: #bec5cc;
  font-size: 14px;
}

.swiper-pagination-current {
    color: #007aff;
}

/* 일시정지/재생 버튼 */
.pause {
  cursor: pointer;
  font-size: 18px;
  padding: 2px 5px;
  border-radius: 5px;
  color: #007aff;
}

</style>

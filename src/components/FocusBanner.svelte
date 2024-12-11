<script>
    export let width = "560px"; // 기본값 설정
    export let height = "280px"; // 기본값 설정
    export let imageUrls = []; // 서버로부터 받을 이미지 링크 배열
    
    let currentIndex = 0; // 현재 슬라이드 인덱스
    let isPaused = false; // 일시 정지 상태
    let autoPlayInterval; // 자동 재생을 위한 인터벌
  
    // 슬라이드 자동 재생
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
      currentIndex = (currentIndex + 1) % imageUrls.length;
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
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
        <!-- 컨트롤러 -->
        <p class="pay_ctrl">
          <!-- 이전 버튼 -->
          <a
            href="#"
            class="arrow_l swiper-button-prev"
            tabindex="0"
            role="button"
            aria-label="Previous slide"
            on:click|preventDefault={prevSlide}
          >
            <span class="icon prev"></span>
          </a>
  
          <!-- 페이지 정보 -->
          <i class="page_cnt swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
            <span class="swiper-pagination-current">{currentIndex + 1}</span> /
            <span class="swiper-pagination-total">{imageUrls.length}</span>
          </i>
  
          <!-- 다음 버튼 -->
          <a
            href="#"
            class="arrow_r swiper-button-next"
            tabindex="0"
            role="button"
            aria-label="Next slide"
            on:click|preventDefault={nextSlide}
          >
            <span class="icon next"></span>
          </a>
  
          <!-- 일시정지/재생 버튼 -->
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
    /* 슬라이드 스타일 */
    .swiper-slide {
      background: var(--swiper-background) 50% 0px no-repeat;
      background-size: cover;
      width: var(--swiper-width);
      height: var(--swiper-height);
      position: relative; /* 컨트롤러 배치를 위해 relative 유지 */
      overflow: hidden;
      list-style: none;
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
  
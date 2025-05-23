<script>
    import { DF_UI } from '../constants/resourcePath';
    import { CATEGORY_TYPE_TEXT } from '../constants/articles';
    import { getPagePath } from '../utils/page';

    export let articles = [];

    const ITEMS_PER_SLIDE  = 3; // 한 슬라이드에 보여지는 추천 게시물 개수
    let currentIndex       = 0;

    function prevSlide() {
        currentIndex -= ITEMS_PER_SLIDE;
        if (currentIndex < 0) {
            // 끝에서 루프
            const totalPages = Math.ceil(articles.length / ITEMS_PER_SLIDE);
            currentIndex     = (totalPages - 1) * ITEMS_PER_SLIDE;
        }
    }

    function nextSlide() {
        currentIndex += ITEMS_PER_SLIDE;
        if (currentIndex >= articles.length) {
            // 처음으로 루프
            currentIndex = 0;
        }
    }

    const DEFAULT_THUMBNAIL = `${DF_UI}/img/common/today_dnf_default.jpg`;

    function extractFirstImageSrc(html) {
        if (!html) {
            return null;
        }

        // 첫 번째 <img> 태그의 src 속성 값 추출 (대소문자 구분 X)
        const imgTagMatch = html.match(/<img\s+[^>]*src=["']([^"']+)["']/i);
        if (imgTagMatch) {
            return imgTagMatch[1];
        }

        return null;
    }

    function getThumbnailImg(article) {
        const firstImage = extractFirstImageSrc(article.contents);
        if (firstImage != null) {
            return firstImage;
        }

        return DEFAULT_THUMBNAIL;
    }

    $: visibleArticles = articles.slice(currentIndex, currentIndex + ITEMS_PER_SLIDE);
</script>


  
<section class="guide_rec">
  <article class="container">
    <h3>인기 게시물</h3>

    <!-- Navigation Buttons -->
    <div class="lst_control">
      <button class="arrow_l" on:click={ prevSlide }></button>
      <button class="arrow_r" on:click={ nextSlide }></button>
    </div>

    <div class="guide_rec_s">
      <!-- Slides -->
      <ul class="slides">
        {#each visibleArticles as article}
          <li class="slide">
            <a href={ getPagePath(article) }>
              <div class="image-wrapper">
                <img src={ getThumbnailImg(article) } alt={ article.title } />
              </div>
              <span class="category">{ CATEGORY_TYPE_TEXT[article.categoryType] }</span>
              <div class="info">
                <h4 class="title">{ article.title }</h4>
                <p class="author">{ article.userId }</p>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </article>
</section>
  
  
<style lang="scss">
.guide_rec {
  width: 100%;
}

.container {
  position: relative; /* lst_control과 제목의 위치 설정을 위해 relative 추가 */
}

.guide_rec h3 {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  display: inline-block; /* 버튼과 수평 정렬 위해 inline-block 설정 */
  margin-bottom: 10px;
}

.guide_rec_s {
  position: relative; /* lst_control 위치 조정을 위해 relative 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lst_control {
  position: absolute;
  margin-top: 24px;
  top: 0; /* 제목과 같은 높이에 위치 */
  right: 0; /* 오른쪽 끝에 위치 */
  display: flex;
}

.arrow_l {
  background: url(#{$DF_UI}/img/main/lst_arrow_l.png) no-repeat;
}

.arrow_r {
  background: url(#{$DF_UI}/img/main/lst_arrow_r.png) no-repeat;
}

.arrow_l,
.arrow_r {
  width: 30px;
  height: 40px;
  border: none;
  margin: 0;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;
}

.slides {
  display: flex;
  justify-content: space-between; /* 맨 왼쪽과 맨 오른쪽 슬라이드를 끝에 배치 */
  width: 100%;
  padding: 0;
  list-style: none;
}

.slide {
  gap: 20px; /* 슬라이드 간 간격 */
  width: 420px;
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}

.slide a {
  text-decoration: none; /* 밑줄 제거 */
}

.image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden; /* 이미지가 확대될 때 컨테이너를 벗어나지 않도록 설정 */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease; /* 부드러운 확대 효과 */
}

/* 마우스를 올렸을 때 이미지 확대 */
.slide:hover .image-wrapper img {
  transform: scale(1.1); /* 이미지 확대 */
}

.category {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2eaf00;
  color: #fff;
  width: 120px;
  height: 44px;
  margin: -22px auto 10px; /* 상단 위치를 이미지 끝에서 카테고리 중앙까지 이동 */
  border-radius: 3px;
  font-size: 0.9em;
  text-align: center;
  position: relative;
  z-index: 1; /* 이미지 위에 카테고리가 나타나도록 */
}

.info {
  padding: 10px;
  display: flex; /* 추가: Flexbox 적용 */
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  text-align: center; /* 텍스트 가로 중앙 정렬 */
  margin-top: 20px;
}

.title {
  font-size: 1em;
  margin: 0;
  font-weight: 450;
  color: #36393f;
}

.author {
  font-size: 0.9em;
  margin-top: 8px;
  margin-bottom: 16px;
  color: #a2a5ac;
}

</style>
  
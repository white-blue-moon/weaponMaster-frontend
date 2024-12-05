<script>
    // 필요한 경우 데이터 배열로 컨텐츠를 관리할 수 있습니다.
    const slides = [
      {
        img: "//bbscdn.df.nexon.com/data7/commu/202411/11ac10dd-6bbb-2f74-67a8-b862ff51aa4a.jpg",
        category: "커뮤니티",
        title: "던파온 어플에서 칭호.오라.크리쳐 받으세요",
        author: "뮤생",
      },
      {
        img: "https://bbscdn.df.nexon.com/data6/commu/202407/e6ecdd25-e6df-5193-df27-ce5e4d7c3e59.jpg",
        category: "가이드",
        title: "성장이벤트 이후 뉴비 공략",
        author: "모험가 공략 (Sanso)",
      },
      {
        img: "//bbscdn.df.nexon.com/data7/commu/202411/642d0b07-f939-b8d4-68b5-7acfb975bb22.png",
        category: "커뮤니티",
        title:
          "트래블러 랭킹 3위가 알려주는 초 심화공략(feat.별빛하울링), 전직업 완벽공략 프로젝트 5편!",
        author: "관훈",
      },
    ];
  </script>
  
  <section class="guide_rec">
    <article class="container">
      <h3>가이드 <i>&amp;</i> 추천글</h3>

      <!-- Navigation Buttons -->
      <div class="lst_control">
        <button class="arrow_l">&lt;</button>
        <button class="arrow_r">&gt;</button>
      </div>
  
      <div class="guide_rec_s">
        <!-- Slides -->
        <ul class="slides">
          {#each slides as slide}
            <li class="slide">
              <a href="/">
                <div class="image-wrapper">
                  <img src={slide.img} alt={slide.title} />
                  <span class="category">{slide.category}</span>
                </div>
                <div class="info">
                  <h4 class="title">{slide.title}</h4>
                  <p class="author">{slide.author}</p>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </article>
  </section>
  
<style>
.guide_rec {
  font-family: Arial, sans-serif;
  width: 100%;
}

.container {
  position: relative; /* lst_control과 제목의 위치 설정을 위해 relative 추가 */
}

.guide_rec h3 {
  font-size: 1.5em;
  display: inline-block; /* 버튼과 수평 정렬 위해 inline-block 설정 */
  margin: 0;
}

.guide_rec_s {
  position: relative; /* lst_control 위치 조정을 위해 relative 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lst_control {
  position: absolute;
  top: 0; /* 제목과 같은 높이에 위치 */
  right: 0; /* 오른쪽 끝에 위치 */
  display: flex;
}

.arrow_l,
.arrow_r {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;
}

.arrow_l:hover,
.arrow_r:hover {
  color: #007aff; /* 호버 시 강조 색상 */
}

.slides {
  display: flex;
  justify-content: space-between; /* 맨 왼쪽과 맨 오른쪽 슬라이드를 끝에 배치 */
  width: 100%;
  padding: 0;
  list-style: none;
  overflow-x: hidden; /* 슬라이드가 컨테이너를 벗어나지 않도록 설정 */
}

.slide {
  gap: 20px; /* 슬라이드 간 간격 */
  width: 420px;
  border: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #28a745;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: bold;
}

.info {
  padding: 10px;
}

.title {
  font-size: 1em;
  margin: 0;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.author {
  font-size: 0.9em;
  color: #555;
}
</style>
  
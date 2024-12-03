<script>
    // TODO
</script>
  
<section>
    <li class="swiper-slide swiper-slide-active" 
        role="group" aria-label="2 / 15" data-swiper-slide-index="1">
        <a href="/" class="overlay-link"> </a>
    </li>
</section>

<!-- 출력을 위한 임시 스타일 세팅, 추후 수정 필요 -->
<style>
  /* li 태그 스타일 설정 */
  .swiper-slide {
    background: url('https://bbscdn.df.nexon.com/data6/commu/202411/0bdd08c0-b79a-9b8e-5cc9-6facb18d0077.jpg') 50% 0px no-repeat;
    background-size: contain;
    width: 100%;
    height: 400px;
    position: relative; /* li를 relative로 설정 */
  }

  /* a 태그 스타일 설정 */
  .overlay-link {
    background: url('https://bbscdn.df.nexon.com/data6/commu/202411/853af6d8-f14e-232b-4bc6-415ab5986aab.png') no-repeat center center;
    background-size: contain; /* 이미지 크기를 내용에 맞게 조정 */
    position: absolute; /* a 태그를 절대 위치로 설정 */
    top: 40%; /* li 태그의 세로 가운데에 위치 */
    left: 50%; /* li 태그의 가로 가운데에 위치 */
    transform: translate(-50%, -50%); /* 정확한 중앙 정렬을 위해 translate 사용 */
    width: 100%; /* 원하는 크기만큼 조정 */
    height: 100%; /* 원하는 크기만큼 조정 */
    z-index: 1; /* a 태그가 li의 배경 위에 겹치게 설정 */
  }
</style>

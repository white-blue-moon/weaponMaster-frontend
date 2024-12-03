<script>
  // TODO
</script>

<section>
  <nav>
    <ul class="main-menu">
      <li><a href="/"><img src="https://resource.df.nexon.com/ui/img/common/logo.png" alt="Dungeon & Fighter"></a></li>
      <li><a href="/">새소식</a></li>
      <li><a href="/">사이트소개</a></li>
      <li><a href="/">가이드</a></li>
      <li><a href="/">커뮤니티</a></li>
      <li><a href="/">서비스센터</a></li>
    </ul>

    <div class="submenu">
      <div class="empty"></div> <!-- 홈 밑은 비워둠 -->
      <div>
        <a href="/notice/list">공지사항</a>
        <a href="/update/list">업데이트</a>
        <a href="/event/list">이벤트</a>
        <a href="/devnote/list">개발자노트</a>
      </div>
      <div>
        <a href="/pg/aboutPurpose">페이지 용도</a>
      </div>
      <div>
        <a href="/guide">제작가이드</a>
      </div>
      <div>
        <a href="/community/question">질문</a>
        <a href="/community/talk">수다</a>
      </div>
      <div>
        <a href="/customer/faq">FAQ</a>
        <a href="/customer/personalQuestion">1:1문의</a>
      </div>
    </div>
  </nav>
</section>

<style>
  nav {
    background-color: #222;
    padding: 4px 0px 0px;
    position: relative;
  }

  .main-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: space-between;
    align-items: center;
  }

  .main-menu li {
    position: relative;
    text-align: center;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-menu a {
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 5px 10px;
  }

  .main-menu a:hover {
    text-decoration: underline;
  }

  .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #333;
    border-top: 1px solid #444;
    padding: 10px 0;
  }

  nav:hover .submenu {
    display: flex;
    justify-content: space-between;
  }

  .submenu .empty {
    visibility: hidden; /* 보이지 않게 처리 */
  }

  .submenu div {
    flex: 1; /* 메인 메뉴 항목과 동일한 너비 */
    display: flex;
    flex-direction: column; /* 메뉴를 세로로 정렬 */
    align-items: center; /* 텍스트를 가로로 중앙 정렬 */
    text-align: center;
  }

  .submenu a {
    color: white;
    text-decoration: none;
    margin: 5px 0; /* 각 링크 간격 추가 */
  }

  .submenu a:hover {
    text-decoration: underline;
  }
</style>

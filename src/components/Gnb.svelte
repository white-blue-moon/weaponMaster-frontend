<section>
  <nav>
    <ul class="main-menu">
      <li><a class="logo" href="/"><img src="https://resource.df.nexon.com/ui/img/common/logo.png" alt="Dungeon & Fighter"></a></li>
      <li><a href="/">새소식</a></li>
      <li><a href="/">사이트소개</a></li>
      <li><a href="/">가이드</a></li>
      <li><a href="/">커뮤니티</a></li>
      <li><a href="/">서비스센터</a></li>
      <li> <!-- 빈 영역 --> </li>
      <li> <!-- 빈 영역 --> </li>
      <li> <!-- 빈 영역 --> </li>
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
      <div>
        <!-- 빈 영역 아래 비워둠 -->
      </div>
      <div>
        <!-- 로그인 밑은 비워둠 -->
      </div>
      <div>
        <!-- GAME INFO 밑은 비워둠 -->
      </div>
    </div>
  </nav>

  <div class="gameTab">
    <div class="login">
      <a href="#" class="go_login" id="webGnbMyBtn">
        로그인
      </a>
    </div>
    <div class="gameInfo">
      <a id="gameInfo" href="#">
        <b>GAME INFO</b>
      </a>
    </div>  
  </div>

</section>

<style>
  nav {
    background-color: rgba(0,0,0,.5);
    position: relative;
    height: 100px;
  }

  nav:hover {
    background-color: #22252d; /* 배경색 설정 */
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

  /* 기본 메인 메뉴 텍스트 색상 */
  .main-menu a {
    color: white; /* 기본 색상 */
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
  }

  .main-menu .logo {
    margin-top: 7px;
  }

  /* 기본 서브 메뉴 텍스트 색상 */
  .submenu a {
    color: white; /* 기본 색상 */
    text-decoration: none;
    margin: 5px 0;
  }

  /* nav:hover 상태에서 모든 텍스트는 기본적으로 #898c92 */
  nav:hover .main-menu a,
  nav:hover .submenu a {
    color: #898c92;
  }

  /* 마우스가 올라가 있는 항목만 흰색으로 변경 */
  .main-menu a:hover, 
  .submenu a:hover {
    color: white !important;; /* 강조 색상 (강제 적용 -> 우선순위 높임) */
    text-decoration: none; /* 밑줄 제거 */
  }

  .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #22252d;
    border-top: 0.5px solid #444;
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

  .gameTab {
    display: flex;
    position: absolute; /* 위치를 절대값으로 설정 */
    top: 0; /* nav의 상단에 맞춤 */
    right: 0; /* nav의 우측 끝에 맞춤 */
    z-index: 10; /* 다른 요소 위에 출력되도록 설정 */
  }

  .login {
    background-color: #303544;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 100px;
  }

  .login a {
    color: white;
    font-size: 16px;
    text-decoration: none;
  }

  .gameInfo {
    background: url('/images/game_info.gif') no-repeat center center;
    background-size: 100%; /* 초기 배경 크기 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 100px;
    overflow: hidden; /* 확대된 배경이 영역을 넘지 않도록 */
    position: relative;
    transition: background-size 0.3s ease-in-out; /* 배경 확대 부드럽게 */
  }

  .gameInfo a {
    text-decoration: none;
  }

  .gameInfo a b {
    font-family: 'DNFForgedBlade'; /* 던파 공식 홈페이지 폰트 */
    color: white;
    font-size: 27px;
    font-weight: 599;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* X, Y, 흐림 정도, 색상 */
    display: inline-block; /* transform 적용이 가능하도록 변경 */
    transition: transform 0.3s ease-in-out; /* 텍스트 축소 부드럽게 */
  }

  .gameInfo:hover {
    background-size: 110%; /* 배경 이미지를 확대 */
  }

  .gameInfo:hover a b {
    transform: scale(0.9); /* 텍스트 축소 */
  }
</style>
<script>
  import { PATHS } from '../constants/paths';
  import { userInfo, isLoggedIn, handleLogout } from "../utils/auth";

  import GameInfoPopUp from './GameInfoPopUp.svelte';

  
  let isLoginAreaVisible = false;
  let isGameInfoPopUpVisible = false;

  function toggleLogin() {
    isLoginAreaVisible = !isLoginAreaVisible;
  }

  function showGameInfoPopUp() {
    isGameInfoPopUpVisible = true;
  }

  function closeGameInfoPopUp() {
    isGameInfoPopUpVisible= false;
  }
</script>

<section class="gnb">
  <nav>
    <ul class="main-menu">
      <li><a class="logo" href={ PATHS.HOME }><img src="images/logo.png" alt="Dungeon & Fighter"></a></li>
      <li><a href={ PATHS.NEWS.NOTICE.LIST }>새소식</a></li>
      <li><a href={ PATHS.INTRODUCE.PURPOSE }>사이트소개</a></li>
      <li><a href={ PATHS.GUIDE.HOW_TO_USE }>가이드</a></li>
      <li><a href={ PATHS.COMMUNITY.ALL.LIST }>커뮤니티</a></li>
      <li><a href={ PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST }>서비스센터</a></li>
      <li> <!-- 공간 확보를 위해 비워둠 --> </li>
      <li> <!-- 공간 확보를 위해 비워둠 --> </li>
      <li> <!-- 공간 확보를 위해 비워둠 --> </li>
    </ul>

    <div class="submenu">
      <div><!-- 로고 밑 비워둠 --></div> 
      <div>
        <a href={ PATHS.NEWS.NOTICE.LIST }>공지사항</a>
        <a href={ PATHS.NEWS.UPDATE.LIST }>업데이트</a>
        <a href={ PATHS.NEWS.DEV_NOTE.LIST }>개발자노트</a>
      </div>
      <div>
        <a href={ PATHS.INTRODUCE.PURPOSE }>홈페이지 용도</a>
      </div>
      <div>
        <a href={ PATHS.GUIDE.HOW_TO_USE }>홈페이지 가이드</a>
      </div>
      <div>
        <a href={ PATHS.COMMUNITY.ALL.LIST }>전체</a>
        <a href={ PATHS.COMMUNITY.ASK.LIST }>질문</a>
        <a href={ PATHS.COMMUNITY.TALK.LIST }>수다</a>
      </div>
      <div>
        <a href={ PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST }>1:1문의</a>
      </div>
      <div><!-- 공간 확보를 위해 비워둠 --></div>
      <div><!-- 로그인 밑 비워둠 --></div>
      <div><!-- GAME INFO 밑 비워둠 --></div>
    </div>
  </nav>

  <div class="gameTab">
    <!-- 로그인 버튼 -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="login" on:click={ toggleLogin } class:is-active={ isLoginAreaVisible }>
      <a href="#" class="go_login" id="webGnbMyBtn">
        {#if !isLoginAreaVisible}
          {#if !$isLoggedIn}
            로그인
          {:else}
            MY
          {/if}
        {/if}
      </a>
    
      <!-- 확장된 로그인 영역 -->
      {#if isLoginAreaVisible}
        <div class="login_area">
          <ul>
            {#if !$isLoggedIn}
              <li class="btn_before">
                <a href={ PATHS.ACCOUNT.LOGIN_ADMIN }>관리자모드 로그인</a>
                <a href={ PATHS.ACCOUNT.LOGIN } class="blue">일반모드 로그인</a>
              </li>
              
              <li class="txt_before">
                <a href={ PATHS.ACCOUNT.JOIN }>처음 오셨나요? 회원가입</a>
              </li>
            {/if}

            {#if $isLoggedIn}
              <li class="user_after">
                <div class="user_text">
                  <span class="userId">{ $userInfo }</span>
                  <span>님 안녕하세요</span>
                  <!-- TODO 일반/관리자 모드에 따른 아이콘 추가하기 -->
                </div>
                <a href="#" class="blue" on:click={ handleLogout }>로그아웃</a>
              </li>
            {/if}
          </ul>
        </div>
      {/if}
    </div>

    <!-- GAME INFO -->
    <article class="gameinfo">
      <a id="gameinfo" on:click={ showGameInfoPopUp }>
          <span></span>
          <b>GAME INFO</b>
      </a>
    </article>
  </div>
</section>

{#if isGameInfoPopUpVisible}
  <GameInfoPopUp on:close={ closeGameInfoPopUp }/>
{/if}


<style lang="scss">
  .gnb {
    position: relative;
    z-index: 2; /* Banner보다 위에 위치하도록 설정 */
  }

  nav {
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    height: 100px;
  }

  nav:hover {
    background-color: #22252d;
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
    color: white; /* 기본 텍스트 색상 */
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
  }

  .main-menu .logo {
    margin-top: 7px;
  }

  .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #22252d;
    border-top: 0.5px solid #444;
  }

  .submenu div {
    flex: 1; /* 메인 메뉴 항목과 동일한 너비 */
    display: flex;
    flex-direction: column; /* 메뉴를 세로로 정렬 */
    align-items: center; /* 텍스트를 중앙 정렬 */
    text-align: center;
    padding: 24px 0 29px 0;
  }

  .submenu a {
    position: relative;
    display: block;
    padding: 0;
    height: inherit;
    color: #898c92; /* 기본 텍스트 색상 */
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
  }

  nav:hover .submenu {
    display: flex;
    justify-content: space-between;
  }

  nav:hover .main-menu a,
  nav:hover .submenu a {
    color: #898c92; /* 기본 텍스트 색상 */
  }

  .main-menu a:hover,
  .submenu a:hover {
    color: white !important; /* 강조 텍스트 색상 */
    text-decoration: none; /* 밑줄 제거 */
  }

  .gnb nav ul li div {
    display: none;
    position: relative;
    padding: 24px 0 29px 0;
  }

  /* ================================== */
  /* 로그인, GAME INFO 영역 */
  /* ================================== */

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

  .login:hover {
    cursor: pointer;
  }

  .login a {
    color: white;
    font-size: 16px;
    text-decoration: none;
  }

  /* 활성화된 상태 (배경 이미지 적용 및 텍스트 숨김) */
  .login.is-active {
    background: #f2f4f6 url("#{$DF_UI}/img/btn/btn_login_x.png") no-repeat 40px 35px;
  }

  /* 활성화된 상태에서는 a 태그 안의 텍스트 숨김 */
  .login.is-active .go_login {
    visibility: hidden; /* 텍스트 숨김 */
  }

  .login_area {
    position: absolute;
    top: 100px; /* nav 높이 아래에 위치 */
    right: 0;
    width: 370px;
    background-color: #f2f4f6;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 20;
  }

  .login_area ul {
    list-style: none;
    padding-left: 35px;
    padding-right: 35px;
  }

  /* 확장된 로그인 영역 내부 요소 스타일 */
  .login_area a {
    display: block;
    text-decoration: none;
    color: white;
    margin: 10px 0;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }

  .btn_before {
    display: flex;
    padding: 0;
  }

  .btn_before a {
    flex: 1; /* 버튼이 동일한 너비를 가지도록 설정 */
    background-color: #484e5f; /* 기본 배경색 */
    line-height: 52px;
    text-align: center;
    color: white;
    text-decoration: none;
  }

  .btn_before .blue {
    background-color: #3392ff; /* 던파ID 로그인 버튼 색상 */
  }

  .gameinfo {
      top: 0;
      right: 0;
      width: 260px;
      height: 100px;
      z-index: 900;
      overflow: hidden;
  }

  .gameinfo span {
      transition: .5s;
      display: block;
      animation: gameinfo 5s steps(150) infinite;
      width: 260px;
      height: 100px;
      background: url("#{$DF_UI}/img/common/gamestart_ani3.jpg");
      background-position: 0 0;
      background-size: cover;
      transition: transform 0.3s ease-in-out; /* 배경 확대 부드럽게 */
  }

  /* 버튼 배경 애니메이션 @keyframes 정의 */
  @keyframes gameinfo {
    100% {
        background-position: 0 -15000px;
    }
  }

  .gameinfo:hover span {
    transform: scale(1.1); /* 배경 이미지를 확대 */
  }

  .gameinfo b {
      transition: .5s;
      display: block;
      position: absolute;
      left: 1;
      top: 0;
      width: 260px;
      color: #fff;
      font-size: 27px;
      font-weight: 700;
      font-family: 'DNFForgedBlade';
      z-index: 100;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      cursor: pointer;
      text-align: center;
      line-height: 100px;
      transition: transform 0.3s ease-in-out; /* 텍스트 축소 부드럽게 */
  }

  .gameinfo:hover b {
    transform: scale(0.89); /* 텍스트 축소 */
  }

  /* ================================= */
  /* ========== 로그인 후 화면 ========== */
  
  .user_after .user_text {
    text-align: center;
  }

  .user_after .user_text .userId {
    color: #616163;
  }

  .user_after .blue {
    background-color: #3392ff;
    line-height: 30px;
  }

  /* 회원가입 링크 스타일 */
  .txt_before a {
    margin-top: 5px;
    color: #36393f;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    line-height: 24px;
  }

</style>
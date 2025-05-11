<script>
  import { PATHS } from '../constants/paths';
  import { userInfo, isLoggedIn, handleLogout, isAdmin } from "../utils/auth";
  import { API } from '../constants/api';
  import { apiFetch, handleApiError } from '../utils/apiFetch';
  import { onMount } from "svelte";

  import SideMenu from './SideMenu.svelte';


  let publisherLogo;
  let isMenuOpen = false;
  
  onMount(async () => {
        const response = await apiFetch(API.LOGO.PUBLISHER, {
            method: "GET",
        }).catch(handleApiError);

        if (response.success) {
            publisherLogo = response.data
        }
  });
</script>

<div class="header">
  <div class="gnb-publisher-menu">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click={ () => isMenuOpen = true }>
      <span class="menuIcon"></span> 
      <span class="menuText">메뉴</span>
    </a>
  </div>

  <SideMenu isOpen={ isMenuOpen } onClose={ () => isMenuOpen = false } />
  
  <a class="logo" href={ PATHS.HOME }>
    {#if publisherLogo}
      <img src={ publisherLogo.imgUrl } alt={ publisherLogo.alt }>
    {/if}
  </a>
  
  <div class="actions">
    {#if $isLoggedIn}
      <span class="loginInfo">
        <!-- 유저 타입에 따라 다른 아이콘 출력되도록 하기 -->
        {#if $isAdmin}
          <span style="margin-right: 10px;">ADMIN MODE</span>
        {/if}
        <span class="platform-icon padding-2px platform-icon-nexon gnbText"></span>
        <span class="nickname gnbText">{ $userInfo }</span>
      </span>
      <a class="logout" href="#" on:click={ handleLogout }>로그아웃</a>
    {:else}
      <a class="join"  href={ PATHS.ACCOUNT.JOIN }>회원가입</a>
      <a class="login" href={ PATHS.ACCOUNT.LOGIN }>로그인</a>
    {/if}
  </div>
</div>

<style>
  .header {
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: space-between; /* 로고와 버튼 간 공간 분리 */
    position: relative;
    height: 63px; /* 헤더 높이 설정 */
    padding: 0 23px; /* 양쪽 여백 추가 */
  }

  .menuIcon {
    display: inline-block;
    width: 18px;
    height: 16px;
    margin: 1px 11px 0 0;
    background: url('https://rs.nxfs.nexon.com/gnb/images/set_gnb.png') 0px 0px; /* x축 이동, y축 이동 (이미지 리스트 중 좌표 위치로 이미지 선택) */
    background-color: #000;
  }

  .menuText {
    padding-top: 1px;
  }

  .gnb-publisher-menu {
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 21px 0px 21px 0px;
  }

  .gnb-publisher-menu a {
    display: flex; /* 아이콘과 텍스트를 수평으로 배치 */
    align-items: center; /* 아이콘과 텍스트 수직 가운데 정렬 */
    color: #000; /* 기본 텍스트 색상 */
    text-decoration: none; /* 기본 밑줄 제거 */
    font-family: NEXON Gothic; /* 넥슨 공식 폰트 스타일 */
    font-size: 16px;
  }

  .gnb-publisher-menu:hover .menuIcon {
    background-color: #007aff;
    transition: background-color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
  }

  .gnb-publisher-menu:hover .menuText {
    color: #007aff;
    transition: color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 로고를 정확히 가운데 정렬 */
    cursor: pointer;
  }

  .actions {
    margin-left: auto; /* 버튼 그룹을 오른쪽으로 밀기 */
    display: flex;
    align-items: center;
    gap: 15px; /* 버튼 간 간격 */
  }

  .actions a {
    color: #000;
    text-decoration: none; /* 링크의 밑줄 제거 */
  }

  .actions .join {
    font-family: NEXON Gothic; /* 넥슨 공식 폰트 스타일 */
    font-size: 14px;
  }

  .actions .login, .actions .logout {
    font-family: NEXON Gothic Bold; /* 넥슨 공식 폰트 스타일 */
    font-size: 15px;
    padding: 7px;
    border: 2px solid #17191d;
    border-radius: 19px;
  }

  .actions .login:hover, .logout:hover {
    border: 2px solid #007aff;
    background-color: #007aff;
    color: white;
    transition: border-color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
    transition: background-color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
    transition: color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
  }

  .loginInfo {
    display: flex; /* 플렉스박스를 사용하여 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    gap: 8px; /* 아이콘과 닉네임 간 간격 */
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: top;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-text-size-adjust: none;
    touch-action: manipulation;
    letter-spacing: normal;
  }

  .platform-icon-nexon {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: transparent url(images/img_logo.png) 0 0 no-repeat;
    background-size: contain; /* 아이콘이 컨테이너 크기에 맞게 조정되도록 설정 */
  }

  .nickname {
    font-size: 14px; /* 닉네임 텍스트 크기 */
    font-weight: 400; /* 텍스트 두께 */
    color: #000; /* 닉네임 색상 */
    line-height: 1.2; /* 닉네임 텍스트 높이 */
  }

</style>

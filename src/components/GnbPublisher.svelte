<script>
  // TODO
</script>

<div class="header">
  <div class="gnb-publisher-menu">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" opt="GLOBAL MENU (PUBLISHER)">
      <span class="menuIcon"></span> 
      <span class="menuText">메뉴</span>
    </a>
  </div>
  
  <div class="logo">
    <img src="https://rs.nxfs.nexon.com/bannerusr/24/3/fvfQ21143034203.gif" alt="Logo">
  </div>
  
  <div class="actions">
    <a class="join" href="/join">회원가입</a>
    <a class="login" href="/login">로그인</a>
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

  .actions .login {
    font-family: NEXON Gothic Bold; /* 넥슨 공식 폰트 스타일 */
    font-size: 15px;
    padding: 7px;
    border: 2px solid #17191d;
    border-radius: 19px;
  }

  .actions .login:hover {
    border: 2px solid #007aff;
    background-color: #007aff;
    color: white;
    transition: border-color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
    transition: background-color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
    transition: color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
  }

</style>

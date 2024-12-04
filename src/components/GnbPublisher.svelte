<script>
  // TODO
</script>

<div class="header">
  <div class="gnb-publisher-menu">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" opt="GLOBAL MENU (PUBLISHER)">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="5 0 50 50">
        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
      </svg>
      <span>메뉴</span>
    </a>
  </div>
  
  <div class="logo">
    <img src="https://rs.nxfs.nexon.com/bannerusr/24/3/fvfQ21143034203.gif" alt="Logo">
  </div>
  
  <div class="actions">
    <a href="/join">회원가입</a>
    <a href="/login">로그인</a>
  </div>
</div>

<style>
  .header {
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: space-between; /* 로고와 버튼 간 공간 분리 */
    position: relative;
    height: 63px; /* 헤더 높이 설정 */
    padding: 0 20px; /* 양쪽 여백 추가 */
  }

  .gnb-publisher-menu {
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
  }

  .gnb-publisher-menu a {
    display: flex; /* 아이콘과 텍스트를 수평으로 배치 */
    align-items: center; /* 아이콘과 텍스트 수직 가운데 정렬 */
    color: #000; /* 기본 텍스트 색상 */
    text-decoration: none; /* 기본 밑줄 제거 */
    transition: color 0.3s ease; /* 색상 변화에 부드러운 전환 효과 추가 */
  }

  .gnb-publisher-menu a svg {
    margin-right: 8px; /* 아이콘과 텍스트 간의 간격 */
    fill: #000; /* 아이콘 기본 색상 */
    stroke: #000; /* 아이콘의 윤곽선 색상 */
    stroke-width: 1.5; /* 아이콘의 윤곽선 두께 */
    transition: fill 0.3s ease, stroke 0.3s ease; /* 아이콘 색상과 두께 변화에 부드러운 전환 효과 추가 */
  }

  .gnb-publisher-menu a:hover {
    color: #007aff; /* 텍스트가 파란색으로 변경 */
  }

  .gnb-publisher-menu a:hover svg {
    fill: #007aff; /* 아이콘이 파란색으로 변경 */
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* 로고를 정확히 가운데 정렬 */
  }

  .actions {
    margin-left: auto; /* 버튼 그룹을 오른쪽으로 밀기 */
    display: flex;
    gap: 15px; /* 버튼 간 간격 */
  }

  .actions a {
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: #000; /* 텍스트 색상 */
    font-weight: bold;
  }

  .actions a:hover {
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
</style>

<script>
  // TODO
</script>

<div class="header">
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
    height: 100px; /* 헤더 높이 설정 */
    padding: 0 20px; /* 양쪽 여백 추가 */
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

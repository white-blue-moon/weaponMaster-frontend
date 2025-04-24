<script>
    // TODO
    export let showBorderTop = false;
</script>
  
<footer class="{ showBorderTop? "show-border-top" : ""}">
  <p>이 홈페이지는 던전앤파이터 공식 홈페이지를 참고하여 제작되었으며, 비상업적 포트폴리오 제출용으로 사용되었습니다.<br>원저작권은 NEOPLE Inc. 및 NEXON Korea Corporation에 있습니다.</p>
  <li class="flogo">
    <a href="https://www.nexon.com/Home/Game" target="_blank"><img src="/images/logo_blue_moon_img.png" alt="넥슨"></a>
    <a href="https://www.neople.co.kr/" target="_blank"><img class="logo_admin" src="/images/logo_admin_tool.png" alt="네오플"></a>
    <a href="http://developers.neople.co.kr" target="_blank"><img src="/images/neople_openAPI_logo.png" alt="Neople 오픈 API" /></a>
  </li>
</footer>
  
<style>
    footer {
      list-style: none;
      height: 170px;
      color: #a2a5ac;
      text-align: center;
      font-size: 13px;
      line-height: 24px;
      padding: 20px;
    }

    footer.show-border-top {
      border-top: 1px solid #e4e4e4;
    }

    .flogo a {
      margin: 0 12px; /* 좌우로 간격 설정 */
    }

    .logo_admin {
      padding-bottom: 10px;
    }
</style>
  
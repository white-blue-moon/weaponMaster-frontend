<script>
    import { PATHS } from "../constants/paths";
    
    import BoldLink from "./BoldLink.svelte";


    export let showBorderTop = false;
    export let padding_top   = "20px";
</script>
  
<footer 
  class="{ showBorderTop? "show-border-top" : ""}"
  style="padding-top: { padding_top };"
>
  <p>
    이 홈페이지는 <BoldLink href={ "https://df.nexon.com/" } text={ "던전앤파이터 공식 홈페이지" }/>를 참고하여 제작된 비상업적 개인 프로젝트입니다.<br />
    원저작권은 NEOPLE Inc. 및 NEXON Korea Corporation에 있으며,<br />
    본 사이트는 공식 제작물은 아닙니다.
  </p>
  <li class="flogo">
    <a target="_blank"><img src="/images/logo_blue_moon_img.png" alt="블루문"></a>
    <a href={ PATHS.ADMIN_TOOL } target="_blank"><img class="logo_admin" src="/images/logo_admin_tool.png" alt="어드민툴"></a>
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
  
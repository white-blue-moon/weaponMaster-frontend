<script>
  import { PATHS } from "../constants/paths";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<div class="ly_login_info ly1" id="loginLayer">
    <div class="ly_logbox"> 
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
         <!-- 부모 컴포넌트로 close 이벤트 전송 -->
        <a on:click={ () => dispatch("close") } id="closeLoginLayer2" class="ly_clse">닫기</a>
        <p class="txtarea">
            <span>로그인이 필요한 서비스입니다.
                <br>가입한 서비스 채널을 선택하여 로그인해주세요.
            </span>
        </p>
        <p class="btnarea">
            <a href={ PATHS.ACCOUNT.LOGIN } id="nexonLoginGo" class="btn btn_n">관리자모드 로그인</a>
            <a href={ PATHS.ACCOUNT.LOGIN } id="dnfLoginGo" class="btn btn_b">일반모드 로그인</a>
        </p> 
    </div>
</div>


<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    .ly_login_info {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        z-index: 999;
    }

    .ly_login_info .ly_logbox {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -155px 0 0 -300px;
        padding: 40px;
        width: 600px;
        height: 310px;
        background: #fff;
    }

    .ly_login_info .ly_logbox a.ly_clse {
        position: absolute;
        right: 14px;
        top: 15px;
        width: 18px;
        height: 18px;
        background: url('#{$DF_UI}/img/login/ly_clse.png') no-repeat;
        text-indent: -9999px;
        cursor: pointer;
    }

    .ly_login_info .txtarea {
        display: table;
        width: 520px;
        height: 140px;
        border: 1px solid rgba(225, 230, 238, 0.5);
        background: #f8f9fb;
        color: #36393f;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        letter-spacing: -1px;
    }

    .ly_login_info .txtarea span {
        display: table-cell;
        vertical-align: middle;
    }

    .ly_login_info .btnarea {
        padding: 0;
        margin: 30px 0 0 0;
    }

    .btn {
        position: relative;
    }

    .btnarea {
        text-align: center;
        font-size: 0;
    }

    .ly_login_info .btnarea a.btn_n {
        background: #303544;
        color: #fff;
    }

    .ly_login_info .btnarea a {
        display: inline-block;
        padding: 0;
        margin: 0;
        width: 165px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }

    .ly_login_info .btnarea a.btn_b {
        background: #3392ff;
        color: #fff;
    }
</style>

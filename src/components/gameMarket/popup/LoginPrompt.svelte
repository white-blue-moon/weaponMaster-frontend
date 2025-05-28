<script>
    import { PATHS } from "../../../constants/paths";

</script>


<p class="txtarea">
    <span>로그인 후 이용하여 주세요.
        <br>경매장에 등록된 아이템의 판매 알림을 받을 수 있습니다.
    </span>
</p>
<p class="btnarea">
    <a href={ PATHS.ACCOUNT.LOGIN_ADMIN() } class="btn btn_n">관리자모드 로그인</a>
    <a href={ PATHS.ACCOUNT.LOGIN() }       class="btn btn_b">일반모드 로그인</a>
</p>


<style>
    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    p {
        color: #6a6e76;
        font-size: 14px;
        line-height: 1.6;
    }

    .btnarea {
        padding: 0;
        margin: 30px 0 0 0;
        text-align: center;
        font-size: 0;
    }

    .btnarea a {
        display: inline-block;
        padding: 0;
        margin: 0;
        width: 165px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        font-weight: 500;
    }

    .btnarea a.btn_n {
        background: #303544;
        color: #fff;
    }

    .btnarea a.btn_b {
        background: #3392ff;
        color: #fff;
    }
</style>

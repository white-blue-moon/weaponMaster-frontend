<script>
    import GnbPublisher from '../../components/GnbPublisher.svelte';
</script>

<GnbPublisher />

<header class="bg_login">
   <h1><a href="/">weaponMaster</a></h1>
   <h2>로그인</h2>
</header>
<section class="content">
    <h3>아이디와 비밀번호를 입력하여 로그인해 주시기 바랍니다.</h3>

    <article class="login">
        <form action="/account/login" method="post" id="loginForm">
            <ul class="login_normal">
                <li>
                    <label for="id">아이디</label>
                    <input type="text" id="id" name="id" placeholder="아이디" value="" autofocus="" maxlength="24">
                </li>
                <li>
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" name="password" placeholder="비밀번호" maxlength="16">
                </li>

                <li class="msg" id="validationMsg">
                </li>

                <li class="btn">
                    <a href="#" id="login">일반모드 로그인</a>
                </li>
            </ul>

            <ul class="login_admin">
                <li class="logo" id="weaponMasterLogo"></li>
                <li>잠깐! 관리자 권한이 있으신가요? 관리자모드로 로그인 할 수 있습니다!</li>
                <li>
                    <a href="#">관리자모드 로그인</a>
                </li>
                <li><span>관리자 권한은 별도 어드민 툴에서 부여 가능하며 공지사항 작성 등 권한이 주어집니다.</span></li>
            </ul>
        </form>
    </article>
</section>

<style>
    header {
       position: relative;
       width: 100%;
       height: 300px;
       overflow: hidden;
    }   

    header.bg_login {
        background: url(https://resource.df.nexon.com/ui/img/login/bg.png) no-repeat 50% 0;
    }

    header h1 a {
        display: block;
        margin: 53px auto 0 auto;
        width: 216px;
        height: 122px;
        background: url(https://resource.df.nexon.com/ui/img/mem/logo.png) no-repeat;
        font-size: 0;
    }

    a {
        text-decoration: none;
    }

    header h2 {
        margin-top: 0;
        margin-left: 11px;
        text-align: center;
        color: #fff;
        font-size: 40px;
        font-weight: 300;
        line-height: 54px;
    }

    .content {
        position: relative;
        padding-bottom: 100px;
        margin: 0 auto;
        width: 660px;
    }

    .content h3 {
        position: relative;
        margin-top: 60px;
        color: #6a6e76;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        line-height: 25px;
    }
    
    .login {
        position: relative;
        margin: 0 auto;
        width: 560px;
    }

    .login .login_normal {
        position: relative;
        margin-top: 65px;
    }

    .login .login_normal li label {
        display: none;
    }

    .login ul {
        list-style: none;
        padding: 0;
    } 

    .login_normal li {
        margin-bottom: 10px;
    }
    
    .login_normal input {
        border: 1px solid #e1e6ee;
        background: #f8f9fb;
    }
    
    input[type="text"], input[type="password"] {
        display: block;
        width: 100%;
        height: 54px;
        color: #6a6e76;
        font-size: 16px;
        line-height: 53px;
        text-indent: 15px; /* 플레이스홀더 포함, 텍스트 입력 시작점 조정 */
    }

    input::placeholder {
        opacity: 0.5; /* 투명도 조절 */
        margin-left: 0px;
    }

    .login .login_normal li.btn a {
        display: block;
        width: 560px;
        height: 61px;
        background: #3392ff;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 16px;
    }

    /* Nexon Login 스타일 */
    .login .login_admin {
        position: relative;
        margin-top: 76px;
        padding: 39px 0;
        border-radius: 4px;
        border: 1px solid #eeedf2;
        background: #f8f9fb;
        text-align: center;
    }

    .login .login_admin li.logo {
        margin: 0 auto;
        width: 108px;
        height: 42px;
        background: url(https://resource.df.nexon.com/ui/img/login/logo_nx.png) no-repeat;
    }

    .login .login_admin li {
        margin-top: 15px;
        color: #6a6e76;
        font-size: 15px;
    }

    .login_admin span {
        display: block;
        margin-top: 10px;
        font-size: 12px;
        color: #999;
    }

    .login .login_admin li a {
        display: block;
        margin: 0 auto;
        width: 480px;
        height: 50px;
        background: #5c6377;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }

    .login .login_admin li span {
        color: #a2a5ac;
        font-size: 14px;
        letter-spacing: -.4px;
    }
</style>

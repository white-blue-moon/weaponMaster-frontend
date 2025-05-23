<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { handleCapsLock, authLogin } from "../../utils/auth";
    import { PATHS } from '../../constants/paths';

    import GnbPublisher from '../../components/GnbPublisher.svelte';
    import HeaderBanner from '../../components/HeaderBanner.svelte';
    import Footer from '../../components/Footer.svelte';
    import BoldLink from '../../components/BoldLink.svelte';
    import Spinner from '../../components/Spinner.svelte';
    import CapsLockWarning from '../../components/CapsLockWarning.svelte';
  

    let userId   = "";
    let password = "";

    let capsLockWarning = false;
    let isLoginLoading  = false;
    
    function isValidForm() {
        if (userId == "") {
            alert("아이디를 입력하여 주세요");
            return false;
        }

        if (password == "") {
            alert("비밀번호를 입력하여 주세요");
            return false;
        }

        return true;
    }

    async function onSubmitLogin(event) {
        event.preventDefault();
        if (!isValidForm()) {
            return;
        }

        isLoginLoading = true;

        const response = await apiFetch(API.ACCOUNT.LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                "isAdminMode": false,
                "userId":      userId,
                "userPw":      password,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isLoginLoading = false;
            authLogin(userId);

            alert(`로그인에 성공하였습니다.\n${userId} 님 안녕하세요.`)
            window.location.href = PATHS.HOME;
            return;
        }

        isLoginLoading = false;
        alert('로그인에 실패하였습니다.\n아이디와 비밀번호를 다시 한번 확인해 주세요.');
        return;
    }

    
</script>

<GnbPublisher />
<HeaderBanner bannerText="로그인" bannerBackground="https://resource.df.nexon.com/ui/img/login/bg.png"/>
<section class="content">
    <h3>아이디와 비밀번호를 입력하여 로그인해 주시기 바랍니다.</h3>

    <article class="login">
        <form action="/account/login" method="post" id="loginForm" on:submit={ onSubmitLogin }>
            <ul class="login_normal">
                <li>
                    <label for="id">아이디</label>
                    <input type="text" id="id" name="id" placeholder="아이디" bind:value={ userId } autofocus="" maxlength="24">
                </li>
                <li>
                    <label for="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="비밀번호" 
                        maxlength="16" 
                        bind:value={ password }
                        on:keypress={ (event) => handleCapsLock(event, (value) => capsLockWarning = value) }
                    >
                    {#if capsLockWarning}
                        <CapsLockWarning />
                    {/if}
                </li>

                <li class="msg" id="validationMsg">
                </li>

                <li class="btn">
                    <button type="submit" id="login">
                        {#if isLoginLoading} <Spinner colorTheme="white"/> {/if} 일반모드 로그인
                    </button>
                </li>              
            </ul>

            <ul class="login_admin">
                <li class="logo" id="weaponMasterLogo"></li>
                <li>관리자 권한이 있는 계정에 한해서 관리자모드로 로그인할 수 있습니다.</li>
                <li>
                    <a href={ PATHS.ACCOUNT.LOGIN_ADMIN }>관리자모드 로그인</a>
                </li>
                <li>
                    <span>
                        관리자 권한은 별도 <BoldLink href={ PATHS.ADMIN_TOOL } text={ "어드민툴" }/>에서 부여 가능하며 공지사항 작성 등 권한이 주어집니다.
                    </span>
                </li>
            </ul>
        </form>
    </article>
</section>
<Footer />

<style>
    a {
        text-decoration: none;
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
        color: #bec5cc;
    }

    .login .login_normal li.btn button {
        all: unset; /* 모든 기본 스타일 제거 */
        display: block;
        width: 560px;
        height: 61px;
        background: #3392ff;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }

    .login .login_normal li.btn button:hover {
        background: #9daab9;
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
        width: 123px;
        height: 42px;
        background: url(/weapon-front/images/logo_blue_moon_img.png) no-repeat;
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

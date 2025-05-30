<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { handleCapsLock, authLogin } from "../../utils/auth";
    import { DF_UI } from '../../constants/resourcePath';
    import { getRedirectUrl } from '../../utils/pathUtiil';
    import { PATHS } from '../../constants/paths';

    import GnbPublisher from '../../components/GnbPublisher.svelte';
    import HeaderBanner from '../../components/banner/HeaderBanner.svelte';
    import Footer from '../../components/Footer.svelte';
    import CapsLockWarning from '../../components/CapsLockWarning.svelte';
    import Spinner from '../../components/Spinner.svelte';

  
  
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
                "isAdminMode": true,
                "userId":      userId,
                "userPw":      password,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isLoginLoading = false;

            const isAdminMode = true;
            authLogin(userId, response.data.adminToken, isAdminMode);

            alert(`관리자모드로 로그인합니다.\n${userId} 님 안녕하세요.`);
            window.location.href = getRedirectUrl();
            return;
        }

        isLoginLoading = false;
        alert('관리자모드 로그인에 실패하였습니다.\n관리자 권한이 있는지 확인 및 아이디와 비밀번호를 다시 한번 확인해 주세요.');
        return;
    }
</script>


<GnbPublisher />
<HeaderBanner bannerText="관리자모드 로그인" bannerBackground="{DF_UI}/img/visual/bg_world.jpg"/>
<section class="content">
    <h3>아이디와 비밀번호를 입력하여 로그인해 주시기 바랍니다.</h3>

    <article class="login">
        <form action="/account/login" method="post" id="loginForm" on:submit={ onSubmitLogin }>
            <ul class="login_admin">
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
                        {#if isLoginLoading} <Spinner colorTheme="white"/> {/if} 관리자모드 로그인
                    </button>
                </li>
                <li class="find">
                    <a href={ PATHS.ACCOUNT.JOIN }>회원가입</a>
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

    .login .login_admin {
        position: relative;
        margin-top: 65px;
    }

    .login .login_admin li label {
        display: none;
    }

    .login ul {
        list-style: none;
        padding: 0;
    } 

    .login_admin li {
        margin-bottom: 10px;
    }

    .login_admin li.find {
        margin-top: 17px;
        font-size: 0;
        text-align: center;
    }

    .login_admin li.find a {
        margin-top: 5px;
        display: inline-block;
        color: #6a6e76;
        font-size: 14px;
    }

    .login_admin li.find a::after {
        content: '';
        display: inline-block;
        margin: -2px 11px 0 12px;
        width: 1px;
        height: 13px;
        background: #bec5cc;
        vertical-align: middle;
    }

    .login_admin li.find a:last-child::after {
        display: none;
    }
    
    .login_admin input {
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

    .login .login_admin li.btn button {
        all: unset; /* 모든 기본 스타일 제거 */
        margin-top: 30px;
        display: block;
        width: 560px;
        height: 61px;
        background: #5c6377;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
</style>

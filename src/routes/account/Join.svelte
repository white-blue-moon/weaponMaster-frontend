<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';

    import GnbPublisher from '../../components/GnbPublisher.svelte';
    import HeaderBanner from '../../components/HeaderBanner.svelte';
    import Footer from '../../components/Footer.svelte';
    import AgreeBox from '../../components/AgreeBox.svelte';
    import BlueButton from '../../components/BlueButton.svelte';

    let userId          = "";
    let password        = "";
    let confirmPassword = "";
    let server          = "";
    let character       = "";

    let agree      = false;
    let agreeOk    = false;
    let joinOk     = false;

    // TODO 아래 정보 서버에서 관리하기
    const servers = [
        { id: 1, serverId: "anton",    name: "안톤" },
        { id: 2, serverId: "bakal",    name: "바칼" },
        { id: 3, serverId: "cain",     name: "카인" },
        { id: 4, serverId: "casillas", name: "카시야스" },
        { id: 5, serverId: "diregie",  name: "디레지에" },
        { id: 6, serverId: "hilder",   name: "힐더" },
        { id: 7, serverId: "prey",     name: "프레이" },
        { id: 8, serverId: "siroco",   name: "시로코" }
    ];

    // TODO 유저 아이디, 혹은 password 를 다시 입력하는 경우 관련 valid 변수 다시 false 로 바꾸는 함수 필요
    async function checkDuplicateId() {
        const response = await apiFetch(API.ACCOUNT.EXIST_USER(userId), {
            method: 'GET',
        }).catch(handleApiError);

        const isUserIdAvailable = response.data;
        if (isUserIdAvailable) {
            alert('사용 가능한 아이디입니다');
            return;
        }

        alert('이미 존재하는 아이디입니다');
        return;
    }

    function checkCharacterExistence() {
        alert(`Checking if character '${character}' exists...`);
    }

    function isValidForm() {
        if (userId.trim() == "" || password.trim() == "" || confirmPassword.trim() == "") {
            alert('비어 있는 입력칸을 입력 후 시도해 주세요')
            return false;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다 다시 확인해 주세요");
            return false;
        }

        return true;
    }

    async function onSubmitJoin(event) {
        event.preventDefault();
        if (!isValidForm()) {
            return;
        }

        const response = await apiFetch(API.ACCOUNT.JOIN, {
            method: 'POST',
            body: JSON.stringify({
                "userId" : userId,
                "userPw" : password,
                "dfServerId" : servers.find(s => s.id == server)?.serverId, // 올바른 서버 ID 가져오기
                "dfCharacterName" : character,
            }),
        }).catch(handleApiError);

        if (response.success) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = "/";
            return;
        }

        alert('회원가입에 실패하였습니다.');
        return;
    }

    function onClick() {
        if (!agree) {
            alert('약관 동의 필요');
            return;
        }

        agreeOk = true;
        return;
    }
</script>

<GnbPublisher />
<HeaderBanner bannerText="회원가입" bannerBackground="https://resource.df.nexon.com/ui/img/mem/bg.png"/>

<section class="content">
    <main>
        {#if !agreeOk && !joinOk}
            <AgreeBox 
                bind:agree={ agree }
                subTitle="웨펀마스터 서비스 제공을 위해 필요한 최소한의 개인정보입니다."
                table1="서비스 제공 및 개선, 서비스 이용 분석 및 부정 이용 방지"
                table2="웨펀마스터ID, 비밀번호, 서비스 이용기록 (방문일시, 접속 IP), 이용 콘텐츠 및 활동 정보"
                table3="사용자가 삭제 요청하거나, 웨펀마스터 서비스 종료 시까지"
                bottomTip="동의를 거부할 권리가 있으나, 동의를 거부할 경우 서비스 이용이 불가능 합니다."
            />
            <BlueButton text="확인" on:click={ onClick } />
        {:else if agreeOk && !joinOk}
            <form on:submit={ onSubmitJoin }>
                <div class="form-row">
                    <label for="userId">아이디<span class="required">*</span></label>
                    <input id="userId" type="text" bind:value={userId} placeholder="6자 이상 영문 및 숫자 조합" />
                    <button type="button" class="secondary-button" on:click={checkDuplicateId}>중복확인</button>
                </div>

                <div class="form-row">
                    <label for="password">비밀번호<span class="required">*</span></label>
                    <input id="password" type="password" bind:value={password} placeholder="비밀번호를 입력하세요" />
                </div>

                <div class="form-row">
                    <label for="confirmPassword">비밀번호 확인<span class="required">*</span></label>
                    <input id="confirmPassword" type="password" bind:value={confirmPassword} placeholder="비밀번호를 다시 입력하세요" />
                </div>

                <div class="form-row">
                    <button type="submit" class="submit-button">가입하기</button>
                </div>
            </form>
        {/if}
    </main>
</section>
<Footer showBorderTop={ true }/>

<!-- TODO 이미지 경로 등은 최소한 상수로 관리하도록 수정하기 -->
<style>
    .content {
        position: relative;
        padding-bottom: 100px;
        margin: 0 auto;
        width: 660px;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 40px;
    }

    form {
        width: 560px;
        background: #fff;
        padding: 20px 30px;
        /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
    }

    /* 각 항목 줄 간격 */
    .form-row {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        width: 100%;
    }

    label {
        height: auto;
        font-size: 14px;
        color: #6a6e76;
        margin-bottom: 6px;
        width: auto;
    }

    input {
        font-size: 16px;
        padding: 12px 8px;
        border: none;
        border-bottom: 2px solid #e1e6ee;
        background: transparent;
        color: #333;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid #3392ff;
    }

    input::placeholder {
        color: #aaa;
        opacity: 0.7;
    }

    button {
        height: 54px;
        padding: 0 20px;
        font-size: 16px;
        color: #fff;
        border: none;
        cursor: pointer;
        background: #3392ff;
        white-space: nowrap;
    }

    /* 보조 버튼 */
    .secondary-button {
        margin-top: 10px;
        background: #fff;
        color: #3392ff;
        border: 1px solid #3392ff;
        height: 48px;
        align-self: flex-start;
    }

    .secondary-button:hover {
        background: #3392ff;
        color: #fff;
    }

    /* 가입 버튼 */
    .submit-button {
        background: #3392ff;
        color: #fff;
        width: 100%;
        text-align: center;
        height: 52px;
    }

    .required {
        color: red;
        margin-left: 5px;
    }
</style>


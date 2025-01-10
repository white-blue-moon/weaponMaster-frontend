<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';

    import GnbPublisher from '../../components/GnbPublisher.svelte';
    import HeaderBanner from '../../components/HeaderBanner.svelte';
    import Footer from '../../components/Footer.svelte';

    let userId = "";
    let isUserIdExist = false;
    let password = "";
    let confirmPassword = "";
    let server = "";
    let character = "";

    // TODO 아래 정보 서버에서 관리하기
    const servers = [
        { id: 1, serverId: "anton", name: "안톤" },
        { id: 2, serverId: "bakal", name: "바칼" },
        { id: 3, serverId: "cain", name: "카인" },
        { id: 4, serverId: "casillas", name: "카시야스" },
        { id: 5, serverId: "diregie", name: "디레지에" },
        { id: 6, serverId: "hilder", name: "힐더" },
        { id: 7, serverId: "prey", name: "프레이" },
        { id: 8, serverId: "siroco", name: "시로코" }
    ];

    // TODO 유저 아이디, 혹은 password 를 다시 입력하는 경우 관련 valid 변수 다시 false 로 바꾸는 함수 필요

    async function checkDuplicateId() {
        const response = await apiFetch(API.ACCOUNT.EXIST_USER(userId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.exist) {
            alert('이미 존재하는 아이디입니다');
            isUserIdExist = true;
            return;
        }

        alert('사용 가능한 아이디입니다');
        isUserIdExist = false;
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
</script>

<GnbPublisher />
<HeaderBanner bannerText="회원가입" bannerBackground="https://resource.df.nexon.com/ui/img/mem/bg.png"/>
<main>
    <form on:submit={onSubmitJoin}>
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
            <label for="server">서버 선택</label>
            <select id="server" bind:value={server}>
                <option value="" disabled selected>서버를 선택하세요</option>
                {#each servers as server}
                    <option value={server.id}>{server.name}</option>
                {/each}
            </select>
        </div>

        <div class="form-row">
            <label for="character">던파 캐릭터</label>
            <input id="character" type="text" bind:value={character} placeholder="캐릭터 이름을 입력하세요" />
            <button type="button" class="secondary-button" on:click={checkCharacterExistence}>캐릭터 확인</button>
        </div>

        <div class="form-row">
            <button type="submit" class="submit-button">가입하기</button>
        </div>
    </form>
</main>
<Footer />

<!-- TODO 이미지 경로 등은 최소한 상수로 관리하도록 수정하기 -->
<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f9f9f9;
        padding: 40px;
    }

    form {
        width: 560px;
        background: #fff;
        padding: 20px 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    label {
        height: 30px;
        font-size: 14px;
        color: #6a6e76;
        width: 120px; /* 고정된 레이블 너비 */
    }

    input, select {
        flex: 1;
        height: 54px;
        padding: 0 10px;
        font-size: 16px;
        border: 1px solid #e1e6ee;
        background: #f8f9fb;
        color: #6a6e76;
        box-sizing: border-box;
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
        margin-left: 10px;
        white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    }

    button:hover {
        background: #005fcc;
    }

    .secondary-button {
        background: #fff;
        color: #3392ff;
        border: 1px solid #3392ff;
        height: 54px;
    }

    .secondary-button:hover {
        background: #3392ff;
        color: #fff;
    }

    .submit-button {
        background: #3392ff;
        color: #fff;
        width: 100%;
        text-align: center;
    }

    .submit-button:hover {
        background: #005fcc;
    }

    .required {
        color: red;
        margin-left: 5px;
    }
</style>


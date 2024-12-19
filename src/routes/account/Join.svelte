<script>
    import GnbPublisher from '../../components/GnbPublisher.svelte';
    import Footer from '../../components/Footer.svelte';

    let userId = "";
    let password = "";
    let confirmPassword = "";
    let nickname = "";
    let server = "";
    let character = "";
    let requiredFields = { userId: false, password: false, confirmPassword: false, nickname: false };

    // TODO 아래 정보 서버에서 관리하기
    const servers = [
        { id: 1, serverId: "anton",     name: "안톤"},
        { id: 2, serverId: "bakal",     name: "바칼" },
        { id: 3, serverId: "cain",      name: "카인" },
        { id: 4, serverId: "casillas",  name: "카시야스" },
        { id: 5, serverId: "diregie",   name: "디레지에" },
        { id: 6, serverId: "hilder",    name: "힐더" },
        { id: 7, serverId: "prey",      name: "프레이" },
        { id: 8, serverId: "siroco",    name: "시로코" }
    ];

    function checkDuplicateId() {
        alert(`Checking if ID '${userId}' is available...`);
    }

    function checkCharacterExistence() {
        alert(`Checking if character '${character}' exists...`);
    }

    function validateForm() {
        let isValid = true;
        for (const key in requiredFields) {
            if (!requiredFields[key]) {
                isValid = false;
                alert(`${key} is required.`);
                break;
            }
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            isValid = false;
        }

        return isValid;
    }

    function handleSubmit() {
        if (validateForm()) {
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/"; // 홈으로 리다이렉트
        }
    }

    $: requiredFields.userId = userId.trim() !== "";
    $: requiredFields.password = password.trim() !== "";
    $: requiredFields.confirmPassword = confirmPassword.trim() !== "";
    $: requiredFields.nickname = nickname.trim() !== "";
</script>

<GnbPublisher />
<header class="bg_member">
    <h1><a href="/">weaponMasterr</a></h1>
    <h2>회원가입</h2>
</header>
<main>
    <form on:submit|preventDefault={handleSubmit}>
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
            <label for="nickname">닉네임<span class="required">*</span></label>
            <input id="nickname" type="text" bind:value={nickname} placeholder="닉네임을 입력하세요" />
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

<style>
    header {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
    }
    
    header.bg_member {
        background: url(https://resource.df.nexon.com/ui/img/mem/bg.png) no-repeat 50% 0;
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

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f9f9f9;
        padding: 40px;
    }

    form {
        width: 400px;
        background: #fff;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 21px;
    }

    label {
        width: 120px;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        display: flex; /* 플렉스 박스 적용 */
        align-items: center; /* 수직 가운데 정렬 */
    }

    input, select {
        flex: 1;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin:0;
    }

    input::placeholder {
        color: #aaa;
    }

    /* 공통 스타일 */
    button {
        padding: 8px 12px;
        font-size: 14px;
        border-radius: 4px;
        margin: 0;
        margin-left: 6px;
        cursor: pointer;
    }

    /* 중복확인 및 캐릭터 확인 버튼 스타일 */
    .secondary-button {
        color: #0078ff;
        background: #fff;
        border: 1px solid #0078ff;
        padding: 8px 12px; /* 버튼 크기 조정 */
    }

    .secondary-button:hover {
        color: #fff;
        background: #0078ff;
        border: 1px solid #0078ff;
    }

    .submit-button {
        margin: 0;
        width: 100%;
        padding: 12px;
        font-size: 16px;
        background: #0078ff;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .submit-button:hover {
        background: #005fcc;
    }

    .required {
        color: red;
        margin-left: 5px;
    }
</style>

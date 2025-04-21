<script>
    export let isOpen;
    export let slackInfo;
    export let onClose;
  
    let agreedToTerms = false;
    let userId          = "";
  
    function saveSlackInfo() {
      // 실제 저장 로직 호출
      onClose();
    }
  
    function deleteSlackInfo() {
      // 실제 삭제 로직 호출
      onClose();
    }

    async function checkDuplicateId() {
        
    }
</script>

<div>
    <h2>Slack 연동</h2>
    <article class="agreebox">
        <dl>
        <dt>
            <input
            class="agrees"
            type="checkbox"
            name="privacyCheck"
            id="privacyCheck"
            value="1"
            />
            <label for="privacyCheck">
            <span></span>개인정보 수집 및 이용 동의
            </label>
        </dt>
        <dt class="stxt">
            Slack 알림 서비스 제공을 위해 필요한 최소한의 개인정보입니다.
        </dt>
        <dd>
            <p>다음과 같이 개인정보를 수집 및 이용하고 있습니다.</p>
            <table class="table-agreement">
            <thead>
                <tr>
                <th class="table-left">수집 및<br />이용 목적</th>
                <th>항목</th>
                <th class="table-left">보유 및 이용기간</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td rowspan="2" class="table-center">
                    Slack 알림<br />서비스<br />이용
                </td>
                <td class="table-left">
                    Slack<br />채널 ID
                </td>
                <td rowspan="2" class="table-left">
                    <strong>
                    개인적으로 삭제 또는 웨펀마스터 서비스 종료 시까지
                    </strong>
                </td>
                </tr>
            </tbody>
            </table>
            <br />
            <p>※ 채널 ID는 알림 전송을 위한 용도로만 사용되며,<br />다른 용도로는 사용되지 않습니다.</p>
        </dd>
        </dl>
    </article>
    <article class="register-box">
        <div class="form-row">
            <label for="userId">채널 ID<span class="required">*</span></label>
            <input id="userId" type="text" bind:value={ userId } />
            <button type="button" class="secondary-button" on:click={ checkDuplicateId }>통신확인</button>
        </div>
        <div class="form-row">
            <button type="button" class="submit-button">등록하기</button>
        </div>
    </article>
</div>


<style lang="scss">
    .agreebox {
        position: relative;
    }

    .agreebox dl {
        position: relative;
        margin-top: 55px;
    }

    .agreebox dl dt.stxt {
        margin-top: 7px;
        color: #6a6e76;
        font-size: 14px
    }

    .agreebox dl dd {
        margin-top: 26px;
        margin-left: 0;
        padding: 15px 20px;
        height: 240px;
        overflow-y: scroll;
        background: #f8f9fb;
        border: 1px solid #eeedf2;
        border-radius: 4px;
        color: #6a6e76;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.35px
    }

    .agreebox dl dd b {
        font-weight: 500;
    }

    .agreebox table {
        margin: 10px 0;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc
    }

    .agreebox table td {
        padding: 5px 10px;
        border-top: 1px solid #ccc;
        font-size: 13px;
        line-height: 150%;
        text-align: center;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"] + label {
        color: #151518;
        font-size: 21px;
        letter-spacing: -.9px;
        line-height: 28px;
        cursor: pointer;
    }

    input[type="checkbox"] + label span {
        display: inline-block;
        margin: -6px 8px 0 0;
        width: 24px;
        height: 24px;
        background: url("#{$DF_UI}/img/form/chkbox.png") no-repeat;
        vertical-align: middle;
        cursor: pointer
    }

    input[type="checkbox"]:checked + label span {
        background: url("#{$DF_UI}/img/form/chkbox.png") no-repeat 0 -100px
    }

    /* 공통 테이블 스타일 */
    .table-agreement {
        border: 1px solid #c7c7c7;
        border-collapse: collapse;
        width: 100%;
        font-size: 13px;
        color: #666;
    }

    /* 셀 스타일 */
    .table-agreement th,
    .table-agreement td {
        padding: 3px 4px 2px;
        border: 1px solid #e7e7e7;
        text-align: center;
        vertical-align: middle;
        line-height: 1.4;
    }

    /* 헤더 셀 스타일 */
    .table-agreement thead th {
        background-color: #f3f3f3;
        font-weight: bold;
    }

    /* 일반 셀 */
    .table-agreement td {
        background-color: #fff;
    }

    /* 좌측 정렬 텍스트 */
    .table-agreement .align-left {
        text-align: left;
    }

    /* 우측 병합된 셀 스타일 */
    .table-agreement .rowspan-cell {
        font-weight: bold;
    }

    .agreebox p {
        margin: 8px 0;
        line-height: 1.6;
        color: #666;
    }

    .register-box {
        margin-top: 40px;
    }

    .register-box .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .register-box .required {
        color: red;
        margin-left: 5px;
    }

    .register-box label {
        height: 30px;
        font-size: 14px;
        color: #6a6e76;
        width: 120px; /* 고정된 레이블 너비 */
    }

    .register-box input, select {
        flex: 1;
        height: 54px;
        padding: 0 10px;
        font-size: 16px;
        border: 1px solid #e1e6ee;
        background: #f8f9fb;
        color: #6a6e76;
        box-sizing: border-box;
    }

    .register-box input::placeholder {
        color: #aaa;
        opacity: 0.7;
    }

    .register-box button {
        height: 54px;
        padding: 0 20px;
        font-size: 16px;
        color: #fff;
        border: none;
        cursor: pointer;
        background: #3392ff;
        white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    }

    .register-box button:hover {
        background: #005fcc;
    }

    .register-box .secondary-button {
        margin-left: 10px;
        background: #fff;
        color: #3392ff;
        border: 1px solid #3392ff;
        height: 54px;
    }

    .register-box .secondary-button:hover {
        background: #3392ff;
        color: #fff;
    }

    .register-box .submit-button {
        background: #3392ff;
        color: #fff;
        width: 100%;
        text-align: center;
    }

    .register-box .submit-button:hover {
        background: #005fcc;
    }
</style>
  
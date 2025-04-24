<script>
    import { onMount } from "svelte";
    import { SLACK_API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { userInfo } from "../utils/auth";
    import { SLACK_NOTICE_TYPE } from "../constants/slack";
    import { createEventDispatcher } from 'svelte';
    import { formatDate } from "../utils/time";

    import Spinner from "./Spinner.svelte";
  

    export let slackBotInstallUrl;
    export let slackInfo;
    export let onClose;

    const dispatch      = new createEventDispatcher(); // TODO new 사용할 때와 그냥 사용할 때 차이 확인하기
    let   agree         = false;
    
    onMount(async () => {
        // 슬랙 연동 콜백 리스너 등록
	    window.addEventListener('message', (event) => {
            // TODO -> 로컬 주소가 아닌 실제 사용한 외부 공유 링크 주소를 기재해야 함 -> 실제 배포할 때 수정 필요
            if (event.origin !== "https://20fb-2001-e60-2019-6f78-a9d5-10c2-71c2-222c.ngrok-free.app") {
                return;
            }
            
            if (event.data?.success) {
                // 설치 페이지 닫기
                if (event.source?.close) {
                    event.source.close();
                }

                dispatch('close', { slackInfo: event.data.slackInfo });
                return;
            }
	    });
    })

    function openBotInstallPage() {
        if (!agree) {
            alert('서비스 이용을 위해 동의가 필요합니다.')
            return;
        }

		window.open(slackBotInstallUrl, '_blank', 'noopener=false');
        return;
	}
  
    async function deleteSlackInfo() {
        const isConfirm = confirm("정말 슬랙 연동 정보를 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        const response = await apiFetch(SLACK_API.CHANNEL.DELETE($userInfo, SLACK_NOTICE_TYPE.AUCTION), {
            method: 'DELETE',
        }).catch(handleApiError);

        if (response.success) {
            dispatch('close', {slackInfo: null});
            alert('등록된 Slack 연동 정보를 삭제하였습니다.');
            onClose();
            return;
        }

        alert('Slack 연동 정보 삭제에 실패하였습니다.');
        return;
    }

    let isChecking = false;

    async function testSlackInfo() {
        isChecking = true;

        const response = await apiFetch(SLACK_API.CHANNEL.TEST($userInfo, SLACK_NOTICE_TYPE.AUCTION), {
            method: 'POST',
        }).catch(handleApiError);

        if (response.success) {
            isChecking = false;
            alert('Slack 메시지 통신 테스트에 성공하였습니다.');
            return;
        }

        isChecking = false;
        alert(getTestErrorMessage(response.message));
        return;
    }

    function getTestErrorMessage(respMessage) {
        let errMessage  = "Slack 메시지 통신 테스트에 실패하였습니다. \n";
        errMessage     += "[ error: " + respMessage + " ]";
        return errMessage;
    }
</script>

<div>
    <h2>Slack 연동</h2>

    {#if !slackInfo}
        <div class="stxt">
            경매 알림 및 1:1 문의 알림이 Slack으로 전달됩니다.
        </div>
        <article class="agreebox">
            <dl>
                <dt>
                    <input
                        class="agrees"
                        type="checkbox"
                        name="privacyCheck"
                        id="privacyCheck"
                        bind:checked={ agree }
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
                        <th class="table-left">수집 및 이용 목적</th>
                        <th>항목</th>
                        <th class="table-left">보유 및 이용기간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td rowspan="2" class="table-center">
                            Slack 알림<br />서비스 이용<br />
                        </td>
                        <td class="table-left">
                            Slack 사용자 ID, Slack DM 채널 ID, Slack 봇 Access Token
                        </td>
                        <td rowspan="2" class="table-left">
                            <strong>
                                사용자가 삭제 요청하거나, 웨펀마스터 서비스 종료 시까지
                            </strong>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <br />
                    <p>※ 수집된 정보는 오직 알림 전송을 위한 용도로만 사용됩니다.</p>
                </dd>
            </dl>
        </article>

        <article class="register-box">
            <div class="form-row">
                <button type="button" class="submit-button" on:click={ openBotInstallPage }>연동하기</button>
            </div>
        </article>
    {:else}
        <div class="stxt">
            ※ Slack 연동이 완료된 상태입니다.<br />
            경매 알림 및 1:1 문의 알림이 Slack으로 전달됩니다.
        </div>
        <article class="register-box">
            <div class="form-row">
                <label for="createDate">연동일</label>
                <input id="createDate" type="text" value={ formatDate(slackInfo.createDate) } disabled={ true }/>
                
                <button type="button" class="secondary-button" 
                    class:button-checking={ isChecking }
                                 disabled={ isChecking }
                                 on:click={ testSlackInfo }
                >
                    {#if isChecking}
                        <Spinner colorTheme="white"/> 확인중
                    {:else}
                        Slack 응답확인
                    {/if}
                </button>
            </div>
            <div class="form-row">
                <button type="button" class="delete-button" on:click={ deleteSlackInfo }>삭제하기</button> 
            </div>
        </article>
    {/if}
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
        font-size: 14px;
    }

    .stxt {
        margin-top: 7px;
        color: #6a6e76;
        font-size: 14px;
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
        padding: 5px 7px;
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

    .register-box .secondary-button {
        margin-left: 10px;
        background: #fff;
        color: #3392ff;
        border: 1px solid #3392ff;
        height: 54px;
        min-width: 120px;
    }

    .register-box .secondary-button:hover {
        background: #3392ff;
        color: #fff;
    }

    .register-box .button-checking {
        background-color: #a1a8b7 !important;
        color: #fff;
        cursor: not-allowed;
        opacity: 0.9;
        border-color: transparent;
    }

    .register-box .submit-button {
        background: #3392ff;
        color: #fff;
        width: 100%;
        text-align: center;
    }

    .register-box .delete-button {
        background: #5c6377;
        color: #fff;
        width: 100%;
        text-align: center;
    }
</style>
  
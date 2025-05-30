<script>
    import { onDestroy, onMount } from "svelte";
    import { SERVICE_DOMAIN, SLACK_API } from '../../../constants/api';
    import { apiFetch, handleApiError } from '../../../utils/apiFetch';
    import { userInfo } from "../../../utils/auth";
    import { SLACK_NOTICE_TYPE } from "../../../constants/slack";
    import { createEventDispatcher } from 'svelte';
    import { formatDate } from "../../../utils/time";

    import Spinner from "../../Spinner.svelte";
    import AgreeBox from "../../AgreeBox.svelte";
  

    export let slackBotInstallUrl;
    export let slackInfo;
    export let onClose;

    const dispatch   = createEventDispatcher();
    let   agree      = false;
    let   isDeleting = false;
    
    onMount(() => {
	    window.addEventListener('message', handleSlackWebhookResponse); // 슬랙 연동 콜백 리스너 등록
    })

    onDestroy(() => {
        window.removeEventListener('message', handleSlackWebhookResponse);
    })

    function handleSlackWebhookResponse(event) {
        if (event.origin !== SERVICE_DOMAIN) {
            return;
        }

        if (event.data?.success) {
            if (event.source?.close) {
                event.source.close(); // 새 탭으로 열린 슬랙 봇 연동 페이지 닫기
            }

            dispatch('close', { slackInfo: event.data.slackInfo });
            return;
        }
    }

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

        isDeleting = true;

        const response = await apiFetch(SLACK_API.CHANNEL.DELETE($userInfo, SLACK_NOTICE_TYPE.AUCTION), {
            method: 'DELETE',
        }).catch(handleApiError);

        if (response.success) {
            isDeleting = false;

            dispatch('close', {slackInfo: null});
            alert('등록된 Slack 연동 정보를 삭제하였습니다.');
            onClose();
            return;
        }

        isDeleting = false;
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
        <AgreeBox 
            bind:agree={ agree }
        />
        <article class="register-box">
            <div class="form-row">
                <button type="button" class="submit-button" on:click={ openBotInstallPage }>연동하기</button>
            </div>
        </article>
    {:else}
        <div class="stxt">
            ※ Slack 연동이 완료되었습니다.<br />
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
                <button type="button" class="delete-button" on:click={ deleteSlackInfo }>
                    {#if isDeleting}<Spinner colorTheme="white"/>{/if} 삭제하기
                </button> 
            </div>
        </article>
    {/if}
</div>


<style lang="scss">
    div.stxt {
        font-size: 13px; 
        line-height: 1.5; // 줄 간격 
        color: #4a4e57;
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
  
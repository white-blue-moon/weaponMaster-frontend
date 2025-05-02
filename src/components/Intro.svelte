<script>
    import { onMount } from 'svelte';
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { FOCUS_BANNER_TYPE } from '../constants/focusBanner';
    

    let introOn     = false;
    let removeIntro = false;

    let loadingDataPercent  = 0;    // 고정 시간 동안 진행될 로딩바 진행 상태 (0 → 100%)
    let loadingDelayPercent = 0;    // 실제 통신 진척도 로딩바 진행 상태 (0 → 100%)
    
    let loadingDataAniTime  = 2200; // 기본 연출 시간 (로딩바 + 커버 전환 시간)
  
    onMount(async () => {
        // loading_data 로딩바 진행을 위한 타이머
        let loadingDataTimer = setInterval(() => {
            if (loadingDataPercent < 100) {
                loadingDataPercent += 4.545; // 2200ms 동안 100% 로 끝내기 위한 비율)
            } else {
                clearInterval(loadingDataTimer);
            }
        }, 22); // 약 2200ms
    });

    async function fetchPassWordCheck() {
        loadingDelayPercent = 20
        
        // TODO access 비밀번호 입력했을 때 loadingDelayPercent = 20 정도 할당하기
        // TODO access 비밀번호 확인 API 로 수정하기
        const response = await apiFetch(API.PAGE.HOME, {
            method: 'POST',
            body: JSON.stringify({
                "bannerTypes": [
                    FOCUS_BANNER_TYPE.MAIN,
                    FOCUS_BANNER_TYPE.NEWS_FIRST,
                    FOCUS_BANNER_TYPE.NEWS_SECOND,
                ]
            }),
        }).catch(handleApiError);

        if (response.success) {
            loadingDelayPercent = 100;
        }

        // 기본 연출 시간 동안 대기 후 cover 분리 애니메이션 시작
        setTimeout(() => {
            introOn = true;

            // cover 전환 이후 DOM 제거
            setTimeout(() => {
                removeIntro = true;
            }, 1200); // cover transition: 1s + 여유

        }, loadingDataAniTime); 
    }

    let code = ['', '', '', '', '', ''];

    function handleInput(e, index) {
        code[index] = e.target.value;

        // 현재 입력값이 있으면, 다음 칸으로 포커스 이동
        if (e.target.value && index < 5) {
            const next = document.getElementById(`code-${index + 1}`);
            next?.focus();
            return;
        }

        // 값이 지워졌다면, 이전 칸으로 포커스 이동
        if (!e.target.value && index > 0) {
            const prev = document.getElementById(`code-${index - 1}`);
            prev?.focus();
            return;
        }

        // 마지막 칸 값 입력하면 API 호출
        if (index === 5 && e.target.value) {
            e.target.blur();
            fetchPassWordCheck();
            return;
        }
    }

    // Backspace 키 눌렀을 때, 현재 칸이 비어 있으면 이전 칸으로 포커스 이동
    function handleKeyDown(e, index) {
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                const prev = document.getElementById(`code-${index - 1}`);
                prev?.focus();
                return;
            }
        }
    }
</script>

{#if !removeIntro}
    <div class="intro {introOn ? 'on' : ''}">
        <div class="cover1 cover"></div>
        <div class="cover2 cover">
            <div class="code-inputs">
                {#each code as _, i}
                    <input
                        id="code-{i}"
                        class="code-box"
                        maxlength="1"
                        autocomplete="off"
                        inputmode="numeric"
                        bind:value={ code[i] }
                        on:input={ (e) => handleInput(e, i) }
                        on:keydown={ (e) => handleKeyDown(e, i) }
                    />
                {/each}
            </div>
        </div>
        <div class="loading_data" style="width: {loadingDataPercent}vw;"></div>
        <div class="loading_delay" style="width: {loadingDelayPercent}vw;"></div>
    </div>
{/if}

  

<style>
.intro{position:fixed;left:0;top:0;height:100vh;background:url('/images/intro_logo.png') 50% 50% no-repeat #151922;z-index:200}
.intro .cover1{position:absolute;left:0;top:0;width:100vw;height:50vh;background:#151922;z-index:100}
.intro .cover2{position:absolute;left:0;top:50%;width:100vw;height:50vh;background:#151922;overflow:hidden}
.intro .cover:after{content:'';display:block;position:absolute;left:calc(50% - 121px);bottom:-69px;width:242px;height:125px;background:url('/images/intro_logo.png') 50% 0 no-repeat}
.intro .cover2:after{bottom:auto;top:69px;height:81px;background-position:50% 100%}
.intro .loading_data{transition:1s;position:absolute;left:0;top:50%;width:0vw;height:1px;background:#ff3300;opacity:0.4}
.intro .loading_delay{transition:2s;position:absolute;left:0;top:50%;width:0vw;height:1px;background:#ff3300;opacity:1}
.intro.on .loading_data{transition:0.3s;opacity:0;}
.intro.on .loading_delay{transition:0.3s;opacity:0;}
.intro.on .cover1{transition:1s;top:-61vh}
.intro.on .cover2{transition:1s;top:111vh}

.code-inputs {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
}

.code-box {
  width: 40px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 6px;
  background: #1a1a1a;
  color: white;
  outline: none;
}

.code-box:focus {
  border-color: #ff3300;
}
</style>
  
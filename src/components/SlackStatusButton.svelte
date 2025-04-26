<script>
    export let slackInfoExists;
    export let slackErrorExists;
    export let onClick;
  
    $: tooltip = !slackInfoExists
        ? "Slack 알림 연동 정보가 <br>등록되어 있지 않습니다."
        : slackErrorExists
        ? "Slack 연동 정보 조회에 실패했습니다. 다시 시도해 주세요."
        : "Slack 연동 정보 <br>열람/삭제";
</script>


<div class="group">
  <a
    class="status-button"
    on:click={ onClick }
    aria-label="Slack 채널 상태"
  >
    <img
      src={ slackInfoExists && !slackErrorExists
              ? "/images/icon/icon_quest.png"
              : "/images/icon/icon_ex.png"
          }
      alt={ slackInfoExists && !slackErrorExists ? "도움말 아이콘" : "주의 아이콘" }
      class="status-icon"
    />
  </a>
  <div class="ly_reco">
    <b>
        {#if slackInfoExists}
            Slack 연동
        {:else}
            Slack 연동 클릭!
        {/if}
    </b>
    <br>
    <br>
    {@html tooltip}
  </div>
</div>


<style lang="scss">
  .status-button {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .status-icon {
    padding-top: 2px;
    padding-right: 10px;
    width: 16px;
    height: 16px;
    display: block;
  }

  .ly_reco {
    display: none;
    position: absolute;
    top: 32px;
    padding: 21px 25px 24px 25px;
    border: 1px solid #151518;
    border-radius: 2px;
    background: #fff;
    color: #6a6e76;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    z-index: 10;
    box-shadow: 0px 3px 6px rgba(0,0,0,.3);
  }

  .ly_reco b {
    display: inline-block;
    padding-bottom: 6px;
    color: #36393f;
    font-size: 14px;
    font-weight: 500;
  }

  .ly_reco::before {
    content: '';
    display: block;
    position: absolute;
    top: -6px;
    left: 4px;
    width: 9px;
    height: 6px;
    background: url('#{$DF_UI}/img/board/arrow_ly_up.png') no-repeat;
  }

  .ly_reco.arrow::before {
    left: 35px;
  }

  .group:hover .ly_reco {
    display: block;
  }
</style>

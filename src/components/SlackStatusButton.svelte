<script>
    export let slackInfoExists;
    export let slackError;
    export let onClick;
  
    $: tooltip = !slackInfoExists
        ? "Slack 알림 채널 정보가 <br>등록되어 있지 않습니다."
        : slackError
        ? "Slack 채널 정보 조회에 실패했습니다. 다시 시도해 주세요."
        : "Slack 채널 정보 <br>열람/수정/삭제";
  
    $: icon = !slackInfoExists || slackError ? "❗" : "❔";
  </script>
  

  <div class="group">
    <button
      class="status-button"
      on:click={ onClick }
      aria-label="Slack 채널 상태"
    >
      { icon }
    </button>
    <div class="ly_reco">
        <b>Slack 연동</b>
        <br>
        <br>
        { @html tooltip }
    </div>
  </div>


  <style lang="scss">
    .status-button{
        cursor: pointer;
    }

    .ly_reco {
        display: none;
        position: absolute;
        top: 41px;
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
        left: 10px;
        width: 9px;
        height: 6px;
        background: url('#{$DF_UI}/img/board/arrow_ly_up.png') no-repeat
    }

    .ly_reco.arrow::before {
        left: 35px
    }

    .group:hover .ly_reco {
        display: block;
    }
  </style>
  
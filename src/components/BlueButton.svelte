<script>
    export let onClick;
    export let text;
</script>


<!-- TODO 클래스 네이밍 수정하기 -->
<article class="register-box">
    <div class="form-row">
        <button type="button" class="submit-button" on:click={ onClick }>
            { text }
        </button>
    </div>
</article>


<style>
    .register-box {
        margin-top: 40px;
    }

    .register-box .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
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
</style>
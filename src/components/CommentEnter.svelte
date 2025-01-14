<script>
    import { userInfo, isLoggedIn } from "../utils/auth";
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';

    export let reCommentId = 0;

    let placeHolder = "비방, 욕설, 도배글 등은 서비스 이용제한 사유가 될 수 있습니다.";
    if (!$isLoggedIn) {
        placeHolder = "로그인 후 댓글 쓰기가 가능합니다."
    }

    let contents = "";
    let isFocused = false;

    const url = window.location.pathname;
    let articleId = 0;
    if (/\d+$/.test(url)) {
        articleId = url.split('/').pop();
    }

    // contenteditable의 텍스트를 contents에 반영
    function updateContents(e) {
        contents = e.target.innerText.trim();
    }

    function handleFocus() {
        isFocused = true;
    }

    function handleBlur(e) {
        isFocused = false;

        // 내용이 비어 있으면 초기화
        if (e.target.innerText.trim() === "") {
            contents = "";
            e.target.innerHTML = "";
        }
    }

    function isCommentValid() {
        if (!$isLoggedIn) {
            alert("로그인 후 댓글 쓰기가 가능합니다.");
            return false;
        }

        if (contents.trim() == "") {
            alert("댓글 내용을 기재하여 주세요.");
            return false;
        }

        return true;
    }

    async function handleRegister() {
        if (!isCommentValid()) {
            return;
        }

        const response = await apiFetch(API.COMMENTS.CREATE, {
            method: "POST",
            body: JSON.stringify({
                "userId": $userInfo,
                "articleId": articleId,
                "reCommentId": reCommentId,
                "contents": contents,
            }),
        }).catch(handleApiError);

        if (response.success) {
            alert('댓글 등록이 완료되었습니다.');
            location.reload();
            return;
        }

        alert('댓글 등록에 실패하였습니다.');
        return;
    }
</script>


<div class="comment_enter" id="newCommentArea">
    <ul id="uiSticker" class="textarea">
        <li>
            <a class="name {reCommentId > 0 ? 'reply' : ''}">
                { $userInfo }
            </a>
            <!-- <a>힐더</a> -->
        </li>
        <li class="mrt">
            <div
                contenteditable="true"
                class="stkTxtArea"
                on:input={ updateContents }
                on:focus={ handleFocus }
                on:blur={ handleBlur }
            >
                {#if !isFocused && contents == ""}
                    <span class="pNode">{ placeHolder }</span>
                {/if}
            </div>
            <a class="reg" on:click={ handleRegister }>등록</a>
        </li>
    </ul>
</div>


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .comment_enter {
        margin-bottom: 20px;
        position: relative;
        border: 1px solid #eeedf2;
        background: #f8f9fb;
    }

    .comment_enter .textarea {
        position: relative;
    }

    .comment_enter ul {
        padding: 25px 0 29px 29px;
    }

    .comment_enter ul li.mrt {
        margin-top: 9px;
    }

    .comment_enter ul li {
        position: relative;
        clear: both;
        word-break: break-all;
        word-wrap: break-word;
        overflow: hidden;
    }

    li {
        list-style: none;
    }

    .comment_enter ul li .stkTxtArea {
        display: block;
        float: left;
        padding: 16px 20px;
        width: 1130px;
        height: 160px;
        background: #fff;
        border: 1px solid #e1e6ee;
        border-right: none;
        color: #36393f;
        font-size: 15px;
        line-height: 26px;
    }

    .comment_enter ul li .stkTxtArea span.pNode {
        color: #a2a5ac;
        font-size: 15px;
        font-weight: 400;
        line-height: 26px;
    }

    .comment_enter .stkTxtArea * {
        float: none;
    }

    .comment_enter .stkTxtArea {
        position: relative;
        font-weight: normal;
        overflow-y: scroll;
        vertical-align: bottom;
    }

    .comment_enter ul li a.reg {
        width: 110px;
        height: 160px;
        border: 1px solid #484e5f;
        background: #484e5f;
        text-align: center;
        line-height: 158px;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
    }

    .comment_enter ul li a {
        display: block;
        float: left;
    }

    .comment_enter ul li a.name {
        color: #36393f;
        font-weight: 500;
        cursor: pointer;
    }

.comment_enter ul li a.name.reply::before {
    content: '';
    display: inline-block;
    margin: -4px 13px 0 0;
    width: 8px;
    height: 8px;
    border-left: 1px solid #6a6e76;
    border-bottom: 1px solid #6a6e76;
    vertical-align: middle;
}
</style>
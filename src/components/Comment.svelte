<script>
    import { DF_UI } from "../constants/resourcePath";
    import { userInfo, isLoggedIn } from "../utils/auth";
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from 'svelte';
    import { formatDate } from "../utils/time";

    let placeHolder = "비방, 욕설, 도배글 등은 서비스 이용제한 사유가 될 수 있습니다.";
    if (!$isLoggedIn) {
        placeHolder = "로그인 후 댓글 쓰기가 가능합니다."
    }

    let contents = "";
    let isFocused = false;

    const url = window.location.pathname;
    let articleId = 0;
    let reCommentId = 0;
    let comments = [];
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

    async function fetchComments() {
        const response = await apiFetch(API.COMMENTS.LIST(articleId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            comments = response.comments;
        }
    }

    onMount(async () => {
        await fetchComments();
    })
</script>


<article class="comment">
    <div class="comment_top">
        <dl>
            <dt id="comment_count_dt">댓글 <b>{ comments.length }</b></dt>
            <dd>
                <a class="go_reply">댓글 쓰러 가기</a>
                <a href="javascript:void(0);" id="move_to_last_comment"><img src="{DF_UI}/img/board/comment_ico_move.png" alt=""> 최신 댓글 이동</a>
                <a href="javascript:void(0);" id="refresh_comment_button"><img src="{DF_UI}/img/board/comment_ico_ref.png" alt=""> 댓글 새로고침</a>
            </dd>
        </dl>
    </div>

    <!-- <div class="comment_best" id="comment_best_area"></div> -->

    <div class="comment_list">
        <div id="comment_group_area">
            {#each comments as comment}
                <div class="cmt_group" data-comment_id={comment.id} id={"nor_cmt_div_" + comment.id}>
                    <ul>
                        <li>
                            <a class="name dnf_charac_name_tag" data-sv="1" data-key="{ comment.id }" data-characname={ comment.userId }>
                                { comment.userId }
                            </a>
                        </li>
                        <li>{comment.contents}</li>
                        <li>
                            <a>{ formatDate(comment.createDate) }</a>
                            <a href="javascript:void(0);" class="del">삭제</a>
                        </li>
                    </ul>
                    <div class="cmt_btnarea">
                        <div class="vam">
                            <!-- <a class="like ">0</a> -->
                            <a class="gocmt">답글쓰기</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        
        <div class="comment_enter" id="newCommentArea">
            <ul id="uiSticker" class="textarea">
                <li>
                    <a class="name">{ $userInfo }</a>
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
    </div>
</article>


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .comment {
        position: relative;
    }

    .comment_top {
        position: relative;
        margin: 54px 0 14px 0;
    }

    .comment_top dl {
        position: relative;
        height: 36px;
        overflow: hidden;
    }

    .comment_top dl dt {
        float: left;
        color: #6a6e76;
        font-size: 18px;
        font-weight: 400;
        line-height: 36px;
    }

    .comment_top dl dt b {
        margin-left: -3px;
        color: #36393f;
        font-weight: 500;
    }

    .comment_top dl dd {
        float: right;
        font-size: 0;
    }

    a {
        text-decoration: none;
    }

    .comment_top dl dd a.go_reply {
        background: #3392ff;
        color: #fff;
        border: none;
    }

    .comment_top dl dd a {
        display: inline-block;
        margin-left: 4px;
        width: 130px;
        height: 36px;
        border: 1px solid #e0e2ec;
        background: #f8f9fb;
        line-height: 34px;
        color: #6a6e76;
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
    }

    .comment_top dl dd a img {
        display: inline-block;
        margin-top: 10px;
        vertical-align: top;
        max-width: 100%;
    }

    /* .comment_best {
        position: relative;
        background: #f4f9ff;
    } */

    .comment_enter {
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

    /* 댓글 리스트 스타일 */
    .cmt_group {
        display: flex;
        align-items: center;
        position: relative;
        border-top: 1px solid #eeedf2;
    }

    .cmt_group ul {
        padding: 35px 0 35px 30px;
        position: relative;
        width: 1100px;
    }

    .cmt_group ul li {
        position: relative;
        clear: both;
        word-break: break-all;
        word-wrap: break-word;
    }

    .cmt_group ul li a {
        display: block;
        float: left;
        height: 28px;
        line-height: 26px;
        color: #898c92;
        font-size: 14px;
        font-weight: 400;
    }

    .cmt_group ul li a.name {
        color: #36393f;
        font-weight: 500;
        cursor: pointer;
    }

    .cmt_group ul li a {
        line-height: 28px;
    }

    .cmt_group ul li a.del {
        color: #36393f;
        font-weight: 500;
    }

    .cmt_group ul li:nth-child(2) {
        display: block;
        padding: 11px 0;
        color: #36393f;
        font-size: 15px;
        font-weight: 400;
        line-height: 28px;
        overflow: hidden;
    }

    .cmt_group ul li {
        position: relative;
        clear: both;
        word-break: break-all;
        word-wrap: break-word;
    }

    .cmt_group ul li:nth-child(3) a:nth-child(1) {
        margin-right: 30px;
    }

    /* 댓글 좋아요 및 답글 버튼 스타일 */
    .cmt_group .cmt_btnarea {
        margin-left: auto;
        width: 140px;
    }

    .cmt_group .cmt_btnarea a.gocmt {
        height: 35px;
        line-height: 33px;
        font-size: 12px;
    }

    .cmt_group .cmt_btnarea a {
        display: block;
        width: 110px;
        background: #f8f9fb;
        border: 1px solid #e0e2ec;
        border-radius: 3px;
        color: #6a6e76;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
    }
</style>
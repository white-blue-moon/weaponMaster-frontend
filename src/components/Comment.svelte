<script>
    import { DF_UI } from "../constants/resourcePath";
    import { userInfo, isLoggedIn, isAdmin, adminToken } from "../utils/auth";
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { onMount } from 'svelte';
    import { formatDate } from "../utils/time";
    import { ARTICLE_TYPE, CATEGORY_TYPE } from "../constants/articles";

    import CommentEnter from "./CommentEnter.svelte";
    import AdminAuthor from "./AdminAuthor.svelte";
    import Spinner from "./Spinner.svelte";

    export let categoryType;
    export let articleType;
    export let author;

    const url = window.location.pathname;
    let articleId = 0;
    if (/\d+$/.test(url)) {
        articleId = url.split('/').pop();
    }

    let comments       = [];
    let normalComments = [];
    let replyComments  = [];

    const replyCommentsList = [];

    let deleteLoadingMap = {}; // (commentId: true/false)

    async function handleDelete(commentId) {
        const isConfirm = confirm("정말 해당 댓글을 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        deleteLoadingMap[commentId] = true;

        const response = await apiFetch(API.COMMENTS.DELETE(commentId), {
            method: 'DELETE',
            body: JSON.stringify({
                "userId":     $userInfo,
                "isAdmin":    $isAdmin,
                "articleId":  articleId,
                "adminToken": $adminToken,
            }),
        }).catch(handleApiError);

        if (response.success) {
            deleteLoadingMap[commentId] = false;
            alert('댓글이 삭제되었습니다.');
            location.reload();
            return;
        }
        
        deleteLoadingMap[commentId] = false;
        alert('댓글 삭제에 실패하였습니다.');
        return;
    }

    async function fetchComments() {
        const response = await apiFetch(API.COMMENTS.LIST(articleId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            comments = response.data;

            // 1. normalComments와 replyComments 분리
            normalComments = comments.filter((comment) => comment.reCommentId == 0);
            replyComments  = comments.filter((comment) => comment.reCommentId > 0);

            // 2. replyComments를 reCommentId 기준으로 그룹화
            replyComments.forEach((comment) => {
              if (!replyCommentsList[comment.reCommentId]) {
                replyCommentsList[comment.reCommentId] = [];
              }

              replyCommentsList[comment.reCommentId].push(comment);
            });
        }
    }

    onMount(async () => {
        await fetchComments();
    })

    function isPrivacyArticle() {
        if (categoryType == CATEGORY_TYPE.SERVICE_CENTER)
            if (articleType == ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT) {
                return true;
            }
        
        return false;
    }

    // 각 댓글별로 답글창 ON/OFF 상태 관리
    let reCommentVisible = {}; 
    function toggleReply(commentId) {
        reCommentVisible[commentId] = !reCommentVisible[commentId];
    }
</script>


<article class="comment">
    <div class="comment_top">
        <dl>
            <dt id="comment_count_dt">댓글 <b>{ comments.length }</b></dt>
            <dd>
                <a class="go_reply">댓글 쓰러 가기</a>
                <a id="move_to_last_comment"><img src="{DF_UI}/img/board/comment_ico_move.png" alt=""> 최신 댓글 이동</a>
                <a id="refresh_comment_button"><img src="{DF_UI}/img/board/comment_ico_ref.png" alt=""> 댓글 새로고침</a>
            </dd>
        </dl>
    </div>

    <!-- <div class="comment_best" id="comment_best_area"></div> -->

    <div class="comment_list">
        <div id="comment_group_area">
            {#each normalComments as comment}
                <div class="cmt_group">
                    {#if comment.isDeleted}
                        <ul>
                            <li><b>작성자 또는 관리자에 의해 삭제된 글입니다.</b></li>
                        </ul>
                    {:else}
                        <ul>
                            <!-- 이름 -->
                            <li>
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <a class="name dnf_charac_name_tag">
                                    {#if comment.isAdminMode}
                                        <AdminAuthor />
                                    {:else}
                                        { comment.userId }
                                    {/if}
                                </a>
                            </li>
                            <!-- 댓글 내용 -->
                            <li>{ @html comment.contents}</li>

                            <li>
                                <!-- 작성일 -->
                                <a>{ formatDate(comment.createDate) }</a>

                                <!-- 삭제 버튼 -->
                                {#if $isAdmin || comment.userId == $userInfo}
                                    <a class="del" on:click={ handleDelete(comment.id) }>
                                        {#if deleteLoadingMap[comment.id]}<Spinner />{/if} 삭제
                                    </a>
                                {/if}
                            </li>
                            
                        </ul>

                        <!-- {#if !isPrivacyArticle()} -->
                            <!-- 답글쓰기 버튼 -->
                            <div class="cmt_btnarea">
                                <div class="vam">
                                    <!-- <a class="like ">0</a> -->
                                    <a class="gocmt" on:click={ toggleReply(comment.id) }>
                                        { reCommentVisible[comment.id] ? "답글취소" : "답글쓰기" }
                                    </a>
                                </div>
                            </div>
                        <!-- {/if} -->
                    {/if}
                </div>

                {#if reCommentVisible[comment.id]}
                    {#if isPrivacyArticle() }
                        {#if author == $userInfo || $isAdmin }
                            <CommentEnter reCommentId={comment.id} /> <!-- 1:1 문의는 작성자/관리자 에게만 댓글 허용 -->
                        {:else}
                            <CommentEnter reCommentId={comment.id} privacyMode={ true }/>
                        {/if}
                    {:else}
                        <CommentEnter reCommentId={comment.id} />
                    {/if}
                {/if}

                {#if replyCommentsList[comment.id]}
                    {#each replyCommentsList[comment.id] as replyComment}
                        <div class="cmt_group reply">
                            {#if replyComment.isDeleted}
                                <ul>
                                    <li><b>작성자 또는 관리자에 의해 삭제된 글입니다.</b></li>
                                </ul> 
                            {:else}
                                <ul>
                                    <!-- 이름 -->
                                    <li>
                                        <!-- svelte-ignore a11y-missing-attribute -->
                                        <a class="name dnf_charac_name_tag">
                                            {#if replyComment.isAdminMode}
                                                <AdminAuthor />
                                            {:else}
                                                { replyComment.userId }
                                            {/if}
                                        </a>
                                    </li>
                                    
                                    <!-- 댓글 내용 -->
                                    <li>{ @html replyComment.contents }</li>
                                    
                                    <li>
                                        <!-- 작성일 -->
                                        <a>{ formatDate(replyComment.createDate) }</a>

                                        <!-- 삭제 버튼 -->
                                        {#if $isAdmin || replyComment.userId == $userInfo}
                                            <a class="del" on:click={ handleDelete(replyComment.id) }>
                                                {#if deleteLoadingMap[replyComment.id]}<Spinner />{/if} 삭제
                                            </a>
                                        {/if}
                                    </li>
                                
                                </ul>               
                            {/if} 
                        </div>
                    {/each}
                {/if}
            {/each}
        </div>

        {#if isPrivacyArticle() }
            {#if author == $userInfo || $isAdmin }
                <CommentEnter /> <!-- 1:1 문의는 작성자/관리자 에게만 댓글 허용 -->
            {:else}
                <CommentEnter privacyMode={ true }/>
            {/if}
        {:else}
            <!-- 댓글 입력 창 -->
            <CommentEnter />
        {/if}
    </div>
</article>


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
        cursor: pointer;
    }

    .cmt_group ul li b {
        color: #6a6e76;
        font-size: 14px;
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

    /* 대댓글 스타일 */
    .comment_list .cmt_group.reply {
        margin-top: -5px;
        border-top: none;
    }

    .comment_list .cmt_group.reply ul {
        padding: 0 0 35px 30px;
    }

    .comment_list .cmt_group.reply li a.name::before,  .comment_list .cmt_group.reply li b::before{
        content: '';
        display: inline-block;
        margin: -4px 13px 0 0;
        width: 8px;
        height: 8px;
        border-left: 1px solid #6a6e76;
        border-bottom: 1px solid #6a6e76;
        vertical-align: middle;
    }

    .comment_list .cmt_group.reply li:nth-child(n+2):nth-child(-n+3) {
        padding-left: 20px;
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
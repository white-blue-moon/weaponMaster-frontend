<script>
    import { userInfo, isAdmin, adminToken, isLoggedIn } from "../../utils/auth";
    import { isAuthorOrAdmin, isPrivacyArticle } from "../../utils/authUtil";
    import { formatDate } from "../../utils/time";
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { API } from '../../constants/api';
    import { getArticleIdFromUrl } from "../../utils/pathUtiil";

    import AdminAuthor from '../AdminAuthor.svelte';
    import Spinner from '../Spinner.svelte';
    import CommentEnter from "./CommentEnter.svelte";
  
    export let comment = {};
    export let articleInfo;
    export let isReply = false;

    const { categoryType, articleType, author } = articleInfo;
    const articleId = getArticleIdFromUrl();

    let isDeleteLoading  = false;
    let reCommentVisible = false; 

    async function handleDelete(commentId) {
        const isConfirm = confirm("정말 해당 댓글을 삭제하시겠습니까?");
        if (!isConfirm) {
            return;
        }

        isDeleteLoading = true;

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
            isDeleteLoading = false;
            alert('댓글이 삭제되었습니다.');
            location.reload();
            return;
        }
        
        isDeleteLoading = false;
        alert('댓글 삭제에 실패하였습니다.');
        return;
    }

    function toggleReply() {
        reCommentVisible = !reCommentVisible;
    }

    function showReplyButton() {
        if (!$isLoggedIn) {
            return false;
        }

        if (isReply) {
            return false;
        }

        // 1:1 문의는 작성자/관리자에게만 버튼 표시
        if (isPrivacyArticle(categoryType, articleType)) {
            if (isAuthorOrAdmin(author)) {
                return true;
            }

            return false;
        }

        // 일반 게시글이면 모두 표시
        return true;
    }
</script>

  
<div class="cmt_group {isReply ? 'reply' : ''}">
    {#if comment.isDeleted}
        <ul><li><b>작성자 또는 관리자에 의해 삭제된 글입니다.</b></li></ul>
    {:else}
        <ul>
            <!-- 이름 -->
            <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="name dnf_charac_name_tag">
                    {#if comment.isAdminMode}
                        <AdminAuthor />
                    {:else}
                        {comment.userId}
                    {/if}
                </a>
            </li>

            <!-- 댓글 내용 -->
            <li>{@html comment.contents}</li>

            <li>
                <!-- 작성일 -->
                <a>{ formatDate(comment.createDate) }</a>

                <!-- 삭제 버튼 -->
                {#if isAuthorOrAdmin(comment.userId)}
                    <a class="del" on:click={() => handleDelete(comment.id)}>
                        {#if isDeleteLoading}<Spinner />{/if} 삭제
                    </a>
                {/if}
            </li>
        </ul>

        {#if showReplyButton()}
            <!-- 답글쓰기 버튼 -->
            <div class="cmt_btnarea">
                <div class="vam">
                    <!-- <a class="like ">0</a> -->
                    <a class="gocmt" on:click={() => toggleReply(comment.id)}>
                        {reCommentVisible ? "답글취소" : "답글쓰기"}
                    </a>
                </div>
            </div>
        {/if}
    {/if}
</div>

<!-- 답글 입력 -->
{#if reCommentVisible}
    <CommentEnter reCommentId={comment.id} articleInfo={ articleInfo } />
{/if}


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
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

    /* 답글쓰기 버튼 스타일 */
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

    /* 대댓글 스타일 */
    .cmt_group.reply {
        margin-top: -5px;
        border-top: none;
    }

    .cmt_group.reply ul {
        padding: 0 0 35px 30px;
    }

    .cmt_group.reply li a.name::before, .cmt_group.reply li b::before{
        content: '';
        display: inline-block;
        margin: -4px 13px 0 0;
        width: 8px;
        height: 8px;
        border-left: 1px solid #6a6e76;
        border-bottom: 1px solid #6a6e76;
        vertical-align: middle;
    }

    .cmt_group.reply li:nth-child(n+2):nth-child(-n+3) {
        padding-left: 20px;
    }
</style>

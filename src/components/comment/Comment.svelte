<script>
    import { DF_UI } from "../../constants/resourcePath";
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { onMount } from 'svelte';
    import { getArticleIdFromUrl } from "../../utils/pathUtiil";

    import CommentItem from "./CommentItem.svelte";
    import CommentEnter from "./CommentEnter.svelte";


    export let categoryType;
    export let articleType;
    export let author;

    const articleId   = getArticleIdFromUrl();
    const articleInfo = {
        categoryType,
        articleType,
        author,
    };

    let comments       = [];
    let normalComments = [];
    let replyComments  = [];

    const replyCommentsList = [];

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

    function scrollToElement(event, elementId) {
        event.preventDefault();

        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }

        return;
    }
</script>


<article class="comment">
    <div class="comment_top">
        <dl>
            <dt id="comment_count_dt">댓글 <b>{ comments.length }</b></dt>
            <dd>
                <a class="go_reply" on:click={(e) => scrollToElement(e, "commentEnter")}>댓글 쓰러 가기</a>
                <!-- TODO 추후 구현 필요 -->
                <a style="cursor: default;" id="move_to_last_comment"><img src="{DF_UI}/img/board/comment_ico_move.png" alt=""> 최신 댓글 이동</a>
                <!-- TODO 추후 구현 필요 -->
                <a style="cursor: default;" id="refresh_comment_button"><img src="{DF_UI}/img/board/comment_ico_ref.png" alt=""> 댓글 새로고침</a>
            </dd>
        </dl>
    </div>

    <!-- <div class="comment_best" id="comment_best_area"></div> -->

    <div class="comment_list">
        <div id="comment_group_area">
            {#each normalComments as comment}
                <!-- 댓글 -->
                <CommentItem comment={ comment } articleInfo={ articleInfo } />
            
                <!-- 대댓글 -->
                {#if replyCommentsList[comment.id]}
                    {#each replyCommentsList[comment.id] as replyComment}
                        <CommentItem comment={ replyComment } articleInfo={ articleInfo }  isReply={ true } />
                    {/each}
                {/if}
            {/each}
          </div>

        <!-- 댓글 입력 -->
        <div id="commentEnter">
            <CommentEnter articleInfo={ articleInfo } />
        </div>
    </div>
</article>


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
</style>
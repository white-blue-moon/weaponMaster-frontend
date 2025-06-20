<script>
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { userInfo, isLoggedIn, isAdmin, adminToken } from "../../utils/auth";
    import { onDestroy, onMount } from 'svelte';
    import { CATEGORY_TYPE_TEXT, ARTICLE_TYPE_TEXT, ARTICLE_DETAIL_TYPE_TEXT } from "../../constants/articles";
    import { PATHS } from "../../constants/paths";
    import { getPageInfo, getCategoryTypeByURL, isDetailTypeExist } from "../../utils/page";
    import { getArticleIdFromUrl } from '../../utils/pathUtiil';
    import { destroyQuillEditor, initQuillEditor } from '../../utils/quillEditor';
    
    import 'quill/dist/quill.snow.css';

    import GnbPublisher from "../GnbPublisher.svelte";
    import HeaderBanner from "../banner/HeaderBanner.svelte";
    import Gnb from "../Gnb.svelte";
    import Menu2nd from "../Menu2nd.svelte";
    import Footer from "../Footer.svelte";
    import Spinner from '../Spinner.svelte';
    import Top from '../Top.svelte';

    const url = window.location.pathname;

    let categoryType      = getCategoryTypeByURL(url);
    let articleType       = 0;
    let articleDetailType = 0;

    const articleTypes       = Object.keys(ARTICLE_TYPE_TEXT[categoryType]);
    let   articleDetailTypes = [];

    let title    = '';
    let contents = '';
    let editor;

    let isEditMode = /\d+$/.test(url); // 마지막 URL이 숫자로 끝나면 편집모드
    let cachedArticleType = 0;

    let article  = null;
    let pageId   = getArticleIdFromUrl();
    let pageInfo = getPageInfo(categoryType, articleType);

    let isLoading = false;

    onMount(async () => {
        editor = initQuillEditor('#editor', html => {
            contents = html;
        });

        if (isEditMode) {
            await fetchArticle();
        }
    });

    onDestroy(() => {
        destroyQuillEditor(editor);
    });

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.data;

            categoryType          = article.categoryType;
            articleType           = article.articleType;
            articleDetailType     = article.articleDetailType;
            title                 = article.title;
            editor.root.innerHTML = article.contents;
            contents              = article.contents;

            cachedArticleType  = articleType;
            articleDetailTypes = isDetailTypeExist(categoryType, articleType)? 
                Object.keys(ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType]) : [];
            
            return;
        }

        console.log("수정을 위한 게시물 정보 불러오기에 실패하였습니다.");
        return;
    }

    function isArticleValid() {
        if (!$isLoggedIn) {
            alert('로그인 후 이용하여 주세요.');
            window.location.href = PATHS.ACCOUNT.LOGIN;
            return false;
        }

        if (articleType == 0) {
            alert('게시물 위치를 선택하지 않았습니다.');
            return false;
        }
        
        if (isDetailTypeExist(categoryType, articleType) && articleDetailType == 0) {
            alert('게시물 분류 항목을 선택해 주세요.');
            return false;
        }

        if (title.trim() == '') {
            alert('제목을 입력하여 주세요.');
            return false;
        }

        if (editor.getText().trim() == '') {
            alert('본문 내용을 입력하여 주세요.');
            return false;
        }

        return true;
    }

    async function handleRegister() {
        if (!isArticleValid()) {
            return;
        }

        if (isLoading) {
            return;
        }

        isLoading = true;

        let action    = '등록';
        let apiMethod = 'POST';
        let apiURL    = API.ARTICLES.CREATE;
        
        if (isEditMode) {
            action    = '수정';
            apiMethod = 'PUT';
            apiURL    = API.ARTICLES.UPDATE(pageId);
        }

        const response = await apiFetch(apiURL, {
            method: apiMethod,
            body: JSON.stringify({
                "isAdminMode":       $isAdmin,
                "userId":            $userInfo,
                "categoryType":      categoryType,
                "articleType":       articleType,
                "articleDetailType": articleDetailType,
                "title":             title,
                "contents":          contents,
                "adminToken":        $adminToken,
            }),
        }).catch(handleApiError);

        if (response.success) {
            isLoading = false;
            pageId    = response.data;
            alert(`게시물 ${action}이 완료되었습니다.`);
            window.location.href = pageInfo.readPath(pageId);
            return;
        }

        isLoading = false;
        alert(`게시물 ${action}에 실패하였습니다.`);
        return;
    }

    function handleCancle() {
        const action    = isEditMode ? "수정" : "작성";
        const isConfirm = confirm(`정말 게시물 ${action}을 취소하시겠습니까?`);
        if (isConfirm) {
            if (isEditMode) {
                window.location.href = pageInfo.readPath(pageId);
                return;
            }
            
            window.location.href = pageInfo.listPath;
            return;
        }

        return;
    }

    // articleType 변경 시 articleDetailTypes 초기화
    $: if (articleType !== cachedArticleType) {
        articleDetailType = 0;
        articleDetailTypes = isDetailTypeExist(categoryType, articleType)? 
            Object.keys(ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType]) : [];

        cachedArticleType = articleType;
    }
</script>


<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner
            isLogoVisible={ false }
            bannerText={ CATEGORY_TYPE_TEXT[categoryType] }
            bannerBackground={ pageInfo.bannerBackground }
        />
    </div>
</div>
<Menu2nd categoryType={ categoryType } isActiveOn={ false }/>

<section class="content">
    <!-- 게시물 타입: 라디오 버튼 -->
    <article class="community_header h_wrt">
        <div class="category_wrt">
            <div class="split_cont">
                <div class="split_left_controls">
                    {#each articleTypes as article_type, idx}
                        {#if ARTICLE_TYPE_TEXT[categoryType][article_type] != "전체"}
                            <p>
                                <input 
                                    type="radio" 
                                    name="articleType" 
                                    id="0{ idx }" 
                                    value={ Number(article_type) } 
                                    bind:group={ articleType }
                                >
                                <label for="0{ idx }">
                                    <span></span>{ ARTICLE_TYPE_TEXT[categoryType][article_type] }
                                </label>
                            </p>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </article>
    
    <!-- 분류 항목 -->
    {#if isDetailTypeExist(categoryType, articleType)}
        <article class="article_slt" style="padding:13px 0">      
            <select bind:value={ articleDetailType }>
                <option value={ 0 } disabled selected>분류 항목 선택</option>
                {#each articleDetailTypes as article_detail_type}
                    <option value={ Number(article_detail_type) }>
                        { ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType][article_detail_type] }
                    </option>
                {/each}  
            </select>  
            <dl>
                <dt class="infotxt">분류 항목을 선택해 주세요.</dt>
            </dl>
        </article>
    {/if}

    <!-- 제목 -->
    <article class="board_write">
        <ul>
            <li><input type="text" id="title" bind:value={ title } placeholder="제목을 입력해 주세요."></li>
            <li id="editor" class="editor_area"></li>
        </ul>
    </article>

    <!-- 버튼 -->
    <article class="btnarea mt40">
        <a class="btn btntype_bu46 bold mar" style="width:140px" on:click={ handleRegister }>
            {#if isLoading}<Spinner colorTheme="white"/>{/if}
            {#if isEditMode}
                수정
            {:else}
                등록
            {/if}
        </a>
        <a class="btn btntype_bk46 bold" style="width:140px" on:click={ handleCancle }>취소</a>
    </article>
</section>

<Top />

<div class="footer">
    <Footer />
</div>


<style lang="scss">
    * {
        margin: 0;
        box-sizing: border-box;
    }

    .menu {
        position: relative;
        height: 300px;
    }

    .menu .header-banner {
        position: absolute;
        width: 100%;
        top: 0;
    }

    a {
        text-decoration: none;
    }

    .content {
        margin: 63px auto 0 auto;
        width: 1300px;
        min-height: 500px;
    }

    /* 게시물 타입 선택 */
    .community_header.h_wrt {
        height: 73px;
    }

    .community_header {
        position: relative;
        margin-top: 23px;
        width: 1300px;
        border-bottom: 1px solid #eeedf2;
    }

    .category_wrt {
        position: relative;
        padding-left: 9px;
        font-size: 0;
        border-top: 1px solid #eeedf2;
        height: 100px;
    }

    .split_cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .split_left_controls {
        display: flex;
    }

    .category_wrt p {
        display: inline-block;
        margin: 23px 50px 0 0;
    }

    input[type="radio"] {
        display: none;
    }

    .category_wrt p label {
        color: #6a6e76;
        font-size: 14px;
        font-weight: 500;
    }

    input[type="radio"] + label {
        display: inline-block;
        cursor: pointer;
    }

    input[type="radio"] + label span {
        display: inline-block;
        padding: 0;
        margin: -3px 5px 0 0;
        width: 15px;
        height: 15px;
        background: url("#{$DF_UI}/img/form/radio.png") no-repeat;
        vertical-align: middle;
        cursor: pointer;
    }

    input[type="radio"]:checked + label span {
        background: url("#{$DF_UI}/img/form/radio.png") no-repeat 0 -100px;
    }

    .category_wrt p span {
        margin-right: 8px !important;
    }


    /* 분류 항목d 선택 */
    .article_slt {
        position: relative;
        float: left;
        clear: both;
    }

    .article_slt > select {
        display: block;
        float: left;
        padding: 0 23px;
        width: 250px;
        height: 45px;
        border: 2px solid #36393f;
        border-radius: 41px;
        background: #fff url("#{$DF_UI}/img/board/arrow_tri_dn_21x21.png") no-repeat right 13px top 10px;
        color: #36393f;
        font-size: 14px;
        font-weight: 500;
        line-height: 41px;
        cursor: pointer;
        appearance: none; /* 기본 브라우저 스타일 제거 */
    }

    .article_slt dl {
        float: left;
        margin-left: 20px;
    }

    .article_slt dl dt::before {
        content: "";
        float: left;
        padding: 0 10px 0 20px;
        height: 35px;
        line-height: 34px;
        border-left: 1px solid #eeedf2;
        color: #6a6e76;
        font-size: 14px;
        font-weight: 500;
    }

    .article_slt dl dt.infotxt {
        padding: 0 0 0 10px;
        border: none;
        color: #a2a5ac;
        font-size: 14px;
        font-weight: 400;
        margin-top: 5px;
        float: left;
        height: 35px;
        line-height: 34px;
    }

    input::placeholder {
        color: #a2a5ac;
    }

    /* 제목 입력을 포함한 입력창 */
    .board_write {
        position: relative;
        padding: 0;
        margin: 0;
        border-top: 1px solid #eeedf2;
        clear: both;
    }

    .board_write ul {
        position: relative;
        padding: 0;
        margin: 0;
    }

    .board_write ul li:first-child {
        border-bottom: 1px solid #eeedf2;
    }

    .board_write ul li {
        position: relative;
    }

    li {
        list-style: none;
    }

    .board_write ul li input {
        height: 71px;
        line-height: 70px;
        border: none;
        font-size: 16px;
        color: #6a6e76;
    }

    input[type="text"] {
        display: block;
        width: 100%;
        background: #fff;
    }

    // Quill 에디터
    :global(.ql-toolbar) {
        display: flex;
        padding-bottom: 0 !important;
    }

    :global(.ql-editor) {
        height: 400px;
    }

    /* 버튼 영역 */
    .btnarea {
        text-align: center;
        font-size: 0;
    }

    .mt40 {
        margin-top: 40px !important;
    }

    .btnarea a.mar {
        margin-right: 4px;
    }

    .btntype_bu46 {
        height: 46px;
        line-height: 45px;
        background: #3392ff;
        color: #fff;
        font-size: 13px;
    }

    .btn {
        position: relative;
        display: inline-block;
        min-width: 90px;
        text-align: center;
        cursor: pointer;
    }

    .bold {
        font-weight: 500 !important;
    }

    .btntype_bk46 {
        height: 46px;
        line-height: 45px;
        background: #484e5f;
        color: #fff;
        font-size: 13px;
    }

    .footer {
        margin-top: 160px !important;
        padding-top: 19px;
        border-top: 1px solid #e0e2ec;
    }
</style>

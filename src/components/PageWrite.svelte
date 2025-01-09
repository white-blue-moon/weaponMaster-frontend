<script>
    import { DF_UI } from "../constants/resourcePath";
    import { API } from '../constants/api';
    import { apiFetch, handleApiError } from '../utils/apiFetch';
    import { userInfo, isLoggedIn } from "../utils/auth";
    import { onMount } from 'svelte';
    import { CATEGORY_TYPE, ARTICLE_TYPE, ARTICLE_TYPE_TEXT, ARTICLE_DETAIL_TYPE, ARTICLE_DETAIL_TYPE_TEXT } from "../constants/articles";
    import { PATHS } from "../constants/paths";
    import { getPage, getCategoryTypeByURL, isDetailTypeExist } from "../constants/page";
    import Quill from 'quill';
    import 'quill/dist/quill.snow.css';

    import GnbPublisher from "../components/GnbPublisher.svelte";
    import HeaderBanner from "../components/HeaderBanner.svelte";
    import Gnb from "../components/Gnb.svelte";
    import Menu2nd from "./Menu2nd.svelte";
    import Footer from "../components/Footer.svelte";

    const url = window.location.pathname;

    let categoryType = getCategoryTypeByURL(url);
    let articleType = 0;
    let articleDetailType = 0;
    let title = ''; // 제목 입력 값
    let contents = ''; // 본문 내용 HTML
    let editor;

    let isEditPage = false;
    let article = null;
    let pageId;
    let page = getPage(categoryType, articleType);

    // 마지막 문자열이 숫자인지 확인하는 정규식
    if (/\d+$/.test(url)) {
        isEditPage = true;
        pageId = url.split('/').pop();
    }

    onMount(async () => {
        editor = new Quill('#editor', {
            theme: 'snow',
            placeholder: '여기에 내용을 입력하세요...',
            modules: {
                toolbar: [
                    [{ 'header': 1 }, { 'header': 2 }], // 헤더 스타일
                    ['bold', 'underline', 'strike'], // 글씨 스타일
                    [{ 'font': [] }], // 폰트
                    [{ 'size': ['small', false, 'large', 'huge'] }], // 글씨 크기
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 목록
                    [{ 'align': [] }], // 텍스트 정렬
                    [{ 'color': [] }, { 'background': [] }], // 텍스트 색상 및 배경색
                    ['link'], // 링크 기능
                ]
            }
        });

        const ql_editor = document.querySelector('.ql-editor');
        if (ql_editor) {
            // 영문과 달리 한글을 한 글자만 입력했을 때에는 placeholder 가 사라지지 않는 현상이 있어서 직접 추가
            ql_editor.addEventListener('compositionstart', () => {
                ql_editor.classList.remove('ql-blank');
            });

            // Quill 에디터는 div를 사용하여 placeholder 스타일이 기본적으로 ::before 가상 요소를 통해 구현되어 있기 때문에 직접 수정
            ql_editor.classList.add('custom-placeholder'); // 새 클래스 추가
            const style = document.createElement('style');
            style.textContent = `
                .custom-placeholder.ql-blank::before {
                    font-style: normal; /* 기울이지 않음 */
                    color: grey;        /* 선택 사항: 텍스트 색상 */
                }
            `;
            document.head.appendChild(style);
        }

        // 에디터 내용 업데이트
        editor.on('text-change', () => {
            contents = editor.root.innerHTML;
        });

        if (isEditPage) {
            await fetchArticle();

            categoryType = article.categoryType;
            articleType = article.articleType;
            articleDetailType = article.articleDetailType;
            title = article.title;
            editor.root.innerHTML = article.contents;
            contents = article.contents;
        }
    });

    async function fetchArticle() {
        const response = await apiFetch(API.ARTICLES.READ(pageId), {
            method: 'GET',
        }).catch(handleApiError);

        if (response.success) {
            article = response.articles[0];
        }
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

        // (새소식 - 공지사항) : 분류 항목 선택 필수
        if (categoryType == CATEGORY_TYPE.NEWS && articleType == ARTICLE_TYPE.NEWS.NOTICE && articleDetailType == 0) {
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

        let apiMethod = 'POST';
        let apiURL = API.ARTICLES.CREATE;
        if (isEditPage) {
            apiMethod = 'PUT';
            apiURL = API.ARTICLES.UPDATE(pageId);
        }

        const response = await apiFetch(apiURL, {
            method: apiMethod,
            body: JSON.stringify({
                "categoryType": categoryType,
                "articleType": articleType,
                "articleDetailType": articleDetailType,
                "title": title,
                "contents": contents,
                "author": $userInfo,
            }),
        }).catch(handleApiError);

        if (response.success) {
            alert('게시물 등록이 완료되었습니다.');
            window.location.href = page.listPath;
            return;
        }

        alert('게시물 등록에 실패하였습니다.');
        return;
    }

    function handleCancle() {
        const isConfirm = confirm("정말 게시물 작성을 취소하시겠습니까?");
        if (isConfirm) {
            if (isEditPage) {
                window.location.href = page.readPath(pageId);
                return;
            }
            
            window.location.href = page.listPath;
            return;
        }

        return;
    }

    const articleTypes = Object.keys(ARTICLE_TYPE_TEXT[categoryType]);
    let articleDetailTypes = [];
    $: {
        if (articleType != 0 && isDetailTypeExist(categoryType, articleType)) {
            articleDetailTypes = Object.keys(ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType]);
        } else {
            articleDetailTypes = [];
        }
    }
</script>

<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner
            bannerText={ page.bannerText }
            isLogoVisible={ false }
            bannerBackground={ page.bannerBackground }
        />
    </div>
</div>
<Menu2nd categoryType={categoryType } isActiveOn={ false }/>

<section class="content">
    <article class="community_header h_wrt">
        <div class="category_wrt">
            <div class="split_cont">
                <div class="split_left_controls">
                    {#each articleTypes as type, idx}
                        {#if ARTICLE_TYPE_TEXT[categoryType][type] != "전체"}
                            <p>
                                <input 
                                    type="radio" 
                                    name="articleType" 
                                    id="0{ idx }" 
                                    value={ type } 
                                    bind:group={ articleType }
                                >
                                <label for="0{ idx }">
                                    <span></span>{ ARTICLE_TYPE_TEXT[categoryType][type] }
                                </label>
                            </p>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </article>
    
    {#if isDetailTypeExist(categoryType, articleType)}
        <article class="article_slt" style="padding:13px 0">      
            <select bind:value={ articleDetailType }>
                <option value="0" disabled selected>분류 항목 선택</option>
                {#each articleDetailTypes as type}
                    <option value={type}>
                        { ARTICLE_DETAIL_TYPE_TEXT[categoryType][articleType][type] }
                    </option>
                {/each}  
            </select>  
            <dl>
                <dt class="infotxt">분류 항목을 선택해 주세요.</dt>
            </dl>
        </article>
    {/if}

    <article class="board_write">
        <ul>
            <li><input type="text" id="title" bind:value={title} placeholder="제목을 입력해 주세요."></li>
            <li id="editor" class="editor_area"></li>
        </ul>
    </article>

    <article class="btnarea mt40">
        <a class="btn btntype_bu46 bold mar" style="width:140px" on:click={ handleRegister }>등록</a>
        <a class="btn btntype_bk46 bold" style="width:140px" on:click={ handleCancle }>취소</a>
    </article>
</section>

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
        padding-top: 50px;
        border-top: 1px solid #e0e2ec;
    }
</style>

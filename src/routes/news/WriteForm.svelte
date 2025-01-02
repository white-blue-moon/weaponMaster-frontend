<script>
    import { DF_UI } from "../../constants/resourcePath";
    import { API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';
    import { userInfo, isLoggedIn } from "../../utils/auth";
    import { onMount } from 'svelte';
    import Quill from 'quill';
    import 'quill/dist/quill.snow.css';

    import GnbPublisher from "../../components/GnbPublisher.svelte";
    import HeaderBanner from "../../components/HeaderBanner.svelte";
    import Gnb from "../../components/Gnb.svelte";
    import Footer from "../../components/Footer.svelte";
    import { PATHS } from "../../constants/paths";

    export let categoryType = 1; // TODO 상수화하기 (+ 카테고리 타입값 분류 필요)
    let articleType = 0;
    let articleDetailType;
    let title = ''; // 제목 입력 값
    let contents = ''; // 본문 내용 HTML

    let editor;

    onMount(() => {
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

        // DOM 조작을 통한 툴바 정렬
        const toolbar = document.querySelector('.ql-toolbar');
        if (toolbar) {
            toolbar.style.display = 'flex';
            toolbar.style.paddingBottom = 0;
        }

        const ql_editor = document.querySelector('.ql-editor');
        if (ql_editor) {
            ql_editor.style.height = '400px';

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
    });

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
        if (categoryType == 1 && articleType == 1 && articleDetailType == 0) {
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

        const response = await apiFetch(API.NEWS.ARTICLES, {
            method: 'POST',
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
            window.location.href = PATHS.NEWS.LIST; // TODO 카테고리 별 경로로 수정 필요
            return;
        }

        alert('게시물 등록에 실패하였습니다.');
        return;
    }
</script>

<GnbPublisher />
<div class="menu">
    <Gnb />
    <div class="header-banner">
        <HeaderBanner
            headerText="새소식"
            isLogoVisible={false}
            bannerBackground="{DF_UI}/img/visual/bg_news.jpg"
        />
    </div>
</div>

<section class="menu2nd">
    <a class="active" href="/news/notice/list">공지사항</a>
    <a href="#">업데이트</a>
    <a href="#">이벤트</a>
    <a href="/news/devnote/list">개발자노트</a>
</section>

<section class="content">
    <article class="community_header h_wrt">
        <div class="category_wrt">
            <div class="split_cont">
                <div class="split_left_controls" style="--article-radio: url({DF_UI}/img/form/radio.png)">
                    <p><input type="radio" name="articleType" id="01" value="1" bind:group={ articleType }><label for="01"><span></span>공지사항</label></p>
                    <p><input type="radio" name="articleType" id="02" value="2" bind:group={ articleType }><label for="02"><span></span>업데이트</label></p>
                    <p><input type="radio" name="articleType" id="03" value="3" bind:group={ articleType }><label for="03"><span></span>이벤트</label></p>
                    <p><input type="radio" name="articleType" id="04" value="4" bind:group={ articleType }><label for="04"><span></span>개발자노트</label></p>
                </div>
            </div>
        </div>
    </article>
    
    <article class="article_slt" style="padding:13px 0">
        <select bind:value={ articleDetailType } style="--article-slt-arrow: url({DF_UI}/img/board/arrow_tri_dn_21x21.png)">
            <option value="0" disabled selected>분류 항목 선택</option>
            <option value="1">일반</option>
            <option value="2">점검</option>
        </select>
        <dl>
            <dt class="infotxt">일반과 점검 중 한 가지를 선택해 주세요.</dt>
        </dl>
    </article>

    <article class="board_write">
        <ul>
            <li><input type="text" id="title" bind:value={title} placeholder="제목을 입력해 주세요."></li>
            <li id="editor" class="editor_area"></li>
        </ul>
    </article>

    <article class="btnarea mt40">
        <a href="#" class="btn btntype_bu46 bold mar" style="width:140px" on:click={ handleRegister }>등록</a>
        <a href="#" class="btn btntype_bk46 bold" style="width:140px">취소</a>
    </article>
</section>

<div class="footer">
    <Footer />
</div>


<style>
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

    .menu2nd {
        position: relative;
        width: 100%;
        height: 80px;
        background: #f8f9fb;
        border: 1px solid #e0e2ec;
        text-align: center;
        font-size: 0;
    }

    .menu2nd a.active {
        color: #36393f;
        border-bottom: 2px solid #36393f;
    }

    .menu2nd a {
        display: inline-block;
        margin: 0 25px;
        color: #898c92;
        font-size: 16px;
        line-height: 77px;
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
        background: var(--article-radio) no-repeat;
        vertical-align: middle;
        cursor: pointer;
    }

    input[type="radio"]:checked + label span {
        background: var(--article-radio) no-repeat 0 -100px;
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
        background: #fff var(--article-slt-arrow) no-repeat right 13px top 10px;
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

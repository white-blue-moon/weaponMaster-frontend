<script>
	import { Router, Route, link } from 'svelte-routing';
	import { PATHS } from './constants/paths';
	import { CATEGORY_TYPE, ARTICLE_TYPE } from './constants/articles';

	import Home from './routes/Home.svelte';
	import Inspection from './routes/Inspection.svelte';
	import Join from './routes/account/Join.svelte';
	import LoginNormal from './routes/account/LoginNormal.svelte';

	import NoticeList from './routes/news/notice/NoticeList.svelte';
	import UpdateList from './routes/news/update/UpdateList.svelte';
	import DevNoteList from './routes/news/devnote/DevNoteList.svelte'
	import PageWrite from './components/PageWrite.svelte';
	import PageRead from './components/PageRead.svelte';
</script>
  
  
<Router>
	<!-- 홈페이지 -->
	<Route path={ PATHS.HOME } component={ Home } />

	<!-- 점검페이지 TODO (추후 홈 링크 타도록 수정 필요) -->
	<Route path={ PATHS.INSPECTION } component={ Inspection } />

	<!-- 계졍 관련 -->
	<Route path={ PATHS.ACCOUNT.JOIN } component={ Join } />
	<Route path={ PATHS.ACCOUNT.LOGIN } component={ LoginNormal } />

	<!-- 새소식 -->
	<Route path={ PATHS.NEWS.NOTICE.LIST } component={ NoticeList } />
	<Route path={ PATHS.NEWS.UPDATE.LIST } component={ UpdateList } />
	<Route path={ PATHS.NEWS.DEV_NOTE.LIST } component={ DevNoteList } />
	<Route path={ PATHS.NEWS.WRITE } component={ PageWrite } />
	<Route path={ PATHS.NEWS.READ_TEPLATE } component={ PageRead } />
	<Route path={ PATHS.NEWS.EDIT_TEMPLATE } component={ PageWrite } />
</Router>
  

<style>
	/* Svelte 에서 기본 세팅된 공백 값 제거 */
	:global(body) {
		padding: 0;
	}
</style>
<script>
	import { Router, Route, navigate } from 'svelte-routing';
	import { PATHS } from './constants/paths';
	import { apiFetch, handleApiError } from './utils/apiFetch';
	import { ADMIN_API } from './constants/api';
	import { onMount } from 'svelte';

	import Home from './routes/Home.svelte';
	import Inspection from './routes/Inspection.svelte';
	import Join from './routes/account/Join.svelte';
	import LoginNormal from './routes/account/LoginNormal.svelte';
	import LoginAdmin from './routes/account/LoginAdmin.svelte';

	import NoticeList from './routes/news/notice/NoticeList.svelte';
	import UpdateList from './routes/news/update/UpdateList.svelte';
	import DevNoteList from './routes/news/devnote/DevNoteList.svelte'
	import PageWrite from './components/PageWrite.svelte';
	import PageRead from './components/PageRead.svelte';

	import AllList from './routes/community/all/AllList.svelte';
	import AskList from './routes/community/ask/AskList.svelte';
	import TalkList from './routes/community/talk/TalkList.svelte';
  	import PrivateContactList from './routes/service/private_contact/PrivateContactList.svelte';

	import HomePagePurpose from './routes/introduce/HomePagePurpose.svelte';
	import HomePageGuide from './routes/guide/HomePageGuide.svelte';

	let isInspectionOn = false;
	let endDate;

	async function fetchActiveInspection() {
		const response = await apiFetch(ADMIN_API.INSPECTIOIN.GET_ACTIVE, {
            method: 'GET',
        }).catch(handleApiError);

		// 점검 중일 때는 모든 경로를 Inspection 으로 리다이렉트
        if (response != null) {	
			if (response.isInspectionOn) {
				isInspectionOn = response.isInspectionOn;
				endDate		   = response.inspection.end_date;
				navigate(PATHS.INSPECTION, { replace: true });
			}
        }
    }

    onMount(async () => {
        await fetchActiveInspection();
    })
</script>
  
  
<Router>
	<!-- 점검 중일 때는 모든 경로를 INSPECTION 으로 리다이렉트 -->
	{#if isInspectionOn}
        <Route path={ PATHS.INSPECTION } let:params>
			<Inspection { endDate }/>
		</Route>
    {:else}
		<!-- 홈 -->
		<Route path={ PATHS.HOME } component={ Home } />

		<!-- 계졍 관련 -->
		<Route path={ PATHS.ACCOUNT.JOIN }        component={ Join } />
		<Route path={ PATHS.ACCOUNT.LOGIN }       component={ LoginNormal } />
		<Route path={ PATHS.ACCOUNT.LOGIN_ADMIN } component={ LoginAdmin } />

		<!-- 새소식 -->
		<Route path={ PATHS.NEWS.NOTICE.LIST }   component={ NoticeList } />
		<Route path={ PATHS.NEWS.UPDATE.LIST }   component={ UpdateList } />
		<Route path={ PATHS.NEWS.DEV_NOTE.LIST } component={ DevNoteList } />
		<Route path={ PATHS.NEWS.WRITE }         component={ PageWrite } />
		<Route path={ PATHS.NEWS.READ_TEPLATE }  component={ PageRead } />
		<Route path={ PATHS.NEWS.EDIT_TEMPLATE } component={ PageWrite } />

		<!-- 사이트소개 -->
		<Route path={ PATHS.INTRODUCE.PURPOSE } component={ HomePagePurpose } />

		<!-- 가이드 -->
		<Route path={ PATHS.GUIDE.HOW_TO_USE }  component={ HomePageGuide } />

		<!-- 커뮤니티 -->
		<Route path={ PATHS.COMMUNITY.ALL.LIST } 	  component={ AllList } />
		<Route path={ PATHS.COMMUNITY.ASK.LIST } 	  component={ AskList } />
		<Route path={ PATHS.COMMUNITY.TALK.LIST } 	  component={ TalkList } />
		<Route path={ PATHS.COMMUNITY.WRITE }         component={ PageWrite } />
		<Route path={ PATHS.COMMUNITY.READ_TEPLATE }  component={ PageRead } />
		<Route path={ PATHS.COMMUNITY.EDIT_TEMPLATE } component={ PageWrite } />

		<!-- 서비스센터 -->
		<Route path={ PATHS.SERVICE_CENTER.PRIVATE_CONTACT.LIST } component={ PrivateContactList } />
		<Route path={ PATHS.SERVICE_CENTER.WRITE } 				  component={ PageWrite } />
		<Route path={ PATHS.SERVICE_CENTER.READ_TEPLATE } 		  component={ PageRead } />
		<Route path={ PATHS.SERVICE_CENTER.EDIT_TEMPLATE } 		  component={ PageWrite } />
	{/if}
</Router>
  

<style>
	/* Svelte 에서 기본 세팅된 공백 값 제거 */
	:global(body) {
		padding: 0;
	}
</style>

<script>
	import { Router, Route, link } from 'svelte-routing';
	import { PATHS } from './constants/paths';
	import Home from './routes/Home.svelte';
	import Join from './routes/account/Join.svelte';
	import Login from './routes/account/Login.svelte';
	import Inspection from './routes/Inspection.svelte';
</script>
  
  
<Router>
	<!-- 홈페이지 -->
	<Route path={ PATHS.HOME } component={Home} />

	<!-- 점검페이지 TODO (추후 홈 링크 타도록 수정 필요) -->
	<Route path={ PATHS.INSPECTION } component={Inspection} />

	<!-- 계졍 관련 -->
	<Route path={ PATHS.ACCOUNT.JOIN } component={Join} />
	<Route path={ PATHS.ACCOUNT.LOGIN } component={Login} />
</Router>
  

<style>
	/* Svelte 에서 기본 세팅된 공백 값 제거 */
	:global(body) {
		padding: 0;
	}
</style>
<script>
	import { Router, Route, link } from 'svelte-routing';
	import { PATHS } from './constants/paths';
	import Home from './routes/Home.svelte';
	import Join from './routes/account/Join.svelte';
	import Login from './routes/account/Login.svelte';
</script>
  
  
<Router>
	<!-- 홈페이지 -->
	<Route path={ PATHS.HOME } component={Home} />

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
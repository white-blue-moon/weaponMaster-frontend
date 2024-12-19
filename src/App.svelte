<script>
	import { Router, Route, link } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import Join from './routes/Join.svelte';
</script>
  
  
<Router>
	<Route path="/" component={Home} />
	<Route path="/account/join" component={Join} />
</Router>
  

<style>
	/* Svelte 에서 기본 세팅된 공백 값 제거 */
	:global(body) {
		padding: 0;
	}
</style>
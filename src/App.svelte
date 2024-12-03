<script>
	import { Router, Route, link } from 'svelte-routing';
	import Home from './routes/Home.svelte';
</script>
  
  
<Router>
	<Route path="/" component={Home} />
</Router>
  

<style>
	/* Svelte 에서 기본 세팅된 공백 값 제거 */
	:global(body) {
		padding: 0;
	}
</style>
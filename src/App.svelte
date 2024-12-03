<script>
	import { Router, Route, link } from 'svelte-routing';
	import Home from './routes/Home.svelte';
</script>
  
  
<Router>
	<Route path="/" component={Home} />
</Router>
  

<style>

</style>
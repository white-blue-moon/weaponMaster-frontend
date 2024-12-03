<script>
    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/FocusBanner.svelte';
    import Footer from '../components/Footer.svelte';
</script>


<GnbPublisher />
<Gnb /> 
<FocusBanner />

<main>
  <h1>Welcome to Weapon Master!</h1>
  <p>서비스 소개...</p>
</main>

<Footer />

<style>
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
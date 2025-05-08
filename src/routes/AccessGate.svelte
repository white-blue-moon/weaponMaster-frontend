<script>
  import { onMount } from "svelte";
  import { canAccessPage } from "../utils/auth";
  import { PATHS } from "../constants/paths";


  import Intro from "../components/Intro.svelte";

  onMount(() => {
      // 인증된 사용자는 홈으로
      if ($canAccessPage) {
          navigate(PATHS.HOME, { replace: true }); 
          return;
      }
  })
</script>


<Intro />


<style>

</style>

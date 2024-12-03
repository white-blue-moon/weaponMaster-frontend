<script>
    import GnbPublisher from '../components/GnbPublisher.svelte';
    import Gnb from '../components/Gnb.svelte';
    import FocusBanner from '../components/FocusBanner.svelte';
    import TestText from '../components/TestText.svelte';
    import Footer from '../components/Footer.svelte';
</script>

<GnbPublisher />
<div class="menu">
    <div class="gnb"><Gnb /></div>
    <div class="focus-banner"><FocusBanner /></div>
</div>
<div class="test-text"><TestText /></div> 
<Footer />

<style>
    /* 부모 컨테이너 설정: Gnb와 FocusBanner가 겹치도록 */
    .menu {
        position: relative; /* Gnb와 FocusBanner의 위치를 기준으로 설정 */
    }

    /* Gnb 스타일 설정 */
    .menu .gnb {
        position: relative; /* FocusBanner와 겹치지 않도록 Gnb를 relative로 설정 */
        z-index: 3; /* FocusBanner보다 위에 위치하게 설정 */
    }

    /* FocusBanner 스타일 설정 */
    .menu .focus-banner {
        position: absolute; /* Gnb 아래에 절대 위치로 배치 */
        top: 0; /* Gnb 바로 위에 위치 */
        left: 0;
        right: 0;
        z-index: 1; /* Gnb 아래로 겹치게 설정 */
        color: white;
    }

    /* TestText 스타일 설정 */
    .test-text {
        margin-top: 200px; /* menu 하단에 충분한 공간을 두기 위한 마진 */
    }
</style>

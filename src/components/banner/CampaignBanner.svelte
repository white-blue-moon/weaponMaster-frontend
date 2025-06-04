<script>
    import { WEAPON_ASSETS } from "../../constants/resourcePath";

    export let imgUrl = `${WEAPON_ASSETS}/banner/campaign_banner.jpg`;
    export let href   = "https://df.nexon.com/"; // 던파 공식 홈페이지 주소 기본 할당
    export let alt    = "포트폴리오 용도 강조 알림 배너";
</script>


<article class="bdview_bnrarea">
    <a href={ href } target="_blank">
        <img src={ imgUrl } alt={ alt }>
    </a>
</article>


<style>
    * {
        margin: 0;
        box-sizing: border-box;
    }

    .bdview_bnrarea {
        position: relative;
        vertical-align: top;
        overflow: hidden;
        margin-bottom: 80px;
        width: 100%;
        height: 200px;
    }
</style>

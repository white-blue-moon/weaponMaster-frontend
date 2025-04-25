<script>
    import { DF_UI } from "../constants/resourcePath";

    export let homeName         = "weaponMaster";
    export let bannerText       = "BANNER TEXT";
    export let bannerTextColor  = "#fff";
    export let isLogoVisible    = true;
    export let bannerBackground = `${DF_UI}/img/mem/bg.png`;
    const logoBackground        = `/images/logo_background.png`;
</script>

<header class="banner" style="--banner-background: url({ bannerBackground })">
    {#if isLogoVisible}
    <h1>
        <a href="/" style="--logo-background: url({ logoBackground })">{ homeName }</a>
    </h1>
    {/if}
    <h2 class:isLogoVisible={ isLogoVisible } class:notLogoVisible={ !isLogoVisible } style="color: { bannerTextColor };">
        { bannerText }
    </h2>
</header>

<style>
    * {
        margin: 0;
    }

    header {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
    }
    
    header.banner {
        background: var(--banner-background) no-repeat 50% 0;
    }

    header h1 a {
        display: block;
        margin: 53px auto 0 auto;
        width: 166px;
        height: 122px;
        background: var(--logo-background) no-repeat;
        font-size: 0;
    }

    a {
        text-decoration: none;
    }

    header h2.isLogoVisible {
        margin-top: 0;
        text-align: center;
        font-size: 40px;
        font-weight: 300;
        line-height: 54px;
    }

    header h2.notLogoVisible {
        position: relative;
        width: 100%;
        color: #fff;
        font-size: 40px;
        text-align: center;
        font-weight: 300;
        line-height: 396px;
    }
</style>
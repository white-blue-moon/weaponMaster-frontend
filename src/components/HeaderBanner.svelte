<script>
    export let homeName = "weaponMaster";
    export let headerText = "HEADER TEXT";
    export let bannerBackground = "https://resource.df.nexon.com/ui/img/mem/bg.png";
    const logoBackground = "https://resource.df.nexon.com/ui/img/mem/logo.png";
</script>

<header class="banner" style="--banner-background: url({bannerBackground})">
    <h1><a href="/" style="--logo-background: url({logoBackground})">{ homeName }</a></h1>
    <h2>{ headerText }</h2>
</header>

<style>
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
        width: 216px;
        height: 122px;
        background: var(--logo-background) no-repeat;
        font-size: 0;
    }

    a {
        text-decoration: none;
    }

    header h2 {
        margin-top: 0;
        text-align: center;
        color: #fff;
        font-size: 40px;
        font-weight: 300;
        line-height: 54px;
    }
</style>
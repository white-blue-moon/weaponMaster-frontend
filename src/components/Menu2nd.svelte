<script>
    import { getMenu2nd } from '../utils/page'

    export let categoryType = 0;
    export let articleType = 0;
    export let isActiveOn = true;

    let menu2nd = getMenu2nd(categoryType, articleType);
</script>

<section class="menu2nd">
    {#each menu2nd as menu}
        <a class:active={ isActiveOn && menu.isActive } href={ menu.url }>
            { menu.text }
        </a>
    {/each}
</section>

<style>
    * {
         box-sizing: border-box;
    }

    .menu2nd {
        position: relative;
        width: 100%;
        height: 80px;
        background: #f8f9fb;
        border: 1px solid #e0e2ec;
        text-align: center;
        font-size: 0;
    }

    .menu2nd a.active {
        color: #36393f;
        border-bottom: 2px solid #36393f;
    }

    .menu2nd a {
        display: inline-block;
        margin: 0 25px;
        color: #898c92;
        font-size: 16px;
        line-height: 77px;
    }

    a {
        text-decoration: none;
    }
</style>
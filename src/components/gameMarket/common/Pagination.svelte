<script>
    import { changePage } from "../../../utils/gameMarket/paging";
    export let pagingTarget  = {}; // bind 필요

    function onChange(pageNo) {
        pagingTarget = changePage(pagingTarget, pageNo);
        return;
    }
</script>
  

<article class="paging">
    <a class="first" on:click={() => onChange(1)}>FIRST</a>
    <a class="prev"  on:click={() => onChange(pagingTarget.currentPage - 1)}>PREV</a>
  
    {#each pagingTarget.groupPages as pageNo}
        {#if pageNo === pagingTarget.currentPage}
            <span>{ pagingTarget.currentPage }</span>
        {:else}
            <a on:click={() => onChange(pageNo)}>{ pageNo }</a>
        {/if}
    {/each}
  
    <a class="next" on:click={() => onChange(pagingTarget.groupPages.at(-1) + 1)}>NEXT</a>
    <a class="end"  on:click={() => onChange(pagingTarget.totalPage)}>END</a>
</article>
  

<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    .paging {
        position: relative;
        font-size: 0;
        text-align: center;
        vertical-align: top;
        overflow: hidden;
        margin-top: 5px;
        margin-bottom: 30px;
    }

    .paging a {
        text-decoration: none;
        cursor: pointer;
    }

    .paging a.first {
        margin-right: 0;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat -50px 0;
        text-indent: -9999px;
    }

    .paging a.prev {
        margin-right: 14px;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat 0 0;
        text-indent: -9999px;
    }

    .paging a, .paging span {
        display: inline-block;
        padding: 0 10px;
        min-width: 38px;
        height: 36px;
        line-height: 35px;
        color: #6a6e76;
        font-size: 14px;
    }

    .paging span {
        background: #303544;
        color: #fff;
    }

    .paging a.next {
        margin-left: 14px;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat 0 -50px;
        text-indent: -9999px;
    }

    .paging a.end {
        margin-left: 0;
        background: url("#{$DF_UI}/img/btn/paging.png") no-repeat -50px -50px;
        text-indent: -9999px;
    }
</style>

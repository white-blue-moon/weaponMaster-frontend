<script>
    export let width         = "16px";
    export let height        = "16px";
    export let margin_left   = "0";
    export let margin_right  = "3px";
    export let margin_top    = "0";
    export let margin_bottom = "3px";
    export let colorTheme    = "grey";

    let borderColor    = "rgba(0, 0, 0, 0.1)";
    let borderTopColor = "#333";

    $: {
        if (colorTheme === "white") {
            borderColor    = "rgba(255, 255, 255, 0.3)";
            borderTopColor = "#fff";
        }
    }
</script>


<span
    class="spinner"
    style="
        width:            { width };
        height:           { height };
        margin-left:      { margin_left };
        margin-right:     { margin_right };
        margin-top:       { margin_top };
        margin-bottom:    { margin_bottom };
        border: 2px solid { borderColor };
        border-top-color: { borderTopColor };
    "
></span>


<style>
    .spinner {
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>
<script>
    import { CATEGORY_TYPE, ARTICLE_TYPE } from '../../../constants/articles'

    import PageList from "../../../components/PageList.svelte";
</script>

<PageList categoryType={ CATEGORY_TYPE.COMMUNITY } articleType={ ARTICLE_TYPE.COMMUNITY.ALL }/>

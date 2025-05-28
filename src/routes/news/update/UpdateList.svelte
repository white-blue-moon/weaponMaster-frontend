<script>
    import { CATEGORY_TYPE, ARTICLE_TYPE } from '../../../constants/articles'
    import PageList from "../../../components/PageList.svelte";
</script>

<PageList 
    categoryType={ CATEGORY_TYPE.NEWS } 
    articleType={ ARTICLE_TYPE.NEWS.UPDATE }
/>

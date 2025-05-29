<script>
    import { CATEGORY_TYPE, ARTICLE_TYPE } from '../../../constants/articles'
    import PageList from "../../../components/page/PageList.svelte";
</script>

<PageList 
    categoryType={ CATEGORY_TYPE.SERVICE_CENTER } 
    articleType={ ARTICLE_TYPE.SERVICE_CENTER.PRIVATE_CONTACT }
/>

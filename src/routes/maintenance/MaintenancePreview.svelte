<script>
    import { onMount } from "svelte";
    import { ADMIN_API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';

    import Maintenance from "./Maintenance.svelte";

    let endDate;
    let isLoading = true;

    onMount(async () => {
        await fetchLastActiveEndTime();
    });

    async function fetchLastActiveEndTime() {
		const response = await apiFetch(ADMIN_API.MAINTENANCE.GET_ACTIVE_LATEST, {
            method: 'GET',
        }).catch(handleApiError);

		if (response!= null) {
            isLoading = false;
			endDate   = response.maintenance.end_date;
			return;
		}

        isLoading = false;
        console.log('[프리뷰] 점검 종료 시간 불러오기에 실패하였습니다.');
        return;
    }
</script>


{#if !isLoading}
    <Maintenance endDate={ endDate }/>
{/if}


<style>

</style>

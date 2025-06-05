<script>
    import { onMount } from "svelte";
    import { ADMIN_API } from '../../constants/api';
    import { apiFetch, handleApiError } from '../../utils/apiFetch';

    import Maintenance from "./Maintenance.svelte";

    let endDate;

    onMount(async () => {
        await fetchLastActiveEndTime();
    });

    async function fetchLastActiveEndTime() {
		const response = await apiFetch(ADMIN_API.MAINTENANCE.GET_ACTIVE_LATEST, {
            method: 'GET',
        }).catch(handleApiError);

		if (response!= null) {
			endDate = response.maintenance.end_date;
			return;
		}

        console.log('[프리뷰] 점검 종료 시간 불러오기에 실패하였습니다.');
        return;
    }
</script>


<Maintenance endDate={ endDate }/>


<style>

</style>

<script>
    import CardAnalystRequestDetails from '../../components/Cards/CardAnalystRequestDetails.svelte';
    import { onMount } from 'svelte';

    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const id = params.get('id');

    let issue;

    onMount(() => {
        console.log("test")
        let assigneeUuid = '';
        fetch(`http://localhost:8080/analysts/job?assignee=${assigneeUuid}&id=${id}`)
            .then(response => response.json())
            .then(data => issue = data)
            .catch(err => console.error(err));

    });

</script>

<div>
    <div class="flex flex-wrap mt-4">
        <div class="w-full xl:w-full mb-12 xl:mb-0 px-4">
            <CardAnalystRequestDetails request_id="{id}"/>
        </div>
    </div>
</div>

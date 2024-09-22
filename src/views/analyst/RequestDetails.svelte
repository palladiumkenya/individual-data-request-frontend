<script>
    import CardAnalystRequestDetails from '../../components/Cards/CardAnalystRequestDetails.svelte';
    import { onMount } from 'svelte';

    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const id = params.get('id');

    let issue;


</script>

<div>
    <div class="flex flex-wrap mt-4">
        <div class="w-full xl:w-full mb-12 xl:mb-0 px-4">
            <CardAnalystRequestDetails request_id="{id}"/>
        </div>
    </div>
</div>

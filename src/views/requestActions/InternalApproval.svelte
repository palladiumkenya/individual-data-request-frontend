<script>
    // core components
    import CardRequestDetails from "components/Cards/CardInternalReviewRequestDetails.svelte";


    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const id = params.get('id');
    const type = params.get('type');

    //export let location;
</script>

<div class="flex flex-wrap">
    <div class="w-full  px-4">
        <CardRequestDetails request_id="{id}" approval_type="{type}"/>
    </div>
</div>

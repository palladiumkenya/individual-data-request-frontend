<script>
    // core components
    import CardRequestDetails from "components/Cards/CardRequestDetails.svelte";
    import CardProfile from "components/Cards/CardRequesterDetails.svelte";

    //
    // import { useParams } from 'svelte-routing';
    //
    // // Access the route parameters
    // const params = useParams();
    // // let id = params.id;
    // console.log("id ",params)

    export let location;
</script>

<div class="flex flex-wrap">
    <div class="w-full  px-4">
        <CardRequestDetails />
    </div>
<!--    <div class="w-full lg:w-4/12 px-4">-->
<!--        <CardProfile />-->
<!--    </div>-->
</div>

<script>
  // core components
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPagePendingApprovals from "components/Cards/CardPageApprovals.svelte";
  import CardCompleteApprovals from "components/Cards/CardCompleteApprovals.svelte";
  export let location;

  const url = new URL(window.location.href);

  const params = new URLSearchParams(url.search);

  const type = params.get('type');

</script>

<div>
  <div class="flex flex-wrap">
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardPagePendingApprovals approval_type="{type}" />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <CardCompleteApprovals approval_type="{type}" />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardCompleteApprovals approval_type="{type}" />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <CardCompleteApprovals approval_type="{type}" />
      </div>
    </div>
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardLineChart />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardBarChart />
    </div>
  </div>

</div>

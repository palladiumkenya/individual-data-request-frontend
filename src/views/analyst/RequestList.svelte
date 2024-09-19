<script>
  // core components
  import RequestTable from "components/Cards/RequestTable.svelte";
  import RequestStats from "components/Headers/RequestStats.svelte";
  export let location;
</script>

<div class="flex flex-wrap mt-4">
  <div class="w-full mb-12 px-4">
    <RequestStats />
    <RequestTable />
  </div>
</div>

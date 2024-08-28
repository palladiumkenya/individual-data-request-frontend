<!-- UserDashboard.svelte -->
<script>
  import CardApprovalsTable from '../../components/Cards/CardApprovalsTable.svelte';
  export let location;
</script>

<div>
  <div class="flex flex-wrap mt-4">
    <div class="w-full xl:w-full mb-12 xl:mb-0 px-4">
      <CardApprovalsTable />
    </div>
  </div>
</div>

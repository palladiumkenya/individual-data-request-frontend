<!-- UserHeaderStats.svelte -->
<script>
  // core components
  import CardUserStats from 'components/Cards/CardUserStats.svelte';
</script>

<!-- Header -->
<div class="relative bg-indigo-500 md:pt-32 pb-32 pt-12">
  <div class="px-4 md:px-10 mx-auto w-full">
    <div>
      <!-- Card stats -->
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Total Requests Made"
            statTitle="0"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
            globalCategory="total"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Approved Requests"
            statTitle="0"
            statIconName="fas fa-check-circle"
            statIconColor="bg-orange-500"
            globalCategory="approved"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Requests in Progress"
            statTitle="0"
            statIconName="fas fa-spinner"
            statIconColor="bg-pink-500"
            globalCategory="inProgress"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Requests Completed"
            statTitle="0"
            statIconName="fas fa-check"
            statIconColor="bg-emerald-500"
            globalCategory="completed"
          />
        </div>
      </div>
    </div>
  </div>
</div>

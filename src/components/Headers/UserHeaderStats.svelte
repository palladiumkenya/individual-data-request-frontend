<!-- UserHeaderStats.svelte -->
<script>
  // core components
  import CardUserStats from 'components/Cards/CardUserStats.svelte';
  import { requestCounts } from '../../stores/dash_store';

  let counts;
  $: counts = $requestCounts;
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
            statTitle={$requestCounts.total}
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
            globalCategory="total"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Approved Requests"
            statTitle={$requestCounts.approved}
            statIconName="fas fa-check-circle"
            statIconColor="bg-orange-500"
            globalCategory="approved"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Requests in Progress"
            statTitle={$requestCounts.inProgress}
            statIconName="fas fa-spinner"
            statIconColor="bg-pink-500"
            globalCategory="inProgress"
          />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardUserStats
            statSubtitle="Requests Completed"
            statTitle={$requestCounts.inProgress}
            statIconName="fas fa-check"
            statIconColor="bg-emerald-500"
            globalCategory="completed"
          />
        </div>
      </div>
    </div>
  </div>
</div>

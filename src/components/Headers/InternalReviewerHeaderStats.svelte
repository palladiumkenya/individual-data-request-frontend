<!-- UserHeaderStats.svelte -->
<script>
    // core components
    import { requestCounts } from '../../stores/dash_store';
  import CardInternalReviewerStats from '../Cards/CardInternalReviewerStats.svelte';
  
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
            <CardInternalReviewerStats
              statSubtitle="All Requests Assigned"
              statTitle={$requestCounts.total}
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
              globalCategory="total"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardInternalReviewerStats
              statSubtitle="Approved Requests"
              statTitle={$requestCounts.approved}
              statIconName="fas fa-check-circle"
              statIconColor="bg-orange-500"
              globalCategory="approved"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardInternalReviewerStats
              statSubtitle="Pending Requests"
              statTitle={$requestCounts.pending}
              statIconName="fas fa-spinner"
              statIconColor="bg-pink-500"
              globalCategory="pending"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardInternalReviewerStats
              statSubtitle="Completed Requests"
              statTitle={$requestCounts.completed}
              statIconName="fas fa-check"
              statIconColor="bg-emerald-500"
              globalCategory="complete"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

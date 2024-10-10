<!-- UserDashboard.svelte -->
<script>
    // core components
    import CardLineChart from 'components/Cards/CardLineChart.svelte';
    import CardBarChart from 'components/Cards/CardBarChart.svelte';
    import CardPageVisits from 'components/Cards/CardPageVisits.svelte';
    import CardSocialTraffic from 'components/Cards/CardSocialTraffic.svelte';
    //export let location;
    import CardUserPointPersonTable from '../../components/Cards/CardUserPointPersonTable.svelte';
  </script>
  
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-full mb-12 xl:mb-0 px-4">
        <CardUserPointPersonTable />
      </div>
    </div>
  </div>

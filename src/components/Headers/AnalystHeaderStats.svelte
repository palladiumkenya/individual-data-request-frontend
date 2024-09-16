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
    </div>
  </div>
</div>

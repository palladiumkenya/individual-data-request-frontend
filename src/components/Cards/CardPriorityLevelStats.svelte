<script>
  // core components
  const env = process.env.config;


  export let statSubtitle = "Priority Level Distribution";
  export let statTitle = "350,897";
  // The value must match one of these strings
  // "up" or "down"
  export let statArrow = "up";
  export let statPercent = "3.48";
  // can be any of the text color utilities
  // from tailwindcss
  export let statPercentColor = "text-emerald-500";
  export let statDescripiron = "Since last month";
  export let statIconName = "far fa-chart-bar";
  // can be any of the background color utilities
  // from tailwindcss
  export let statIconColor = "bg-red-500";


  import { onMount } from 'svelte';
  import moment from 'moment';

  export let request_id;
  export let approval_type;

  function handleApproveReject(type) {
    showAlert(type);
  }


  let data = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch(`${env.API_ENDPOINT}/approvals/count/${approval_type}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();

    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
  <div class="flex-auto p-4">
    <h5 class="text-blueGray-400 uppercase font-bold text-xs">
      {statSubtitle}
    </h5>
    {#if data.data}
      {#each data.data as item}
    <div class="flex flex-wrap">
      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
<!--        <span class="font-semibold text-xl text-blueGray-700">-->
<!--          {statTitle} {item.PriorityLevel}-->
<!--        </span>-->
        <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +
           " ${item.PriorityLevel == 'high' && 'text-red-600 bg-red-200'} ${item.PriorityLevel == 'medium' && 'text-orange-500 bg-orange-200'}
           ${item.PriorityLevel	== 'low' && 'text-yellow-500 bg-yellow-500'}`}>
             {item.PriorityLevel}  <i class="fa fa-exclamation" aria-hidden="true"></i>
        </span>
        <span>{item.Count}</span>
    </div>
      <div class="relative w-auto pl-4 flex-initial">
        <div
          class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full {statIconColor}"
        >
          <i class="{statIconName}"></i>
        </div>
      </div>
    </div>
        {/each}
      {/if}
<!--    <p class="text-sm text-blueGray-400 mt-4">-->
<!--      <span class="mr-2 {statPercentColor}">-->
<!--        <i-->
<!--          class="{statArrow === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}"-->
<!--        ></i>-->
<!--        {statPercent}%-->
<!--      </span>-->
<!--      <span class="whitespace-nowrap">{statDescripiron}</span>-->
<!--    </p>-->
  </div>
</div>

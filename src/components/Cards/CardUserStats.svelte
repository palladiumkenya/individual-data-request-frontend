<!-- CardUserStats.svelte -->
<script>
  // core components

  export let statSubtitle = 'Traffic';
  export let statTitle = '350,897';
  export let statIconName = 'far fa-chart-bar';
  export let statIconColor = 'bg-red-500';
  export let globalCategory = 'total';

  import { selectedCategory, tableData } from '../../stores/dash_store';

  function handleCategoryChange(category) {
    selectedCategory.set(category);

    switch (category) {
      case 'total':
        tableData.set([]);
        globalCategory = category;
        break;
      case 'approved':
        tableData.set([]);
        globalCategory = category;
        break;
      case 'inProgress':
        tableData.set([]);
        globalCategory = category;
        break;
      case 'completed':
        tableData.set([]);
        globalCategory = category;
        break;
      default:
        tableData.set([]);
        globalCategory = category;
    }
  }
  const handleViewList = () => {
    selectedCategory.set(globalCategory);
  };
</script>

<div
  class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
  <div class="flex-auto p-4">
    <div class="flex flex-wrap">
      <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
        <h5 class="text-blueGray-400 uppercase font-bold text-xs">
          {statSubtitle}
        </h5>
        <span class="font-semibold text-xl text-blueGray-700">
          {statTitle}
        </span>
      </div>
      <div class="relative w-auto pl-4 flex-initial">
        <div
          class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full {statIconColor}"
        >
          <i class={statIconName}></i>
        </div>
      </div>
    </div>
    <!-- View list button and text-->
    <hr />
    <div class="flex justify-end py-2">
      <button
        class="text-amber-400 text-xs whitespace-nowrap"
        on:click={handleViewList}
      >
        <span class="whitespace-nowrap">View List</span>
        <i class="fa fa-arrow-circle-right"></i>
      </button>
    </div>
  </div>
</div>

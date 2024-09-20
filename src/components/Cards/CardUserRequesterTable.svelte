<!-- CardApprovalsTable.svelte -->
<script>
  import {
    selectedCategory,
    tableData,
    tableLength,
  } from '../../stores/dash_store';
  import { onDestroy } from 'svelte';

  let category;
  let data = [];
  let title;

  // Function to load data based on selected category
  const loadData = async (category) => {
    // Simulate fetching data based on category
    if (category === 'approved') {
      title = 'Completed Approvals';
      data = [
        {
          id: '1',
          approved: true,
          dueDate: '2024-09-01',
          priority: 'High',
          requester: 'Newton Mutugi',
        },
        {
          id: '5',
          approved: true,
          dueDate: '2024-09-01',
          priority: 'High',
          requester: 'Paul Nthusi',
        },
      ];
    } else if (category === 'total') {
      title = 'All Requests';
      data = [
        {
          id: '2',
          approved: false,
          dueDate: '2024-09-10',
          priority: 'Low',
          requester: 'Charles Bett',
        },
      ];
    } else if (category === 'inProgress') {
      title = 'Total requests';
      data = [
        {
          id: '3',
          approved: false,
          dueDate: '2024-09-05',
          priority: 'Medium',
          requester: 'Mary Kilewe',
        },
      ];
    } else if (category === 'completed') {
      title = 'Requests in Progress';
      data = [
        {
          id: '4',
          approved: true,
          dueDate: '2024-08-30',
          priority: 'High',
          requester: 'Florida Korir',
        },
      ];
    } else {
      data = []; // No records found
    }
    tableData.set(data);
  };

  selectedCategory.subscribe((value) => {
    category = value;
    loadData(category);
  });

  const unsubscribeCategory = selectedCategory.subscribe((value) => {
    category = value;
  });

  const unsubscribeData = tableData.subscribe((value) => {
    data = value;
  });

  onDestroy(() => {
    unsubscribeCategory();
    unsubscribeData();
  });
</script>

<div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
  <div class="rounded-t mb-0 px-4 py-3 border-0">
    <h3 class="text-xl font-semibold">{title}</h3>
  </div>
  <table class="min-w-full bg-white">
    <thead>
    <tr>
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Request ID</th
      >
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Approved</th
      >
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Due Date</th
      >
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Priority</th
      >
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Requester</th
      >
    </tr>
    </thead>
    <tbody>
    {#if data.length === 0}
      <tr>
        <td colspan="5" class="text-center py-4">No records found</td>
      </tr>
    {:else}
      {#each data as row}
        <tr>
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.id}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.approved}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.dueDate}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.priority}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.requester}</td
          >
        </tr>
      {/each}
    {/if}
    </tbody>
  </table>
</div>

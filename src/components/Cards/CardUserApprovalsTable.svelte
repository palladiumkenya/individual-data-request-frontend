<!-- CardApprovalsTable.svelte -->
<script>
  import {
    selectedCategory,
    tableData,
    tableLength,
  } from '../../stores/dash_store';
  import {onDestroy, onMount} from 'svelte';

  let category;
  // let data = [];
  let title;

  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:8080/requests`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.data);

      if (data.data.length>0){
        tableData.set(data.data);
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  let data = [
    {
      ID: '1',
      ReqId: '1',
      Approved: false,
      Date_Due: '2024-09-01',
      Priority_level:	 'High',
      Status: 'pending',
    },
    {
      ID: '1',
      ReqId: '1',
      Approved: true,
      Date_Due: '2024-09-01',
      Priority_level:	 'High',
      Status: 'completed',
    },
  ];
  // Function to load data based on selected category
  const loadData = async (category) => {
    // Simulate fetching data based on category
    if (category === 'approved') {
      title = 'Completed Approvals';
      data = [
        {
          ID: '1',
          ReqId: '1',
          Approved: false,
          Date_Due: '2024-09-01',
          Priority_level:	 'High',
          Status: 'pending',
        },
      ];
    } else if (category === 'total') {
      title = 'All Requests';
      data = [
        {
          ID: '13',
          ReqId: '13',
          Approved: false,
          Date_Due: '2024-09-01',
          Priority_level:	 'High',
          Status: 'pending',
        },
      ];
    } else if (category === 'inProgress') {
      title = 'Total requests';
      data = [
        {
          ID: '1',
          ReqId: '1',
          Approved: false,
          Date_Due: '2024-09-01',
          Priority_level:	 'High',
          Status: 'pending',
        },{
          ID: '12',
          ReqId: '12',
          Approved: false,
          Date_Due: '2024-09-01',
          Priority_level:	 'High',
          Status: 'pending',
        },
      ];
    } else if (category === 'completed') {
      title = 'Requests in Progress';
      data = [];
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
          >{row.ReqId}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.Status}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.Date_Due}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{row.Priority_level}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >
            <!--{row.Approver.Email}-->
          </td>

        </tr>
      {/each}
    {/if}
    </tbody>
  </table>
</div>

<!-- CardApprovalsTable.svelte -->
<script>
  const env = process.env.config;


  import {
    selectedCategory,
    tableData,
    tableLength,
  } from '../../stores/dash_store';
  import {onDestroy, onMount} from 'svelte';
  import moment from "moment/moment";
  // import {
  //   envVariables
  // } from '../../+page.server';

  // import { envVariables } from '../../lib/envVar';
  // import { PUBLIC_API_URL } from '$env/static/public';
  // let PUBLIC_API_URL='http://localhost:8080';
  // console.log("PUBLIC_API_URL",envVariables.PUBLIC_API_URL); // SvelteKit
  // console.log("PUBLIC_API_URL",envVariables.PUBLIC_API_URL, envVariables.API_URL)


  const url = window.location.href; // Get the current URL
  let approval_type; // Replace with the word you're checking

  if (url.includes("external")) {
    approval_type= "external";
  } else {
    approval_type= "internal"
  }


  let category;
  let data = [];
  let dashboardData = [];
  let title;

  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch(`${env.API_ENDPOINT}/requests`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dashboardData =data;

      if (data.data.length>0){
        tableData.set(data.data);
        dashboardData =data.data;
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });


  // Function to load data based on selected category
  const loadData = async (category) => {
    // Simulate fetching data based on category
    if (category === 'approved') {
      title = 'Approved Requests';
      dashboardData = data.filter(item => item.Status === "approved");
    } else if (category === 'total') {
      title = 'All Requests';
      dashboardData = data;
    } else if (category === 'assigned') {
      title =  'Assigned Requests' ;
      dashboardData = data.filter(item => item.Status === "assigned"  );
    } else if (category === 'in progress') {
      title =  'Requests in Progress' ;
      dashboardData = data.filter(item => item.Status === "in progress"  );

    } else if (category === 'complete') {
      title = 'Total Requests Completed';
      dashboardData = data.filter(item => item.Status === "complete");

    } else {
      dashboardData = []; // No records found
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
      >Status</th
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
      <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
      >Date of request</th>
    </tr>
    </thead>
    <tbody>
    {#if dashboardData.length === 0}
      <tr>
        <td colspan="5" class="text-center py-4">No records found</td>
      </tr>
    {:else}
      {#each dashboardData as row}
        <tr>
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold"
          ><a href="{env.FRONTEND_URL}/assign/action/{row.ReqId}?type=internal&id={row.ID}" class="requestIdStyling">
            #{row.ReqId}</a>
          </td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4
                    {row.Status	 == 'complete' || row.Status	 == 'assigned' && 'text-emerald-500 '}
                    {row.Status	 == 'approved'  && 'text-emerald-500 '}
                    {row.Status	 == 'pending'  && 'text-blueGray-600 '}
                    {row.Status	 == 'rejected'  && 'text-red-600 '}
                   {row.Status	 == 'in progress' || row.Status	 == 'review stage' && 'text-indigo-600 '}"
          >
            <span class="dot {row.Status	 == 'complete' || row.Status	 == 'assigned'&& 'bg-emerald-500 '}
             {row.Status	 == 'approved'  && 'bg-emerald-500 '}
             {row.Status	 == 'pending'  && 'bg-blueGray-600 '}
              {row.Status	 == 'rejected'  && 'bg-red-500 '}
             {row.Status	 == 'in progress' || row.Status	 == 'review stage' && 'bg-indigo-500 '}"></span>
            {row.Status}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >{moment(row.Date_Due).format('dddd, DD MMM YYYY')}</td
          >
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
           <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full uppercase last:mr-0 mr-1" +
             " ${row.Priority_level	 == 'high' && 'text-red-600 bg-red-200 '}
             ${row.Priority_level	 == 'medium' && 'text-orange-500 bg-orange-200'}
             ${row.Priority_level	 == 'low' && 'text-yellow-600 bg-yellow-200 '}`}>
               {row.Priority_level	}  <i class="fa fa-exclamation" aria-hidden="true"></i>
            </span>
          </td>
          <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >
            {row.Requester.Name}
          </td>
          <td
                  class="border-t-0 px-6 align-middle text-indigo-600 border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >{moment(row.Created_Date).format('dddd, DD MMM YYYY')}</td>
        </tr>
      {/each}
    {/if}
    </tbody>
  </table>
</div>

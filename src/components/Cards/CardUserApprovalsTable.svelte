<!-- CardApprovalsTable.svelte -->
<script>
  // import Search from "./Requester/Search.svelte";

  import ApproverTable from "./ApproverAndPointperson/ApproverTable.svelte";

  const env = process.env.config;


  import {
    selectedCategory,
    tableData,
  } from '../../stores/dash_store';
  import {onDestroy, onMount} from 'svelte';
  import moment from "moment/moment";




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
  let handler;
  let rows;
  // $: rows = handler.getRows();

  onMount(async () => {
    try {
      const response = await fetch(`${env.API_ENDPOINT}/requests`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // dashboardData =data;

      if (data.data.length>0){
        let filteredData=[];
        filteredData =data.data;
        filteredData.map(item => dashboardData.push({"ID":item.ID, "ReqId":item.ReqId, "Status":item.Status,
              "Date_Due":moment(item.Date_Due).format('dddd, DD MMM YYYY'), "Priority_level":item.Priority_level,
              "Requester":item.Requester.Name, "Created_Date":moment(item.Created_Date).format('dddd, DD MMM YYYY') }))

        tableData.set(dashboardData);

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
    } else if (category === 'pending') {
      title =  'Pending Requests' ;
      dashboardData = data.filter(item => item.Status === "pending"  );
    }else if (category === 'review stage') {
      title =  'Review Stage' ;
      dashboardData = data.filter(item => item.Status === "review stage"  );

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

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <ApproverTable dashboardData={dashboardData} approval_type={approval_type}/>
  {/if }
</div>

<script>
  export let color = "light";
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

  let requesterId= "";
  let requestId= "";
  let requesterEmail= "";

  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:8080/approvals/${approval_type}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      requesterId = data.data.Requester.ID;
      requesterEmail = data.data.Requester.Email;
      requestId = data.data.ID;
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
  <div class="rounded-t mb-0 px-4 py-3 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-base text-blueGray-700">
          Completed Approvals
        </h3>
      </div>
      <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
        <button
          class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          See all
        </button>
      </div>
    </div>
  </div>
  <div class="block w-full overflow-x-auto">
    <!-- Projects table -->
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
      <tr>
        <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >
          Request ID
        </th>
        <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >
          Approved
        </th>
        <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >
          Due Date
        </th>
        <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >
          Priority
        </th>
        <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >
          Requester
        </th>
      </tr>
      </thead>
      <tbody>
      {#if data.data != null}
        {#each data.data  as item }
          <tr>
            <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              #{item.Request.ReqId}
            </th>
            <td
                    class="border-t-0 px-6 align-middle text-indigo-600 border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              pending...
            </td>
            <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {moment(item.Request.Due_Date).format('dddd, DD MMM YYYY')}
            </td>
            <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
           <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +
             " ${item.Request.Priority_level	 == 'high' && 'text-red-600 bg-red-200'} ${item.Request.Priority_level	 == 'medium' && 'text-orange-500 bg-orange-200'}
             ${item.Request.Priority_level	 == 'low' && 'text-yellow-500 bg-yellow-500'}`}>
               {item.Request.Priority_level	}  <i class="fa fa-exclamation" aria-hidden="true"></i>
            </span>
            </td>
            <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i class="fas fa-user text-orange-500 mr-4"></i>
              {item.Requester.Name}
            </td>
          </tr>
        {/each}
      {/if}
      </tbody>
    </table>
  </div>
</div>

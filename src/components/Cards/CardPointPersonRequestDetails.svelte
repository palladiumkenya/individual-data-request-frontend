<script>
  const env = process.env.config;


  import CardSupportingDocs from "./CardSupportingDocs.svelte";

  import { onMount } from 'svelte';
  import moment from 'moment';
  // import {PUBLIC_API_URL} from '$env/static/public';


  export let request_id;
  export let approval_type;



  let data = [];
  let loading = true;
  let error = null;

  let requesterId = '';
  let requestId = '';
  let requesterEmail = '';

  onMount(async () => {
    try {
      const response = await fetch(
              `${env.API_ENDPOINT}/request/${request_id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      requesterId = data.data.Requester.ID;
      requesterEmail = data.data.Requester.Email;
      requestId = data.data.ID;

    } catch (err) {
      error = err.message;
      console.log("error ",error)

    } finally {
      loading = false;
    }
  });

  import Swal from 'sweetalert2';
  import CardInternalApproverDetails from "./Requester/CardInternalApproverDetails.svelte";
  let showModal = false;


  const Post_Analyst_Assignment = async () => {
    const analystid = document.getElementById('analyst').value;
    await fetch(`${env.API_ENDPOINT}/assign/action/${request_id}/${analystid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"analystsId":analystid}),
    })
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log('failed ---/>', error);
      });
  };



  let existingApprovalData;
  let approvalloading = true;
  let approvalerror = null;
  onMount(async () => {
    try {
      const response = await fetch(
              `${env.API_ENDPOINT}/approval/${approval_type}/${request_id}`
      );

      if (!response.ok) {
          existingApprovalData=[];
      }
      existingApprovalData = await response.json();
    }  finally {
      approvalloading = false;
    }
  });


  let analystsList=[]
  let analystsloading = true;
  onMount(async () => {
    try {
      const response = await fetch(
              `${env.API_ENDPOINT}/analysts`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      analystsList = await response.json();
    } finally {
      analystsloading = false;
    }
  });


  let assignedAnalyst;
  let assignedAnalystloading = true;
  onMount(async () => {
    try {
      const response = await fetch(
              `${env.API_ENDPOINT}/analyst/${request_id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      assignedAnalyst = await response.json();
      console.log(assignedAnalyst)
    } finally {
      assignedAnalystloading = false;
    }
  });

</script>

<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 h-350-px"
>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="rounded-t bg-white mb-0 px-6 py-6 ">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
          RequestID: #{data.data.ReqId}
<!--          <span-->
<!--            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-BlueGray-700 bg-BlueGray-200 uppercase last:mr-0 mr-1"-->
<!--          >-->
<!--            ASSIGN TO ANALYST-->
<!--          </span>-->


          {#if data.data.Approved != null}
            <span
              class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +
               " ${data.data.Approved ? 'text-green-500 bg-emerald-200' : 'text-red-900 bg-red-200'}`}
            >
              {data.data.Approved ? 'Approved' : 'Rejected'}
              <i class="fa fa-exclamation" aria-hidden="true"></i>
            </span>
          {/if}
        </h6>

        <h6>
          Priority :
          <span
            class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +
             " ${data.data.Priority_level == 'high' && 'text-red-600 bg-red-200'} ${data.data.Priority_level == 'medium' && 'text-orange-500 bg-orange-200'}
             ${data.data.Priority_level == 'low' && 'text-yellow-600 bg-yellow-200 border-yellow'}`}
          >
            {data.data.Priority_level}
            <i class="fa fa-exclamation" aria-hidden="true"></i>
          </span>
          Due :
          <span
            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1"
          >
            {moment(data.data.Due_Date).format('dddd, DD MMM YYYY')}
          </span>
        </h6>
      </div>

      {#if data.data.Status == "review stage" || data.data.Status == "pending"}
        <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
            <span class="text-xl inline-block mr-5 align-middle">
              <i class="fas fa-bell"></i>
            </span>
          <span class="inline-block align-middle mr-8">
              <b class="capitalize">Review stage!</b> This request is still ongoing the review stage.
            Once approved by  the reviewers, you can assign an analyst.
            </span>
          <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
            <span>×</span>
          </button>
        </div>
      {:else if data.data.Status == "assigned"}
        <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
            <span class="text-xl inline-block mr-5 align-middle">
              <i class="fas fa-bell"></i>
            </span>
            <span class="inline-block align-middle mr-8">
                <b class="capitalize">Assigned!</b> This request has been assigned to
                      {#if assignedAnalystloading}
                        ...
                      {:else if error}
                        ... Error loading assignee:{error}
                      {:else}
                              <b class="capitalize">{ assignedAnalyst.data[0].Email }</b>
                      {/if  }
            </span>
          <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
            <span>×</span>
          </button>
        </div>
      {:else if data.data.Status == "approved"}
      <form>
          <div class="flex flex-wrap bg-blueGray mt-3">
          <div class="w-full lg:w-4/12">
              <label for="analyst">Assign to Analyst</label>
            </div>
            <div  class="w-full lg:w-4/12">
              <select id="analyst" class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full">
                {#if analystsloading}
                  <option value="">--</option>
                {:else if error}
                  <option value="">error</option>
                {:else}
                  {#each analystsList.data as row}
                    <option value={row.ID}>{row.Email}</option>
                  {/each}
                {/if }
                </select>
            </div>
            <div  class="w-full lg:w-4/12">
              <button
                      class="bg-red-500 w-full text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded
         shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      on:click={() => { Post_Analyst_Assignment(); }}
                      type="button"
              >
                ASSIGN TO ANALYST
              </button>
            </div>
          </div>
        </form>
      {/if}


      <div class="px-6 py-6 border-t border-blueGray-200">
        <div class="flex flex-wrap bg-blueGray">
          <div class="w-full lg:w-8/12 px-4">
            <p class="text-blueGray-700 text-sm font-bold">Summary</p>

            <p
              class="mb-4 text-sm justify-items-start leading-relaxed text-blueGray-700"
            >
              {data.data.Summery}
            </p>
<!--            <a-->
<!--              href="#pablo"-->
<!--              on:click={(e) => e.preventDefault()}-->
<!--              class="font-normal text-red-500"-->
<!--            >-->
<!--              Show more-->
<!--            </a>-->

            <CardSupportingDocs request_id={request_id}/>
          </div>
          <div class="w-full lg:w-4/12">
            <div>
              <p class="text-blueGray-700 text-sm font-bold">
                Requester Details
              </p>

              <table class="items-center w-full bg-transparent border-collapse">
                <tbody>
                  <tr>
                    <td><p class="text-blueGray-700 text-sm">Requester :</p></td
                    >
                    <td
                      ><span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                      >
                        {data.data.Requester.Name}</span
                      ></td
                    >
                  </tr>
                  <tr>
                    <td
                      ><p class="text-blueGray-700 text-sm">
                        Organization :
                      </p></td
                    >
                    <td
                      ><span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                      >
                        {data.data.Requester.Organization}</span
                      ></td
                    >
                  </tr>
                  <tr>
                    <td><p class="text-blueGray-700 text-sm">Requested :</p></td
                    >
                    <td
                      ><span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                      >
                        {moment(data.data.Created_date).format(
                          'dddd, DD MMM YYYY'
                        )}</span
                      ></td
                    >
                  </tr>
                </tbody>
              </table>
            </div>

            {#if approvalloading}
              <p>Loading...</p>
            {:else}
              {#if existingApprovalData.data}
                <CardInternalApproverDetails data={existingApprovalData.data} approval_type="internal" request_id={request_id}/>
                <CardInternalApproverDetails data={existingApprovalData.data} approval_type="external" request_id={request_id}/>
              {/if}
            {/if}
          </div>
        </div>

      </div>
      </div>
  {/if}
</div>


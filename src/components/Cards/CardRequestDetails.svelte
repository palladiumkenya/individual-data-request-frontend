<script>
  import ApproveModal from "../Modals/ApproveModal.svelte";

  export let color = "light";
  import { onMount } from 'svelte';
  import moment from 'moment';


  function handleApproveReject(type) {
    showAlert(type);
  }


  let data = [];
  let loading = true;
  let error = null;
  let requesterId= "";
  let requestId= "";

  onMount(async () => {
      try {
          const response = await fetch('http://localhost:8080/internal_approval/926c96fc-66a7-440c-b19a-07416da5ffd2');

        if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
        data = await response.json();
        requesterId = data.data.Requester.ID;
        requestId = data.data.ID;

      } catch (err) {
          error = err.message;

      } finally {
          loading = false;
      }
  });


  import Swal from 'sweetalert2';
  import {has_disabled_attribute} from "svelte/types/compiler/compile/utils/a11y";
  let showModal = false;

  // Exporting the SweetAlert function
  export function showAlert(type) {
    if (type=='approve') {
      return Swal.fire({
        title: 'Approve Request?',
        text: "Approve data request.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1ab394',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approve!',
        preConfirm: (reasons) => {
          // fetch( "/send_customized_email", {  "choice":"rejected", "approver":"",
          //   "reason":reasons, "frontend_url":""});
          const data ={Comments: "-", Approver_type: "internal", Approved: true,
            Requestor_id: requesterId,Request_id: requestId}
          Post_approval_or_rejection(data)
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
                  'Approved!',
                  'Request has been approved and will be move on to the next phase which will be the external approver.',
                  'success'
          )
          // fetch(+ "/send_customized_email", { "facility_id": fac_id, "choice":"approved","reason":"",
          //   "user_edited_email":Facility_data.user_edited_email, "frontend_url":BASE_URL,"mfl_code":Facility_data.mfl_code, "partner":Facility_data.partner});
          // submit the data
        }
      })
    }else{
      return Swal.fire({
        title: 'Reject Changes?',
        text: "Reasons for Rejection? This will be sent to the requester for their knowledge",
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Reject',
        confirmButtonColor: '#dc3545',
        showLoaderOnConfirm: true,
        preConfirm: (reasons) => {
          // fetch( "/send_customized_email", {  "choice":"rejected", "approver":"",
          //   "reason":reasons, "frontend_url":""});
          const data ={Comments: reasons, Approver_type: "internal", Approved: false,
            Requestor_id: requesterId, Request_id: requestId}
          Post_approval_or_rejection(data)
        },
        // allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
                  'Success!',
                  'Success! Request has been rejected. Requester wil be notified of reasons why!',
                  'success'
          );
        } else {
          Swal.fire("Operation canceled!");
        }
      })
    }
  }


  const Post_approval_or_rejection = async (details) => {

    await fetch( `http://localhost:8080/internal_approval/action`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
          }).then(function (response) {
              // window.location.href = BASE_URL + `/facilities/view_facility/${fac_id}`;
              console.log("response", response);
            })
            .catch(function (error) {
              console.log('failed ---/>', error);
            });
  };

</script>




<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 h-350-px"
>
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
  <div class="rounded-t bg-white mb-0 px-6 py-6">

        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">RequestID: #{data.data.Request.ReqId}
<!--            <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +-->
<!--             " ${data.data.Priority_level	 == 'high' && 'text-red-600 bg-red-200'} ${data.data.Priority_level	 == 'medium' && 'text-orange-500 bg-orange-200'}-->
<!--             ${data.data.Priority_level	 == 'low' && 'text-yellow-500 bg-yellow-500'}`}>-->
<!--              {data.data.Priority_level	} Priority <i class="fa fa-exclamation" aria-hidden="true"></i>-->
<!--            </span>-->
<!--            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">-->
<!--             {moment(data.data.Due_Date).format('dddd, MM/DD/YYYY')}-->
<!--            </span>-->
          </h6>
          <h6>
            Priority :
            <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1" +
             " ${data.data.Request.Priority_level	 == 'high' && 'text-red-600 bg-red-200'} ${data.data.Request.Priority_level	 == 'medium' && 'text-orange-500 bg-orange-200'}
             ${data.data.Request.Priority_level	 == 'low' && 'text-yellow-500 bg-yellow-500'}`}>
               {data.data.Request.Priority_level	}  <i class="fa fa-exclamation" aria-hidden="true"></i>
            </span>
            Due :
            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
             {moment(data.data.Due_Date).format('dddd, DD MMM YYYY')}
            </span>
          </h6>
        </div>
<!--        <div class="justify-between">-->
<!--          <p class="text-blueGray-700 text-sm font-bold">Requester :-->
<!--            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">-->
<!--              {data.data.Requester.Name}-->
<!--            </span>-->
<!--          </p>-->
<!--          <p class="text-blueGray-700 text-sm font-bold">Organization :-->
<!--            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">-->
<!--              {data.data.Requester.Organization}-->
<!--            </span>-->
<!--          </p>-->
<!--          <p class="text-blueGray-700 text-sm font-bold">Date Requested :-->
<!--            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">-->
<!--               {moment(data.data.Created_Date).format('dddd, MM/DD/YYYY')}-->
<!--            </span>-->
<!--          </p>-->
<!--        </div>-->
    <div class="px-6 py-6 border-t border-blueGray-200">
      <div class="flex flex-wrap bg-blueGray ">
        <div class="w-full lg:w-8/12 px-4 ">
          <p class="text-blueGray-700 text-sm font-bold">Summery</p>

          <p class="mb-4 text-sm justify-items-start leading-relaxed text-blueGray-700">
            {data.data.Request.Summery}
          </p>
          <a href="#pablo" on:click={(e) => e.preventDefault()} class="font-normal text-red-500">
            Show more
          </a>

          <div class="px-6 py-6 border-t border-blueGray-200">
            <p class="text-blueGray-700 text-sm font-bold">Supporting Documents</p>
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
              <tr>
                <th
                        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Document
                </th>
                <th
                        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"        >
              <span class="ml-3 font-bold {color === 'light' ? 'btext-blueGray-600' : 'text-whit'}"          >
                  ethics-approval.pdf
                </span>
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"  >
                  <a href="/admin/pdf">
                    View <i class="fa fa-eye" aria-hidden="true"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"        >
              <span class="ml-3 font-bold {color === 'light' ? 'btext-blueGray-600' : 'text-whit'}"          >
                  nacosti-approval.pdf
                </span>
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"        >
                  View <i class="fa fa-eye" aria-hidden="true"></i>
                </td>
              </tr>
              <tr>
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"        >
              <span class="ml-3 font-bold {color === 'light' ? 'btext-blueGray-600' : 'text-whit'}"          >
                  study-protocol.pdf
                </span>
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"        >
                  View <i class="fa fa-eye" aria-hidden="true"></i>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="w-full lg:w-4/12">
          <div>
            <p class="text-blueGray-700 text-sm font-bold">Requester Details</p>
            <div class="justify-between">
              <p class="text-blueGray-700 text-sm ">Requester :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                {data.data.Requester.Name}
              </span>
              </p>
              <p class="text-blueGray-700 text-sm">Organization :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                {data.data.Requester.Organization}
              </span>
              </p>
              <p class="text-blueGray-700 text-sm ">Date Requested :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                 {moment(data.data.Created_Date).format('dddd, DD MMM YYYY')}
              </span>
              </p>
            </div>
          </div>
          {#if data.data.Approver_type== 'external' }
          <div>
            <p class="text-blueGray-700 text-sm font-bold">Internal Approver Details</p>
            <div class="justify-between">
              <p class="text-blueGray-700 text-sm ">Approver :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                {data.data.Requester.Name}
              </span>
              </p>
              <p class="text-blueGray-700 text-sm">Type :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                {data.data.Approver.Email}
              </span>
              </p>
              <p class="text-blueGray-700 text-sm ">Approved :
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 bg-orange-200 uppercase last:mr-0 mr-1">
                 {moment(data.data.Approved).format('dddd, DD MMM YYYY')}
              </span>
              </p>
            </div>
        </div>
          {/if}
      </div>
    </div>

      {#if data.data.Approved }
    <div class="flex flex-wrap">
      <div class="w-full px-4 flex-1">
        <button class="bg-emerald-500 w-full text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2
        rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                on:click={() => {handleApproveReject('approve')}}    type="button" disabled={!data.data.Approved}>
          Approve
        </button>
      </div>
      <div class="w-full px-4 flex-1">
        <button class="bg-red-500 w-full text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded
         shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                on:click={() => {handleApproveReject('reject')}}  type="button" disabled={!data.data.Approved}>
          Reject
        </button>
      </div>

    </div>
    {/if}
    </div>
  </div>


    {/if}
</div>

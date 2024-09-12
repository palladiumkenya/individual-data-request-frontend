<script>


  import CardSupportingDocs from "./CardSupportingDocs.svelte";

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

  let requesterId = '';
  let requestId = '';
  let requesterEmail = '';

  onMount(async () => {
    try {
      const response = await fetch(
              `http://localhost:8080/request/${request_id}`
      );
      // const approvals = await fetch(
      //   `http://localhost:8080/approval/${approval_type}/${request_id}`
      // );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      requesterId = data.data.ID;
      requesterEmail = data.data.Email;
      requestId = data.data.ID;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  import Swal from 'sweetalert2';
  import CardInternalApproverDetails from "./CardInternalApproverDetails.svelte";
  let showModal = false;

  export function showAlert(type) {
    if (type == 'approve') {
      return Swal.fire({
        title: 'Approve Request?',
        text: 'Approve data request.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1ab394',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approve!',
        preConfirm: (reasons) => {
          const data = {
            Comments: '-',
            Approver_type: 'internal',
            Approved: true,
            Requestor_id: requesterId,
            Request_id: requestId,
          };
          Post_approval_or_rejection(data);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Approved!',
            'Request has been approved and will be move on to the next phase which will be the external approver.',
            'success'
          );
        }
      });
    } else {
      return Swal.fire({
        title: 'Reject Changes?',
        text: 'Reasons for Rejection? This will be sent to the requester for their knowledge',
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Reject',
        confirmButtonColor: '#dc3545',
        showLoaderOnConfirm: true,
        preConfirm: (reasons) => {
          const data = {
            Comments: reasons,
            Approver_type: 'internal',
            Approved: false,
            Requestor_id: requesterId,
            Request_id: requestId,
            RequesterEmail: requesterEmail,
          };
          Post_approval_or_rejection(data);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Success!',
            'Success! Request has been rejected. Requester wil be notified of reasons why!',
            'success'
          );
        } else {
          Swal.fire('Operation canceled!');
        }
      });
    }
  }

  const Post_approval_or_rejection = async (details) => {
    await fetch(`http://localhost:8080/approval/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then(function (response) {
        SendeMAIL(details);
      })
      .catch(function (error) {
        console.log('failed ---/>', error);
      });
  };

  const SendeMAIL = async (details) => {
    let email = {
      Sender: 'info.his@mg.kenyahmis.org',
      Subject: 'Internal Approval Stage',
      Body: details.Comments,
      Recipient: details.RequesterEmail,
    };
    await fetch(`http://localhost:8080/send_mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    })
      .then(function (response) {
        // window.location.href = BASE_URL + `/facilities/view_facility/${fac_id}`;
        console.log('response', response);
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
        <h6 class="text-blueGray-700 text-xl font-bold">
          RequestID: #{data.data.ReqId}
          <span
            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1"
          >
            {approval_type} Approval
          </span>
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
             ${data.data.Priority_level == 'low' && 'text-orange-500 bg-yellow-500'}`}
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

      <div class="px-6 py-6 border-t border-blueGray-200">
        <div class="flex flex-wrap bg-blueGray">
          <div class="w-full lg:w-8/12 px-4">
            <p class="text-blueGray-700 text-sm font-bold">Summery</p>

            <p
              class="mb-4 text-sm justify-items-start leading-relaxed text-blueGray-700"
            >
              {data.data.Summery}
            </p>
            <a
              href="#pablo"
              on:click={(e) => e.preventDefault()}
              class="font-normal text-red-500"
            >
              Show more
            </a>

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

            {#if approval_type=="external"}
              <CardInternalApproverDetails data{data} approval_type="internal" request_id={request_id}/>
            {/if}
          </div>
        </div>

        {#if data.data.Approved == null}
          <div class="flex flex-wrap">
            <div class="w-full px-4 flex-1">
              <button
                class="bg-indigo-700 w-full text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2
        rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                on:click={() => {
                  handleApproveReject('approve');
                }}
                type="button"
                disabled={!data.data.Approved}
              >
                Approve
              </button>
            </div>
            <div class="w-full px-4 flex-1">
              <button
                class="bg-red-500 w-full text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded
         shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                on:click={() => {
                  handleApproveReject('reject');
                }}
                type="button"
                disabled={!data.data.Approved}
              >
                Reject
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

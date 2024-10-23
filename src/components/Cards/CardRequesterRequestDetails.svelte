<script>
  import { onMount } from 'svelte';
  import moment from 'moment';
  import FormAnalystComplete from "../Forms/FormAnalystComplete.svelte";
  import CardRequestDocuments from "./CardRequestDocuments.svelte";

  const env = process.env.config;
  export let request_id;

  let data = null;
  let files = null;
  let loading = true;
  let error = null;


  onMount(async () => {
    try {
      const response = await fetch(
              `${env.API_ENDPOINT}/request/get?request_id=${request_id}`
      );


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let resp = await response.json();

      data = resp.data.request
      files = resp.data?.files
      console.log(files.filter((file)=> file.FileURL.includes('/')))

    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

</script>

<div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 "
>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h4 class="text-blueGray-700 text-xl font-bold">
          Request Details
          <span
                  class="text-xs font-semibold inline-block py-1 px-2 rounded-full text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1"
          >
             RequestID: #{data.ReqId}
          </span>

        </h4>

        <h6>
          Status :
          <span
                  class={`text-xs font-semibold inline-block py-1 px-2 rounded uppercase last:mr-0 mr-1" + "
                  ${data.Status.toLowerCase() === 'pending' && 'text-red-600 bg-red-200'}
                  ${data.Status.toLowerCase() === 'in progress' && 'text-blue-500 bg-orange-200'}
                  ${data.Status.toLowerCase() === 'complete' && 'text-green-800 bg-orange-200'}`}
          >
            {data.Status}
          </span>
          Priority :
          <span
                  class={`text-xs font-semibold inline-block py-1 px-2 rounded uppercase last:mr-0 mr-1" + "
                  ${data.Priority_level.toLowerCase() === 'high' && 'text-red-600 bg-red-200'}
                  ${data.Priority_level.toLowerCase() === 'medium' && 'text-orange-500 bg-orange-200'}
                  ${data.Priority_level.toLowerCase() === 'low' && 'text-orange-500 bg-yellow-500'}`}
          >
            {data.Priority_level}
            <i class="fa fa-exclamation" aria-hidden="true"></i>
          </span>
          Due :
          <span
                  class="text-xs font-semibold inline-block py-1 px-2 rounded bg-blueGray-200 uppercase last:mr-0 mr-1"
          >
            {moment(data.Date_Due).format('dddd, DD MMM YYYY')}
          </span>
        </h6>
      </div>

      <div class="px-6 py-6 border-t border-blueGray-200">
        <div class="flex flex-wrap bg-blueGray">
          <div class="w-full lg:w-8/12 px-4">
            <h5 class="text-blueGray-700 text-sm font-bold">Summary</h5>

            <p
                    class="mb-4 text-sm justify-items-start leading-relaxed text-blueGray-700"
            >
              {data.Summery}
            </p>

            <div class="px-6 py-6 border-t border-blueGray-200">
              <p class="text-blueGray-700 text-sm font-bold">
                Supporting Documents
              </p>
              <CardRequestDocuments requestDocs={files.filter((file)=> file.FileURL.includes('/supporting-documents/'))}/>
            </div>
            {#if data.Status.toLowerCase() === 'complete'}
            <div class="px-6 py-6 border-t border-blueGray-200">
              <p class="text-blueGray-700 text-sm font-bold">
                Request Outputs
              </p>
              <CardRequestDocuments requestDocs={files.filter((file)=> !file.FileURL.includes('/supporting-documents/'))}/>
            </div>
              {/if}

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
                          class="text-xs font-semibold inline-block py-1 px-2 rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                  >
                        {data.Requester.Name}</span
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
                          class="text-xs font-semibold inline-block py-1 px-2 rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                  >
                        {data.Requester.Organization}</span
                  ></td
                  >
                </tr>
                <tr>
                  <td><p class="text-blueGray-700 text-sm">Requested :</p></td
                  >
                  <td
                  ><span
                          class="text-xs font-semibold inline-block py-1 px-2 rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                  >
                        {moment(data.Created_Date).format(
                                'dddd, DD MMM YYYY'
                        )}</span
                  ></td
                  >
                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  {/if}
</div>

<script>
    const env = process.env.config;

    import {onMount} from "svelte";
    import moment from "moment/moment";
    export let color = 'light';

    // export let data;
    export let request_id;
    export let approval_type;

    let data = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch(`${env.API_ENDPOINT}/approval/${approval_type}/${request_id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

</script>

{#if loading}
    <p>Loading internal approval data....</p>
{:else if error}
    <p>Error: {error}</p>
{:else}
    <!--{#if data.Approved !=null}-->
        <div class="mt-5 ">
            <p class="text-blueGray-700 text-sm font-bold uppercase">
                {approval_type} Approver Review
            </p>
            <table
                    class="items-center w-full bg-transparent border-collapse"
            >
                <tbody>
                <tr>
                    <td class="setWidth"
                    ><p class="text-blueGray-700 text-sm">Approver:</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                    >
                              {data.data.Approver.Email}</span
                    ></td
                    >
                </tr>
                <tr>
                    <td class="setWidth"
                    ><p class="text-blueGray-700 text-sm">Reviewed On:</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                    >
                              {moment(data.data.Approval_Date).format(
                                  'dddd, DD MMM YYYY'
                              )}</span
                    ></td
                    >
                </tr>
                <tr>
                    <td class="setWidth"
                    ><p class="text-blueGray-700 text-sm">Approved:</p></td
                    >
                    <td
                    ><span
                            class="text-md font-bold inline-block py-1 px-2 uppercase rounded-full
                            {data.data.Approved && 'text-emerald-600 bg-emerald-200'}
                             {!data.data.Approved && 'text-red-600 bg-red-200'}
                             uppercase last:mr-0 mr-1" >
                              {data.data.Approved}
                        <i class="fa {data.data.Approved && 'fa-check-circle fa-lg'}
                                    {!data.data.Approved && 'fa-times'}"
                         aria-hidden="true"></i>
                    </span
                    ></td
                    >
                </tr>
                <tr>
                    <td class="setWidth"
                    ><p class="text-blueGray-700 text-sm">Comments:</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-100 text-indigo-600 uppercase last:mr-0 mr-1"
                    >
                              {data.data.Comments}
                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                    </span
                    ></td
                    >
                </tr>
                </tbody>
            </table>
        </div>
    <!--{/if}-->
{/if}

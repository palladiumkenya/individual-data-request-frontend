<script>
    import {onMount} from "svelte";
    import moment from "moment/moment";
    export let color = 'light';

    export let data;
    export let request_id;

    async function getApproval() {
        const response = await fetch(`http://localhost:8080/approval/internal/${request_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch approval results');
        }
        console.log(response.json())
        return response.json();
    }

    let requestInternalApproval = getApproval();
</script>

{#await requestInternalApproval }
    <p>Loading docs....</p>
{:then data }
    <p>{ data.Approver.ID  }</p>
    {#if data.Approved !=null}
        <div>
            <p class="text-blueGray-700 text-sm font-bold">
                Internal Approver Details
            </p>
            <table
                    class="items-center w-full bg-transparent border-collapse"
            >
                <tbody>
                <tr>
                    <td
                    ><p class="text-blueGray-700 text-sm">Approver :</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                    >
                              {data.Approver.Email}</span
                    ></td
                    >
                </tr>
                <tr>
                    <td
                    ><p class="text-blueGray-700 text-sm">Approved :</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded bg-blueGray-200 text-indigo-600 uppercase last:mr-0 mr-1"
                    >
                              {moment(data.Approval_Date).format(
                                  'dddd, DD MMM YYYY'
                              )}</span
                    ></td
                    >
                </tr>
                <tr>
                    <td
                    ><p class="text-blueGray-700 text-sm">Approved :</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1"
                    >
                              {data.Approved}
                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                    </span
                    ></td
                    >
                </tr>
                <tr>
                    <td
                    ><p class="text-blueGray-700 text-sm">Comments :</p></td
                    >
                    <td
                    ><span
                            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1"
                    >
                              {data.Comments}
                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                    </span
                    ></td
                    >
                </tr>
                </tbody>
            </table>
        </div>
    {/if}
{/await}

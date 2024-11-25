<script>
    import { onMount } from 'svelte';
    import CardApproverDetails from "./CardApproverDetails.svelte";

    const env = process.env.config;
    let statusOptions = ['InternalApprover', 'ExternalApprover'];

    let data = null;
    let loading = true;
    let loadingAdd = false;
    let error = null;
    let selectedStatus;
    let approverEmail = '';


    onMount(async () => {
        try {
            const response = await fetch(
                `${env.API_ENDPOINT}/approvers`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let resp = await response.json();

            data = resp.data
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    function handleStatusChange(event) {
        selectedStatus = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault()
        loadingAdd = true

        fetch(`${env.API_ENDPOINT}/user/create_approver`, {
            method: 'POST',
            body: JSON.stringify({
                "Email": approverEmail,
                "Approver_Type": selectedStatus
            })
        })
            .then(() => {

                window.location.reload();
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                loadingAdd = false
            });

    }

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
                    Approver Details
                </h4>

            </div>

            <div class="px-6 py-6 border-t border-blueGray-200">
                <div class="flex flex-wrap bg-blueGray">
                    <div class="w-full lg:w-8/12 px-4">
                        <h5 class="text-blueGray-700 text-sm font-bold">Approvers</h5>

                        <div class="py-6 border-t border-blueGray-200">
                            <CardApproverDetails approvers={data}/>
                        </div>

                    </div>
                    <div class="w-full lg:w-4/12">
                        <div>
                            <h5 class="text-blueGray-700 text-sm font-bold">Add New Approver</h5>

                            <form class="border-t py-6 border-blueGray-200">
                                <div class="flex flex-wrap">
                                    <div class="w-full lg:w-12/12 px-4">
                                        <div class="relative w-full mb-3">
                                            <label
                                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    for="type"
                                            >
                                                Approver Type
                                            </label>
                                            <select
                                                    id="type"
                                                    type="text"
                                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    bind:value={selectedStatus} on:change={handleStatusChange}
                                            >
                                                <option value="" disabled selected>Select Approver Type...</option>
                                                {#each statusOptions as status}
                                                    <option value={status.toLowerCase()}>{status}</option>
                                                {/each}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-12/12 px-4">
                                        <div class="relative w-full mb-3">
                                            <label
                                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    for="approverEmail"
                                            >
                                                Email
                                            </label>
                                            <input
                                                    id="approverEmail"
                                                    type="email"
                                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    bind:value={approverEmail}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/3 lg:w-3/12 px-4">
                                    {#if loadingAdd}
                                        <p>
                                            Processing...
                                        </p>
                                    {:else}
                                        <button
                                                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                on:click={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    {/if}
                                </div>


                            </form>


                        </div>

                    </div>
                </div>

            </div>
        </div>
    {/if}
</div>

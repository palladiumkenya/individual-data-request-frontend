<script>
    const env = process.env.config;
    export let request_id;
    export let request_uuid;
    export let status;

    let statusOptions = ['In Progress', 'Complete'];
    let file = null;
    let comment = '';
    let selectedStatus;
    let loading = false

    if (status.toLowerCase() === 'in progress'){
        statusOptions = ['Complete']
    }

    function handleStatusChange(event) {
        selectedStatus = event.target.value;
    }

    function handleFileChange(event) {
        file = event.target.files[0];
    }

    function handleSubmit(event) {
        event.preventDefault()
        loading = true

        fetch(`${env.API_ENDPOINT}/analysts/job/${request_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "Status": selectedStatus
            })
        })
            .then(() => {
                if(selectedStatus === 'complete') {
                    const formData = new FormData();
                    formData.append('comment', comment);
                    formData.append('request', request_uuid);
                    formData.append('destination', 'files');
                    if (file) {
                        formData.append('file', file);
                    }

                    fetch(`${env.API_ENDPOINT}/upload`, {
                        method: 'POST',
                        body: formData
                    })
                        .then(() => window.location.reload())
                        .catch(error => console.error('Error:', error));
                } else {
                    window.location.reload();
                }

            })
            .catch(error => console.error('Error:', error))
            .finally(() => loading = false);

    }
</script>
<div>
    <hr class="mt-6 border-b-1 border-blueGray-300" />

        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
                <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Update
                </h6>
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12 px-4">
                        <div class="relative w-full mb-3">
                            <label
                                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    for="status"
                            >
                                Status
                            </label>
                            <select
                                    id="status"
                                    type="text"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    bind:value={selectedStatus} on:change={handleStatusChange}
                            >
                                <option value="" disabled selected>Select Status...</option>
                                {#each statusOptions as status}
                                    <option value={status.toLowerCase()}>{status}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    {#if selectedStatus === 'complete'}
                        <div class="w-full lg:w-12/12 px-4">
                            <div class="relative w-full mb-3">
                                <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="comment"
                                >
                                    Comment
                                </label>
                                <textarea
                                        id="comment"
                                        type="text"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                        bind:value={comment}
                                />
                            </div>
                        </div>
                        <div class="w-full lg:w-12/12 px-4">
                            <div class="relative w-full mb-3">
                                <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="file"
                                >
                                    Files
                                </label>
                                <input
                                        id="file"
                                        type="file"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        on:change={handleFileChange}
                                />
                            </div>
                        </div>
                    {/if}
                </div>
                <div class="w-1/3 lg:w-3/12 px-4">
                    {#if loading}
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
    <hr class="mt-6 border-b-1 border-blueGray-300" />
</div>

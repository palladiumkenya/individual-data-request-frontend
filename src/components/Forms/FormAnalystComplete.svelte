<script>
    export let request_id;
    export let status;

    let statusOptions = ['In Progress', 'Complete'];
    let file = null;
    let comment = '';
    let selectedStatus

    if (status.toLowerCase() === 'in progress'){
        statusOptions = ['Complete']
    }

    function handleStatusChange(event) {
        selectedStatus = event.target.value;
    }

    function handleFileChange(event) {
        file = event.target.files[0];
    }

    function handleSubmit() {
        // Prepare form data
        const formData = new FormData();
        formData.append('status', selectedStatus);
        formData.append('comment', comment);
        if (file) {
            formData.append('file', file);
        }

        // Simulate form submission
        console.log('Form data submitted:');
        console.log('request ID:', request_id);
        console.log('Status:', selectedStatus);
        console.log('Comment:', comment);
        if (file) {
            console.log('File:', file.name);
        }

        // fetch(`/api/issues/${issue.id}/update`, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));
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
                {#if selectedStatus === 'complete'}
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
                <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        on:click={handleSubmit}
                >
                    Submit
                </button>
            </div>


        </form>
    </div>
    <hr class="mt-6 border-b-1 border-blueGray-300" />
</div>

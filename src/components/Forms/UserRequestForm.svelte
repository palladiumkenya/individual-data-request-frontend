<script>
    import Swal from 'sweetalert2';
    import {auth} from "../../authentication/AuthStore";

    const env = process.env.config;

    let otherFiles = [];
    let dataFiles = [];
    let ethicsFiles = [];
    let institutionFiles = [];
    let nacostiFiles = [];
    let studyFiles = [];

    let deadline = '';
    let textInput = null;
    let selectedPriority;
    let priorityOptions = ['High', 'Medium', 'Low'];

    const config = process.env.config;
    const uploadUrl = config.UPLOAD_URL;

    function handlePriorityChange(event) {
        selectedPriority = event.target.value;
    }

    function handleOtherFileChange(event) {
        const newFiles = Array.from(event.target.files);
        otherFiles = [...otherFiles, ...newFiles];
    }
    function handleEthicsFileChange(event) {
        const newFiles = Array.from(event.target.files);
        ethicsFiles = [...ethicsFiles, ...newFiles];
    }
    function handleDataFileChange(event) {
        const newFiles = Array.from(event.target.files);
        dataFiles = [...dataFiles, ...newFiles];
    }
    function handleInstitutionFileChange(event) {
        const newFiles = Array.from(event.target.files);
        institutionFiles = [...institutionFiles, ...newFiles];
    }
    function handleNacostiFileChange(event) {
        const newFiles = Array.from(event.target.files);
        nacostiFiles = [...nacostiFiles, ...newFiles];
    }
    function handleStudyFileChange(event) {
        const newFiles = Array.from(event.target.files);
        studyFiles = [...studyFiles, ...newFiles];
    }


    async function handleSubmit(event) {
        event.preventDefault();
        showLoadingAlert();

        if (
            studyFiles.length === 0 ||
            dataFiles.length === 0 ||
            ethicsFiles.length === 0 ||
            nacostiFiles.length === 0 ||
            institutionFiles.length === 0
        ) {
            alert('Please upload at least 1 documents before submitting.');
            return;
        }

        let datedue = new Date(deadline).toISOString()

        let requestor_id = null;
        auth.id.subscribe((value) => requestor_id = value)
        try {
            let response = await fetch(`${env.API_ENDPOINT}/request/create`, {
                method: 'POST',
                body: JSON.stringify({
                    "Priority": selectedPriority,
                    "Summery": textInput,
                    "DateDue": datedue,
                    "Requestor_id": requestor_id,
                })
            })

            if (!response.ok) {
                showErrorAlert('error in saving request')
            }
            let resp = await response.json()

            await uploadFiles(otherFiles, resp?.data?.id, 'other')
            await uploadFiles(studyFiles, resp?.data?.id, 'study protocol')
            await uploadFiles(ethicsFiles, resp?.data?.id, 'ethics protocol')
            await uploadFiles(nacostiFiles, resp?.data?.id, 'nacosti approval')
            await uploadFiles(institutionFiles, resp?.data?.id, 'institution approval')
            await uploadFiles(dataFiles, resp?.data?.id, 'specific data elements')

          showSuccessAlert('Request submitted successfully!')

        } catch (err) {
            showErrorAlert(err.message)
        }

    }

    function handleTextInput(event) {
        textInput = event.target.value;
    }

    function showLoadingAlert() {
      return Swal.fire({
        title: 'Submitting Your Request',
        html: `
            <div class="flex items-center justify-center">
                <div class="spinner border-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                <p class="ml-4">Please wait while we process your request...</p>
            </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: 'swal2-popup-custom'
        }
      });
    }

    function showErrorAlert(error) {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `error: ${error}`
        });
    }

    function showSuccessAlert(message) {
        return Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            showCloseButton: true,
            willClose: () => resetForm(),
        });
    }

    async function uploadFiles(files, id, document) {
        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('request', id);
                formData.append('destination', 'supporting-documents');
                formData.append('file_purpose', document);

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData,
                    redirect: "follow"
                });

                if (response.ok) {
                    console.log(`${file.name} uploaded successfully`);
                } else {
                    const errorText = await response.text();
                    console.error(
                        `Failed to upload ${file.name}: ${response.status} ${response.statusText} - ${errorText}`
                    );
                }
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
                showErrorAlert(error.message)
            }
        }
    }

    function resetForm() {
        document.getElementById('request_form').reset();
        otherFiles = [];
        dataFiles = [];
        ethicsFiles = [];
        institutionFiles = [];
        nacostiFiles = [];
        studyFiles = [];
        window.location.reload()
    }

</script>

<!-- Data Request Form -->
<div>
    <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 h-350-px"
    >

        <div class="rounded-t bg-white mb-0 px-6 py-6 ">
            <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">
                    Request For Data
                </h6>
            </div>

            <div class="px-6 py-6 border-t border-blueGray-200">
                <div class="flex flex-wrap bg-blueGray">
                    <div class="w-full px-4">
                        <form id="request_form" on:submit|preventDefault={handleSubmit}>
                            <div class="w-full lg:w-12/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">
                                        Data Request Information *
                                    </label>
                                    <textarea id="description"
                                              class="w-full h-40 p-2 border rounded-lg border-gray-300 text-gray-700 resize-none"
                                              placeholder="Enter Description of text required here..."
                                              on:input={handleTextInput}
                                              required></textarea>
                                </div>
                            </div>
                            <hr class="my-6 border-gray-300"/>
                            <div class="flex flex-wrap -mx-4">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="ethics_protocol">
                                            Ethics Protocol *
                                        </label>
                                        <input id="ethics_protocol" type="file" multiple on:change={handleEthicsFileChange} required class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="specific_data_elements">
                                            Specific Data Elements *
                                        </label>
                                        <input id="specific_data_elements" type="file" multiple on:change={handleDataFileChange} required class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="institution_approval">
                                            Institution Approval *
                                        </label>
                                        <input id="institution_approval" type="file" multiple on:change={handleInstitutionFileChange} required class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="nacosti_approval">
                                            NACOSTI Approval *
                                        </label>
                                        <input id="nacosti_approval" type="file" multiple on:change={handleNacostiFileChange} required class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="study_protocol">
                                            Study Protocol *
                                        </label>
                                        <input id="study_protocol" type="file" multiple on:change={handleStudyFileChange} required class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="other_documents">
                                            Any other Document
                                        </label>
                                        <input id="other_documents" type="file" multiple on:change={handleOtherFileChange} class="w-full p-2 border rounded-lg border-gray-300"/>
                                    </div>
                                </div>
                            </div>
                            <hr class="my-6 border-gray-300"/>
                            <div class="w-full lg:w-12/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="deadline">
                                        Deadline for your request
                                    </label>
                                    <input
                                            id="deadline"
                                            type="date"
                                            min={new Date().toISOString().split("T")[0]}
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            bind:value={deadline}
                                    />
                                </div>
                            </div>
                            <hr class="my-6 border-gray-300"/>
                            <div class="w-full lg:w-12/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="priority">
                                        Priority
                                    </label>
                                    <select
                                            id="priority"
                                            type="text"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            bind:value={selectedPriority} on:change={handlePriorityChange}
                                    >
                                        <option value="" disabled selected>Select Status...</option>
                                        {#each priorityOptions as priority}
                                            <option value={priority.toLowerCase()}>{priority}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                            <hr class="my-6 border-gray-300"/>
                            <div class="text-center mt-6">
                                <button type="submit"
                                        class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors"
                                        on:click={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

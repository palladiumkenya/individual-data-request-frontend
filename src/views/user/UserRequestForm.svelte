<script>
  import Swal from 'sweetalert2';
  const env = process.env.config;

  let files = [];
  let deadline = '';
  let textInput = null;
  let selectedPriority;
  let priorityOptions = ['High', 'Medium', 'Low'];

  const config = process.env.config;
  const uploadUrl = config.UPLOAD_URL;

  function handlePriorityChange(event) {
    selectedPriority = event.target.value;
  }

  function handleFileChange(event) {
      const newFiles = Array.from(event.target.files);
      files = [...files, ...newFiles];
  }

  function removeFile(fileToRemove) {
      files = files.filter((file) => file !== fileToRemove);
  }

    async function handleSubmit(event) {
      event.preventDefault();
      showLoadingAlert();

      if (files.length < 1) {
          alert('Please upload at least 1 documents before submitting.');
          return;
      }

      let datedue = new Date(deadline).toISOString()
      // TODO: Use id of user
      let requestor_id = '79191307-1516-4b32-84bb-d0ebf8967d2d'
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

        for (const file of files) {
          try {

            const formData = new FormData();
            formData.append('file', file);
            formData.append('request', resp.data.id);
            formData.append('destination', 'supporting-documents');

            const response = await fetch(uploadUrl, {
              method: 'POST',
              body: formData,
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

      } catch (err){
        showErrorAlert(err.message)
      } finally {
        Swal.close();
        window.location.reload()
      }


      files = [];
    }

  function handleTextInput(event) {
      textInput = event.target.value;
  }
  function showLoadingAlert() {
    return Swal.fire({
      title: 'Submitting Request',
      text: 'Please wait',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },

    });
  }

  function showErrorAlert(error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `error: ${error}`
    });
  }



  document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.addEventListener('change', function (event) {
            const files = event.target.files;
            const filePreview = document.getElementById('filePreview');
            filePreview.innerHTML = ''; // Clear previous previews

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const fileURL = e.target.result;
                    const fileType = file.type.split('/')[0];

                    const fileElement = document.createElement('div');
                    fileElement.classList.add('flex', 'items-center', 'justify-between', 'mb-3', 'p-4', 'rounded-lg', 'bg-white', 'shadow-md', 'transition-transform', 'hover:translate-y-1', 'transition-shadow', 'hover:shadow-lg');
                    fileElement.dataset.fileName = file.name; // Store file name for reference

                    if (fileType === 'image') {
                        fileElement.innerHTML = `
                <img src="${fileURL}" alt="${file.name}" class="w-24 h-24 object-cover">
                <p><a href="${fileURL}" target="_blank" class="text-blue-500">View Full Size</a></p>
              `;
                    } else if (fileType === 'text' || fileType === 'application') {
                        fileElement.innerHTML = `
                <p><a href="${fileURL}" target="_blank" class="text-blue-500">View ${file.name}</a></p>
              `;
                    } else {
                        fileElement.innerHTML = `
                <p><a href="${fileURL}" download="${file.name}" class="text-blue-500">${file.name}</a></p>
                <p><a href="${fileURL}" target="_blank" class="text-blue-500">View Document</a></p>
              `;
                    }

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.className = 'bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg transition-transform hover:scale-105';
                    deleteButton.addEventListener('click', () => {
                        fileElement.remove();
                        // Also clear the file input field if it’s empty
                        if (
                            document.querySelectorAll('input[type="file"]')[0].files
                                .length === 0
                        ) {
                            document
                                .querySelectorAll('input[type="file"]')
                                .forEach((input) => (input.value = ''));
                        }
                    });

                    fileElement.appendChild(deleteButton);
                    filePreview.appendChild(fileElement);
                };
                reader.readAsDataURL(file);
            });
        });
    });
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
            <div class="w-full lg:w-8/12 px-4">
              <form on:submit|preventDefault={handleSubmit}>
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            for="description"
                    >
                      Data Request Information *
                    </label>
                    <textarea
                            id="description"
                            class="w-full h-40 p-2 border rounded-lg border-gray-300 text-gray-700 resize-none"
                            placeholder="Enter Description of text required here..."
                            on:input={handleTextInput}
                            required
                    ></textarea>
                  </div>
                </div>
                <hr class="my-6 border-gray-300"/>
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            for="files"
                    >
                      Upload Various Files *
                    </label>
                    <div class="flex flex-col items-center pt-8 bg-gradient-to-r from-yellow-200 to-blue-300 rounded-lg shadow-lg max-w-lg mx-auto">
                      <label for="fileInput"
                             class="cursor-pointer  mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                        <i class="fa fa-upload"></i> Drop files here
                      </label>
                      <input id="fileInput" type="file" multiple on:change={handleFileChange} required class="hidden"/>

                      <div id="filePreview" class="w-full mt-4">
                        {#if files.length > 0}
                          {#each files as file}
                            <div class="flex items-center justify-between mb-3 p-4 rounded-lg bg-white shadow-md transition-transform hover:translate-y-1 transition-shadow hover:shadow-lg">
                              <div>
                                <p class="text-gray-700">{file.name}</p>
                                <p><a href="{URL.createObjectURL(file)}" target="_blank" class="text-blue-500">View
                                  Full Size</a></p>
                              </div>
                              <button on:click={() => removeFile(file)} type="button"
                                      class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg transition-transform hover:scale-105">
                                Delete
                              </button>
                            </div>
                          {/each}
                        {/if}
                      </div>
                    </div>

                  </div>
                </div>
                <hr class="my-6 border-gray-300"/>
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            for="deadline"
                    >
                      deadline for your request
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
                    <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            for="priority"
                    >
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
                          on:click={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>

            </div>
            <div class="w-full lg:w-4/12">
              <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Documents To Upload</h6>
              <div>
                  <ul>
                    <li><h6 class="font-bold">Ethics Protocol</h6></li>
                    <li><h6 class="font-bold">Specific Data Elements</h6></li>
                    <li><h6 class="font-bold">Institution Approval</h6></li>
                    <li><h6 class="font-bold">NACOSTI Approval</h6></li>
                    <li><h6 class="font-bold">Study Protocol</h6></li>
                    <li><h6 class="font-bold">Any other Document</h6></li>
                  </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
</div>
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
  const requestorId = config.REQUESTOR_ID;

  const ERROR_MESSAGES = {
    noFiles: 'Please upload at least 1 document before submitting.',
    uploadError: 'Error uploading {fileName}: {error}',
    apiError: 'Error in saving request: {message}',
    genericError: 'An unexpected error occurred. Please try again.',
  };

  function handlePriorityChange(event) {
    selectedPriority = event.target.value;
  }

  function handleFileChange(event) {
    const newFiles = Array.from(event.target.files);
    files = [...files, ...newFiles];
  }

  function removeFile(fileToRemove) {
    files = files.filter((file) => file !== fileToRemove);
    updateFilePreview();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    showLoadingAlert();

    if (files.length < 1) {
      return showErrorAlert(ERROR_MESSAGES.noFiles);
    }

    const datedue = new Date(deadline).toISOString();

    try {
      // Create the request
      let response = await fetch(`${uploadUrl}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Priority: selectedPriority,
          Summery: textInput,
          DateDue: datedue,
          Requestor_id: requestorId,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return showErrorAlert(ERROR_MESSAGES.apiError.replace('{message}', errorResponse.message || ''));
      }

      const resp = await response.json();

      // Upload each file
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('request', resp.data.id);
        formData.append('destination', 'supporting-documents');

        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          console.log(`${file.name} uploaded successfully`);
        } else {
          const errorText = await uploadResponse.text();
          console.error(ERROR_MESSAGES.uploadError.replace('{fileName}', file.name).replace('{error}', `${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`));
          showErrorAlert(ERROR_MESSAGES.uploadError.replace('{fileName}', file.name).replace('{error}', errorText));
        }
      }

    } catch (err) {
      showErrorAlert(err.message || ERROR_MESSAGES.genericError);
    } finally {
      Swal.close();
      window.location.reload();
    }

    // Clear files after submission
    files = [];
    updateFilePreview();
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
        Swal.showLoading();
      },
    });
  }

  function showErrorAlert(error) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Error: ${error}`,
    });
  }

  function updateFilePreview() {
    const filePreview = document.getElementById('filePreview');
    filePreview.innerHTML = ''; // Clear previous previews

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileURL = e.target.result;
        const fileType = file.type.split('/')[0];

        const fileElement = document.createElement('div');
        fileElement.classList.add('flex', 'items-center', 'justify-between', 'mb-3', 'p-4', 'rounded-lg', 'bg-white', 'shadow-md', 'transition-transform', 'hover:translate-y-1', 'transition-shadow', 'hover:shadow-lg');

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
          removeFile(file);
        });

        fileElement.appendChild(deleteButton);
        filePreview.appendChild(fileElement);
      };
      reader.readAsDataURL(file);
    });
  }

  // Event listener for file input
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener('change', handleFileChange);
  });
</script>

<!-- Data Request Form -->
<div>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 h-350-px">
    <div class="rounded-t bg-white mb-0 px-6 py-6 ">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Request For Data</h6>
      </div>
      <div class="px-6 py-6 border-t border-blueGray-200">
        <div class="flex flex-wrap bg-blueGray">
          <div class="w-full lg:w-8/12 px-4">
            <form on:submit|preventDefault={handleSubmit}>
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">
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
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="files">
                    Upload Various Files *
                  </label>
                  <div class="flex flex-col items-center pt-8 bg-gradient-to-r from-yellow-200 to-blue-300 rounded-lg shadow-lg max-w-lg mx-auto">
                    <label for="fileInput" class="cursor-pointer mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                      <i class="fa fa-upload"></i> Drop files here
                    </label>
                    <input id="fileInput" type="file" multiple required class="hidden"/>

                    <div id="filePreview" class="w-full mt-4"></div>
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
                    required
                  />
                </div>
              </div>
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="priority">
                    Select Priority
                  </label>
                  <select
                    id="priority"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    bind:value={selectedPriority}
                    on:change={handlePriorityChange}
                    required
                  >
                    <option value="" disabled selected>Select Priority</option>
                    {#each priorityOptions as option}
                      <option value={option}>{option}</option>
                    {/each}
                  </select>
                </div>
              </div>
              <div class="text-center mt-6">
                <button
                  type="submit"
                  class="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

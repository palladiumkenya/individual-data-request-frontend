<script>
  let files = [];
  let deadline = '';
  let textInput = '';

  const config = process.env.config;
  const uploadUrl = config.UPLOAD_URL.toString();

  function handleFileChange(event) {
    const newFiles = Array.from(event.target.files);
    files = [...files, ...newFiles];
  }

  function removeFile(fileToRemove) {
    files = files.filter((file) => file !== fileToRemove);
  }

  async function handleSubmit() {
    if (files.length < 5) {
      alert('Please upload at least 5 documents before submitting.');
      return;
    }

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        console.log('Sending Request to:', uploadUrl);

const response = await fetch(uploadUrl, {
  method: 'POST',
  body: formData,
});

if (response.ok) {
  console.log('${file.name} uploaded successfully');
} else {
  const errorText = await response.text();
  console.error(
    'Failed to upload ${file.name}: ${response.status} ${response.statusText} - ${errorText}'
  );
}
} catch (error) {
console.error('Error uploading ${file.name}:', error);
}
}
alert('Form submitted successfully!');
files = [];
}

  function handleTextInput(event) {
    textInput = event.target.value;
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
          fileElement.classList.add('file-item');
          fileElement.dataset.fileName = file.name; // Store file name for reference

          if (fileType === 'image') {
            fileElement.innerHTML = `
                                <img src="${fileURL}" alt="${file.name}">
                                <p><a href="${fileURL}" target="_blank">View Full Size</a></p>
                            `;
          } else if (fileType === 'text' || fileType === 'application') {
            fileElement.innerHTML = `
                                <p><a href="${fileURL}" target="_blank">View ${file.name}</a></p>
                            `;
          } else {
            fileElement.innerHTML = `
                                <p><a href="${fileURL}" download="${file.name}">${file.name}</a></p>
                                <p><a href="${fileURL}" target="_blank">View Document</a></p>
                            `;
          }

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
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

Data Request Form
<div class="relative flex flex-col min-w-full mb-9 shadow-lg rounded-lg bg-gray-100 border-0">
  <div class="rounded-t bg-white px-6 py-6 mb-0">
    <div class="text-center flex justify-between">
      <h6 class="text-gray-700 text-xl font-bold">Request For Data</h6>
      <button class="bg-red-400 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 transition-all duration-150" type="button">
        Settings
      </button>
    </div>
  </div>
  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-wrap mb-6">
        <div class="w-full lg:w-3/5 pr-4 mb-6 lg:mb-0">
          <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Data Request Information</h6>
          <textarea placeholder="Enter Description of text required here..." on:input={handleTextInput} class="w-full h-40 p-2 border rounded-lg border-gray-300 text-gray-700 resize-none"></textarea>
        </div>

        <div class="w-full lg:w-2/5">
          <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Preview</h6>
          <div id="textPreview" class="bg-gradient-to-r from-yellow-200 to-blue-300 p-4 rounded-lg shadow-md whitespace-pre-wrap">
            {textInput}
          </div>
        </div>
      </div>
      <hr>
      <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Documents to Upload:</h6>
      <div class="flex flex-wrap mb-6">
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-8">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
              <h3 class="text-xl font-bold uppercase">Ethics Protocol</h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-8">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
              <h3 class="text-xl font-bold uppercase">Specific Data Elements</h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
              <h3 class="text-xl font-bold uppercase">Institution Approval</h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-sky-600">
              <h3 class="text-xl font-bold uppercase">NACOSTI Approval</h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-8">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
              <h3 class="text-xl font-bold uppercase">Study Protocol</h3>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-8">
          <div class="relative w-full">
            <div class="bg-blue-500 text-white text-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
              <h3 class="text-xl font-bold uppercase">Any other Document</h3>
            </div>
          </div>
        </div>
      </div>
      
      
      


      <hr class="my-6 border-gray-300" />

      <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Upload Various Files</h6>
<div>
      <div class="flex flex-col items-center p-8 bg-gradient-to-r from-yellow-200 to-blue-300 rounded-lg shadow-lg max-w-lg mx-auto">
        <label for="fileInput" class="cursor-pointer text-lg mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <i class="fa fa-upload"></i> Drop files here
        </label>
        <input id="fileInput" type="file" multiple on:change={handleFileChange} class="hidden" />

        <div id="filePreview" class="w-full mt-4">
          {#if files.length > 0}
            {#each files as file}
              <div class="flex items-center justify-between mb-3 p-4 rounded-lg bg-white shadow-md transition-transform hover:translate-y-1 transition-shadow hover:shadow-lg">
                <div>
                  <p class="text-gray-700">{file.name}</p>
                  <p><a href="{URL.createObjectURL(file)}" target="_blank" class="text-blue-500">View Full Size</a></p>
                </div>
                <button on:click={() => removeFile(file)} class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg transition-transform hover:scale-105">
                  Delete
                </button>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <hr />
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Data Request Information
      </h6>
      <div class="deadline-container">
        <label for="deadlineInput" class="deadline-label"
          >Select the deadline for your request:</label
        >
        <input
          type="date"
          id="deadlineInput"
          class="deadline-input"
          bind:value={deadline}
        />
      </div>
      <br />
      <hr />
      <div class="button-wrapper">
      <div class="text-center mt-6">
        <button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors" on:click={handleSubmit}>
          submit
        </button>
      </div>
    </form>
  </div>
  </div>

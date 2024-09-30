<script>
  let files = [];
  let due_date = '';
  let textInput = '';
  let priority_level = '';
  
  const config = process.env.config;
  const uploadUrl = config.UPLOAD_URL;

  async function handleSubmit() {
    if (files.length < 1) {
      alert('Please upload at least 1 document before submitting.');
      return;
    }
    const requestPayload = {
      due_date,
      summery: textInput,
      priority_level,
    };

    try {
      const requestResponse = await fetch(uploadUrl + '/create-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!requestResponse.ok) {
        const errorText = await requestResponse.text();
        console.error(`Failed to create request: ${requestResponse.status} ${requestResponse.statusText} - ${errorText}`);
        return;
      }

      const requestId = await requestResponse.json(); 
      const formData = new FormData();
      for (const file of files) {
        formData.append('files', file);
      }
      formData.append('request_id', requestId); 

      const fileResponse = await fetch(uploadUrl + '/upload-files', {
        method: 'POST',
        body: formData,
      });

      if (fileResponse.ok) {
        console.log('Files uploaded successfully!');
        alert('Files uploaded successfully!');
        files = []; 
        due_date = '';
        textInput = '';
        priority_level = '';
      } else {
        const errorText = await fileResponse.text();
        console.error(`Failed to upload files: ${fileResponse.status} ${fileResponse.statusText} - ${errorText}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  function handleFileChange(event) {
    const newFiles = Array.from(event.target.files);
    files = [...files, ...newFiles];
  }

  function removeFile(fileToRemove) {
    files = files.filter((file) => file !== fileToRemove);
  }

  function handleTextInput(event) {
    textInput = event.target.value;
  }
</script>

<!-- Data Request Form -->
<div class="relative flex flex-col min-w-full mb-9 shadow-lg rounded-lg bg-gray-100 border-0">
  <div class="rounded-t bg-white px-6 py-6 mb-0">
    <div class="text-center flex justify-between">
      <h6 class="text-gray-700 text-xl font-bold">Request For Data</h6>
    </div>
  </div>
  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-wrap mb-6">
        <div class="w-full lg:w-3/5 pr-4 mb-6 lg:mb-0">
          <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Data Request Information</h6>
          <textarea placeholder="Enter Description of data required here..." on:input={handleTextInput} class="w-full h-40 p-2 border rounded-lg border-gray-300 text-gray-700 resize-none"></textarea>
        </div>
      </div>
      <hr>
      <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">Upload Various Files</h6>
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
      <br>
      <div class="priority-container">
        <label for="priorityInput" class="font-semibold mb-2">Select the priority for your request:</label>
        <select id="priorityInput" class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={priority_level}>
          <option value="" disabled selected>Select Priority</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
      </div>
      <br>
      <div class="deadline-container">
        <label for="deadlineInput" class="deadline-label">Select the deadline for your request:</label>
        <input type="date" id="deadlineInput" class="deadline-input" bind:value={due_date} />
      </div>
      <br>
      <div class="text-center mt-6">
        <button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

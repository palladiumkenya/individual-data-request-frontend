<script>
let files = [];
let deadline = '';
let textInput = '';

const config = process.env.config
const uploadUrl= config.UPLOAD_URL;

function handleFileChange(event) {
  const newFiles = Array.from(event.target.files);
  files = [...files, ...newFiles];
}

function removeFile(fileToRemove) {
  files = files.filter(file => file !== fileToRemove);
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

        console.log('Sending Request to:', uploadUrl)

        const response = await fetch(Uploadurl, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('${file.name} uploaded successfully');
        } else {
          const errorText = await response.text();
          console.error('Failed to upload ${file.name}: ${response.status} ${response.statusText} - ${errorText}');
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
  document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function(event) {
                const files = event.target.files;
                const filePreview = document.getElementById('filePreview');
                filePreview.innerHTML = ''; // Clear previous previews

                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
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
                            if (document.querySelectorAll('input[type="file"]')[0].files.length === 0) {
                                document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');
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
<style>
    .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    max-width: 600px;
    margin: auto;
    background: linear-gradient(135deg, #f6d365 0%, #7bade6 100%);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  /* Label styling with hover effect */
  label {
    cursor: pointer;
    font-size: 18px;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #50add8;
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  label:hover {
    background: linear-gradient(135deg, #678da7, #89be65);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  /* Hide the default file input */
  input[type="file"] {
    display: none;
  }

  /* Uploaded files container */
  .uploaded-files {
    margin-top: 20px;
    width: 100%;
  }

  /* File item styling */
  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  /* Hover effect for file items */
  .file-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .file-name {
    flex: 1;
    margin-left: 10px;
    color: #333;
  }

  .file-size {
    margin-right: 10px;
    color: #666;
  }

  .delete-button {
    cursor: pointer;
    background: linear-gradient(135deg, #8497bf, #7588df);
    color: white;
    border: none;
    padding: 7px 15px;
    border-radius: 5px;
    transition: background 0.3s ease, transform 0.3s ease;
  }


  .delete-button:hover {
    background: linear-gradient(135deg, #f94c57, #ff3b3f);
    transform: scale(1.05);
  }


  .deadline-container {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .deadline-label {
    font-size: 15px;
    color: white;
    margin-bottom: 15px;
  }

  .deadline-input {
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 320px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  }

  .deadline-input:hover {
    background: #f9f9f9;
    border-color: #999;
  }

  .deadline-input:focus {
    border-color: #ff6f61;
    box-shadow: 0 0 10px rgba(255, 111, 97, 0.3);
    outline: none;
  }
  .textarea-container,
  .text-preview-container {
    flex: 1;
    margin-right: 20px;
  }

  .textarea-container {
    max-width: 60%;
  }

  .text-preview-container {
    max-width: 35%;
  }
    
  textarea {
    width: 100%;
    max-width: 600px;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    resize: none;
  }

  .text-preview {
    background: linear-gradient(135deg, #f6d365 0%, #7bade6 100%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
    white-space: pre-wrap;
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .text-preview:hover {
    background: linear-gradient(135deg, #7bade6 0%, #f6d365 100%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  } 

  button {
    background-color: #1f2937;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  button {
    background-color: #1f2937;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  button:hover {
    background-color: #4a5568;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  button:focus {
    outline: none;
  }
  </style>
<!-- Data Request Form-->
<div
  class="relative flex flex-col min-w-100 break-words w-full mb-9 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
  <div class="rounded-t bg-white mb-0 px-6 py-6">
    <div class="text-center flex justify-between">
      <h6 class="text-blueGray-700 text-xl font-bold">Request For Data</h6>
      <button
        class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        Settings
      </button>
    </div>
  </div>
  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-row">
        <div class="textarea-container">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Data Request Information
          </h6>
          <textarea
            placeholder="Enter Description of text required here..."
            on:input={handleTextInput}
          ></textarea>
        </div>
  
          <div class="text-preview-container">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Preview
          </h6>
          <div id="textPreview" class="text-preview">
            {textInput}
          </div>
        </div>
      </div>
      
      <hr class="mt-6 border-b-1 border-blueGray-300" />

      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Documents to Upload:
      </h6>
      <div class="flex flex-wrap">
         
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              Ethics Protocol
            </label>
          </div>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              Specific Data Elements
            </label>
          </div>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              Institution Approval
            </label>
          </div>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              NACOSTI Approval
            </label>
          </div>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-country"
            >
              Study Protocol
            </label>
          </div>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              Any other Document
            </label>
          </div>
        </div>
      </div>
        <!-- Uploading Section -->
      <hr class="mt-6 border-b-1 border-blueGray-300" />

      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Upload Various Files
      </h6>
      <div class="upload-container">
        <label for="fileInput">
          <i class="fa fa-upload"></i> Drop files here 
        </label>
        <input type="file" id="fileInput" multiple on:change={handleFileChange}>
      
        <div class="uploaded-files">
          {#if files.length > 0}
            {#each files as file (file.name)}
              <div class="file-item">
                <i class="far fa-file"></i>
                <span class="file-name">{file.name}</span>
                <span class="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                <button class="delete-button" on:click={() => removeFile(file)}>Delete</button>
              </div>
            {/each}
          {:else}
            <p>No files uploaded</p>
          {/if}
        </div>
      </div>
      <br>
      <hr>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Data Request Information
      </h6>
      <div class="deadline-container">
        <label for="deadlineInput" class="deadline-label">Select the deadline for your request:</label>
        <input type="date" id="deadlineInput" class="deadline-input" bind:value={deadline}>
      </div>
      <br>
      <hr>
      <div class="button-wrapper">
      <button
      type="button"
      on:click={handleSubmit}
    >
      Submit
    </button>
  </div>
        
    </form>
  </div>
</div>

  
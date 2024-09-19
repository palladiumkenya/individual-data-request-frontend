<script>
    import { onMount } from 'svelte';

    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const id = params.get('id');

    let issue;

    let statusOptions = ['Pending', 'In Progress', 'Done'];
    let selectedStatus = issue.status;
    let file = null;
    let comment = '';


    onMount(() => {
        console.log("test")
        let id = ''
        let assigneeUuid = '';
        fetch(`http://localhost:8080/analysts/job?assignee=${assigneeUuid}&id=${id}`)
            .then(response => response.json())
            .then(data => issue = data)
            .catch(err => console.error(err));

    });

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
        console.log('Issue ID:', issue.id);
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

<div class="flex flex-wrap">
    <h1>Request Details</h1>

    <div class="issue-meta">
        <p><strong>Issue ID:</strong> {issue.id}</p>
        <p><strong>Summary:</strong> {issue.summary}</p>
        <p><strong>Description:</strong> {issue.description}</p>
        <p><strong>Reporter:</strong> {issue.reporter}</p>
        <p><strong>Assignee:</strong> {issue.assignee}</p>
        <p><strong>Priority:</strong> {issue.priority}</p>
        <p><strong>Created:</strong> {new Date(issue.created).toLocaleDateString()}</p>
        <p><strong>Last Updated:</strong> {new Date(issue.updated).toLocaleDateString()}</p>
    </div>

    <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" bind:value={selectedStatus} on:change={handleStatusChange}>
            {#each statusOptions as status}
                <option value={status}>{status}</option>
            {/each}
        </select>
    </div>

    <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" rows="4" bind:value={comment} placeholder="Add a comment..."></textarea>
    </div>

    <div class="form-group">
        <label for="file">Attach file:</label>
        <input type="file" id="file" on:change={handleFileChange} />
    </div>

    <div class="form-group">
        <button on:click={handleSubmit}>Submit</button>
    </div>
</div>

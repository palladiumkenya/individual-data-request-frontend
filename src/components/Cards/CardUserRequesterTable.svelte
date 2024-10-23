<!-- CardApprovalsTable.svelte -->
<script>
  import {onMount} from "svelte";
  import UserRequestTable from "./UserRequestTable.svelte";
  import {auth} from "../../authentication/AuthStore";

  const env = process.env.config;
  let openTab = 1;
  let tasks = [];
  let error = null;

  function toggleTabs(tabNumber){
    openTab = tabNumber
  }

  onMount(async () => {
    let requesterUuid = null;
    auth.id.subscribe((value) => requesterUuid = value)
    try {
      const response = await fetch(`${env.API_ENDPOINT}/request/requester/get?requester=${requesterUuid}`);
      const data = await response.json();
      tasks = data.data;

    } catch (err){
      error = err.error
    }
  });
</script>

<div class="flex flex-wrap">
  <div class="w-full">
    <ul class=" relative flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 1 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(1)}>
          All
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 2 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(2)}>
          Pending Review
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 3 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(3)}>
          Request In Progress
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a href="#" class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 4 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(4)}>
          Rejected Requests
        </a>
      </li>
      <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 5 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(5)}>
          Completed Requests
        </a>
      </li>
    </ul>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
      <div class="py-5 flex-auto">
        <div class="tab-content tab-space">
          <div class="{openTab === 1 ? 'block':'hidden'}">
            <UserRequestTable {tasks}/>
          </div>
          <div class="{openTab === 2 ? 'block':'hidden'}">
            <UserRequestTable tasks={tasks.filter(task => task?.Status === "pending")}/>
          </div>
          <div class="{openTab === 3 ? 'block':'hidden'}">
            <UserRequestTable tasks={tasks.filter(task => task?.Status === "in progress")}/>
          </div>
          <div class="{openTab === 4 ? 'block':'hidden'}">
            <UserRequestTable tasks={tasks.filter(task => task?.Status === "rejected")}/>
          </div>
          <div class="{openTab === 5 ? 'block':'hidden'}">
            <UserRequestTable tasks={tasks.filter(task => task?.Status === "complete")}/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

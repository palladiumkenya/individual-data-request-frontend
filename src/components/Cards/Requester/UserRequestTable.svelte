<script>
  import {DataHandler, Th} from '@vincjo/datatables'
  import Pagination from "./Pagination.svelte";
  import Search from "./Search.svelte";
  import ThFilter from "./ThFilter.svelte"

  export let tasks;
  export let color = "light";


  // Initialize DataHandler with tasks data
  $: handler = new DataHandler(tasks || [], { rowsPerPage: 10 });
  $: rows = handler.getRows();
</script>

<div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}"
>
  <div class="rounded-t mb-0 px-4 py-3 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3
                class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
        >
          Requests
        </h3>
      </div>
    </div>
  </div>

  <div class="block w-full overflow-x-auto">
<!--  <Datatable {handler}>-->
    <header>
      <Search {handler} />
    </header>
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
      <tr>
        <Th {handler} orderBy="Priority_level" class="px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">Priority</Th>
        <Th {handler} orderBy="Date_Due" class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">Due Date</Th>
        <Th {handler} orderBy="Created_Date" class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">Date Created</Th>
        <Th {handler} orderBy="Status" class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}">Status</Th>
        <Th {handler} class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"></Th>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="Priority_level" class="px-1 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"/>
        <ThFilter {handler} filterBy="Date_Due" class="px-1 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"/>
        <ThFilter {handler} filterBy="Created_Date" class="px-1 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"/>
        <ThFilter {handler} filterBy="Status" class="px-1 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"/>
          <Th {handler} class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"></Th>
      </tr>
      </thead>
      <tbody>
      {#if rows.length === 0}
        <tr>
          <td colspan="4" class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">No records to display</td>
        </tr>
      {/if}
      {#each $rows as task}
        <tr>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">{task?.Priority_level}</td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">{new Date(task?.Date_Due).toLocaleDateString()}</td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">{new Date(task?.Created_Date).toLocaleDateString()}</td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
            <i
                    class={`fas fa-circle mr-2 ${task?.Status === 'pending' ? 'text-yellow-500' :
                task?.Status === 'rejected' ? 'text-red-500' :
                task?.Status === 'in progress' ? 'text-blue-500' :
                task?.Status === 'complete' ? 'text-emerald-500' :
                'text-gray-500'}`}
            ></i>
            {task?.Status}
          </td>
            <td>
                <a
                        href={`/requester/request-details?id=${task.ID}`}
                        class="text-emerald-500 bg-transparent border border-solid border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-folder-open"></i> View
                </a>
            </td>
        </tr>
      {/each}
      </tbody>
    </table>
    <footer>
<!--      <RowCount {handler} />-->
      <Pagination {handler} />
    </footer>
<!--  </Datatable>-->
</div>
</div>

<style>
  input {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    outline: none;
    padding: 0 8px;
    line-height: 24px;
    margin: 0;
    height: 24px;
    background: transparent;
    width: 176px;
    transition: all, 0.1s;
  }
  input:focus {
    border: 1px solid #bdbdbd;
  }
  input::placeholder {
    color: #9e9e9e;
    line-height: 24px;
  }
</style>

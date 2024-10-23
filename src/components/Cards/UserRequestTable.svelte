<script>
  let page = 1;
  let perPage = 10;
  let totalPages = 1;
  export let tasks;
  export let color = "light";

  $: totalPages = Math.ceil(tasks.length / perPage);

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
    <!-- Projects table -->
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
          >
            Priority
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
          >
            Due date
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
          >
            Date Created
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
          >
            Status
          </th>
          <th
            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color === 'light' ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100' : 'bg-red-700 text-red-200 border-red-600'}"
          ></th>
        </tr>
      </thead>
      <tbody>
      {#if tasks.length === 0}
        <tr>
          <td colspan="5" class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">No records to display</td>
        </tr>
      {/if}
      {#each tasks.slice((page - 1) * perPage, page * perPage) as task(task.ID)}
          <tr>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">
              {task?.Priority_level}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">
              {new Date(task?.Date_Due).toLocaleDateString()}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left items-center">
              {new Date(task?.Created_Date).toLocaleDateString()}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
              <i
                      class={`fas fa-circle mr-2 ${
                        task?.Status === 'pending' ? 'text-yellow-500' :
                        task?.Status === 'rejected' ? 'text-red-500' :
                        task?.Status === 'in progress' ? 'text-blue-500' :
                        task?.Status === 'complete' ? 'text-emerald-500' :
                        'text-gray-500'
                      }`}
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
    <hr />
    <div class="py-2">
      <nav class="block">
        <ul class="flex pl-0 rounded list-none flex-wrap">
          <li>
            <button
                    class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                    type="button"
                    disabled={page === 1}
                    on:click={() => page--}
            >
              <i class="fas fa-chevron-left -ml-px"></i>
            </button>
          </li>
          {#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNumber}
            <li>
              <button
                      class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                      type="button"
                      disabled={page === pageNumber}
                      on:click={() => page = pageNumber}
              >
                {pageNumber}
              </button>
            </li>
          {/each}
          <li>
            <button
                    class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                    type="button"
                    disabled={page === totalPages}
                    on:click={() => page++}
            >
              <i class="fas fa-chevron-right -mr-px"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<script>
import moment from "moment";
import {DataHandler, Th} from '@vincjo/datatables'
import ThFilter from "../Requester/ThFilter.svelte";
import Search from "../Requester/Search.svelte";
import Pagination from "../Requester/Pagination.svelte";

const env = process.env.config;

export let dashboardData;
export let approval_type;


console.log(dashboardData)
// Initialize DataHandler with dashboardData data
$: handler = new DataHandler(dashboardData || [], { rowsPerPage: 10 });
$: rows = handler.getRows();

</script>


<header>
    <Search {handler} />
</header>
<!--    <Datatable {handler}>-->
<table class="min-w-full bg-white">
    <thead>
    <tr>
        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Request ID</Th>
        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Status</Th>
        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Due Date</Th>
        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Priority</Th>

        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Requester</Th>
        <Th {handler}
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        >Date of request</Th>
    </tr>
    <tr>
        <ThFilter {handler} filterBy="ReqID"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />
        <ThFilter {handler} filterBy="Status"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />
        <ThFilter {handler} filterBy="Date_Due"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />
        <ThFilter {handler} filterBy="Priority_level"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />

        <ThFilter {handler} filterBy="Requester"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />
        <ThFilter {handler} filterBy="Created_Date"
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        />
    </tr>
    </thead>
    <tbody>
    {#if rows.length === 0}
        <tr>
            <td colspan="5" class="text-center py-4">No records found</td>
        </tr>
    {:else}
        {#each $rows as row }
            <tr>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold"
                ><a href="{env.FRONTEND_URL}/{approval_type}/action/{row.ReqId}?type={approval_type}&id={row.ID}" class="requestIdStyling">
                    #{row.ReqId}</a>
                </td
                >
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4
                      {row.Status	 == 'complete' || row.Status	 == 'assigned' && 'text-emerald-300 '}
                      {row.Status	 == 'approved'  && 'text-emerald-500 '}
                      {row.Status	 == 'pending'  && 'text-blueGray-600 '}
                      {row.Status	 == 'rejected'  && 'text-red-600 '}
                     {row.Status	 == 'in progress' || row.Status	 == 'review stage' && 'text-indigo-600 '}"
                >
              <span class="dot {row.Status	 == 'complete' || row.Status	 == 'assigned'&& 'bg-emerald-300 '}
               {row.Status	 == 'approved'  && 'bg-emerald-500 '}
               {row.Status	 == 'pending'  && 'bg-blueGray-600 '}
                {row.Status	 == 'rejected'  && 'bg-red-500 '}
               {row.Status	 == 'in progress' || row.Status	 == 'review stage' && 'bg-indigo-500 '}"></span>
                    {row.Status}</td
                >

                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                >{row.Date_Due}</td
                >
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
             <span class={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full uppercase last:mr-0 mr-1" +
               " ${row.Priority_level	 == 'high' && 'text-red-600 bg-red-200 '}
               ${row.Priority_level	 == 'medium' && 'text-orange-500 bg-orange-200'}
               ${row.Priority_level	 == 'low' && 'text-yellow-600 bg-yellow-200 '}`}>
                 {row.Priority_level	}  <i class="fa fa-exclamation" aria-hidden="true"></i>
              </span>
                </td>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                >
                    {row.Requester}
                </td>
                <td
                        class="border-t-0 px-6 align-middle text-indigo-600 border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >{row.Created_Date}</td>
            </tr>
        {/each}
    {/if}
    </tbody>
</table>
<!--    </Datatable>-->
<footer>
    <!--      <RowCount {handler} />-->
    <Pagination {handler} />
</footer>

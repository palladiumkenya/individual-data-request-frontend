<script>
    import RequestTable from "components/Cards/RequestTable.svelte";
    import {onMount} from "svelte";
    import {auth} from '../../authentication/AuthStore';

    const env = process.env.config;
    let openTab = 1;
    let tasks = [];
    let error = null;

    function toggleTabs(tabNumber){
        openTab = tabNumber
    }

    onMount(async () => {
        let assigneeUuid = null;
        let user = null
        auth.userRoles.subscribe((value) => (user = value) )
        assigneeUuid = user.find((req) => req.role === "analyst")?.id

        try {
            const response = await fetch(`${env.API_ENDPOINT}/analysts/jobs?assignee=${assigneeUuid}`);
            const data = await response.json();
            tasks = data.data;
            // totalPages = Math.ceil(tasks.length / perPage);

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
                    Pending
                </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 3 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(3)}>
                    In Progress
                </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab === 4 ? 'text-white bg-red-600':'text-red-600 bg-white'}" on:click={() => toggleTabs(4)}>
                    Complete
                </a>
            </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
            <div class="py-5 flex-auto">
                <div class="tab-content tab-space">
                    <div class="{openTab === 1 ? 'block':'hidden'}">
                        <RequestTable {tasks}/>
                    </div>
                    <div class="{openTab === 2 ? 'block':'hidden'}">
                        <RequestTable tasks={tasks.filter(task => task?.Status === "pending")}/>
                    </div>
                    <div class="{openTab === 3 ? 'block':'hidden'}">
                        <RequestTable tasks={tasks.filter(task => task?.Status === "in progress")}/>
                    </div>
                    <div class="{openTab === 4 ? 'block':'hidden'}">
                        <RequestTable tasks={tasks.filter(task => task?.Status === "complete")}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    import {onMount} from "svelte";
    const env = process.env.config;

    export let loggedin_user_profile;

    let data = [];
    let loading = true;
    let error = null;

    let isInternalApprover = '';
    let isExternalApprover = '';

    onMount(async () => {
        try {
            const response = await fetch(
                `${env.API_ENDPOINT}/approvers/${loggedin_user_profile.email}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();

            isInternalApprover = data.data.some(item => item.Approver_Type === 'internal');
            isExternalApprover = data.data.some(item => item.Approver_Type === 'external');
            console.log("isInternalApprover",isInternalApprover,isExternalApprover)
        } catch (err) {
            error = err.message;
            console.log("error --->", error)

        } finally {
            loading = false;
        }
    });

</script>


<div>
    {#if loggedin_user_profile.UserType === "1"}
        <a
                href="/user/management/approver"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
            <i class="fas fa-user-astronaut"></i>
            Manage Users
        </a>
    {/if}
    {#if isInternalApprover }
        <a
                href="/internalreviewer/dashboard"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
            <i class="fas fa-circle-arrow-right"></i>
            Internal Reviewer Dashboard
        </a>
    {/if}
    {#if isExternalApprover }
        <a
                href="/externalreviewer/dashboard"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
            <i class="fas fa-circle-arrow-right"></i>
            External Reviewer Dashboard
        </a>
    {/if}
    {#if loggedin_user_profile.UserType === "1"}
        <a
                href="/pointperson/dashboard"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
            <i class="fas fa-circle-arrow-right"></i>
            Point Person Dashboard
        </a>
    {/if}
</div>

<script>
    const env = process.env.config;

    export let color = 'light';

    export let approvers;
    async function deleteItem(id) {
        try {
            const response = await fetch(`${env.API_ENDPOINT}/user/delete_approver?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

</script>

<div>
    <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ==='light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                Email
            </th>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
                      'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                Approver Type
            </th>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
                      'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                Action
            </th>
        </tr>
        </thead>
        <tbody>

        {#each approvers as approver}
            <tr>
                <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                >
                          <span
                                  class="ml-3 font-bold {color === 'light'
                              ? 'btext-blueGray-600'
                              : 'text-whit'}"
                          >
                           { approver?.Email}

                          </span>
                </th>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-leftfon items-center"
                >
                          <span
                                  class="ml-3 font-bold {color === 'light'
                              ? 'btext-blueGray-600'
                              : 'text-whit'}"
                          >
                           { approver?.Approver_Type}

                          </span>
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div on:click={() => deleteItem(approver?.ID)} class="cursor-pointer">
                        <i class="fa fa-trash" aria-hidden="true"></i>

                        <span
                                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1"
                        >
                            DELETE
                        </span>
                    </div>
                </td>
            </tr>
        {/each}

        </tbody>
    </table>
</div>

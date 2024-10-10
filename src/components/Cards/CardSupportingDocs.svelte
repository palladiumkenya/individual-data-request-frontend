<script>
    const env = process.env.config;

    import {onMount} from "svelte";
    export let color = 'light';

    export let request_id;

    async function getDocs() {
        const response = await fetch(`${env.API_ENDPOINT}/fetch_request_files/${request_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch docs');
        }
        return response.json();
    }

    let requestDocs = getDocs();
</script>

<div class="px-6 py-6 border-t border-blueGray-200">
    <p class="text-blueGray-700 text-sm font-bold">
        Supporting Documents
    </p>
    <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
                      'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                Document
            </th>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
                      'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                Action
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#await requestDocs }
            <p>Loading docs....</p>
        {:then data }
            {#each data.data as doc}
            <tr>
                <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                >
                          <span
                                  class="ml-3 font-bold {color === 'light'
                              ? 'btext-blueGray-600'
                              : 'text-whit'}"
                          >
                           { doc.FileName}

                          </span>
                </th>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                    <a href={ doc.FileURL} target="_blank">
                         <i class="fa fa-eye" aria-hidden="true"></i>
                    </a>

                          <span
                                  class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1"
                          >
                            VIEW
                          </span>
                </td>
            </tr>
            {/each}
        {/await}

        </tbody>
    </table>
</div>

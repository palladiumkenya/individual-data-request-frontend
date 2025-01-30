<script>
    const env = process.env.config;

    export let color = 'light';

    export let requestDocs;

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
                Document
            </th>
            <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ==='light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-red-700 text-red-200 border-red-600'}"
            >
                File
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

        {#each requestDocs as doc}
            <tr>
                <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                >
                          <span
                                  class="ml-3 font-bold {color === 'light'
                              ? 'text-blueGray-600'
                              : 'text-whit'}"
                          >
                           { doc.FileName}

                          </span>
                </th>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                          <span
                                  class="ml-3 font-bold {color === 'light'
                              ? 'text-blueGray-600'
                              : 'text-white'}"
                          >
                           { doc.FilePurpose}

                          </span>
                </td>
                <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                    <a href={doc.FileURL} target="_blank">
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

        </tbody>
    </table>
</div>

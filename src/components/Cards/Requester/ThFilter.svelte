<script>
    export let handler
    export let filterBy = null
    let value = ''
</script>

<th>
    <input
            class="border-4 px-3 py-3 my-1.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="text"
            placeholder="Filter"
            bind:value
            on:input={() => handler.filter(value, filterBy)}
    />
</th>

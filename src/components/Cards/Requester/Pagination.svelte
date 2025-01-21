<script>
    export let handler
    $: pageNumber = handler.getPageNumber()
    $: pageCount = handler.getPageCount()
    $: pages = handler.getPages({ ellipsis: true })
</script>


<div class="py-2">
    <nav class="block">
        <ul class="flex pl-0 rounded list-none flex-wrap">
            <li>
                <button
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                        type="button"
                        disabled={$pageNumber === 1}
                        on:click={() => handler.setPage('previous')}
                >
                    <i class="fas fa-chevron-left -ml-px"></i>
                </button>
            </li>
            {#each $pages as page}
                <li>
                    <button
                            class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                            type="button"
                            class:active={true}
                            class:ellipse={page === null}
                            on:click={() => handler.setPage(page)}
                    >
                        {page ?? '...'}
                    </button>
                </li>
            {/each}
            <li>
                <button
                        class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500 bg-white text-red-500"
                        type="button"
                        class:disabled={$pageNumber === $pageCount}
                        on:click={() => handler.setPage('next')}
                >
                    <i class="fas fa-chevron-right -mr-px"></i>
                </button>
            </li>
        </ul>
    </nav>
</div>


<style>
    section {
        display: flex;
    }
    button {
        background: inherit;
        height: 32px;
        width: 32px;
        color: #616161;
        cursor: pointer;
        font-size: 13px;
        margin: 0;
        padding: 0;
        transition: all, 0.2s;
        line-height: 32px;
        border: 1px solid #e0e0e0;
        border-right: none;
        outline: none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
        width: auto;
        min-width: 72px;
    }
    button:last-child {
        border-right: 1px solid #e0e0e0;
        border-radius: 0 4px 4px 0;
        width: auto;
        min-width: 72px;
    }
    button:not(.active):hover {
        background: #eee;
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }

</style>

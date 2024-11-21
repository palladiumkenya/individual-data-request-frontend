<script>
  import { link } from "svelte-routing";
  // library for creating dropdown menu appear on click
  import { createPopper } from "@popperjs/core";

  // core components
  let dropdownPopoverShow = false;

  let btnDropdownRef;
  let popoverDropdownRef;

  const toggleDropdown = (event) => {
    event.preventDefault();
    if (dropdownPopoverShow) {
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      createPopper(btnDropdownRef, popoverDropdownRef, {
        placement: "bottom-start",
      });
    }
  };
</script>

<div>
  <a
    class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
    href="#pablo"
    bind:this="{btnDropdownRef}"
    on:click="{toggleDropdown}"
  >
    Make a request
  </a>
  <div
    bind:this="{popoverDropdownRef}"
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
  >
    <a
      use:link
      href="/requester/dashboard"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
    >
      Request List
    </a>
    <a
      use:link
      href="/requester/new-request"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
    >
      New Request
    </a>

  </div>
</div>

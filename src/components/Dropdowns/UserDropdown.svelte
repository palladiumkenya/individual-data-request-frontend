<script>
  // library for creating dropdown menu appear on click
  import { createPopper } from '@popperjs/core';
  import { auth } from '../../authentication/AuthStore';
  // core components

  const image = '../assets/img/team-1-800x800.jpg';

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
        placement: 'bottom-start',
      });
    }
  };


  let user = null;
  auth.subscribe((value) => (user = value));

</script>

<div class="items-center flex">
  {#if user}
    <h1 class="text-white px-4">Welcome, {user.profile.name}!</h1>
  {/if}
  <a
    class="text-blueGray-500 block"
    href="#pablo"
    bind:this={btnDropdownRef}
    on:click={toggleDropdown}
  >
    <div>
      <span
        class="w-12 h-12 text-sm text-white bg-white inline-flex items-center justify-center rounded-full"
      >

        <i class="fas fa-user text-lg text-black"></i>
      </span>
    </div>
  </a>
  <div
    bind:this={popoverDropdownRef}
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
      ? 'block'
      : 'hidden'}"
  >
    {#if user}
      <a
        on:click={() => auth.logout()}
        href="#login"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Logout <i class="fas fa-right-from-bracket"></i>
      </a>
    {:else}
      <a
        on:click={() => auth.login()}
        href="#login"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Login <i class="fa fa-right-to-bracket"></i>
      </a>
    {/if}
  </div>
</div>

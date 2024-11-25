<script>
  import { onMount } from 'svelte';
  import { auth } from './AuthStore';
  import { userManager } from './OidcConfig';

  import Auth503Error from './Auth503Error.svelte'

  export let component;
  export let adminRestrict;

  let isAuthenticated = false;
  let authorize = true;

  onMount(async () => {
    const user = await userManager.getUser();
    if (user) {
      auth.setUser(user);
      isAuthenticated = true;
    } else {
      auth.login();
    }

    if(user.profile.UserType === "1" && !!adminRestrict){
      authorize = true
    }else if (!adminRestrict){
      authorize = true // if the page isn't restricted
    }else{
      authorize = false
    }
  });
</script>

{#if !authorize}
  <Auth503Error />
{:else if isAuthenticated}
  <svelte:component this={component} />
{/if}

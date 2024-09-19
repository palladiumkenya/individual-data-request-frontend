<script>
  import { onMount } from 'svelte';
  import { auth } from './AuthStore';
  import { userManager } from './OidcConfig';

  export let component;

  let isAuthenticated = false;

  onMount(async () => {
    const user = await userManager.getUser();
    if (user) {
      auth.setUser(user);
      isAuthenticated = true;
    } else {
      auth.login(); 
    }
  });
</script>

{#if isAuthenticated}
  <svelte:component this={component} />
{/if}

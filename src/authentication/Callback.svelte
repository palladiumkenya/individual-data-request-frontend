<script>
    import { onMount } from 'svelte';
    import { userManager } from './OidcConfig';
    import { auth } from './AuthStore';
    import { navigate } from 'svelte-routing';

  onMount(async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      auth.setUser(user);
      navigate('user/dashboard');
    } catch (error) {
      console.error('Error during signin callback:', error);
    }
  });
</script>

<p>Processing login...</p>

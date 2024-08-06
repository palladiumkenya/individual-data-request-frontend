<script>
    import { onMount } from 'svelte';
    import { userManager } from './oidcConfig';
    import { auth } from './authStore';
    import { navigate } from 'svelte-routing';

    onMount(async () => {
        try {
            const user = await userManager.signinRedirectCallback();
            auth.setUser(user);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error during signin callback:', error);
        }
    });
</script>

<p>Processing login...</p>

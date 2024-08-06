<script>
    import { onMount } from 'svelte';
    import { auth } from './authStore';
    import { userManager } from './oidcConfig';

    onMount(async () => {
        const user = await userManager.getUser();
        if (user) {
            auth.setUser(user);
        }
    });
</script>

<slot />

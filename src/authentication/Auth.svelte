<script>
    import { onMount } from 'svelte';
    import { auth } from './AuthStore';
    import { userManager } from './OidcConfig';

    onMount(async () => {
        const user = await userManager.getUser();
        if (user) {
            auth.setUser(user);
        }
    });
</script>

<slot />

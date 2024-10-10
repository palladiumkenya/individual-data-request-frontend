<script>
    import {onMount} from 'svelte';
    import {userManager} from './OidcConfig';
    import {auth} from './AuthStore';
    import {navigate} from 'svelte-routing';
    const env = process.env.config;

    onMount(async () => {
        try {
            const user = await userManager.signinRedirectCallback();
            auth.setUser(user);

            let response = await fetch(`${env.API_ENDPOINT}/user/role?email=${user?.profile?.email}`)

            let role = await response.json()

            if (role.data?.role === 'approver'){
                if (user.profile.UserTypeRole === "InternalApprover")
                    navigate('internalreviewer/dashboard');
                else if (user.profile.UserTypeRole === "ExternalApprover")
                    navigate('externalreviewer/dashboard');
                else
                    navigate('internalreviewer/dashboard');
            }
            else if (role.data?.role === 'analyst'){
                navigate('analyst/list');
            }
            else if (role.data?.role === 'requester') {
                navigate('requester/dashboard');
            }
            else if (role.data?.role === "pointperson") {
                navigate('pointperson/dashboard');
            }
            else if (role.data?.role === null) {
                navigate('user/dashboard');
            }
        } catch (error) {
            console.error('Error during signin callback:', error);
        }
    });
</script>

<p>Processing login...</p>

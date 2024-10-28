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
                auth.setUserId(role.data.id)
                if (role.data.type === "InternalApprover")
                    navigate('internalreviewer/dashboard');
                else if (role.data.type === "ExternalApprover")
                    navigate('externalreviewer/dashboard');
                else
                    navigate('internalreviewer/dashboard');
            }
            else if (role.data?.role === 'analyst'){
                auth.setUserId(role.data.id)
                navigate('analyst/list');
            }
            else if (role.data?.role === 'requester') {
                auth.setUserId(role.data.id)
                navigate('requester/dashboard');
            }
            else if (role.data?.role === "pointperson") {
                auth.setUserId(role.data.id)
                navigate('pointperson/dashboard');
            }
            else if (role.data?.role === null) {
                let new_user = JSON.stringify({
                    "email": user?.profile?.email,
                    "Name": user?.profile?.FullName,
                    "Organization": user?.profile?.OrganizationName
                })
                const requestOptions = {
                    method: "POST",
                    body: new_user,
                    redirect: "follow"
                };
                let requester = await fetch(`${env.API_ENDPOINT}/user/new_requester`, requestOptions)
                let response = await requester.json()
                if (requester.ok){
                    auth.setUserId(response.data.id)
                    navigate('user/dashboard');
                }
            }
        } catch (error) {
            console.error('Error during signin callback:', error);
        }
    });
</script>

<p>Processing login...</p>

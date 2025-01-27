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

            if (role.data?.roles.find((role) => role.role === 'approver')){
                let approverType = role.data?.roles.find((role) => role.role === 'approver').type
                auth.setUserRoles(role.data.roles)
                if (approverType === "internal")
                    navigate('internalreviewer/dashboard');
                else if (approverType === "external")
                    navigate('externalreviewer/dashboard');
                else
                    navigate('internalreviewer/dashboard');
            }
            else if (role.data?.roles.find((role) => role.role === 'analyst')){
                auth.setUserRoles(role.data.roles)
                navigate('analyst/list');
            }
            else if (role.data?.roles.find((role) => role.role === 'requester')) {
                auth.setUserRoles(role.data.roles)
                navigate('requester/dashboard');
            }
            else if (role.data?.roles.find((role) => role.role === "pointperson")) {
                auth.setUserRoles(role.data.roles)
                navigate('pointperson/dashboard');
            }
            else if (role.data?.roles === null) {
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
                    auth.setUserRoles([response.data])
                    navigate('requester/dashboard');
                }
            }
        } catch (error) {
            console.error('Error during signin callback:', error);
        }
    });
</script>

<p>Processing login...</p>

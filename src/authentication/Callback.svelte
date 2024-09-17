<script>
    import { onMount } from 'svelte';
    import { userManager } from './OidcConfig';
    import { auth } from './AuthStore';
    import { navigate } from 'svelte-routing';

  onMount(async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      auth.setUser(user);
      if (user.profile.UserTypeRole == "Approver"){
          navigate('internalreviewer/dashboard');
      }else if (user.profile.UserTypeRole == "ExternalApprover"){
          navigate('externalreviewer/dashboard');
      }else if (user.profile.UserTypeRole == "Assignee"){
            navigate('assignee/dashboard');
      }else if (user.profile.UserTypeRole == "PointPerson"){
          navigate('pointperson/dashboard');
      }else{
            navigate('user/dashboard');
      }
    } catch (error) {
      console.error('Error during signin callback:', error);
    }
  });
</script>

<p>Processing login...</p>

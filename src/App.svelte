<!-- App.svelte -->
<script>
  import { Router, Route } from 'svelte-routing';

  // Admin Layout
  import Admin from './layouts/Admin.svelte';
  // Auth Layout
  import Auth from './layouts/Auth.svelte';

  // User Layout
  import User from './layouts/UsersLayout.svelte';
  // Assignee layout
  import Assignee from './layouts/assigneeLayout.svelte'
  // Internal Reviewer Layout
  import Internalreviewer from './layouts/InternalReviewerLayout.svelte'

  // No Layout Pages
  import Index from './views/Index.svelte';
  import Landing from './views/Landing.svelte';
  import Profile from './views/Profile.svelte';
  import Callback from './authentication/Callback.svelte';
  import InternalApprover from './views/approvals/InternalApproval.svelte';
  import Approvals from './layouts/ApprovalsLayout.svelte';
  import { onMount } from 'svelte';
  import { userManager } from './authentication/OidcConfig';
  import { auth } from './authentication/AuthStore';


  export let url = '';

  // =========== get user info=========
  let user = null;

  onMount(async () => {
    user = await userManager.getUser();
    if (user) {
      auth.setUser(user);
    }
  });

  auth.subscribe((value) => (user = value));
  // =========== get user info=========
</script>

<Router {url}>
  <!-- admin layout -->
  <Route path="admin/*admin" component={Admin} />
  <!-- auth layout -->
  <Route path="auth/*auth" component={Auth} />
  <!-- no layout pages -->
  <Route path="landing" component={Landing} />
  <Route path="profile" component={Profile} />
  <Route path="signin-oidc" component={Callback} />
  <!-- no stats layout -->
  <Route path="approval/*approval" component={Approvals} />
  <Route path="user/*user" component={User} />
  <Route path="assignee/*assignee" component={Assignee} />
  <Route path="internalreviewer/*internalreviewer" component={Internalreviewer} />
 

  <Route path="/" component={Index} />
</Router>

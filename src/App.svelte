<!-- App.svelte -->
<script>
  import { Router, Route } from 'svelte-routing';

  // Admin Layout
  import Admin from './layouts/Admin.svelte';
  // Auth Layout
  import Auth from './layouts/Auth.svelte';

  // User Layout
  import User from './layouts/UsersLayout.svelte';
  // User Layout
  import Requester from './layouts/RequesterLayout.svelte';
  // Assignee layout
  import Assignee from './layouts/assigneeLayout.svelte'
  // Internal Reviewer Layout
  import InternalreviewerLayout from './layouts/InternalReviewerLayout.svelte'
  // External Reviewer Layout
  import ExternalReviewerLayout from './layouts/ExternalReviewerLayout.svelte';
  import PointPersonLayout from './layouts/PointPersonLayout.svelte';

  // Analyst Layout
  import Analyst from './layouts/AnalystLayout.svelte';

  import AuthGuard from './authentication/AuthGuard.svelte';

  // No Layout Pages
  import Index from './views/Index.svelte';
  import Landing from './views/Landing.svelte';
  import Profile from './views/Profile.svelte';
  import Callback from './authentication/Callback.svelte';
  import InternalApprover from './views/requestActions/InternalApproval.svelte';
  import Approvals from './layouts/ApprovalsLayout.svelte';
  import { onMount } from 'svelte';
  import { userManager } from './authentication/OidcConfig';
  import { auth } from './authentication/AuthStore';
  import AssigningLayout from "./layouts/AssigningLayout.svelte";



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
  <Route path="requester/*requester">
    <AuthGuard component={Requester} />
  </Route>
  <Route path="assignee/*assignee" component={Assignee} />
  <Route path="internalreviewer/*internalreviewer" component={InternalreviewerLayout} />
  <Route path="externalreviewer/*externalreviewer" component={ExternalReviewerLayout} />

  <Route path="pointperson/*pointperson" component={PointPersonLayout} />
  <Route path="assign/*assign" component={AssigningLayout} />

  <Route path="analyst/*analyst" component={Analyst} />

  <!-- analyst views -->
  <Route path="serve/request" component={Landing} />

  <Route path="/" component={Index} />
</Router>

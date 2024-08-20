<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";

  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Index from "./views/Index.svelte";
  import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";
  import Callback from './authentication/Callback.svelte';
  import InternalApprover from "./views/approvals/InternalApproval.svelte";
  import Approvals from "./layouts/Approvals.svelte";

  export let url = "";

</script>




<Router url="{url}">
  <!-- admin layout -->
  <Route path="admin/*admin" component="{Admin}" />
  <!-- auth layout -->
  <Route path="auth/*auth" component="{Auth}" />
  <!-- no layout pages -->
  <Route path="landing" component="{Landing}" />
  <Route path="profile" component="{Profile}" />
  <Route path="signin-oidc" component="{Callback}" />
  <!-- no stats layout -->
  <Route path="approval/*approval" component="{Approvals}" />


  <Route path="/" component="{Index}" />
</Router>

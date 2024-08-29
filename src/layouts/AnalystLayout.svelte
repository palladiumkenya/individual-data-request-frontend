<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import UserNavbar from 'components/Navbars/UserNavbar.svelte';
  import UserHeaderStats from 'components/Headers/UserHeaderStats.svelte';

  // pages for this layout
  import Settings from 'views/admin/Settings.svelte';
  import UserDashboard from '../views/user/UserDashboard.svelte';
  import UserSidebar from '../components/Sidebar/UserSidebar.svelte';
  import AnalystTabs from "components/Tabs/AnalystTabs.svelte";
  import RequestDetails from 'views/analyst/RequestDetails.svelte';
  import HeaderStats from "*.svelte";

  export let location;
  export let admin = '';
</script>

<div>
  <UserSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <UserNavbar />
    <UserHeaderStats />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router url="analyst">
        <Route path="dashboard" component={UserDashboard} />
        <Route path="settings" component={Settings} />
        <Route path="list" component={AnalystTabs} />
        <Route path="request/:id" component={RequestDetails} />
      </Router>
      <!--      <Footer />-->
    </div>
  </div>
</div>

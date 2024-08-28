<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import UserNavbar from 'components/Navbars/UserNavbar.svelte';
  import UserHeaderStats from 'components/Headers/UserHeaderStats.svelte';

  // pages for this layout
  import Settings from 'views/admin/Settings.svelte';
  import UserDashboard from '../views/user/UserDashboard.svelte';
  import UserSidebar from '../components/Sidebar/UserSidebar.svelte';

  export let location;
  export let admin = '';
</script>

<div>
  <UserSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <UserNavbar />
    <UserHeaderStats />
    <div class="mx-auto w-full -m-24">
      <Router url="user">
        <Route path="dashboard" component={UserDashboard} />
      </Router>
      <!--      <Footer />-->
    </div>
  </div>
</div>

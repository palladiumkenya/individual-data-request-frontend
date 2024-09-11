<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import UserNavbar from 'components/Navbars/UserNavbar.svelte';
  import AnalystHeaderStats from 'components/Headers/AnalystHeaderStats.svelte';

  // pages for this layout
  import UserSidebar from '../components/Sidebar/UserSidebar.svelte';
  import AnalystTabs from "components/Tabs/AnalystTabs.svelte";
  import RequestDetails from 'views/analyst/RequestDetails.svelte';


  export let location;
  export let admin = '';
</script>

<div>
  <UserSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <UserNavbar />
    <AnalystHeaderStats />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router url="analyst">
        <Route path="list" component={AnalystTabs} />
        <Route path="request/:id" component={RequestDetails} />
      </Router>
      <!--      <Footer />-->
    </div>
  </div>
</div>

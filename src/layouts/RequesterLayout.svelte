<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import UserNavbar from 'components/Navbars/UserNavbar.svelte';

  // pages for this layout
  import UserSidebar from '../components/Sidebar/UserSidebar.svelte';
  import UserRequestForm from '../components/Forms/UserRequestForm.svelte';
  import UserDashboard from "../views/user/UserDashboard.svelte";
  import RequestDetails from "../views/user/RequestDetails.svelte";

  export let location;
  //export let admin = '';
</script>

<div>
  <UserSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <UserNavbar />
    <div class="relative bg-indigo-500 md:pt-10 pb-32 pt-12">
      <div class=" md:px-10  w-full">
      </div>
    </div>
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <Router url="requester">
        <Route path="dashboard" component={UserDashboard} />
        <Route path="new-request" component={UserRequestForm} />
        <Route path="request-details" component={RequestDetails} />
      </Router>
    </div>
  </div>
</div>

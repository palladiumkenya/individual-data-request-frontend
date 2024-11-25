<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import UserNavbar from 'components/Navbars/UserNavbar.svelte';

  // pages for this layout
  import AddApproverForm from '../views/user/AddApproverForm.svelte';
  import UserSidebar from '../components/Sidebar/UserManagementSidebar.svelte';
  import AuthGuard from '../authentication/AuthGuard.svelte';
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
    <div class="mx-auto w-full -m-24">
      <Router url="user">
        <Route path="management/approver" component={AddApproverForm} />
      </Router>
      <!--      <Footer />-->
    </div>
  </div>
</div>

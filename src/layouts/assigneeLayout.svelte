<script>
  import { Router, Route } from 'svelte-routing';

  // components for this layout
  import AssigneeNavbar from '../components/Navbars/assigneeNavbar.svelte';
  import AssigneeHeaderStats from '../components/Headers/assigneeHeaderStats.svelte';

  // pages for this layout
  import AssigneeDashboard from '../views/assignee/assigneeDashboard.svelte';
  import AssigneeSidebar from '../components/Sidebar/assigneeSidebar.svelte';
  import AssigneeRequestForm from '../views/assignee/assigneeRequestForm.svelte';

  export let location;
  //export let admin = '';
</script>

<div>
  <AssigneeSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <AssigneeNavbar />
    <AssigneeHeaderStats />
    <div class="mx-auto w-full -m-24">
      <Router url="user">
        <Route path="dashboard" component={AssigneeDashboard} />
        <Route path="new-request" component={AssigneeRequestForm} />
      </Router>
      <!--      <Footer />-->
    </div>
  </div>
</div>

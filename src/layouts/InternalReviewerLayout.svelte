<script>
    import { Router, Route } from 'svelte-routing';
    import AuthGuard from '../authentication/AuthGuard.svelte';

    // components for this layout
    import InternalReviewerNavbar from '../components/Navbars/InternalReviewerNavbar.svelte';
    import InternalReviewerHeaderStats from '../components/Headers/InternalReviewerHeaderStats.svelte';



    // pages for this layout
    import InternalReviewerSidebar from '../components/Sidebar/InternalReviewerSidebar.svelte';
    import InternalReviewerDashboard from '../views/internalreviewer/internalReviewerDashboard.svelte';
    import UserRequestForm from "../components/Forms/UserRequestForm.svelte";

    export let location;
    //export let admin = '';
  </script>

  <div>
    <InternalReviewerSidebar {location} />
    <div class="relative md:ml-64 bg-blueGray-100">
      <InternalReviewerNavbar />
      <InternalReviewerHeaderStats />
      <div class="mx-auto w-full -m-24">
        <Router url="internalreviewer">
          <Route path="dashboard">
            <AuthGuard component={InternalReviewerDashboard} />
          </Route>
        </Router>

        <!--      <Footer />-->
      </div>
    </div>
  </div>

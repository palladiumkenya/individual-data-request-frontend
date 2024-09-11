<script>
    import { Router, Route } from 'svelte-routing';

    // components for this layout
    import InternalReviewerNavbar from '../components/Navbars/InternalReviewerNavbar.svelte';
    import InternalReviewerHeaderStats from '../components/Headers/InternalReviewerHeaderStats.svelte';



    // pages for this layout
    import InternalReviewerSidebar from '../components/Sidebar/InternalReviewerSidebar.svelte';
    import InternalReviewerDashboard from '../views/internalreviewer/internalReviewerDashboard.svelte';

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
          <Route path="dashboard" component={InternalReviewerDashboard} />
        </Router>
        <!--      <Footer />-->
      </div>
    </div>
  </div>

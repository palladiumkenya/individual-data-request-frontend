<script>
    import { Router, Route } from 'svelte-routing';
  
    // components for this layout
    import ExternalReviewerNavbar from '../components/Navbars/ExternalReviewerNavbar.svelte';
    import ExternalReviewerHeaderStats from '../components/Headers/ExternalReviewerHeaderStats.svelte';
  
    // pages for this layout
    import ExternalReviewerSidebar from '../components/Sidebar/ExternalReviewerSidebar.svelte';
    import ExternalReviewerDashboard from '../views/externalreviewer/externalReviewerDashboard.svelte';
  
    export let location;
    //export let admin = '';
  </script>
  
  <div>
    <ExternalReviewerSidebar {location} />
    <div class="relative md:ml-64 bg-blueGray-100">
      <ExternalReviewerNavbar />
      <ExternalReviewerHeaderStats />
      <div class="mx-auto w-full -m-24">
        <Router url="externalreviewer">
          <Route path="externalreviewerdashboard" component={ExternalReviewerDashboard} />
        </Router>
        <!--      <Footer />-->
      </div>
    </div>
  </div>
  
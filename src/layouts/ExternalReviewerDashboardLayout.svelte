<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import ApprovalNavbar from "components/Navbars/ApprovalNavbar.svelte";


  import InternalApproval from "../views/requestActions/InternalApproval.svelte";
  import {auth} from "../authentication/AuthStore";
  import { get } from 'svelte/store';
  import ExternalReviewerSidebar from "../components/Sidebar/ExternalReviewerSidebar.svelte";
  import ExternalApproval from "../views/requestActions/ExternalApproval.svelte";



  export let location;
  export let admin = "";

  let user = null;
  let isAuthenticated;
  auth.subscribe((value) => {
    isAuthenticated = value;

  });

  // const isAuthenticated = get(auth).user;
  // let isAuthenticated = get(auth);
  //
  // if (isAuthenticated && isAuthenticated.user) {
  //   console.log("isAuthenticated user", isAuthenticated)
  // }
  console.log("isAuthenticated user", isAuthenticated)
  function protectRoute(Component) {
    // const isAuthenticated = get(auth.isAuthenticated);
    // console.log("isAuthenticated", isAuthenticated)
    if (isAuthenticated) {
      return Component;
    } else {
      // auth.login(); // Redirect to login if not authenticated
      return null; // Return null to prevent component rendering
    }
  }
</script>

<div>
  <ExternalReviewerSidebar {location} />
  <div class="relative md:ml-64 bg-blueGray-100">
    <ApprovalNavbar />
    <div class="relative bg-indigo-500 md:pt-10 pb-32 pt-12">
      <div class=" md:px-10  w-full">
        <div>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full -m-24">

      <Router url="external">
<!--        <Route path="internal_action/:id" component="{InternalApproval}" />-->
        <Route path="action/:id" component="{ExternalApproval}" />

      </Router>

<!--      <Footer />-->
    </div>
  </div>
</div>

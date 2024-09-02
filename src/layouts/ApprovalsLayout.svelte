<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import ApprovalNavbar from "components/Navbars/ApprovalNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
  import HeaderStats from "components/Headers/HeaderStats.svelte";
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";

  // pages for this layout
  import Dashboard from "views/admin/ApproversDashboard.svelte";
  import Settings from "views/admin/Settings.svelte";
  import Tables from "views/admin/Tables.svelte";
  import Maps from "views/admin/Maps.svelte";
  import InternalApproval from "../views/approvals/InternalApproval.svelte";
  import Footer from "../components/Footers/Footer.svelte";

  export let location;
  export let admin = "";

</script>

<div>
  <Sidebar location={location}/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <ApprovalNavbar />
    <div class="relative bg-indigo-500 md:pt-10 pb-32 pt-12">
      <div class=" md:px-10  w-full">
        <div>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full -m-24">
      <Router url="approval">
        <Route path="dashboard" component="{Dashboard}" />
        <Route path="settings" component="{Settings}" />
        <Route path="tables" component="{Tables}" />
        <Route path="maps" component="{Maps}" />
        <Route path="action/:id" component="{InternalApproval}" />

      </Router>
<!--      <Footer />-->
    </div>
  </div>
</div>

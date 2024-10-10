<script>
    import { Router, Route } from 'svelte-routing';
    import AuthGuard from '../authentication/AuthGuard.svelte';

    // components for this layout
    import PointPersonNavbar from '../components/Navbars/PointPersonNavbar.svelte';
    import PointPersonHeaderStats from '../components/Headers/PointPersonHeaderStats.svelte';



    // pages for this layout
    import PointPersonSidebar from '../components/Sidebar/PointPersonSidebar.svelte';
    import PointPersonDashboard from '../views/pointperson/PointPersonDashboard.svelte';
    import CardUserPointPersonTable from "../components/Cards/CardUserPointPersonTable.svelte";
    import CardPointPersonRequestDetails from "../components/Cards/CardPointPersonRequestDetails.svelte";
    import PointPersonAssignAnalyst from "../views/requestActions/PointPersonAssignAnalyst.svelte";

    export let location;
    //export let admin = '';
  </script>

  <div>
    <PointPersonSidebar {location} />
    <div class="relative md:ml-64 bg-blueGray-100">
      <PointPersonNavbar />
      <PointPersonHeaderStats />
      <div class="mx-auto w-full -m-24">
        <Router url="pointperson">
          <Route path="dashboard">
            <AuthGuard component={PointPersonDashboard} />
          </Route>
        </Router>

        <!--      <Footer />-->
      </div>
    </div>
  </div>

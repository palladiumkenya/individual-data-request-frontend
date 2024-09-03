<script>
  import { Link } from "svelte-routing";

  // core components
  import IndexNavbar from "components/Navbars/IndexNavbar.svelte";
  import Footer from "components/Footers/Footer.svelte";
  import IndexDropdown from "components/Dropdowns/IndexDropdown.svelte";

  const patternVue = "/assets/img/pattern_svelte.png";
  const componentBtn = "/assets/img/component-btn.png";
  const componentProfileCard = "/assets/img/component-profile-card.png";
  const componentInfoCard = "/assets/img/component-info-card.png";
  const componentInfo2 = "/assets/img/component-info-2.png";
  const componentMenu = "/assets/img/component-menu.png";
  const componentBtnPink = "/assets/img/component-btn-pink.png";
  const documentation = "/assets/img/documentation.png";
  const login = "/assets/img/login.jpg";
  const profile = "/assets/img/profile.jpg";
  const landing = "/assets/img/landing.jpg";

  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<IndexNavbar />
<section class="header relative pt-16 items-center flex h-screen max-h-860-px">
  <div class="container mx-auto items-center flex flex-wrap">
    <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
      <div class="pt-32 sm:pt-0">
        <h2 class="font-semibold text-4xl text-blueGray-600">
          IDRP - Individual Data Request Platform.
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
          For stakeholders requesting individual level data (ILD) from the NDW for scientific writing and any other purposes. These stakeholders include researchers, institutions, and organizations.
        <div class="mt-12">
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus?ref=ns-index"
            target="_blank"
            class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-red-400 active:bg-red-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
          >
            Learn More
          </a>
    </div>
  </div>

  <img
    class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
    src="{patternVue}"
    alt="..."
  />
</section>
<Footer />

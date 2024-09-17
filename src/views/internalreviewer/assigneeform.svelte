\<script>
  let name = '';
  let email = '';
  let startDate = '';
  let endDate = '';
  let workstream = '';
  
  const submitRequest = () => {
    console.log({
      firstName,
      lastName,
      email,
      startDate,
      endDate,
      hoursTotal
    });
  };
</script>

<div class="bg-gradient-to-b from-green-100 to-white min-h-screen flex justify-center items-center">
  <div class="bg-white shadow-lg rounded-lg p-8 w-[400px]">
    <div class="text-center mb-6">
      <img src="/logo.png" alt="Alexander County Logo" class="mx-auto mb-2" />
      <h2 class="text-xl font-semibold">Assignee Request</h2>
    </div>
    <hr>
    <br>

    <form on:submit|preventDefault={submitRequest} class="space-y-4">
        <div class="w-3/4 mb-4">
          <label for="first-name" class="block text-sm font-medium text-gray-700">Assignee Name</label>
          <select
            id="first-name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            bind:value={name}
          >
            <option value="" disabled selected>Select a name</option>
            <option value="John">Newton Mutugi</option>
            <option value="Jane">Korir Florida</option>
            <option value="Michael">Denis Mugo</option>
            <option value="Sarah">Charles Bett</option>
          </select>
        </div>
    
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Assignee Email Address</label>
        <select
        id="email"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        bind:value={email}
      >
        <option value="" disabled selected>Select Email</option>
        <option value="John">Newton@palladiumgroup.com</option>
        <option value="Jane">Florida@palladiumgroup.com</option>
        <option value="Michael">Denis@palladiumbroup.com</option>
        <option value="Sarah">Charles@palladiumgroup.com</option>
      </select>
      </div>
<br>
      <div class="flex space-x-4">
        <div class="w-1/2">
          <label for="start-date" class="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="start-date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            bind:value={startDate}
          />
        </div>
        <div class="w-1/2">
          <label for="end-date" class="block text-sm font-medium text-gray-700">End Date*</label>
          <input
            type="date"
            id="end-date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            bind:value={endDate}
          />
        </div>
      </div>
<br>
<div>
  <label for="workstream" class="block text-sm font-medium text-gray-700">Select Workstream Assigned</label>
  <select
  id="workstream"
  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  bind:value={workstream}
>
  <option value="" disabled selected>Select Email</option>
  <option value="John">Kevin data Requests</option>
  <option value="Jane">Lynn data request</option>
  <option value="Michael">Denis data Requests</option>
  <option value="Sarah">Charles data requests</option>
</select>
</div>

      <div class="text-center">
        <button
          type="submit"
          class="mt-4 w-full py-2 px-4 border border-blue shadow-sm text-sm font-medium rounded-md text-blue bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Request
        </button>
      </div>
    </form>
  </div>
</div>

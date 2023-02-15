<template>
  <div class="relative bg-white">
    <div class="lg:absolute lg:inset-0">
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover lg:absolute lg:h-full opacity-50" src="../assets/images/market.jpg" alt="" />
      </div>
    </div>
    <div class="relative py-16 px-6 sm:py-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-16">
      <div class="lg:pr-8">
        <div class="mx-auto max-w-md sm:max-w-lg lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Let's work together</h2>
          <p class="mt-4 text-lg text-gray-500 sm:mt-3">Just one more step to create your first order</p>
          <form action="#" method="POST" class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
              <div class="mt-1">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
              <div class="mt-1">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="home_address" class="block text-sm font-medium text-gray-700">Home Address</label>
              <div class="mt-1">
                <input type="text" name="home_address" id="home_address" autocomplete="organization" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <span id="phone-description" class="text-sm text-gray-500">Optional</span>
              </div>
              <div class="mt-1">
                <input type="text" name="phone" id="phone" autocomplete="tel" aria-describedby="phone-description" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
              <div class="mt-1">
                <input type="date" name="date_of_birth" id="date_of_birth" autocomplete="organization" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <select  name="city" id="city" autocomplete="organization" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                   <option value="default" class disabled>Area</option>
            <option class="text-sm" v-for="branch in areas"
              :key="branch.value" :value=branch.value>{{ branch.name }}</option>
                </select>
              </div>
            </div>
            <div class="text-right sm:col-span-2">
              <defaultButton name=" Create Account">
                            <template v-slot:icon>
                                <plus />
                            </template>
                        </defaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import defaultButton from '@/components/button.vue' 
export default{
  components:{
    defaultButton
  },
  data(){
    return{
       areas:[
        {
          value:'Apata',
          name:'Apata, Ibadan'
        },
        {
          value:'Dugbe',
          name:'Dugbe, Ibadan'
        },
        {
          value:'Gate',
          name:'Gate, Ibadan'
        },
        {
          value:'Bodija',
          name:'Bodija, Ibadan'
        },
        {
          value:'Iwo',
          name:'Iwo Road, Ibadan'
        },
        {
          value:'Challenge',
          name:'Challenge, Ibadan'
        },
        {
          value:'Iyana_church',
          name:' Iyana church, Ibadan'
        },
        {
          value:'Oyo',
          name:'Oyo Town'
        },
        {
          value:'Ogbomosho',
          name:'Ogbomosho'
        },
        {
          value:'Yoruba_Road',
          name:'Yoruba Road, Ilorin'
        },
        {
          value:'Gambari',
          name:'Gambari, Ilorin'
        },
        {
          value:'Taiwo_Road',
          name:'Taiwo Road, Ilorin'
        },
        {
          value:'Ijebu_Ode',
          name:'Ijebu Ode'
        },
        {
          value:'Sagamu',
          name:'Sagamu'
        },
        {
          value:'Abiola_Way',
          name:'Abiola Way Showroom'
        },
        {
          value:'Isale_Igbeyin',
          name:'Isale Igbeyin Showroom'
        },
        
      ],
    }
  }
}
</script>
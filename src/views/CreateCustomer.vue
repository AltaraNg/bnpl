<template>
  <div>
    <App>
      <div class=" lg:pr-8 py-8 px-6  lg:mx-auto lg:flex flex-col lg:max-w-7xl  ">
          <div>
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Let's work together</h2>
          <p class="mt-4 text-lg text-gray-500 sm:mt-3">Just one more step to create your first order</p>
          </div>
          
          <form  class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
              <div class="mt-1">
                <input type="text" name="first-name" v-model="customerData.first_name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
              <div class="mt-1">
                <input type="text" name="last-name" id="last-name" v-model="customerData.last_name" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input id="email" name="email" type="email" v-model="customerData.email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <label for="home_address" class="block text-sm font-medium text-gray-700">Home Address</label>
              <div class="mt-1">
                <input type="text" name="home_address" id="home_address" v-model="customerData.home_address" autocomplete="organization" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <div class="flex justify-between">
                <label for="telephone" class="block text-sm font-medium text-gray-700">telephone</label>
              </div>
              <div class="mt-1">
                <input type="text" name="telephone" v-model="customerData.telephone" id="phone" autocomplete="tel" aria-describedby="phone-description" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
              <div class="mt-1">
                <input type="date" name="date_of_birth" v-model="customerData.date_of_birth" id="date_of_birth" autocomplete="organization" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div> 
            </div>
            <div >
              <label for="state" class="block text-sm font-medium text-gray-700">State</label>
              <div class="mt-1">
                <input type="text" name="state" id="state" v-model="customerData.state" autocomplete="state" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <select  name="city" id="city" autocomplete="city" v-model="customerData.city" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                   <option value="default" class disabled>Area</option>
            <option class="text-sm" v-for="branch in areas"
              :key="branch.value" :value=branch.value>{{ branch.name }}</option>
                </select>
              </div>
            </div>
            
            <div class="text-right  mt-8  lg:flex lg:justify-center  sm:col-span-2">
              <defaultButton name=" Create Account" :action="validateData" class=" lg:w-1/3">
                            <template v-slot:icon>
                                <plus />
                            </template>
                        </defaultButton>
            </div>
          </form>
    </div>
    </App>
    
  </div>
</template> 
<script setup>
import { ref, reactive } from "vue";
import plus from "@/assets/svgs/plus.vue"
import defaultButton from '@/components/button.vue';
import App from "@/layouts/App.vue";
import { handleError } from "../utilities/GlobalFunctions"
import { useStore } from "vuex";
const store = useStore();
      const customerData = reactive({
        first_name:null,
        last_name:null,
        email:null,
        home_address:null,
        telephone:null,
        date_of_birth:null,
        state:null,
        city:null
        
      })
      const areas = ref([
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
        
      ])
      function validateData(event){
        for(let [key, value] of Object.entries(customerData)){
          var invalidNumber;
          if(!value){
            handleError(`Please enter your ${key}`)
          }
          if(customerData.telephone.length !== 11){
            invalidNumber = true
            handleError(`Your phone number number must be 11 digits`)
          }
            //  
        }
        if(Object.values(customerData).every(el => el) && !invalidNumber){
          alert('halleluyah')
          store.dispatch("CreateCustomer", customerData); 
        }
        
      
    
         event.preventDefault();
      }
</script>
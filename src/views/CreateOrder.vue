<template>
  <div>
    <App>
      <div class=" lg:pr-8 py-8 px-6  lg:mx-auto lg:flex flex-col lg:max-w-7xl  ">
          <div>
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Create Your Order</h2>
          <p class="mt-4 text-lg text-gray-500 sm:mt-3">Just one more step to create your first order</p>
          </div>
          
          <form  class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label for="product" class="block text-sm font-medium text-gray-700">Product</label>
              <div class="mt-1">
                <input type="text" name="product" v-model="Order.product" id="product" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
              <div class="mt-1">
                <input type="text" name="amount" id="amount" v-model="Order.amount" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div >
              <label for="repayment_duration" class="block text-sm font-medium text-gray-700">Repayment Duration</label>
              <div class="mt-1">
                <select  name="repayment_duration" id="repayment_duration" autocomplete="repayment_duration" v-model="Order.repayment_duration" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                   <option value="default" class disabled>Area</option>
            <option class="text-sm" v-for="branch in areas"
              :key="branch.value" :value=branch.value>{{ branch.name }}</option>
                </select>
              </div>
            </div>
            <div >
              <label for="repayment_cycle" class="block text-sm font-medium text-gray-700">Repayment Cycle</label>
              <div class="mt-1">
                <select  name="repayment_cycle" id="repayment_cycle" autocomplete="repayment_cycle" v-model="Order.repayment_cycle" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                   <option value="default" class disabled>Area</option>
            <option class="text-sm" v-for="branch in areas"
              :key="branch.value" :value=branch.value>{{ branch.name }}</option>
                </select>
              </div>
            </div>
           
            
            <div class="text-right  mt-8  lg:flex lg:justify-center  sm:col-span-2">
              <defaultButton name=" Create Order" :action="validateData" class=" lg:w-1/3">
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
import defaultButton from '@/components/button.vue'
import { ref, reactive } from "vue";
import App from '@/layouts/App.vue';
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
      const Order = reactive({
        product:null,
        amount:null,
        repayment_duration:null,
        repayment_cycle:null,
        
      })
</script>
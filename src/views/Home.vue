<template>
  <main class="px-5 w-full  ">
    <div class="space-y-6  relative  h-fit" >
       <header class="text-lg font-bold tracking-wide leading-5">Recent Transactions</header>
    <div class="flex items-center w-full justify-between lg:justify-start  space-x-2">
      <input type="text" class=" w-full lg:w-1/3 rounded-full h-[44px] border"/>
      <search class=""/>
    </div>
    <div class=" space-y-6 lg:space-y-0 h-[500px] lg:h-[300px] lg:h-auto  overflow-y-scroll  lg:flex lg:flex-wrap  lg:justify-between">
       <div v-for="order in orders" :key="order.id" class=" lg:w-0.3   " >
      <div class="bg-primary w-full  rounded-md shadow-xs text-white p-3 flex items-center justify-between lg:mb-4">
        <div class="space-y-5 lg:space-y-0">
            <div>
              <p class="text-xs font-light">{{ order.id }}</p>
              <p>{{ order.product_name }}</p>
            </div>
            <p class="font-semibold">{{ order.customer_name }}</p>
        </div>
        <div>
          <p class="text-lg font-bold">{{ order.amount }}</p>
          <p class="text-xs font-light">{{ order.date }}</p>
        </div>
    </div>
    </div>
    </div>
     
    
    <div class=" lg:w-full lg:flex lg:justify-end  lg:items-center">
      <defaultButton name="Create New Order">
        <template v-slot:icon>
       <plus/>
      </template>
      </defaultButton>
    </div>
    </div>
    
    

   
  </main>
</template>
<script>
import defaultButton from '../components/button.vue';
import plus from '../assets/svgs/plus.vue';
import search from '../assets/svgs/search.vue'
export default{
  components:{
    search,defaultButton,plus
  },
  data(){
    return{
      orders:[
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
         {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
         {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        {
          id:1234543,
          product_name:'Tecno Spark 2GB',
          customer_name:'Claudio Asuquo',
          amount:'₦560,000',
          date:'12/22/2022'
        },
        
      ]
    }
  }
}
</script>

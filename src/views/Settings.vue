<template>
    <App>
                              <div class=" p-1 block cursor-pointer lg:hidden block">
            <ArrowLeftIcon class="lg:h-10 w-10 h-6 text-indigo-600" aria-hidden="true" @click="$router.push({ name: 'Dashboard' })" />
        </div>
         <main class="flex flex-col  items-center lg:h-screen lg:justify-center">
            <img src="@/assets/images/waiting.gif"/>
      <p class="font-bold text-gray-800 text-3xl">
        Coming Soon...
      </p>  
    </main>
    </App>
   
</template>
<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import App from "@/layouts/App.vue"
</script>
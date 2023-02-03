<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/Nav.vue";
import SideBarMain from './components/SideBarMain.vue'
import Notification from "@/components/Notification.vue"
</script>

<template>

  <div class="">
    <NavBar v-if="!$route.meta.noAuth" class="sticky top-0 z-50" />
    <div class="overflow-hidden lg:flex  block">
      <SideBarMain
        :class="$route.meta.noAuth ? 'hidden' : 'lg:block'"
        class="hidden  "
        v-show="!$route.meta.noAuth"
      />
      <div class="flex items-center w-full   justify-center">
        <RouterView
        :class="!$route.meta.noAuth ? 'lg:w-full overflow-hiden' : 'w-full'"
      />
      </div>
      
    </div>
  </div>
  <Notification />
</template>
<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

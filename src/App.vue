<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/Nav.vue";
import SideBarMain from './components/SideBarMain.vue'
import Notification from "@/components/Notification.vue"
</script>

<template>

  <div class="">
    <NavBar v-if="!$route.meta.noAuth" class="sticky top-0" />
    <div class="overflow-hidden lg:flex  block">
      <SideBarMain
        :class="$route.meta.noAuth ? 'hidden' : 'lg:block'"
        class="hidden w-1/6 "
        v-show="!$route.meta.noAuth"
      />
      <div class="flex items-center  lg:w-5/6  justify-center">
        <RouterView
        :class="!$route.meta.noAuth ? 'lg:w-5/6' : 'w-full'"
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

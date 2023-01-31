<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/Nav.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>

  <div class="overflow-hidden h-screen">
    <NavBar v-if="!$route.meta.noAuth" class="sticky top-0" />
    <div class="overflow-hidden lg:flex justify-end block">
      <SideBar
        :class="$route.meta.noAuth ? 'hidden' : 'lg:block'"
        class="hidden w-1/6 z-50 absolute top-0 left-0"
        v-show="!$route.meta.noAuth"
      />
      <RouterView
        class="pt-8"
        :class="!$route.meta.noAuth ? 'lg:w-4/5' : 'w-full'"
      />
    </div>
  </div>
</template>
<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

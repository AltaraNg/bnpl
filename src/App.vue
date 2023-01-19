<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/Nav.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

  <div class="overflow-hidden h-screen">
    <NavBar v-if="!$route.meta.noAuth" class="sticky top-0" />
    <div class="  overflow-hidden lg:flex block">
      <SideBar
        class="hidden lg:block w-1/5 z-50 absolute top-0 right-0"
        v-if="!$route.meta.noAuth"
      />
      <RouterView class="pt-16 lg:w-4/5" />
    </div>
  </div>
</template>
<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

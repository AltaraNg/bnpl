<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/Nav.vue';
</script>

<template>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
<div class="w-full h-screen overflow-hidden">
   <NavBar v-if="!$route.meta.noAuth" class="sticky top-0"/>
  <RouterView class="pt-16" />
</div>
 
</template>
<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

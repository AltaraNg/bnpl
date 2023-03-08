<script setup>
import { RouterView } from "vue-router";
import Notification from "@/components/Notification.vue"
import Loader from "@/components/Loader.vue";
</script>

<template>

  <div class="flex items-center w-full justify-center">
    <RouterView :class="!$route.meta.noAuth ? 'w-full overflow-hidden' : 'w-full'" />
  </div>
  <Notification />
  <Loader/>
</template>
<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

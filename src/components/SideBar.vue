<template>
  <div
    class="bg-blue-50 overflow-hidden h-screen lg:flex flex-col items-center justify-center space-y-16"
  >
    <div>
      <img src="../assets/images/logo2.png" />
    </div>
    <p>Get Started</p>
    <p>Profile</p>
    <button
      class="bg-primary rounded text-white px-5 py-2 text-sm"
      @click="logOut"
    >
      LogOut
    </button>
  </div>
</template>
<script>
import router from "../router";
export default {
  methods: {
    logOut() {
      localStorage.clear();
      router.push({ name: "login" });
    },
  },
};
</script>

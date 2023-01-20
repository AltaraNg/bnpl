<template>
  <main
    class="lg:flex lg:items-center h-screen lg:bg-[url('../assets/images/background.png')] lg:justify-center lg:p-8 px-10"
  >
    <div
      class="bg-white h-screen lg:h-fit lg:py-16 py-none lg:border lg:rounded-lg lg:shadow w-full lg:w-1/2 flex items-center justify-center"
    >
      <div class="flex flex-col items-center  justify-center w-full">
        <img src="../assets/images/logo.png" />
        <div class="mt-[30px] lg:mt-[36px] space-y-12 w-full lg:px-16 px-0">
          <div class="relative flex flex-col w-full">
            <Business class="left-3 absolute top-3 z-10" />
            <input
              type="text"
              v-model="username"
              class="focus:outline-none  w-full rounded-md h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="Email Address"
            />
            <p
              v-if="!username && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter your Email
            </p>
          </div>
          <div class="relative flex flex-col w-full">
            <Password class="left-3 absolute top-3 z-10" />
            <input
              type="password"
              v-model="password"
              class="focus:outline-none w-full rounded-md h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="Password"
            />
            <p
              v-if="!password && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter your password
            </p>
          </div>
        </div>
        <div class="mt-[150px] lg:mt-[64px] w-full lg:px-16 px-0">
          <DefButton name="Login" :action="Login" :loading=loader />
          <!-- <button @click.prevent="Login">Login </button> -->
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Business from "../assets/svgs/business.vue";
import Password from "../assets/svgs/password.vue";
import DefButton from "../components/button.vue";
export default {
  components: {
    Business,
    Password,
    DefButton,
  },
  data() {
    return {
      attemptSubmit: false,
      username: "",
      password: "",
      loader:false
    };
  },
  methods: {
    Login(event) {
      this.attemptSubmit = true;
      if (this.username == "" || this.password == "") {
      } else {
        this.$store.dispatch("Login", {
          username: this.username,
          password: this.password,
        });
      }
      //
      event.preventDefault();
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #f5f7ff;
}
</style>

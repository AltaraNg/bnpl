<template>
  <main
    class="lg:flex lg:items-center h-screen lg:bg-[url('../assets/images/background.png')] lg:justify-end lg:p-8 px-10"
  >
    <div
      class="bg-white h-screen lg:h-fit lg:py-16 py-none lg:border lg:rounded-lg lg:shadow w-full lg:w-1/2 flex items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center w-full">
        <img src="../assets/images/logo.png" />
        <div class="mt-[60px] lg:mt-[36px] space-y-12">
          <div class="relative flex flex-col w-full">
            <Business class="left-3 absolute top-3 z-10" />
            <input
              type="text"
              v-model="loginData.name"
              class="focus:outline-none w-[312px] h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="Business name"
            />
            <p
              v-if="!loginData.name && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter your Business name
            </p>
          </div>
          <div class="relative flex flex-col w-full">
            <Password class="left-3 absolute top-3 z-10" />
            <input
              type="password"
              v-model="loginData.password"
              class="focus:outline-none w-[312px] h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="Password"
            />
            <p
              v-if="!loginData.password && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter your password
            </p>
          </div>
        </div>
        <div class="mt-[245px] lg:mt-[64px] w-[312px]">
          <DefButton name="Login" :action="Login" />
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
      loginData: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    Login(event) {
      this.attemptSubmit = true;
      if (this.loginData.name == "" || this.loginData.password == "") {
      } else {
        alert("completed");
      }
      //
      event.preventDefault();
    },
  },
  computed: {
    emptyData(data) {
      return data === "";
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #f5f7ff;
}
</style>

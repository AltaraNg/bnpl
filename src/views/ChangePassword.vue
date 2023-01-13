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
              v-model="password.new"
              class="focus:outline-none w-[312px] h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="New Password"
            />
            <p
              v-if="!password.new && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
             Please enter New Password
            </p>
          </div>
          <div class="relative flex flex-col w-full">
            <Password class="left-3 absolute top-3 z-10" />
            <input
              type="text"
              v-model="password.confirm"
              class="focus:outline-none w-[312px] h-[50px] rounded-xs p-3 px-12 background placeholder:text-gray-400"
              placeholder="Confirm Password"
            />
            <p
              v-if="password.new !== password.confirm && attemptSubmit && password.confirm"
              class="text-red-500 text-xs absolute -bottom-4"
            >
             New pasword and confirm password does not match
            </p>
            <p
              v-if="!password.confirm && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
            Please enter confirm password
            </p>
          </div>
        </div>
        <div class="mt-[245px] lg:mt-[64px] w-[312px]">
          <DefButton name="Change Password" :action="Login" />
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
      password: {
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    Login(event) {
      this.attemptSubmit = true;
      if (this.password.new =="" || this.password.confirm == "" || this.password.new !==   this.password.confirm) {
      } else {
        alert("completed");
      }
      //
      event.preventDefault();
    //   this.attemptSubmit = false;
    },
  },
 
};
</script>
<style scoped>
.background {
  background-color: #f5f7ff;
}
</style>

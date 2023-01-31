<template>
  <main
    class="lg:flex lg:items-center h-screen lg:bg-[url('../assets/images/background.png')] lg:justify-center lg:p-8 px-10"
  >
    <div
      class="bg-white h-screen lg:h-fit lg:py-16 py-none lg:border lg:rounded-lg lg:shadow w-full lg:w-1/2 flex items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center w-full">
        <img src="../assets/images/logo.png" />
        <div class="mt-[40px] lg:mt-[36px] space-y-12 w-full lg:px-16 px-0">
          <div class="relative flex flex-col w-full">
            <input
              type="text"
              v-model="data.password"
              class="focus:outline-none w-[312px] lg:w-full rounded-md h-[50px] rounded-xs p-3 px-3 background placeholder:text-gray-400"
              placeholder="New Password"
            />
            <p
              v-if="!data.password && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter New Password
            </p>
          </div>
          <div class="relative flex flex-col w-full">
            <input
              type="text"
              v-model="data.confirm_password"
              class="focus:outline-none w-[312px] lg:w-full rounded-md h-[50px] rounded-xs p-3 px-3 background placeholder:text-gray-400"
              placeholder="Confirm Password"
            />
            <p
              v-if="
                data.password !== data.confirm_password &&
                attemptSubmit &&
                data.confirm_password
              "
              class="text-red-500 text-xs absolute -bottom-4"
            >
              New pasword and confirm password does not match
            </p>
            <p
              v-if="!data.confirm_password && attemptSubmit"
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Please enter confirm password
            </p>
            <p
              v-if="
                data.password.length < 4 &&
                attemptSubmit &&
                data.password == data.confirm_password
              "
              class="text-red-500 text-xs absolute -bottom-4"
            >
              Password should have at least four character
            </p>
          </div>
        </div>
        <div class="mt-[200px] lg:mt-[64px] w-[312px] lg:w-full lg:px-16 px-0">
          <DefButton name="Change Password" :action="Login" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import DefButton from "../components/button.vue";
export default {
  components: {
    DefButton,
  },
  data() {
    return {
      attemptSubmit: false,
      data: {
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    Login(event) {
      this.attemptSubmit = true;
      if (
        this.data.password == "" ||
        this.data.confirm_password == "" ||
        this.data.password !== this.data.confirm_password ||
        this.data.password.length < 4
      ) {
        console.log("somethign");
      } else {
        this.$store.dispatch("ResetPassword", {
          ...this.data,
          ...this.$route.params,
        });
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

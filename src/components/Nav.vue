<template>
  <div
    class="flex items-center justify-between bg-white  border p-5 relative w-full"
  >
    <div>
      <img src="../assets/images/logo2.png" />
    </div>
    <div class="lg:hidden" @click="toggle">
      <hamburger />
    </div>
    <div class="lg:w-full lg:flex lg:justify-end lg:items-center hidden">
        <defaultButton name=" New Sale">
          <template v-slot:icon>
            <plus />
          </template>
        </defaultButton>
      </div>

    <Transition name="slide-fade">
      <div
        class="fixed z-50 top-0 w-screen h-screen left-0 overlay"
        v-if="show"
        ref="overlay"
        @click="clickaway"
      ></div>
    </Transition>
    <Transition name="slide-fade">
      <div
        v-if="show"
        class="w-2/3 bg-white h-screen z-50 absolute top-0 right-0 lg:hidden flex flex-col items-center justify-center space-y-16"
        ref="overlay"
      >
        <close class="absolute w-6 top-5 right-5" @click="toggle" />
        <div>
          <img src="../assets/images/logo2.png" />
        </div>
        <RouterLink :to="{name:'Dashboard'}"><p>Dashboard</p></RouterLink>
       <RouterLink :to="{name:'Profile'}"><p>Profile</p></RouterLink> 
       <RouterLink :to="{name:'Settings'}"><p>Settings</p></RouterLink> 
        <button
          class="bg-primary rounded text-white px-5 py-2 text-sm"
          @click="logOut"
        >
          LogOut
        </button>
      </div>
    </Transition>
  </div>
</template>
<script>
import hamburger from "../assets/svgs/hamburger.vue";
import close from "../assets/svgs/close.vue";
import router from "../router";
import defaultButton from '../components/button.vue'
import plus from "@/assets/svgs/plus.vue";
export default {
  components: {
    hamburger,
    defaultButton,
    plus,
    close,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      router.push({ name: "login" });
    },
    toggle() {
      this.show = !this.show;
    },
    clickaway(event) {
      let overlay = this.$refs.overlay;
      if (event.target == overlay) {
        this.toggle();
      }
    },
    mounted() {
      document.addEventListener("click", this.clickaway);
    },
    unmounted() {
      document.removeEventListener("click", this.clickaway);
    },
  },
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

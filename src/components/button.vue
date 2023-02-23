<template>
  <main>
    <button
      class="w-full flex items-center text-sm justify-center text-white rounded-md border-primary border bg-primary py-2 px-4"
      @click="action"
    >
     
      <loader v-if="$store.state.status.loading" />
      <div  v-else class="flex items-center" >
        <slot name="icon"></slot>
      <p class="">{{ name }}</p>
      </div>
       
    </button>
  </main>
</template>
<script>
import loader from "../assets/svgs/loader.vue";
export default {
  components: {
    loader,
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    action: {
      required: true,
      type: Function,
    },
  },
};
</script>
<style>
.background {
  background-color: #f7f8fd;
}
</style>

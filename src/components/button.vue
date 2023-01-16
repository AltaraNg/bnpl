<template>
  <main>
    <button
      class="w-full rounded-md border-primary border background py-3 hover:bg-primary hover:text-white hover:font-semibold"
      @click="action"
    >
    <loader v-if="$store.state.status.loading"/>
     <p v-else>{{ name }}</p> 
    </button>
  </main>
</template>
<script>
import loader from '../assets/svgs/loader.vue'
export default {
  components:{
    loader
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    action:{
        required:true,
        type:Function
    },
  },
};
</script>
<style>
.background {
  background-color: #f7f8fd;
}
</style>

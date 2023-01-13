<template>
  <main>
    <button
      class="w-full rounded-md border-primary border background py-3 hover:bg-primary hover:text-white hover:font-semibold"
      @click="action"
    >
      {{ name }}
    </button>
  </main>
</template>
<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
    },
    action:{
        required:true,
        type:Function
    }
  },
};
</script>
<style>
.background {
  background-color: #f7f8fd;
}
</style>

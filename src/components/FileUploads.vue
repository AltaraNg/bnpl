<template>
<div class="panel">
 <input type="file" accept="image/*" capture="camera" id="photo" ref="file"  @change="onSnapShot($event)">
<label for="photo">
  Open Camera
</label>
</div>
</template>
<script setup>

import {ref} from "vue"
const fileSelected =  ref()
   function onSnapShot (event) {
      fileSelected.value = event.target.files[0];
     alert(fileSelected.value.name, fileSelected.value.type);
    }
</script>
<style scoped>
input[type="file"] {
  display: none;
}

label {
  display: inline-block;
  background-color: darkblue;
  padding: 1em 2em;
  font-size: 1em;
  color: #fff;
}
</style>
<template>
    <div>
        <div class="relative py-4">
             <div>
            <app-label label-title="Name" label-for="name" />
            <div class="mt-1">
                <app-input type="text" name="name" v-model="name" :model-value="name" id="name" />
            </div>
        </div>
        <p v-if="fileSelected" class="text-end text-sm absolute bottom-0 right-2  text-primary">{{ fileSelected?.name }}hhh</p>
        <div class="absolute right-2 top-1/2">
            <input type="file" accept="image/*" capture="camera" id="photo" ref="file" @change="onSnapShot($event)" />
            <label for="photo" class="bg-primary text-white px-3 py-1 rounded">Upload </label>
        </div>
        </div>
       
    </div>
</template>
<script setup>
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppLabel from "@/components/AppLabel.vue";
const fileSelected = ref();
const name = ref();
function onSnapShot(event) {
    fileSelected.value = event.target.files[0];
    alert(fileSelected.value.name, fileSelected.value.type);
}
</script>
<style scoped>
input[type="file"] {
    display: none;
}
</style>

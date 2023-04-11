<template>
    <Camera :resolution="{ width: 375, height: 812 }" ref="camera" autoplay></Camera>
    <button @click="snapshot">Create snapshot</button>
</template>

<script setup>
import Camera from "simple-vue-camera";
import { ref } from "vue";

// Get a reference of the component
const camera = ref();
// Use camera reference to call functions
const snapshot = async () => {
    const blob = await camera.value?.snapshot({ width: 1920, height: 1080 }, "image/png", 0.5);

    // To show the screenshot with an image tag, create a url
    const url = URL.createObjectURL(blob);
    console.log(url);
};
</script>

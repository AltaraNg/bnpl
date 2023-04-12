<template>
    <div>
        <div class="relative">
            <div class="mb-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Name of Document</label>
                <input
                    type="type"
                    class="block w-full border rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="File.name"
                />

                <div class="absolute right-2 cursor-pointer top-1/2 lg:hidden block">
                    <input type="file" accept="image/*" capture="camera" id="photo" @change="snapShot($event)" />
                    <label for="photo" class="cursor-pointer"
                        ><img for="photo" class="text-indigo-500" src="@/assets/images/upload-file-svgrepo-com.svg"
                    /></label>
                </div>
                <div class="absolute right-2 cursor-pointer top-7 hidden lg:block" @click="openCamera">
                    <img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg" />
                </div>
                <div class="" :class="showVideo ? 'block' : 'hidden'" @click="capture"><video  ref="video" id="video"  autoplay></video></div>
                 <canvas v-show="!showVideo" class="hidden lg:block absolute left-0 bttom-0" ref="canvas" id="canvas" width="180" height="60" ></canvas>
                <div class="absolute left-0 ">
                    <div class="imagePreviewWrapper block lg:hdden" :style="{ 'background-image': `url(${previewImage})` }"></div>
                   
                </div>
                

                <!-- <p class="absolute -bottom-4">{{ list?.path?.name }}</p> -->
            </div>
        </div>
        <div class="flex justify-end cursor-pointer">
            <div class="text-white w-1/3 cursor-pointer bg-primary text-center text-sm py-1 rounded" @click="uploadFile">Upload</div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { handleError } from "@/utilities/GlobalFunctions";
const File = ref({
    name: "",
    path: "",
});

const canvas = ref();
const video = ref();
const showModal = ref(false);
const previewImage = ref();
const showVideo = ref(false);
// const props = defineProps({
//     index: Number,
// });

const emit = defineEmits(["fileSelected", "input"]);

function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            console.log(stream);
            video.value.srcObject = stream;
            video.value.play();
        });
    }
    showVideo.value = true;
}
function capture() {
    canvas.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    showVideo.value = false;
    
}
function snapShot(event) {
    File.value.path = event.target.files[0];
    if (File.value.path) {
        let reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(File.value.path);
        emit("input", File.value.path);
    }
}
function uploadFile() {
    if (File.value.name && File.value.path) {
        showModal.value = true;
    } else {
        handleError("Please enter Name and File");
    }
}
// function sendFile(){
//       emit("fileSelected",File.value);
//        showModal.value = false

// }
// function AddDocuments() {
//     Documents.value.push({ ...file.value, ...Documents.value });
// }
// watch(Lists.value, (currentValue) => {
//     Lists.value.map;
//     console.log(currentValue, "Lists");
// });
</script>
<style scoped>
input[type="file"] {
    display: none;
}
.imagePreviewWrapper {
    width: 180px;
    height: 60px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>

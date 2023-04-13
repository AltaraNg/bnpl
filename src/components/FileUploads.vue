<template>
    <div>
        <div class="relative">
            <div class="mb-1">
                <label for="name" class="block pt-8 text-sm font-medium text-gray-700">Name of Document</label>
                <input
                    type="type"
                    class="block w-full border rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="File.name"
                />

                <div class="absolute right-2 cursor-pointer bottom-3 lg:hidden block"  >
                    <input type="file" accept="image/*" capture="camera" id="photo"  @change="snapShot($event)" />
                    <label for="photo" class="cursor-pointer" 
                        ><img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg"
                    /></label>
                </div>
                <div class="absolute right-2 cursor-pointer bottom-3 hidden lg:block" @click="openCamera">
                    <img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg" />
                </div>
                <div class="" :class="showVideo ? 'block' : 'hidden'" @click="capture"><video ref="video" id="video" autoplay></video></div>
                <canvas v-show="!showVideo" class="hidden lg:block absolute left-0 bttom-0" ref="canvas" id="canvas" width="180" height="60"></canvas>
                <canvas v-show="!showVideo" class="hidden absolute left-0 bttom-0" ref="canvas2" id="canvas" width="640" height="480"></canvas>
                <div class="absolute left-0">
                    <div class="imagePreviewWrapper block lg:hidden" :style="{ 'background-image': `url(${previewImage})` }" ></div>
                </div>

                <!-- <p class="absolute -bottom-4">{{ list?.path?.name }}</p> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onUnmounted, watch } from "vue";
const File = ref({
    name: "",
    path: "",
});

const canvas = ref();
const canvas2 = ref();
const video = ref();
const previewImage = ref();
const tracks = ref();
const showVideo = ref(false);
const props = defineProps({
    index: Number,
});

const emit = defineEmits(["update:fileSelected", "input"]);

function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            // console.log(stream.getTracks());
            tracks.value = stream.getTracks();

            video.value.srcObject = stream;
            video.value.play();
        });
    }
    showVideo.value = true;
}
function closeCamera() {
    tracks.value?.forEach(function (track) {
        if (track.readyState == "live" && track.kind === "video") {
            track.stop();
        }
    });
}
function capture() {
    console.log(props.index);
    canvas.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    canvas2.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    File.value.path = canvas2.value.toDataURL("image/jpeg").replace("data:", "").replace(/^.+,/, "");
    showVideo.value = false;
}
function snapShot(event) {
    File.value.path = event.target.files[0];
    if (File.value.path) {
        let reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
            File.value.path = previewImage.value.replace("data:", "").replace(/^.+,/, "");
           
        };
        reader.readAsDataURL(File.value.path);
        
       
        
    }
}


// function sendFile(){
//       emit("fileSelected",File.value);
//        showModal.value = false

// }
// function AddDocuments() {
//     Documents.value.push({ ...file.value, ...Documents.value });
// }
watch(File.value, (currentValue) => {

    emit("update:fileSelected", { ...currentValue, index: props.index });
});
// watch(File.value.path, (currentValue) => {
//     // File.value.map;
//     console.log( props.index, currentValue)
//     // emit("update:fileSelected", { ...currentValue, index: props.index });
// });
onUnmounted(() => closeCamera());
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

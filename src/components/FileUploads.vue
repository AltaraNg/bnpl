<template>
    <div>
        <div class="relative">
            <div class="mb-1">
                <label for="name" class="block pt-8 text-sm font-medium text-gray-700">Name of Document</label>
                <input
                    type="type"
                    class="block w-full border rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="name"
                    @input="emit('input', {name:name, index:index})"
                />

                <div class="absolute right-2 cursor-pointer bottom-3 lg:hidden block" @mouseover="PersistIndex">
                    <input type="file" accept="image/*" capture="camera" id="photo" @change="snapShot($event)" />
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
                    <div class="imagePreviewWrapper block lg:hidden" :style="{ 'background-image': `url(${props.image})` }"></div>
                </div>

                <!-- <p class="absolute -bottom-4">{{ list?.path?.name }}</p> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onUnmounted,  } from "vue";
const File = ref({
    
    path: "",
});
const name = ref("")

const canvas = ref();
const canvas2 = ref();
const video = ref();
const previewImage = ref();
const tracks = ref();
const showVideo = ref(false);
const props = defineProps({
    index: Number,
    image:HTMLImageElement
});

const emit = defineEmits([ "input", "fetch:currentDataURL"]);

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
    canvas.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    canvas2.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    File.value.path = canvas2.value.toDataURL("image/jpeg").replace("data:", "").replace(/^.+,/, "");
    emit("fetch:currentDataURL", { path: canvas2.value.toDataURL("image/jpeg"), index:props.index});
    showVideo.value = false;
}
function PersistIndex() {
    localStorage.setItem("currentIndex", props.index);
}
function snapShot(event) {
    File.value.path = event.target.files[0];
    if (File.value.path) {
        let reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
            File.value.path = previewImage.value.replace("data:", "").replace(/^.+,/, "");
            const Index = localStorage.getItem("currentIndex")
            // console.log(previewImage.value, Index)
             emit("fetch:currentDataURL", { path: previewImage.value, index:Index});
        };
        reader.readAsDataURL(File.value.path);
    }
}

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

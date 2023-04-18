<template>
    <div class="mb-7">
        <div class="relative">
            <div class="mb-1">
                <label for="name" class="block  pt-8 text-sm font-medium text-gray-700">Name of Document</label>
                <input
                    type="type"
                    class="block w-full border mb-2 rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="name"
                    @input="emit('input', { name: name, index: index })"
                />

                <div class="absolute right-2 cursor-pointer bottom-3 lg:hidden block" @mouseover="PersistIndex">
                    <input type="file" accept="image/*" capture="camera" id="photo" @change="snapShot($event)" />
                    <label for="photo" class="cursor-pointer"
                        ><img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg"
                    /></label>
                </div>
                <div class="absolute right-2 cursor-pointer bottom-3 hidden lg:block" @click="openCamera"  >
                    <img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg" v-if="!showVideo" />
                </div>
                <div class="" :class="showVideo ? 'block' : 'hidden'" >
                    <video ref="video" id="video" autoplay></video>
                    <div class="flex items-center space-x-3 justify-end">
                        <button class="px-3 py-1 rounded text-white bg-primary text-xs font-normal" @click.prevent="capture">Capture</button>
                        <button class="px-3 py-1 rounded text-white bg-red-500 text-xs font-normal cursor-pointer" @click="closeCamera">Cancel</button>
                    </div>
                </div>
                <canvas v-show="!showVideo" class="hidden lg:block absolute left-0 bttom-0" ref="canvas" id="canvas" width="180" height="60"></canvas>
                <canvas v-show="!showVideo" class="hidden absolute left-0 bttom-0" ref="canvas2" id="canvas" width="640" height="480"></canvas>
                <div class="absolute left-0" v-show="!showVideo">
                    <div class="imagePreviewWrapper block lg:hidden" :style="{ 'background-image': `url(${props.image})` }"></div>
                </div>

                <!-- <p class="absolute -bottom-4">{{ list?.file?.name }}</p> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
const File = ref({
    file: "",
});
const name = ref("");

const canvas = ref();
const canvas2 = ref();
const video = ref();
const previewImage = ref();
const tracks = ref();
const showVideo = ref(false);
const props = defineProps({
    index: Number,
    image: HTMLImageElement,
});

const emit = defineEmits(["input", "fetch:currentDataURL"]);

function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
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
    showVideo.value = false;
    // canvas.value.getContext('2d').clearRect(0, 0, 640,480)
}
function capture() {
    canvas.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    canvas2.value.getContext("2d").drawImage(video.value, 0, 0, 640, 480);
    File.value = canvas2.value.toDataURL();
     File.value = dataURItoBlob(File.value)
    emit("fetch:currentDataURL", { display: canvas2.value.toDataURL("image/jpeg"), index: props.index, file: File.value});
    showVideo.value = false;
    closeCamera()
}
function PersistIndex() {
    localStorage.setItem("currentIndex", props.index);
}
function snapShot(event) {
    File.value.file = event.target.files[0];
    if (File.value.file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
            File.value.file = previewImage.value.replace("data:", "").replace(/^.+,/, "");
            const Index = localStorage.getItem("currentIndex");
            emit("fetch:currentDataURL", { display: previewImage.value, index: Index, file: event.target.files[0] });
        };
        reader.readAsDataURL(File.value.file);
    }
}
function dataURItoBlob(dataURI) {
// convert base64/URLEncoded data component to raw binary data held in a string
var byteString;
if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
else
    byteString = unescape(dataURI.split(',')[1]);
// separate out the mime component
var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// write the bytes of the string to a typed array
var ia = new Uint8Array(byteString.length);
for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
}
return new Blob([ia], {type:mimeString});
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

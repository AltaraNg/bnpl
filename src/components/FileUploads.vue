<template>
    <div :class="!canvas || !props.image ? 'mb-2' : 'mb-36'">
        <div class="relative">
            <div class="mb-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Name of Document</label>
                <div class="flex items-center">
                     <input
                    type="type"
                    class="block w-full border mb-2 rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="name"
                    @input="emit('input', { name: name, index: index })"
                />
                <trash class="pl-1" @click="emit('delete',index )"/>
                </div>
               

                <div class="absolute right-8 cursor-pointer bottom-4 lg:hidden block" @mouseover="PersistIndex">
                    <input type="file" accept="image/*"  id="photo" @change="snapShot($event)" />
                    <label for="photo" class="cursor-pointer"
                        ><img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg"
                    /></label>
                </div>
                <div class="absolute right-8 cursor-pointer bottom-4 hidden lg:block" @click="openCamera">
                    <img for="photo" class="text-indigo-500" src="@/assets/images/photo-camera-svgrepo-com.svg" v-if="!showVideo" />
                </div>
                <div class="" :class="showVideo ? 'block' : 'hidden'">
                    <video ref="video" id="video" autoplay></video>
                    <div class="flex items-center pt-1 space-x-3 justify-end">
                        <button class="px-3 py-1 rounded text-white bg-primary text-xs font-normal" @click.prevent="capture">Capture</button>
                        <button class="px-3 py-1 rounded text-white bg-red-500 text-xs font-normal cursor-pointer" @click="closeCamera">
                            Cancel
                        </button>
                    </div>
                </div>
                <div v-show="!showVideo" class="flex hidden lg:flex absolute left-0 bttom-0">
                    <canvas class="" ref="canvas" id="canvas" width="230" height="110"></canvas>
                    <div class="pl-2 cursor-pointer" @click="RemoveImage" v-show="File"><cancel /></div>
                </div>

                <canvas v-show="!showVideo" class="hidden absolute left-0 bttom-0" ref="canvas2" id="canvas" width="640" height="480"></canvas>
                <div class="absolute left-0 flex block lg:hidden" v-show="!showVideo">
                    <div class="imagePreviewWrapper " :style="{ 'background-image': `url(${props.image})` }"></div>
                    <div class="pl-2 cursor-pointer" @click="RemoveImage"  v-show="props.image"><cancel /></div>
                </div>

                <!-- <p class="absolute -bottom-4">{{ list?.file?.name }}</p> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
import trash from "@/assets/svgs/trash.vue";
import cancel from "@/assets/svgs/cancel.vue";
const File = ref();
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

const emit = defineEmits(["input", "fetch:currentDataURL", "delete"]);

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
function RemoveImage(){
    emit("fetch:currentDataURL", { display: "", index: props.index, file: "" });
    File.value=null;
    previewImage.value=null;
    canvas.value.getContext("2d").clearRect(0,0 , 640, 480)
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
    File.value = dataURItoBlob(File.value);
    emit("fetch:currentDataURL", { display: canvas2.value.toDataURL("image/jpeg"), index: props.index, file: File.value });
    showVideo.value = false;
    closeCamera();
}
function PersistIndex() {
    localStorage.setItem("currentIndex", props.index);
}
 function snapShot(event) {
    File.value = event.target.files[0];
    if (File.value) {
        let reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
            File.value = previewImage.value.replace("data:", "").replace(/^.+,/, "");
            const Index = localStorage.getItem("currentIndex");
            console.log(event.target.files[0].size, 'initial file size')
          reduceFileSize(event.target.files[0], 700, 400, 0.5).then((res)=>{
              emit("fetch:currentDataURL", { display: previewImage.value, index: Index, file:res  });
          })
            
        };
        reader.readAsDataURL(File.value);
    }
}
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}
function reduceFileSize(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve,) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          quality
        );
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}












// });
onUnmounted(() => closeCamera());
</script>
<style scoped>
input[type="file"] {
    display: none;
}
.imagePreviewWrapper {
    width: 230px;
    height: 110px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>

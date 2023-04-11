<template>
    <div>
        <div>
            <p class="mb-2 text-gray-800 font-bold">Additional Documents</p>
            <p class="text-sm text-gray-800 leading-2 mb-2">
                Please feel free to upload relevant documents to enable your verifications process. eg passport, drivers license
            </p>
        </div>
        <div class="relative">
            <div class=" mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name of Document</label>
                <input
                    type="type"
                    class="block w-full border rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0 :border-outline-none"
                    name="name"
                    v-model="File.name"
                />

                <div class="absolute right-2  top-1/2" v-if="!File.path">
                    <input type="file" accept="image/*" capture="camera" id="photo" @change="snapShot($event)" />
                    <label for="photo" class="bg-indigo-500 text-white px-3 py-1 rounded">Attach Document </label>
                </div>
                <div class="absolute right-2  top-1/2" v-else>
                    <div class="text-white  cursor-pointer bg-primary text-center  text-sm px-3 py-1 rounded" @click="uploadFile">
                        Upload 
                    </div>
                </div>
                <p class="absolute right-0">{{ File.path.name }}</p>

                <!-- <p class="absolute -bottom-4">{{ list?.path?.name }}</p> -->
            </div>
        </div>
         <BaseModal @close="showModal=false" v-if="showModal">
      <div>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Upload {{ File.name }}</DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
             Are you sure you want to upload this file?
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 justify-around flex space-x-5">
        <button type="button"
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-0 sm:text-sm"
          @click="sendFile">
          Upload
        </button>
        <button type="button"
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-0 sm:text-sm"
          @click="showModal = false">
          Cancel
        </button>
      </div>
    </BaseModal>
    </div>
</template>
<script setup>
import { ref,  } from "vue";
import BaseModal from "./BaseModal.vue";
import {handleError,handleSuccess} from "@/utilities/GlobalFunctions"
const File = ref({
    name: "",
    path: "",
});
const showModal = ref(false)

// const props = defineProps({
//     index: Number,
// });

const emit = defineEmits(["fileSelected"]);

function snapShot(event) {
    File.value.path = event.target.files[0];
}
function uploadFile(){
    if(File.value.name){
        showModal.value = true
    }else{
        handleError("Please enter Name")
    }
    
}
function sendFile(){
      emit("fileSelected",File.value);
       showModal.value = false,
       handleSuccess("Uploaded")

}
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
</style>

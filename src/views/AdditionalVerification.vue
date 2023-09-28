<template>
    <App>
        <div class="grid grid-cols-1 justify-items-center bg-green-400p py-8">
            <img src="/img/failed.png" alt="verification" class="max-w-[250px]" />
            <p class="text-3xl">Failed Verification</p>
            <p class="mt-4 text-gray-600 text-center max-w-[90%]">
                We regret to inform you that your loan application has been denied this time due to failed verification. Please assist us by uploading
                relevant documents to enable your verification
            </p>
        </div>
        <p
            v-if="Customer?.latest_credit_checker_verifications?.reason"
            class="capitalize mb-10 px-6 text-gray-600 text-center max-w-[90%] font-normal"
        >
            Reason: <span class="font-semibold">{{ Customer?.latest_credit_checker_verifications?.reason }} </span>
        </p>

        <div class="my-4 px-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div v-for="(document, index) in DocumentUploads" :key="index" :class="document?.status ? 'hidden' : ''">
                <div class="relative">
                    <FileUploads
                        :index="index"
                        @fetch:currentDataURL="setDataURL"
                        @input="setName"
                        @delete="deleteFileUpload"
                        :image="DocumentUploads[index]?.display"
                    />
                </div>
            </div>
            <div class="text-right lg:flex lg:justify-end sm:col-span-2">
                <button class="px-3 py-2 rounded text-white bg-primary font-normal" :disabled="disabled" @click="addMore">Add More</button>
            </div>
            <div class="text-right lg:flex lg:justify-center sm:col-span-2">
                <button class="px-10 py-2 rounded text-white bg-primary font-normal" :disabled="disabled" @click="Re_initateCreditCheck">
                    Upload
                </button>
            </div>
        </div>
    </App>
</template>

<script setup>
import Apis from "@/services/ApiCalls";
import FileUploads from "@/components/FileUploads.vue";
import App from "@/layouts/App.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, watch, onBeforeMount } from "vue";
const store = useStore();
const route = useRoute();
const DocumentUploads = ref([{ name: "", file: "", index: "", display: "", status: "" }]);
const disabled = ref(true);
const Customer = ref({});
function deleteFileUpload(payload) {
    DocumentUploads.value = DocumentUploads.value.map((document, index) => {
        if (payload == index && payload !== 0) {
            return { ...document, status: true };
        } else {
            return { ...document };
        }
    });
}

async function Upload() {
    DocumentUploads.value = DocumentUploads.value.filter((doc) => {
        return (doc?.file || doc?.name) && !doc?.status;
    });
    const arrayDoc = [];
    const document =
        DocumentUploads.value.length == 1 ? await Apis.uploadsingle(DocumentUploads.value[0]) : await Apis.uploadMultiple(DocumentUploads.value);
    arrayDoc.push(document?.result?.file);
    return DocumentUploads.value.length == 1 ? arrayDoc : document.result.files;
}
async function Re_initateCreditCheck() {
    store.dispatch("Re_InitiateCreditCheck", {
        credit_check_no: Customer.value.latest_credit_checker_verifications.credit_check_no,
        documents: await Upload(),
    });
}

function addMore() {
    DocumentUploads.value.push({});
    disabled.value = true;
}
function setDataURL(obj) {
    if (!DocumentUploads.value[obj.index]) {
        DocumentUploads.value.push({ file: obj.file, display: obj.display });
    } else {
        DocumentUploads.value[obj.index].file = obj.file;
        DocumentUploads.value[obj.index].display = obj.display;
    }
}
function setName(obj) {
    if (!DocumentUploads.value[obj.index]) {
        DocumentUploads.value.push({ name: obj.name });
    } else {
        DocumentUploads.value[obj.index].name = obj.name;
    }
}
async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result;
}
watch(
    () => [...DocumentUploads.value],
    () => {
        DocumentUploads.value.map((doc) => {
            if (!doc?.status) {
                disabled.value = doc?.file && doc?.name ? false : true;
            }
        });
    },
    { deep: true }
);
onBeforeMount(async () => {
    CustomerDetails();
});
</script>

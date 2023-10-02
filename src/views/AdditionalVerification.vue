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
        <div class="w-full flex justify-end">
            <div class="flex flex-col mt-2 pr-10" :class="Uploaded ? 'pointer-events-none opacity-50' : ''">
                <p class="text-sm text-gray-800 leading-2">Please upload your bank statements using the provided field.</p>
                <div class="flex items-end">
                    <div class="relative w-10/12 mr-2">
                        <app-select-input
                            name="bank_statement_choice"
                            v-model="bankStatementData.bank_statement_choice"
                            :modelValue="bankStatementData.bank_statement_choice"
                            @update:modelValue="onSelectStatementChoice"
                        >
                            <option value="" disabled>Select Bank Choice</option>
                            <option class="text-sm" v-for="option in statement_choices" :key="option.key" :value="option.key">
                                {{ option.name }}
                            </option>
                        </app-select-input>

                        <input type="file" ref="pdfInput" accept="application/pdf" style="display: none" @change="handlePDFChange" />
                        <pdf style="position: absolute; right: 10px; top: 25%; cursor: pointer" @click="uploadPDF()" />
                    </div>

                    <button
                        class="px-3 py-2 rounded text-white bg-primary font-normal"
                        :disabled="!Object.values(bankStatementData).every((value) => value)"
                        @click.prevent="uploadBankStatement"
                    >
                        <loader v-if="loading" /> <span v-else>Upload</span>
                    </button>
                </div>

                <div v-if="bankStatementData.bank_statement_pdf">Selected PDF: {{ bankStatementData.bank_statement_pdf.name }}</div>
                <span class="invalid-feedback">{{ errors?.bank_statement }}</span>
            </div>
        </div>

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
import loader from "@/assets/svgs/loader.vue";
import pdf from "@/assets/images/pdf.vue";
import AppSelectInput from "@/components/AppSelectInput.vue";
import { handleSuccess, handleError } from "@/utilities/GlobalFunctions";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, watch, onBeforeMount } from "vue";
const store = useStore();
const route = useRoute();
const DocumentUploads = ref([{ name: "", file: "", index: "", display: "", status: "" }]);
const disabled = ref(true);
const Customer = ref({});
const Uploaded = ref(false);
const loading = ref(false);
const statement_choices = ref();
const pdfInput = ref();
const bankStatementData = ref({
    bank_statement_choice: "",
    bank_statement_pdf: "",
});
function deleteFileUpload(payload) {
    DocumentUploads.value = DocumentUploads.value.map((document, index) => {
        if (payload == index && payload !== 0) {
            return { ...document, status: true };
        } else {
            return { ...document };
        }
    });
}
function uploadPDF() {
    pdfInput.value.click();
}
function handlePDFChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
        // Handle the selected PDF file
        bankStatementData.value.bank_statement_pdf = selectedFile;
    } else {
        handleError("Please select a valid PDF file.");
    }
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
    if (!bankStatementData.value.bank_statement_choice && !bankStatementData.value.bank_statement_pdf) {
        store.dispatch("Re_InitiateCreditCheck", {
            credit_check_no: Customer.value.latest_credit_checker_verifications.credit_check_no,
            documents: await Upload(),
        });
    } else {
        console.log(bankStatementData.value);
        handleError("Please upload your bank statement first");
    }
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
function onSelectStatementChoice(value, name) {
    bankStatementData.value[name] = value;
}
async function getStatementChoices() {
    const result = await Apis.statementChoices();
    statement_choices.value = result.data;
}
async function uploadBankStatement() {
    loading.value = true;
    const response = await Apis.uploadBankStatement({ ...bankStatementData.value, customer_id: Customer.value.id });
    if (response) {
        handleSuccess("Bank Statement Uploaded");
        Uploaded.value = true;
        bankStatementData.value = {};
    }
    loading.value = false;
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
    await CustomerDetails();
    await getStatementChoices();
    console.log(Customer.value);
});
</script>

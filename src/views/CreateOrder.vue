<template>
    <div>
        <App>
            <div class="lg:pr-8 py-8 px-6 lg:mx-auto lg:flex flex-col lg:max-w-7xl">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">New Sale</h2>
                </div>

                <Form :validation-schema="CreateOrderSchema(Orders)" v-slot="{ errors }">
                    <div class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <app-label label-title="Product" label-for="product" />
                            <div class="mt-1">
                                <app-input type="text" name="product" :model-value="Order.product" v-model="Order.product" id="product" />
                            </div>
                            <span class="invalid-feedback">{{ errors?.product }}</span>
                        </div>
                        <div>
                            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                            <div class="mt-1">
                                <CurrencyInput
                                    :model-value="Order.amount"
                                    v-model="Order.amount"
                                    name="amount"
                                    :options="{
                                        currency: 'NGN',
                                        hideCurrencySymbolOnFocus: false,
                                        hideGroupingSeparatorOnFocus: false,
                                        hideNegligibleDecimalDigitsOnFocus: false,
                                    }"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.amount }}</span>
                        </div>
                        <div class="pointer-events-none">
                            <app-label label-title="Repayment Duration" label-for="repayment_duration" />
                            <div class="mt-1">
                                <app-select-input
                                    name="repayment_duration_id"
                                    :modelValue="Order.repayment_duration_id"
                                    v-model="Order.repayment_duration_id"
                                    @update:modelValue="onSelectChange"
                                >
                                    <option value="" disabled>Select Repayment Duration</option>
                                    <option class="text-sm" v-for="duration in repayment_duration" :key="duration.slug" :value="duration.id">
                                        {{ duration.value / 30 }} Months
                                    </option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.repayment_duration_id }}</span>
                        </div>
                        <div>
                            <app-label label-title="Repayment Cycle" label-for="repayment_cycle_id" />
                            <div class="mt-1">
                                <app-select-input
                                    name="repayment_cycle_id"
                                    v-model="Order.repayment_cycle_id"
                                    :modelValue="Order.repayment_cycle_id"
                                    @update:modelValue="onSelectChange"
                                >
                                    <option value="" disabled>Select Repayment Cycle</option>
                                    <option class="text-sm" v-for="cycle in repayment_cycle" :key="cycle.slug" :value="cycle.id">
                                        {{ cycle.name }}
                                    </option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.repayment_cycle_id }}</span>
                        </div>

                        <div class="p-5 lg:py-8 lg:mt-6 rounded shadow-sm bg-gray-200">
                            <p class="mb-4 text-gray-800 font-bold">First Guarantor</p>
                            <div>
                                <app-label label-title="First Name" label-for="first_guarantor_first_name" />
                                <div class="mt-1">
                                    <app-input
                                        v-model="Order.first_guarantor_first_name"
                                        type="text"
                                        name="first_guarantor_first_name"
                                        :model-value="Order.first_guarantor_first_name"
                                        id="first_guarantor_first_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_first_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Last Name" label-for="first_guarantor_last_name" />
                                <div class="mt-1">
                                    <app-input
                                        v-model="Order.first_guarantor_last_name"
                                        type="text"
                                        name="first_guarantor_last_name"
                                        :model-value="Order.first_guarantor_last_name"
                                        id="first_guarantor_last_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_last_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Telephone" label-for="first_guarantor_telephone" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="first_guarantor_telephone"
                                        :model-value="Order.first_guarantor_telephone"
                                        v-model="Order.first_guarantor_telephone"
                                        id="first_guarantor_telephone"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_telephone }}</span>
                            </div>
                            <div>
                                <app-label label-title="Home Address" label-for="first_guarantor_home_address" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="first_guarantor_home_address"
                                        :model-value="Order.first_guarantor_home_address"
                                        v-model="Order.first_guarantor_home_address"
                                        id="first_guarantor_home_address"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_home_address }}</span>
                            </div>
                        </div>

                        <div class="p-5 lg:py-8 lg:mt-6 rounded shadow-sm bg-gray-200">
                            <p class="mb-4 text-gray-800 font-bold">Second Guarantor</p>
                            <div>
                                <app-label label-title="First Name" label-for="second_guarantor_first_name" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_first_name"
                                        :model-value="Order.second_guarantor_first_name"
                                        v-model="Order.second_guarantor_first_name"
                                        id="second_guarantor_first_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_first_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Last Name" label-for="second_guarantor_last_name" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_last_name"
                                        v-model="Order.second_guarantor_last_name"
                                        :model-value="Order.second_guarantor_last_name"
                                        id="second_guarantor_last_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_last_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Telephone" label-for="second_guarantor_telephone" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_telephone"
                                        v-model="Order.second_guarantor_telephone"
                                        :model-value="Order.second_guarantor_telephone"
                                        id="second_guarantor_telephone"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_telephone }}</span>
                            </div>
                            <div>
                                <app-label label-title="Home Address" label-for="second_guarantor_home_address" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_home_address"
                                        v-model="Order.second_guarantor_home_address"
                                        :model-value="Order.second_guarantor_home_address"
                                        id="second_guarantor_home_address"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_home_address }}</span>
                            </div>
                        </div>
                        <div class="mt-5">
                            <p class="mb-2 text-gray-800 font-bold">Additional Documents</p>
                            <p class="text-sm text-gray-800 leading-2">
                                Please feel free to upload relevant documents to enable your verifications process. eg passport, drivers license
                            </p>
                        </div>

                        <div class="flex flex-col mt-5" :class="Uploaded ? 'pointer-events-none opacity-50' : ''">
                            <p class="mb-2 text-gray-800 font-bold">Bank Statement Upload</p>
                            <p class="text-sm text-gray-800 leading-2">Please upload your bank statements using the provided field.</p>
                            <div class="flex items-end">
                                <div class="relative w-10/12 mr-2">
                                    <app-select-input
                                        name="bank_statement_choice"
                                        v-model="bankStatementData.bank_statement_choice"
                                        :modelValue="bankStatementData.bank_statement_choice"
                                        @update:modelValue="onSelectStatementChoice"
                                    >
                                        <option value="" selected>Select Bank Choice</option>
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
                            <div class="flex" v-if="bankStatementData.bank_statement_pdf">
                                Selected PDF: {{ bankStatementData.bank_statement_pdf.name }}
                                <cancel class="mx-4 cursor-pointer" @click="clearBankStatement" />
                            </div>

                            <span class="invalid-feedback">{{ errors?.bank_statement }}</span>
                        </div>

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
                        <div></div>
                        <div></div>
                        <div class="text-right lg:flex lg:justify-end sm:col-span-2">
                            <button class="px-3 py-2 rounded text-white bg-primary font-normal" :disabled="disabled" @click="addMore">
                                Add More
                            </button>
                        </div>

                        <div class="text-right mt-8 lg:flex lg:justify-center sm:col-span-2">
                            <defaultButton name=" New Sale" class="lg:w-1/3" @click.prevent="createNewSale">
                                <template v-slot:icon>
                                    <plus />
                                </template>
                            </defaultButton>
                        </div>
                    </div>
                </Form>
            </div>
        </App>
    </div>
</template>
<script setup>
import { Form } from "vee-validate";
import AppInput from "@/components/AppInput.vue";
import AppLabel from "@/components/AppLabel.vue";
import AppSelectInput from "@/components/AppSelectInput.vue";
import defaultButton from "@/components/button.vue";
import FileUploads from "@/components/FileUploads.vue";
import { ref, reactive, onMounted, watch } from "vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import plus from "@/assets/svgs/plus.vue";
import App from "@/layouts/App.vue";
import loader from "@/assets/svgs/loader.vue";
import cancel from "@/assets/svgs/cancel.vue";
import { handleError, handleSuccess } from "@/utilities/GlobalFunctions";
import { useStore } from "vuex";
import { calculate } from "@/utilities/calculator";
import { useRoute } from "vue-router";
import Apis from "@/services/ApiCalls";
import { CreateOrderSchema } from "@/shemas/CreateOrderSchema";
import pdf from "@/assets/images/pdf.vue";
const store = useStore();
const route = useRoute();
const repayment_duration = ref();
const repayment_cycle = ref([
    {
        slug: "monthly",
        name: "Monthly",
        id: 2,
        value: 28,
    },
    {
        slug: "bi-monthly",
        name: "Bi-Monthly",
        id: 1,
        value: 14,
    },
]);
const DocumentUploads = ref([{ name: "", file: "", index: "", display: "", status: "" }]);
const Customer = ref();
const get_calculations = ref([]);
const Order = reactive({
    product: "",
    amount: 0,
    repayment_duration_id: "1",
    repayment_cycle_id: "",
    first_guarantor_first_name: "",
    first_guarantor_last_name: "",
    first_guarantor_telephone: "",
    first_guarantor_home_address: "",
    second_guarantor_first_name: "",
    second_guarantor_last_name: "",
    second_guarantor_telephone: "",
    second_guarantor_home_address: "",
});
const pdfInput = ref();
const business_type = ref();
const statement_choices = ref();
const bankStatementData = ref({
    customer_id: route.params.id,
    bank_statement_choice: "",
    bank_statement_pdf: "",
});
const disabled = ref(true);
const Orders = ref();
const Uploaded = ref(false);
const loading = ref(false);
const payment_type_id = ref();
const OrderResult = ref({
    total: null,
    actualDownpayment: null,
    rePayment: null,
});

function clearBankStatement() {
    bankStatementData.value.bank_statement_pdf = "";
    bankStatementData.value.bank_statement_choice = "";
}
function deleteFileUpload(payload) {
    DocumentUploads.value = DocumentUploads.value.map((document, index) => {
        if (payload == index && payload !== 0) {
            return { ...document, status: true };
        } else {
            return { ...document };
        }
    });
}
async function uploadBankStatement() {
    loading.value = true;
    const response = await Apis.uploadBankStatement(bankStatementData.value);
    if (response) {
        handleSuccess("Bank Statement Uploaded");
        Uploaded.value = true;
        bankStatementData.value = {};
    }
    loading.value = false;
}

async function Upload() {
    const arrayDoc = [];
    const document =
        DocumentUploads.value.length == 1 ? await Apis.uploadsingle(DocumentUploads.value[0]) : await Apis.uploadMultiple(DocumentUploads.value);
    arrayDoc.push(document?.result?.file);
    return DocumentUploads.value.length == 1 ? arrayDoc : document.result.files;
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

async function createNewSale() {
    try {
        const Data = { ...Order, payment_type_id: payment_type_id };

        const params = get_calculations.value.find((x) => {
            return (
                x.business_type_id === business_type?.value?.id &&
                x.down_payment_rate_id === payment_type_id.value?.id &&
                x.repayment_duration_id == Order.repayment_duration_id
            );
        });
        const no_of_orders = Customer.value.orders.length;
        const { total, actualDownpayment, rePayment } = calculate(Data.amount, Data, params, no_of_orders >= 2 ? 2 : no_of_orders);
        OrderResult.value.total = total;
        OrderResult.value.actualDownpayment = actualDownpayment;
        OrderResult.value.rePayment = rePayment;
        if (!bankStatementData.value.bank_statement_pdf) {
            await SendtoApi();
        } else {
            handleError("Please upload your bank statement first");
        }
    } catch (e) {
        window.localStorage.removeItem("data");
    }
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

async function SendtoApi() {
    const data = {
        customer_id: route.params.id,
        cost_price: Order.amount,
        down_payment: OrderResult.value.actualDownpayment,
        down_payment_rate_id: payment_type_id.value.id,
        product_price: OrderResult.value.total,
        business_type_id: business_type.value.id,
        repayment: OrderResult.value.rePayment,
        repayment_cycle_id: parseInt(Order.repayment_cycle_id),
        repayment_duration_id: parseInt(Order.repayment_duration_id),
        product_name: Order.product,
        guarantors: [
            {
                first_name: Order.first_guarantor_first_name,
                last_name: Order.first_guarantor_last_name,
                phone_number: Order.first_guarantor_telephone,
                home_address: Order.first_guarantor_home_address,
            },
            {
                first_name: Order.second_guarantor_first_name,
                last_name: Order.second_guarantor_last_name,
                phone_number: Order.second_guarantor_telephone,
                home_address: Order.second_guarantor_home_address,
            },
        ],
    };
    if (DocumentUploads.value[0].file || DocumentUploads.value[0].name) {
        DocumentUploads.value = DocumentUploads.value.filter((doc) => {
            return (doc?.file || doc?.name) && !doc?.status;
        });
        const valid = DocumentUploads.value.every((item) => {
            return item?.file && item?.name;
        });
        valid
            ? store.dispatch("InitiateCreditCheck", {
                  ...data,
                  documents: await Upload(),
              })
            : handleError("Document name and image is required");
    } else {
        store.dispatch("InitiateCreditCheck", data);
    }
}
function onSelectChange(value, name) {
    Order[name] = value;
}
async function RepaymentDuration() {
    const result = await Apis.repaymentduration();
    repayment_duration.value = result?.data?.data?.data.filter((duration) => {
        return duration.name == "three_months";
    });
}
function onSelectStatementChoice(value, name) {
    bankStatementData.value[name] = value;
}
async function getStatementChoices() {
    const result = await Apis.statementChoices();
    statement_choices.value = result.data;
}
async function BusinessType() {
    const result = await Apis.businesstype();
    business_type.value = result?.data?.data?.data.find((businesstype) => businesstype.slug == "ap_no_bs_product_non_verve");
}
async function GetCalculation() {
    const result = await Apis.getcalculations();
    get_calculations.value = result?.data?.data;
}
async function Downpayment() {
    const result = await Apis.downpayments();
    payment_type_id.value = result?.data?.data?.data.find((downPayment) => downPayment.name == "forty");
}
async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result.data.result;
    Orders.value = result?.data?.result.orders;
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
onMounted(() => {
    getStatementChoices();
    RepaymentDuration();
    BusinessType();
    GetCalculation();
    Downpayment();
    CustomerDetails();
    // RepaymentCycle();
});
</script>

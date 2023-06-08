<template>
    <App>
        <div class="overflow-hidden bg-white relative px-4 lg:px-8" v-if="!store.state.loader.showLoading">
            <div class="flex w-full flex-col items-center justify-center">
                <div class="flex flex-col items-center px-2 md:px-5 w-full justify-center">
                    <div class="w-full absolute top-0 left-0 md:hidden">
                        <RouterLink :to="{ name: 'GetStarted' }"><ArrowLeftIcon class="h-8 w-10 text-primary" aria-hidden="true" /></RouterLink>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full pt-2 sm:mt-6">
                        <p class="mb-2 text-xl text-gray-600 font-medium mt-8">Order Details</p>
                        <p class="text-sm text-gray-500">TOTAL <span>(product value)</span></p>
                        <p class="text-4xl text-gray-800 font-semibold mt-1">{{ formatCurrency(OrderResult.total) }}</p>
                        <div
                            class="flex flex-col my-5 rounded-3xl bg-white lg:w-1/2 md:w-full w-full cursor-pointer shadow-xl ring-1 ring-black/10 lg:p-6 p-4 mt-6"
                        >
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-base font-semibold leading-8 tracking-tight text-primary">Payment Details</p>
                                    <p class="text-lg font-semibold text-gray-600">{{ OrderResult.product_name }}</p>
                                </div>
                                <img src="@/assets/images/orderCompleted.gif" class="mr-1 w-8" v-if="route.params.OTPvalidate == 'validated'" />
                            </div>

                            <div class="mt-3">
                                <div class="flex items-center justify-between">
                                    <div class="md:w-1/3 w-2/5">
                                        <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
                                        <p class="text-gray-900 text-2xl font-bold">{{ formatCurrency(OrderResult.actualDownpayment) }}</p>
                                    </div>
                                    <div class="md:w-1/3 w-2/5">
                                        <p class="text-gray-500 text-sm font-medium mt-4">Product Cost Price</p>
                                        <p class="flex items-baseline text-2xl font-bold tracking-tight text-gray-900">
                                            {{ formatCurrency(Order?.product?.price) }}
                                            <span class="text-sm font-semibold leading-8 tracking-normal text-gray-500"></span>
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="md:w-1/3 w-2/5">
                                        <p class="text-gray-500 text-sm font-medium mt-4">Duration:</p>
                                        <p class="text-gray-900 text-2xl font-bold">{{ Order?.repayment_duration?.value / 30 }} Months</p>
                                    </div>
                                    <div class="md:w-1/3 w-2/5">
                                        <p class="text-gray-500 text-sm font-medium mt-4">{{ has_document == "yes" ? 5 : 2 }}% Commission:</p>
                                        <p class="text-gray-900 text-2xl font-bold">
                                            {{ formatCurrency(Order?.product?.price * (has_document == "yes" ? 0.05 : 0.02)) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="w-full mt-6 flex items-center justify-center">
                                     <button
                                    type="button"
                                    @click="showModal = true"
                                    class="inline-flex px-5 py-2 justify-center items-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                                >
                                    
                                    See More
                                </button>
                                </div>
                               
                            </div>
                        </div>
                        <BaseModal @close="showModal = false" v-if="showModal">
                            <div class="block w-full space-y-10">
                                <p class="text-lg mb-1 font-semibold mt-2 text-gray-800 capitalize">{{ OrderResult.repayment_cycle }} Repayments:</p>
                                <TableVue class="hidden mb-8 lg:block">
                                    <template #columns>
                                        <th scope="col" class="px-5 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                        <th
                                            scope="col"
                                            class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            v-for="amortization in Ammortization"
                                            :key="amortization"
                                        >
                                            {{ new Date(amortization.expected_payment_date).toLocaleDateString() }}
                                        </th>
                                    </template>
                                    <template #default>
                                        <tr>
                                            <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500">Amount</td>
                                            <td
                                                class="whitespace-nowrap px-2 py-4 text-sm text-gray-500"
                                                v-for="amortization in Ammortization"
                                                :key="amortization"
                                            >
                                                {{ formatCurrency(amortization.expected_amount) }}
                                            </td>
                                        </tr>
                                    </template>
                                </TableVue>
                                <div class="flex flex-wrap lg:hidden w-full space-y-2">
                                    <div
                                        v-for="amortization in Ammortization"
                                        :key="amortization"
                                        class="rounded-lg bg-white p-3 flex w-1/2 md:w-1/3 flex items-center shadow-lg"
                                    >
                                        <div class="items-center flex flex-col justify-center w-full text-center text-gray-800">
                                            <p>{{ new Date(amortization.expected_payment_date).toLocaleDateString() }}</p>
                                            <p class="font-bold">{{ formatCurrency(amortization.expected_amount) }}</p>
                                        </div>

                                        <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                    </div>
                                </div>

                                <div class="mt-5 sm:mt-6 w-full space-x-6 flex justify-end">
                                    <button
                                        type="button"
                                        class="inline-flex px-5 py-2 justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                                        @click="showModal = false"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </BaseModal>

                        <p
                            class="text-gray-500 text-sm text-justify font-normal mt-8 lg:w-1/2 md:w-2/3 w-full"
                            v-if="route.params.OTPvalidate == 'false'"
                        >
                            By clicking the 'Continue' button, you acknowledge that you understood, and agree to the terms of this loan agreement. You
                            agree to repay the loan in accordance with the repayment schedule and other terms outlined in this agreement. You
                            understand that failure to repay the loan as agreed may result in late fees, additional interest charges, and/or
                            collection activities.
                        </p>

                        <button
                            v-if="route.params.OTPvalidate == 'false'"
                            @click="RouteOTP"
                            type="button"
                            class="mb-10 inline-flex items-center lg:w-1/2 md:w-2/3 w-full rounded-md border border-transparent bg-primary px-3 py-4 text-base font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-0 min-w-[250px] justify-center mt-8 w-full"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="validate" class="w-full flex mt-10 justify-center items-center">
                <paystack
                    buttonClass="paystack"
                    buttonText="Make Payment"
                    :amount="OrderResult.actualDownpayment * 100"
                    :email="Customer?.email"
                    :publicKey="PUBLIC_KEY"
                    :reference="reference"
                    :onSuccess="processPayment"
                    :onCancel="close"
                >
                </paystack>
            </div>
        </div>
    </App>
</template>

<script setup>
import TableVue from "@/components/Table.vue";
import { ref, onBeforeMount, computed } from "vue";
import App from "@/layouts/App.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import Apis from "@/services/ApiCalls";
import { formatCurrency } from "@/utilities/GlobalFunctions";
import { cashLoan } from "@/utilities/calculator";
import { useStore } from "vuex";
import paystack from "vue3-paystack";
import BaseModal from "@/components/BaseModal.vue";
const store = useStore();
const PUBLIC_KEY = ref(process.env.VUE_APP_PAYSTACK_PK || "");
const route = useRoute();
const Ammortization = ref();
const showModal = ref(false);
const router = useRouter();
const Customer = ref(undefined);
const Order = ref(null);
const get_calculations = ref([]);
const business_type = ref();
const payment_type_id = ref();
const OrderResult = ref({
    total: 0,
    actualDownpayment: 0,
    rePayment: 0,
    product_name: null,
    repayment_cycle: null,
    duration: null,
});

async function RouteOTP() {
    store.dispatch("SaveResult", { ...OrderResult.value, ...Order.value, email: Customer.value.email });
    router.push({
        name: "OTP",
        params: {
            phone_number: Customer.value.telephone,
            verification_id: Order.value.id,
        },
    });
}

async function processPayment() {
    await Apis.storeOrder({
        customer_id: Customer.value.id,
        down_payment: OrderResult.value.actualDownpayment,
        down_payment_rate_id: Order.value.down_payment_rate_id,
        product_price: OrderResult.value.total,
        repayment: OrderResult.value.rePayment,
        business_type_id: Order.value.business_type_id,
        repayment_cycle_id: Order.value.repayment_cycle_id,
        repayment_duration_id: Order.value.repayment_duration_id,
        product_name: Order.value.product.name,
        cost_price: Order.value.product.price,
        fixed_repayment:false,
        has_document: Order.value?.documents[0]?.document_url ? "yes" : "no",
    })
        .then(() => {
            router.push({
                name: "CustomerDetails",
                params: {
                    phone_number: Customer.value.telephone,
                },
            });
        })
}
function close() {}
function Calculate() {
    try {
        const Data = {
            amount: Order.value?.product?.price,
            repayment_duration_id: Order.value.repayment_duration,
            payment_type_id: payment_type_id,
        };
        const params = get_calculations.value.find((x) => {
            return (
                x.business_type_id === business_type?.value?.id &&
                x.down_payment_rate_id === payment_type_id.value?.id &&
                x.repayment_duration_id === Order.value.repayment_duration_id
            );
        });
        const { total, actualDownpayment, rePayment } = cashLoan(Data.amount, Data, params, 0);
        OrderResult.value.total = total;
        OrderResult.value.actualDownpayment = actualDownpayment;
        OrderResult.value.rePayment = rePayment;
        OrderResult.value.product_name = Order.value.product.name;
        OrderResult.value.repayment_cycle = Order.value.repayment_cycle.name;
        OrderResult.value.duration = Order.value?.repayment_duration?.name;
        PreviewAmmortization();
    } catch (e) {
        throw new Error(e);
    }
}
async function PreviewAmmortization() {
    const result = await Apis.preview({
        customer_id: Customer.value.id,
        down_payment: OrderResult.value.actualDownpayment,
        down_payment_rate_id: Order.value.down_payment_rate_id,
        product_price: OrderResult.value.total,
        repayment: OrderResult.value.rePayment,
        repayment_cycle_id: Order.value.repayment_cycle_id,
        cost_price: Order.value.product.price,
        repayment_duration_id: Order.value.repayment_duration_id,
        product_name: Order.value.product.name,
        business_type_id: Order.value.business_type_id,
        fixed_repayment:false,
    });
    Ammortization.value = result.result.plans;
}
async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result;
    Order.value = Customer.value?.latest_credit_checker_verifications;
}
async function GetCalculation() {
    const result = await Apis.getcalculations();
    get_calculations.value = result?.data?.data;
}
async function BusinessType() {
    const result = await Apis.businesstype();
    business_type.value = result?.data?.data?.data.find((businesstype) => businesstype.slug == "ap_no_bs_product_non_verve");
}
async function Downpayment() {
    const result = await Apis.downpayments();
    payment_type_id.value = result?.data?.data?.data.find((downPayment) => downPayment.name == "forty");
}

onBeforeMount(async () => {
    await CustomerDetails();
    await Downpayment();
    await BusinessType();
    await GetCalculation();
    Calculate();
});

const reference = computed(() => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
});
const validate = computed(() => {
    let validate = route.params.OTPvalidate == "validated" ? true : false;

    return validate;
});
</script>
<style>
.paystack {
    background-color: #074a74;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
}
</style>

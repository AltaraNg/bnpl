<template>
    <App>
        <div class="overflow-hidden bg-white relative px-4 lg:px-8" v-if="!store.state.loader.showLoading">
            <div class="mx-auto max-w-xl">
                <div>
                    <div class="w-full absolute left-0 md:hidden">
                        <RouterLink :to="{ name: 'GetStarted' }"><ArrowLeftIcon class="h-8 w-10 text-primary" aria-hidden="true" /></RouterLink>
                    </div>
                    <div class="grid grid-cols-1 justify-items-center  pt-2 sm:mt-6 ">
                        <p class="mb-2 text-xl text-gray-600 font-medium mt-8">Order Details</p>
                        <p class="text-sm text-gray-500">TOTAL <span>(product value)</span></p>
                        <p class="text-4xl text-gray-800 font-semibold mt-1">{{ formatCurrency(OrderResult.total) }}</p>
                        <div class="flex flex-col my-5 rounded-3xl bg-white shadow-xl ring-1 ring-black/10 lg:p-6 p-4 w-full mt-6">
                            <div class="flex items-center justify-between">
                                <p class="text-base font-semibold leading-8 tracking-tight text-primary">Payment Details</p>
                                <img src="@/assets/images/orderCompleted.gif" v-if="route.params.OTPvalidate == 'validated'" />
                            </div>

                            <div class="mt-3">
                                <p class="text-lg font-semibold text-gray-600">{{ OrderResult.product_name }}</p>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
                                        <p class="text-gray-900 text-2xl font-bold">{{ formatCurrency(OrderResult.actualDownpayment) }}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500 text-sm font-medium mt-4">{{ OrderResult.repayment_cycle }} Repayment:</p>
                                        <p class="flex items-baseline text-2xl font-bold tracking-tight text-gray-900">
                                            {{ formatCurrency(ComputedRepayment) || '0' }}
                                            <span class="text-sm font-semibold leading-8 tracking-normal text-gray-500"></span>
                                        </p>
                                    </div>
                                </div>
                                 <div class="flex items-center justify-between">
                                      <div>
                                        <p class="text-gray-500 text-sm font-medium mt-4">Duration:</p>
                                        <p class="text-gray-900 text-2xl font-bold">{{ Order.repayment_duration.value / 30 }} Months</p>
                                    </div>
                                      <div>
                                        <p class="text-gray-500 text-sm font-medium mt-4">2% Commission:</p>
                                        <p class="text-gray-900 text-2xl font-bold">{{ formatCurrency(OrderResult.total * 0.02) }}</p>
                                    </div>
                                 </div>
                              
                            </div>
                        </div>
                        <p class="text-gray-500 text-sm font-normal mt-8" v-if="route.params.OTPvalidate == 'false'">
                            By clicking the 'Continue' button, you acknowledge that you understood, and agree to the terms of this loan agreement. You
                            agree to repay the loan in accordance with the repayment schedule and other terms outlined in this agreement. You
                            understand that failure to repay the loan as agreed may result in late fees, additional interest charges, and/or
                            collection activities.
                        </p>

                        <button
                            v-if="route.params.OTPvalidate == 'false'"
                            @click="RouteOTP"
                            type="button"
                            class=" mb-10 inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-4 text-base font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-0 min-w-[250px] justify-center mt-8 w-full"
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
                    :email="Customer.email"
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
import { ref, onBeforeMount, computed } from "vue";
import App from "@/layouts/App.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useRoute, useRouter } from "vue-router";
import Apis from "@/services/ApiCalls";
import { formatCurrency } from "@/utilities/GlobalFunctions";
import { calculate } from "@/utilities/calculator";
import { useStore } from "vuex";
import paystack from "vue3-paystack";
const store = useStore();
const PUBLIC_KEY = ref(process.env.VUE_APP_PAYSTACK_PK || "");
const route = useRoute();
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
    product_name:null,
    repayment_cycle:null,
    duration:null
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
        repayment_cycle_id: Order.value.repayment_cycle_id,
        repayment_duration_id: Order.value.repayment_duration_id,
        product_name: Order.value.product.name,
    }).then(() => {
        route.params.OTPvalidate = "order_created"
        router.push({
            name: "CustomerDetails",
            params: {
                phone_number: Customer.value.telephone,
            },
        });
    });
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
        const { total, actualDownpayment, rePayment } = calculate(Data.amount, Data, params, 0);
        OrderResult.value.total = total;
        OrderResult.value.actualDownpayment = actualDownpayment;
        OrderResult.value.rePayment = rePayment;
        OrderResult.value.product_name = Order.value.product.name
        OrderResult.value.repayment_cycle = Order.value.repayment_cycle.name
        OrderResult.value.duration = Order.value?.repayment_duration?.name
    } catch (e) {
      throw new Error(e)
    }
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
    business_type.value = result?.data?.data?.data.find((businesstype) => businesstype.slug == "ap_products");
}
async function Downpayment() {
    const result = await Apis.downpayments();
    payment_type_id.value = result?.data?.data?.data.find((downPayment) => downPayment.name == "twenty");
}
const ComputedRepayment = computed(() => {
    const months = Order.value?.repayment_duration?.value / 30;
    return Order.value?.repayment_cycle?.name == "monthly" ? OrderResult.value.rePayment / months : OrderResult.value.rePayment / (months * 2);
});
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

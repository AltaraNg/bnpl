<template>
    <App>
        <div class="overflow-hidden bg-white px-4 lg:px-8">
            <div class="relative mx-auto max-w-xl">
                <div>
                    <div class="mb-4 w-full">
                        <ArrowLeftIcon class="h-8 w-10 text-primary" aria-hidden="true" @click="goBack" />
                    </div>
                    <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-2 sm:mt-6">
                        <p class="mb-4 text-xl text-gray-600 font-medium">Order Details</p>
                        <p class="text-sm text-gray-500">TOTAL <span>(product value)</span></p>
                        <p class="text-5xl text-gray-800 font-semibold mt-1">{{ formatCurrency(OrderResult.total) }}</p>
                        <div class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10 p-8 w-full mt-8">
                            <p class="text-base font-semibold leading-8 tracking-tight text-indigo-600">Payment Details</p>
                            <div class="mt-6">
                                <p class="text-lg font-semibold text-gray-600">{{ Order.product.name }}</p>
                                <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
                                <p class="text-gray-800 text-4xl font-semibold">{{ formatCurrency(OrderResult.actualDownpayment) }}</p>
                            </div>
                            <p class="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-800">
                                ₦4000.00 <span class="text-sm font-semibold leading-8 tracking-normal text-gray-500">/monthly</span>
                            </p>
                            <p class="text-gray-500 text-xl font-medium mt-4">20% {{Order.repayment_duration.name}}</p>
                        </div>
                        <p class="text-gray-500 text-sm font-normal mt-8">
                            By clicking the 'Continue' button, you acknowledge that you understood, and agree to the terms of this loan agreement. You
                            agree to repay the loan in accordance with the repayment schedule and other terms outlined in this agreement. You
                            understand that failure to repay the loan as agreed may result in late fees, additional interest charges, and/or
                            collection activities.
                        </p>
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-4 text-base font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-0 min-w-[250px] justify-center mt-8 w-full"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </App>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import App from "@/layouts/App.vue";
import { useRoute,  } from "vue-router";
import Apis from "@/services/ApiCalls";
import { goBack, formatCurrency } from "@/utilities/GlobalFunctions";
import { calculate } from "@/utilities/calculator";

const route = useRoute();
const Customer = ref(undefined);
const Order = ref(undefined);
const get_calculations = ref([]);
const business_type = ref()
const payment_type_id = ref();
const OrderResult = ref({
     total: null,
    actualDownpayment: null,
    rePayment: null,
})

function Calculate() {
    try {
        const Data = {
            amount: Order.value.product.price,
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
        // console.log(OrderResult, Data.amount, Order.value.repayment_duration_id, Order.value.repayment_duration_id);
    } catch (e) {
       console.log(e)
    }
}
async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result;
    Order.value = Customer.value.latest_credit_checker_verifications;
    Calculate();
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
onBeforeMount(async () => {
    await Downpayment()
    await BusinessType()
    await GetCalculation()
    await CustomerDetails();
});
</script>

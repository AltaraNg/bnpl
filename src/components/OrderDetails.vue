<template>
    <div class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10 p-8 w-full mt-2">
        <div class="flex items=center justify-between">
            <p class="text-base font-semibold leading-8 tracking-tight text-indigo-600">Payment Details</p>
            <span class="inline-flex capitalize rounded-full px-4 flex items-center justify-center text-xs font-semibold leading-5" :class="ColorStatus">{{
                orderStatus
            }}</span>
        </div>
        
        <div>
            <div v-if="props.orderDetails.order_number" class="flex mt-4">
                <div class="w-2/3">
                    <p class="text-gray-500 text-sm font-medium">Order Number:</p>
                    <p class="text-lg font-semibold text-gray-600">{{ props.orderDetails.order_number }}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm font-medium">Date:</p>
                    <p class="font-semibold text-gray-600">{{ props.orderDetails.order_date }}</p>
                </div>
            </div>
            <p class="text-gray-500 text-sm font-medium mt-4">Product Price:</p>
            <p class="text-lg font-semibold text-gray-800">{{ formatCurrency(props.orderDetails.product_price) }}</p>
            <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
            <p class="text-lg font-semibold text-gray-800">{{ formatCurrency(props.orderDetails.down_payment) }}</p>
        </div>
        <p class="mt-4 flex text-lg font-semibold text-gray-800">
            {{ formatCurrency(props.orderDetails.amortizations[0].expected_amount) }}<span class="text-sm font-semibold leading-8 tracking-normal text-gray-500">/ {{ findRepayment(props.orderDetails.repayment_cycle_id, repayment_cycle ) }}</span>
        </p>
        <p class="text-gray-500 text-xl font-medium mt-4"> for {{ findRepayment(props.orderDetails.repayment_duration_id, repayment_duration )  }}</p>
    </div>
</template>

<script setup>
import {formatCurrency} from "@/utilities/GlobalFunctions"
const props = defineProps(["orderDetails","ColorStatus","orderStatus","findRepayment", "repayment_cycle", "repayment_duration"]);
</script>

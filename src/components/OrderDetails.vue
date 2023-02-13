<template>
    <div class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10 p-8 w-full mt-2">
        <p class="text-base font-semibold leading-8 tracking-tight text-indigo-600">Payment Details</p>
        <div>
            <div v-if="props.orderDetails.orderNumber" class="flex mt-4">
                <div class="w-2/3">
                    <p class="text-gray-500 text-sm font-medium">Order Number:</p>
                    <p class="text-lg font-semibold text-gray-600">{{ props.orderDetails.orderNumber }}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm font-medium">Date:</p>
                    <p class="text-lg font-semibold text-gray-600">{{ props.orderDetails.date }}</p>
                </div>
            </div>
            <p class="text-gray-500 text-sm font-medium mt-4">Product Name:</p>
            <p class="text-lg font-semibold text-gray-600">{{ props.orderDetails.productName}}</p>
            <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
            <p class="text-gray-800 text-2xl font-semibold">{{ props.orderDetails.downPayment}}</p>
        </div>
        <p class="mt-4 flex items-baseline text-2xl font-bold tracking-tight text-gray-800"> {{ props.orderDetails.repayment}}<span
                class="text-sm font-semibold leading-8 tracking-normal text-gray-500">/monthly</span> </p>
        <p class="text-gray-500 text-xl font-medium mt-4">{{ props.orderDetails.percentage}} - {{ props.orderDetails.duration}}</p>
    </div>
</template>

<script setup>
const props = defineProps(["orderDetails"]);
</script>
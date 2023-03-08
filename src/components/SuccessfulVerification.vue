<template>
    <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-2 sm:mt-6">
        <p class="mb-4 text-xl text-gray-600 font-medium">Order Details</p>
        <p class="text-sm text-gray-500">TOTAL <span>(product value)</span> </p>
        <p class="text-5xl text-gray-800 font-semibold mt-1">₦35,000.00</p>
        <div class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10 p-8 w-full mt-8">
            <p class="text-base font-semibold leading-8 tracking-tight text-indigo-600">Payment Details</p>
            <div class="mt-6">
                <p class="text-lg font-semibold text-gray-600">65" LG 25PL1500 4K Smart Television</p>
                <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
                <p class="text-gray-800 text-4xl font-semibold">₦12,500.00</p>
            </div>
            <p class="mt-4 flex items-baseline text-3xl font-bold tracking-tight text-gray-800">₦4000.00 <span class="text-sm font-semibold leading-8 tracking-normal text-gray-500">/monthly</span> </p>
            <p class="text-gray-500 text-xl font-medium mt-4">20% 3Months</p>
        </div>
        <p class="text-gray-500 text-sm font-normal mt-8">By clicking the 'Continue' button, you acknowledge that you understood, and agree to the terms of this loan agreement. You agree to repay the loan in
        accordance with the repayment schedule and other terms outlined in this agreement. You understand that failure to repay the loan as agreed may result in late
        fees, additional interest charges, and/or collection activities.</p>
        <button type="button"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-4 text-base font-medium leading-4 text-white shadow-sm  focus:outline-none focus:ring-0 min-w-[250px] justify-center mt-8 w-full">Continue</button>
    </div>
</template>

<script setup>
// const props = defineProps(["goBack"]);
</script>
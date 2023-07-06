<template>
    <App>
            <div class="grid grid-cols-1 justify-items-center bg-green-400p py-8">
        <img src="/img/failed.png" alt="verification" class="max-w-[250px]">
        <p class="text-3xl">Failed Verification</p>
        <p class="my-8 text-gray-600 text-center max-w-[90%]">We regret to inform you that your loan application has been denied due to failed verification. Our
            team has thoroughly reviewed the information you have
            provided and found discrepancies that prevent us from approving your loan request.</p>
            <p v-if="Customer?.latest_credit_checker_verifications?.reason" class="capitalize mb-10 px-6 text-gray-600 text-left max-w-[90%] font-normal">Reason: <span class="font-semibold">{{ Customer?.latest_credit_checker_verifications?.reason }} </span></p>
        <button type="button"
        @click="goBack"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm  focus:outline-none focus:ring-0 min-w-[250px] justify-center mt-8">Go
            Back</button>
    </div>
    </App>
</template>

<script setup>
import App from "@/layouts/App.vue"
import Apis from "@/services/ApiCalls";
import { useRouter, useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
const router = useRouter();
const route = useRoute();
const Customer = ref({});
function goBack(){
    router.push({name:'GetStarted'})
}
async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result;
}
onBeforeMount(async () => {
    CustomerDetails();
});
</script>
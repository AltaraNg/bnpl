<template>
    <App>
        <div class="overflow-hidden bg-white px-4 lg:px-8">
            <div class="relative mx-auto max-w-xl">
                <svg
                    class="absolute left-full translate-x-1/2 transform"
                    width="404"
                    height="404"
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg
                    class="absolute right-full bottom-0 -translate-x-1/2 transform"
                    width="404"
                    height="404"
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <div>
                    <AwaitingVerification  :goBack="goBack" />
                </div>
            </div>
        </div>
        <Loader v-if="open" />
    </App>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import App from "@/layouts/App.vue";
import AwaitingVerification from "@/components/AwaitingVerification.vue";
import { useRoute, useRouter } from "vue-router";
import Apis from "@/services/ApiCalls";
const open = ref(false);
const route = useRoute();
const router = useRouter();
const verification_id = route.params.verification_id;
const phone_number = route.params.phone_number;
const res = ref();
function CallCreditCheck(){
    Apis.verifycreditcheck(verification_id).then((verification_status) => {
            const status = verification_status.data.result.status;
            if (status == "passed") {
                router.push({ name: "SuccessfulVerification", params: { verification_id: verification_id, phone_number: phone_number, OTPvalidate:false } });
                clearInterval(res.value);
            }
              if (status == "failed") {
                router.push({ name: "FailedVerification", params: { verification_id: verification_id, phone_number: phone_number } });
                clearInterval(res.value);
            }
        });
}
function VerifyCreditCheck() {
    res.value = setInterval(() => {
        CallCreditCheck()
    }, 5 * 60 * 1000);
}
function goBack(){
    router.push({name:'GetStarted'})
}

onMounted(() => {
    CallCreditCheck();
    VerifyCreditCheck();
});
onUnmounted(() => clearInterval(res.value));
</script>

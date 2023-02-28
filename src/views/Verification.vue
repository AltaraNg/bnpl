<template>
    <App>
        <div class="overflow-hidden bg-white px-4 lg:px-8">
            <div class="relative mx-auto max-w-xl">
                <svg class="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg class="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404"
                    aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <div>
                    <div class="mb-4 w-full block md:hidden">
                        <ArrowLeftIcon class="h-10 w-10 text-primary" aria-hidden="true" @click="goBack" />
                    </div>
                    <AwaitingVerification v-if="verification_status == 'pending'" :goBack="goBack" />
                    <FailedVerification v-else-if="verification_status == 'failed'"  :goBack="goBack"/>
                    <SuccessfulVerification v-else />
                </div>
            </div>
        </div>
        <Loader v-if="open" />
    </App>
</template>

<script setup>
import { ref } from "vue";
import App from "@/layouts/App.vue";
import Loader from "@/components/Loader.vue";
import AwaitingVerification from "@/components/AwaitingVerification.vue";
import FailedVerification from "@/components/FailedVerification.vue";
import SuccessfulVerification from "@/components/SuccessfulVerification.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useRoute } from 'vue-router'
import {goBack} from "@/utilities/GlobalFunctions"
const open = ref(false);
const route = useRoute()
 const verification_status = route.params.verification_status


</script>
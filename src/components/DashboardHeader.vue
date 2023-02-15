<template>
    <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div class="min-w-0 flex-1 lg:flex lg:items-center lg:w-full lg:justify-between">
                    <!-- Profile -->
                    <div class="flex items-center mb-5 lg:mb-0">
                        <img
                            class="hidden h-16 w-16 rounded-full sm:block"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                        />
                        <div>
                            <div class="flex items-center">
                                <img
                                    class="h-16 w-16 rounded-full sm:hidden"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                    alt=""
                                />
                                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                    Good morning, {{ full_name2 }}
                                </h1>
                            </div>
                            <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                <dt class="sr-only">Company</dt>
                                <dd class="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                                    <BuildingOfficeIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    Duke street studio
                                </dd>
                                <dt class="sr-only">Account status</dt>
                                <dd class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                    <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                                    Verified account
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <RouterLink :to="{name:'GetStarted'}" >
                        <defaultButton name=" New Sale">
                            <template v-slot:icon>
                                <plus />
                            </template>
                        </defaultButton>
                    </RouterLink>
                </div>
                <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4"></div>
            </div>
        </div>
        <BaseModal @close="showModal = false" v-if="showModal">
            <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Coming Soon</DialogTitle>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">New sale page is in progress</p>
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-6">
                <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0 sm:text-sm"
                    @click="showModal = false"
                >
                    Go back to dashboard
                </button>
            </div>
        </BaseModal>
    </div>
</template>
<script>
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/vue/20/solid";
import { userdata } from "../utilities/GlobalFunctions";
import { CheckIcon } from "@heroicons/vue/24/outline";
import BaseModal from "@/components/BaseModal.vue";
import defaultButton from "../components/button.vue";
import plus from "@/assets/svgs/plus.vue";
export default {
    components: {
        BuildingOfficeIcon,
        CheckCircleIcon,
        defaultButton,
        plus,
        BaseModal,CheckIcon
    },
    data() {
        return {
            full_name: userdata?.full_name,
            full_name2: this.$store?.state?.userdata?.result?.user?.full_name,
            showModal: false,
        };
    },
};
</script>

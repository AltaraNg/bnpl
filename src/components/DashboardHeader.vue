<template>
    <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div class="min-w-0 flex-1 lg:flex lg:items-center lg:w-full lg:justify-between">
                    <!-- Profile -->
                    <div class="flex items-center mb-5 lg:mb-0">
                        <div class="h-16 hidden lg:flex w-16 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                            <p class="font-bold text-2xl">{{ fullname[0]?.charAt(0) + "" + fullname[1]?.charAt(0) }}</p>
                        </div>
                        <div>
                            <div class="flex items-center">
                                 <div class="h-16 lg:hidden flex w-16 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                            <p class="font-bold text-2xl">{{ fullname[0].charAt(0) + "" + fullname[1].charAt(0) }}</p>
                        </div>
                                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                    Hello, {{ user?.full_name }}
                                </h1>
                            </div>
                            <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                <dt class="sr-only">Company</dt>
                                <dd class="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                                    <BuildingOfficeIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    {{ user?.address }}
                                </dd>
                                <dt class="sr-only">Account status</dt>
                                <dd class="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                    <CheckCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                                    Verified account
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <RouterLink :to="{ name: 'GetStarted' }">
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
    </div>
</template>
<script setup>
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/vue/20/solid";
import { userdata } from "../utilities/GlobalFunctions";
import { computed, ref } from "vue";
import defaultButton from "../components/button.vue";
import plus from "@/assets/svgs/plus.vue";
import { useStore } from "vuex";

const store = useStore()
const user = ref(userdata || store.state.userdata.result?.user )
const fullname = computed(() => {
    return user?.value.full_name.split(" ");
});
</script>

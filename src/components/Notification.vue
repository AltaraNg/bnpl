<template>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
            <transition enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="notification.showNotification"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5" :class="[color.background]">
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <CheckCircleIcon v-if="notification.data.type == 'success'" class="h-6 w-6" :class="[color.icon]" aria-hidden="true" />
                                <XCircleIcon v-else-if="notification.data.type == 'error'" class="h-6 w-6" :class="[color.icon]" aria-hidden="true" />
                                <InformationCircleIcon v-else class="h-6 w-6" :class="[color.icon]" aria-hidden="true" />
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-base font-medium" :class="[color.title]">{{ color.titleMessage }}</p>
                                <p class="mt-1 text-sm" :class="[color.message]">{{ notification.data.message }}</p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button type="button" @click="handleClose()"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { XMarkIcon, XCircleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid';
import { useStore } from 'vuex';

const store = useStore();

const notification = store.state.notification

const handleClose = () => {
    store.commit('notification/close');
}

const color = computed(() => {
    if (notification.data.type === "success") {
        return { background: "bg-green-50", icon: "text-green-400", title: "text-green-800", message: "text-green-700", titleMessage: "Successfully!" }
    } else if (notification.data.type === "error") {
        return { background: "bg-red-50", icon: "text-red-400", title: "text-red-800", message: "text-red-700", titleMessage: "An Error Occurred!" }
    }
    return { background: "bg-blue-50", icon: "text-blue-400", title: "text-blue-800", message: "text-blue-700", titleMessage: "Info!" }
})
</script>
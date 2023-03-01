<template>
    <TransitionRoot as="template" :show="loader.showLoading">
        <Dialog as="div" class="relative z-10"  >
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
                leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden transition-all sm:max-w-sm">
                            <div class="flex gap-5 [&>*]:font-bold [&>*]:text-xl bg-green-300p p-8 [&>*]:text-white">
                                <span class="animate-[wiggle_2s_ease-in-out_infinite]">L</span>
                                <span class="animate-[wiggle_2s_ease-in-out_0.15s_infinite]">O</span>
                                <span class="animate-[wiggle_2s_ease-in-out_0.35s_infinite]">A</span>
                                <span class="animate-[wiggle_2s_ease-in-out_0.5s_infinite]">D</span>
                                <span class="animate-[wiggle_2s_ease-in-out_0.65s_infinite]">I</span>
                                <span class="animate-[wiggle_2s_ease-in-out_0.85s_infinite]">N</span>
                                <span class="animate-[wiggle_2s_ease-in-out_1s_infinite]">G</span>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useStore } from 'vuex';

const store = useStore();

const loader = store.state.loader
</script>

<style>
@keyframes wiggle {
    from {
        transform: scale(1);
    }

    25% {
        color: cornflowerblue;
    }

    50% {
        transform: scale(2);
        color: gold;
    }

    75% {
        color: magenta;
    }

    to {
        transform: scale(1);
        color: lightblue;
    }
}
</style>

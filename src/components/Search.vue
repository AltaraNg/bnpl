<template>
    <div class="top-0 md:w-full max-w-[500px] relative">
        <div class="w-full flex flex-col items-center justify-center mt-10 text-white">
            <h2 class="font-semibold text-xl">Get Started</h2>
            <div class="text-base">Enter the customer's number to get started.</div>
        </div>
        <div class="md:w-full px-2 relative top-12">
            <div class="max-w-5xl bg-white rounded-xl shadow-lblue">
                <div class="flex w-full items-center">
                    <div class="w-full flex-1 border-r border-gray-200 py-2 md:py-4">
                        <label class="text-gray-400 font-semibold text-xs px-4">SEARCHING FOR</label>
                        <input type="text" name="phone" id="phone" class="block w-full rounded-md border-0 focus:ring-0 sm:text-sm px-4"
                            placeholder="08010000000" aria-describedby="email-description" />
                    </div>
                    <div class="flex justify-center items-center py-2 md:py-4 px-4">
                        <button type="button"
                            class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0">
                            <EnvelopeIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon } from '@heroicons/vue/20/solid'
</script>

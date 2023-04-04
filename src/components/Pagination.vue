<template>
    <nav
        v-if="props.response?.total > props.response?.per_page"
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
        aria-label="Pagination"
    >
        <div
            class="flex w-full"
            :class="
                props.response?.current_page == 1 || props.response?.current_page == props.response?.last_page ? 'justify-end' : 'justify-between'
            "
        >
            <a
                v-if="props.response?.current_page !== 1"
                @click="props.FetchList(--current_page)"
                class="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >Previous</a
            >
            <a
                v-if="props.response?.current_page !== props.response?.last_page"
                @click="props.FetchList(++current_page)"
                class="relative ml-3 inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >Next</a
            >
        </div>
    </nav>
</template>
<script setup>
import { ref } from "vue";
const current_page = ref(1);
const props = defineProps(["response", "FetchList", "current_page"]);
</script>

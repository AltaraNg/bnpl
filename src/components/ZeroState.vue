<template>
    <div class="flex text-center items-center  flex-col justify-center px-5">
        <zerostate />
        <div>
            <p class="text-gray-800 lg:text-2xl mb-0.5" >
               {{ props.response }}
            </p>
      
        </div>

        <p class="text-gray-500 text-xs lg:text-normal mb-6">{{ props.suggestion }}</p>
    </div>
</template>
<script setup>
import zerostate from '@/assets/svgs/zerostate.vue';

const props = defineProps(["response","suggestion"]);
</script>

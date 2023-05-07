<template>
    <label :for="labelFor" class="block text-sm font-medium text-gray-700">{{ labelTitle }}</label>
  </template>
    
  <script setup>
  defineProps({
    labelTitle: String,
    labelFor: String,
  });
  </script>
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg w-96 relative">
        <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-600 text-2xl">&times;</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineEmits(["close"]);
  </script>
  
  <style scoped>
  /* Tambahan untuk efek animasi */
  </style>
  
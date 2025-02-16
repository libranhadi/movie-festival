<template>
    <div class="flex justify-center mt-6 space-x-2">
      <button 
        @click="goToPage(1)" 
        :disabled="page === 1"
        class="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        First
      </button>
  
      <button 
        @click="prevPage"
        :disabled="page === 1"
        class="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        Prev
      </button>
  
      <span v-if="startPage > 1" class="px-3 py-2">...</span>
  
      <button 
        v-for="n in visiblePages" 
        :key="n"
        @click="goToPage(n)"
        class="px-3 py-2 rounded border"
        :class="n === page ? 'bg-slate-500 text-white' : 'bg-white'"
      >
        {{ n }}
      </button>
  
      <span v-if="endPage < totalPages" class="px-3 py-2">...</span>
  
      <button 
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        Next
      </button>
  
      <button 
        @click="goToPage(totalPages)" 
        :disabled="page === totalPages"
        class="px-3 py-2 rounded border bg-white disabled:opacity-50"
      >
        Last
      </button>
    </div>
  </template>
  
<script setup>
  import { computed } from "vue";
  
  const props = defineProps({
    page: Number,
    totalPages: Number,
    maxVisiblePages: {
      type: Number,
      default: 5, 
    },
  });
  
  const emit = defineEmits(["update:page"]);
  
  const goToPage = (n) => {
    if (n >= 1 && n <= props.totalPages) {
      emit("update:page", n);
    }
  };
  
  const prevPage = () => goToPage(props.page - 1);
  const nextPage = () => goToPage(props.page + 1);
  
  const visiblePages = computed(() => {
    const half = Math.floor(props.maxVisiblePages / 2);
    let start = Math.max(1, props.page - half);
    let end = Math.min(props.totalPages, props.page + half);
  
    if (start === 1) {
      end = Math.min(props.totalPages, props.maxVisiblePages);
    } else if (end === props.totalPages) {
      start = Math.max(1, props.totalPages - props.maxVisiblePages + 1);
    }
  
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  
  const startPage = computed(() => visiblePages.value[0]);
  const endPage = computed(() => visiblePages.value[visiblePages.value.length - 1]);
</script>
  
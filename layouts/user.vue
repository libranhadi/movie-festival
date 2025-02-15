<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-[#090909]  text-white p-4 text-center">
      <h1 class="text-xl font-bold">Movie Festival</h1>
    </header>
    <main class="p-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-4 fixed bottom-0 right-0 left-0">
      ©2025 Movie Festival
    </footer>
  </div>
</template>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside
      :class="['bg-[#090909] text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out', 
      { '-translate-x-full': !sidebarOpen }]"
    >
      <div class="flex justify-between items-center px-4">
        <h1 class="text-lg font-bold">Movie Festival</h1>
        <button class="lg:hidden text-white" @click="toggleSidebar">
          ✖️
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <NuxtLink to="/admin" class="block py-2 px-4 hover:bg-gray-800 hover:text-[#D1F8EF] rounded">Dashboard</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/movies" class="block py-2 px-4 hover:bg-gray-800 hover:text-[#D1F8EF] rounded">Movies</NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <header class="bg-white shadow-md p-4 flex justify-between items-center">
        <button class="lg:hidden text-gray-700" @click="toggleSidebar">
          ☰
        </button>
        <h1 class="text-xl font-semibold">Admin Dashboard</h1>
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>

      <!-- Page Content -->
      <main class="p-6 overflow-auto flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { nextTick } from "vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};


const logout = async () => {
    localStorage.removeItem('authToken')
    await nextTick();
    router.push("/login");
  };
</script>

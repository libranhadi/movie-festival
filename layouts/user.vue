<template>
  <div class="min-h-screen bg-gray-100">
    <main>
      <nav class="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 class="text-xl font-bold">Movies App</h1>
        <div>
          <NuxtLink v-if="authStore.user && authStore.user.authlevel === 'Admin'" 
                    to="/admin" 
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Dashboard
          </NuxtLink>
          <NuxtLink v-if="!isHomePage" 
                    to="/home" 
                    class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Home
          </NuxtLink>
          <button v-if="!authStore.user" @click="showLoginModal = true" class="px-4 py-2 bg-blue-500 rounded">Login</button>
          <button v-if="!authStore.user" @click="showRegisterModal = true" class="ml-2 px-4 py-2 bg-green-500 rounded">Register</button>
          <button v-if="authStore.user" @click="logout" class="ml-2 px-4 py-2 bg-red-500 rounded">Logout</button>
        </div>
      </nav>
      <slot />
      <Modal v-if="showLoginModal" @close="showLoginModal = false">
        <LoginForm @success="handleAuthSuccess" />
      </Modal>

      <Modal v-if="showRegisterModal" @close="showRegisterModal = false">
        <RegisterForm @success="handleRegistration" />
      </Modal>
      <div v-if="successMessage" class="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg">
        {{ successMessage }}
      </div>
    </main>
  </div>
</template>
<script setup>
  import { useAuthStore } from "~/store/auth"
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import Modal from "@/components/Modal.vue";
  import LoginForm from "@/components/LoginForm.vue";
  import RegisterForm from "@/components/RegisterForm.vue";

  const route = useRoute();
  const authStore = useAuthStore();
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);
  const successMessage = ref("");
  const isHomePage = computed(() => route.path === "/home");
  const checkUser = async () => {
    await authStore.fetchUser();
  };

  const handleRegistration = () => {
    checkUser();
    showLoginModal.value = false;
    showRegisterModal.value = false;
    successMessage.value = "User registered successfully."; 

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  };
  const handleAuthSuccess = () => {
    checkUser();
    showLoginModal.value = false;
    successMessage.value = "User login successfully."; 

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  };

  onMounted(() => {
    checkUser();
  });

  const logout = async () => {
    authStore.setUser(null)
    authStore.logout();
  };


</script>

  <template>
    <div>
      <nav class="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 class="text-xl font-bold">Movies App</h1>
        <div>
          <button v-if="!authStore.user" @click="showLoginModal = true" class="px-4 py-2 bg-blue-500 rounded">Login</button>
          <button v-if="!authStore.user" @click="showRegisterModal = true" class="ml-2 px-4 py-2 bg-green-500 rounded">Register</button>
          <button v-if="authStore.user" @click="logout" class="ml-2 px-4 py-2 bg-red-500 rounded">Logout</button>
        </div>
      </nav>

      <div class="mx-auto p-4 w-full">
        <input
          v-model="searchQuery"
          @input="fetchMovies"
          type="text"
          placeholder="Search by title, artist, genre"
          class="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        
        <div class="flex flex-wrap gap-4">
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="border border-gray-200 rounded-lg p-4 shadow-md bg-white w-full sm:w-1/2 lg:w-1/4"
          >
            <h2 class="text-xl font-semibold">{{ movie.title }}</h2>
            <p class="text-gray-600">{{ movie.description }}</p>
            <hr class="my-2">
            <p class="text-sm"><strong class="text-lg">Artists :</strong> {{ movie.artist }}</p>
            <p class="text-sm"><strong class="text-lg">Genres:</strong> {{ movie.genre }}</p>
            <p class="text-sm"><strong class="text-lg">Duration:</strong> {{ movie.duration }} minutes</p>
            <a :href="movie.url" class="text-blue-500 mt-2 block"  v-if="authStore.user">Watch Now</a>
          </div>
        </div>

        <Pagination 
          :page="currentPage" 
          :totalPages="totalPages" 
          :maxVisiblePages="10"
          @update:page="currentPage = $event"
        />
      </div>

    <Modal v-if="showLoginModal" @close="showLoginModal = false">
      <LoginForm @success="handleAuthSuccess" />
    </Modal>

    <Modal v-if="showRegisterModal" @close="showRegisterModal = false">
      <RegisterForm @success="handleRegistration" />
    </Modal>
    <div v-if="successMessage" class="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg">
      {{ successMessage }}
    </div>

    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useDebounceFn } from "@vueuse/core"; 
  import { useAuthStore } from "~/store/auth"
  import Modal from "@/components/Modal.vue";
  import LoginForm from "@/components/LoginForm.vue";
  import RegisterForm from "@/components/RegisterForm.vue";


  const user = useState("user", () => null);
  const searchQuery = ref("");
  const movies = ref([]);
  const currentPage = ref(1);
  const totalMovies = ref(0);
  const itemsPerPage = 10;
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);
  const successMessage = ref("");
  const authStore = useAuthStore();

  const fetchMovies = async () => {
    const response = await $fetch(`/api/list-movies`, {
      query: { page: currentPage.value, itemsPerPage, searchQuery: searchQuery.value },
    });

    movies.value = response.movies;
    totalMovies.value = response.totalMovies;
  };

  const totalPages = computed(() => Math.ceil(totalMovies.value / itemsPerPage));

  const debouncedFetchMovies = useDebounceFn(fetchMovies, 300);

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

  const logout = async () => {
    authStore.setUser(null)
    authStore.logout();
  };

  onMounted(() => {
    checkUser();
    fetchMovies();
  });

  watch(currentPage, fetchMovies, searchQuery, debouncedFetchMovies, checkUser);
  </script>

  <style scoped>
  div[class*="border"] {
    transition: transform 0.2s ease-in-out;
  }
  div[class*="border"]:hover {
    transform: scale(1.05);
  }
  </style>




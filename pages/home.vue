  <template>
    <div class="mx-auto p-4 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Movies</h1>
      
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
          <a :href="movie.url" class="text-blue-500 mt-2 block">Watch Now</a>
        </div>
      </div>

      <Pagination 
        :page="currentPage" 
        :totalPages="totalPages" 
        :maxVisiblePages="10"
        @update:page="currentPage = $event"
      />
    </div>
  </template>

  <script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useDebounceFn } from "@vueuse/core"; 

  const searchQuery = ref("");
  const movies = ref([]);
  const currentPage = ref(1);
  const totalMovies = ref(0);
  const itemsPerPage = 10;

  const fetchMovies = async () => {
    const response = await $fetch(`/api/list-movies`, {
      query: { page: currentPage.value, itemsPerPage, searchQuery: searchQuery.value },
    });

    movies.value = response.movies;
    totalMovies.value = response.totalMovies;
  };

  const totalPages = computed(() => Math.ceil(totalMovies.value / itemsPerPage));

  const debouncedFetchMovies = useDebounceFn(fetchMovies, 300);

  onMounted(fetchMovies);
  watch(currentPage, fetchMovies, searchQuery, debouncedFetchMovies);

  </script>

  <style scoped>
  div[class*="border"] {
    transition: transform 0.2s ease-in-out;
  }
  div[class*="border"]:hover {
    transform: scale(1.05);
  }
  </style>




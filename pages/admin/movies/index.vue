<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Movies</h2>
    <NuxtLink to="/admin/movies/create" class="bg-blue-500 text-white px-4 py-2 rounded mb-5">Create Movie</NuxtLink>
    
    <table class="table-auto w-full mt-5 border-collapse border border-gray-300">
      <thead>
        <tr class="bg-[#090909]">
          <th class="p-2 text-left text-gray-100">Title</th>
          <th class="p-2 text-left text-gray-100">Description</th>
          <th class="p-2 text-left text-gray-100">Duration</th>
          <th class="p-2 text-left text-gray-100">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td class="p-2 text-left border border-gray-100">{{ movie.title }}</td>
          <td class="p-2 text-left border border-gray-100">{{ movie.description }}</td>
          <td class="p-2 text-left border border-gray-100">{{ movie.duration }}</td>
          <td class="p-2 text-left border border-gray-100">
            <NuxtLink :to="`/admin/movies/${movie.id}`" class="text-blue-500">Edit</NuxtLink> |
            <button @click="deleteMovie(movie.id)" class="text-red-500">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

const movies = ref([]);

onMounted(async () => {
  const response = await fetch("/api/movies");
  movies.value = await response.json();
});

const deleteMovie = async (id) => {
  if (!confirm("Are you sure you want to delete this movie?")) return;

  try {
    const { data, error } = await useFetch(`/api/movies?id=${id}`, {
        method : "DELETE",
    });

    if (error.value) {
      console.error("Delete failed:", error.value);
      return;
    }

    movies.value = movies.value.filter((movie) => movie.id !== id);
  } catch (err) {
    console.error("Error deleting movie:", err);
  }
};
</script>

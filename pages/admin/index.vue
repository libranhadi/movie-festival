<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Dashboard</h2>

    <!-- Tab Navigation -->
    <div class="mb-4">
      <ul class="flex space-x-4">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['cursor-pointer', activeTab === tab ? 'font-bold text-indigo-600 border-b border-gray-500' : '']"
          @click="activeTab = tab"
        >
          {{ tab }}
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="grid grid-cols-1 gap-4">
      <div v-if="activeTab === 'Most Voted Movie'" class="bg-white shadow p-4 rounded">
        <h3 class="text-lg font-semibold">Most Voted Movie</h3>
        <table class="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Movie Title</th>
              <th class="px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movie, index) in mostVotedMovies" :key="index">
              <td class="border px-4 py-2">{{ movie.title }}</td>
              <td class="border px-4 py-2">{{ movie.votes }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'Most Viewed Genre'" class="bg-white shadow p-4 rounded">
        <h3 class="text-lg font-semibold">Most Viewed Genre</h3>
        <table class="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Genre</th>
              <th class="px-4 py-2">Views</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(genre, index) in mostViewedGenres" :key="index">
              <td class="border px-4 py-2">{{ genre.name }}</td>
              <td class="border px-4 py-2">{{ genre.views }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'List Voted User'" class="bg-white shadow p-4 rounded">
        <h3 class="text-lg font-semibold">List Voted User</h3>
        <table class="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th class="px-4 py-2">User Name</th>
              <th class="px-4 py-2">Movie</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in votedUsers" :key="index">
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.movie }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin',
});

const activeTab = ref('Most Voted Movie');
const tabs = ['Most Voted Movie', 'Most Viewed Genre', 'List Voted User'];

const mostVotedMovies = ref([
  { title: 'Movie 1', votes: 150 },
  { title: 'Movie 2', votes: 120 },
  { title: 'Movie 3', votes: 200 },
]);

const mostViewedGenres = ref([
  { name: 'Action', views: 500 },
  { name: 'Drama', views: 300 },
  { name: 'Comedy', views: 400 },
]);

const votedUsers = ref([
  { name: 'User A', movie: 20 },
  { name: 'User B', movie: 15 },
  { name: 'User C', movie: 25 },
]);

onMounted(async () => {
  const response = await fetch('api/dashboard');
  const data = await response.json();

});
</script>

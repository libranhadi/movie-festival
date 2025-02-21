<template>
    <div>
        <p v-if="apiError" class="flex justify-center text-red-500 text-sm mt-3">{{ apiError }}</p>
        <div v-if="isLoading" class="flex justify-center mt-4">Loading...</div>
        <div class="flex justify-center mt-4" v-else>
            <video ref="videoPlayer" controls 
              @play="onPlay" 
              @pause="onPause" 
              :key="movieUrl" 
              @timeupdate="onTimeUpdate"
              @ended="onEnded"
              >
                <source :src="`${movieUrl}`" type="video/mp4" />
            </video>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";

  definePageMeta({
    layout: 'user',
    middleware: 'auth',
  });

  const route = useRoute();
  const movieId = route.params.id
  const apiError = ref("");
  const movieUrl = ref("")
  const isLoading = ref(true);
  const watchedTime = ref(0);
  const videoPlayer = ref(null);
  let saveInterval = null;

  const fetchMovie = async () => {
    if (!movieId) return;
    try {
        apiError.value = "";
        const data = await $fetch(`/api/movies?id=${movieId}`);
        if (!data || !data.length) throw new Error("Movie not found");
        movieUrl.value = data[0].url;     
    } catch (err) {
        apiError.value = "Sorry, Something went wrong, please try again later";
    } finally {
        isLoading.value = false;
    }
  };
  const saveProgress = async () => {
    if (!movieId) return;
    try {
        // apiError.value = "";
        // const data = await $fetch(`/api/movies?id=${movieId}`);
        // if (!data || !data.length) throw new Error("Movie not found");
        // movieUrl.value = data[0].url;     
    } catch (err) {
        // apiError.value = "Sorry, Something went wrong, please try again later";
    } finally {
      console.log(saveInterval, videoPlayer.value, watchedTime.value)
        // isLoading.value = false;
    }
  };
  const onTimeUpdate = () => {
    console.log(saveInterval, videoPlayer.value, watchedTime.value)
    if (videoPlayer.value) {
      watchedTime.value = Math.floor(videoPlayer.value.currentTime);
    }
  };
  const onPlay = () => {
    saveInterval = setInterval(saveProgress, 10000);
  };
  const onEnded = async () => {
    clearInterval(saveInterval);
    await saveProgress();
  };
  onMounted(fetchMovie);

</script>
  

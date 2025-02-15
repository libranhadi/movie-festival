<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Create Movie</h2>
  
      <form @submit.prevent="onSubmit" class="bg-white p-6 rounded-lg shadow-md w-full">
        <div v-for="(field, key) in fields" :key="key" class="mb-4">
          <label :for="key" class="block text-sm font-semibold text-gray-700">
            {{ field.label }}
          </label>
          <Field
            v-slot="{ field, errorMessage }"
            :name="key"
            :rules="fieldRules[key]"
            :model-value="formData[key]"
            @update:model-value="handleInput(key, $event)"
          >
            <input v-bind="field" :type="field.type" class="input-field" />
            <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
          </Field>
        </div>
  
        <button type="submit" class="btn-primary w-full" :disabled="isSubmitting.value">Submit</button>
        <p v-if="apiError" class="text-red-500 text-sm mt-3">{{ apiError }}</p>
      </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, Field } from "vee-validate";
import * as yup from "yup";
import { useFetch } from "#app";

definePageMeta({
  layout: "admin",
});

const router = useRouter();

const fields = {
  title: { label: "Title", type: "text" },
  description: { label: "Description", type: "text" },
  duration: { label: "Duration (hh:mm:ss)", type: "time" }, 
  artists: { label: "Artists (comma separated)", type: "text" },
  genres: { label: "Genres (comma separated)", type: "text" },
  watchUrl: { label: "Watch URL", type: "url" },
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  duration: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Duration must be in hh:mm:ss format") 
    .required("Duration is required"),
  artists: yup.string().required("Artists are required"),
  genres: yup.string().required("Genres are required"),
  watchUrl: yup.string().url("Must be a valid URL").required("Watch URL is required"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

const formData = ref({
  title: "",
  description: "",
  duration: "",
  artists: "",
  genres: "",
  watchUrl: "",
});

const apiError = ref("");

const handleInput = (key, value) => {
  if (key === "duration") {
    const formattedValue = value.length === 5 ? `${value}:00` : value; 
    formData.value[key] = formattedValue;
  } else {
    formData.value[key] = value;
  }
};

const submitMovie = async () => {
  try {
    apiError.value = "";
    const { data, error } = await useFetch("/api/movies", {
      method: "POST",
      body: {
        title: formData.value.title,
        description: formData.value.description,
        duration: formData.value.duration, 
        artists: formData.value.artists,
        genres: formData.value.genres,
        watch_url: formData.value.watchUrl,
      },
    });

    if (error.value) throw new Error(error.value.data.message);

    router.push("/admin/movies");
  } catch (error) {
    apiError.value = error.message;
  }
};

const fieldRules = {
  title: "required",
  description: "required",
  duration: "required",
  artists: "required",
  genres: "required",
  watchUrl: "required|url",
};

const onSubmit = handleSubmit(submitMovie);
</script>
  <style scoped>
  .input-field {
    @apply mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200;
  }
  </style>
  
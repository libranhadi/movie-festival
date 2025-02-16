<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Register</h2>
      <Form @submit="register" :validation-schema="schema">
        <div class="mb-3">
          <label class="block text-sm font-medium">email</label>
          <Field name="email" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="text"
              class="w-full border p-2 rounded"
              :class="{ 'border-red-500': errors.length }"
            />
            <p v-if="errors.length" class="text-red-500 text-sm">{{ errors[0] }}</p>
          </Field>
        </div>
  
        <div class="mb-3">
          <label class="block text-sm font-medium">Password</label>
          <Field name="password" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="password"
              class="w-full border p-2 rounded"
              :class="{ 'border-red-500': errors.length }"
            />
            <p v-if="errors.length" class="text-red-500 text-sm">{{ errors[0] }}</p>
          </Field>
        </div>
  
        <div class="mb-3">
          <label class="block text-sm font-medium">Confirm Password</label>
          <Field name="confirmPassword" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="password"
              class="w-full border p-2 rounded"
              :class="{ 'border-red-500': errors.length }"
            />
            <p v-if="errors.length" class="text-red-500 text-sm">{{ errors[0] }}</p>
          </Field>
        </div>
  
        <button
          type="submit"
          class="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Register
        </button>
      </Form>
  
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <div v-if="successMessage" class="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg">
        {{ successMessage }}
        </div>
    </div>
  </template>
  
  <script setup>
    import { ref, defineProps, defineEmits } from "vue";
    import { Form, Field } from "vee-validate";
    import * as yup from "yup";

  const props = defineProps({
    showModal: Boolean,
    });

  const emit = defineEmits(["success", "close"]);
  
  const errorMessage = ref("");
  const successMessage = ref("");
  
  const schema = yup.object({
    email: yup.string().required("email is required"),
    password: yup.string().required("Password is required").min(6, "Minimal 6 character"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password confirmation doesnt match")
      .required("Password confirmation is required"),
  });
  
  const register = async (values) => {
  try {
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: values,
    });
    if (!response.success) {
      errorMessage.value = response.message;
    } else {
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      errorMessage.value = "";
      successMessage.value = "User registered successfully.";
      emit("success");
      emit("close"); 

      setTimeout(() => {
        successMessage.value = ""; 
      }, 3000);
    }
  } catch (error) {
    emit("success");
    emit("close"); 
    errorMessage.value = "Something went wrong. Please try again.";
  }

  };
  </script>
  
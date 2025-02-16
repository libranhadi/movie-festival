import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "#app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const token = useCookie("authToken");

  if (!token.value) {
    return navigateTo("/home");
  }

  if (!authStore.user) {
    await authStore.fetchUser();
  }

  if (!authStore.user) {
    return navigateTo("/home");
  }

  if (authStore.user.authlevel !== "Admin") {
    if (to.path !== "/home") {
      return navigateTo("/home");
    }
  } else {
    if (to.path !== "/admin") {
      return navigateTo("/admin");
    }
  }

});

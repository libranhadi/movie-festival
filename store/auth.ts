import { defineStore } from "pinia";
import { useCookie, useFetch, navigateTo } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as Record<string, any> | null,
  }),
  actions: {
    setToken(newToken: string | null) {
      const tokenCookie = useCookie<string | null>("authToken");
      tokenCookie.value = newToken;
      this.token = newToken;
    },
    setUser(userData: Record<string, any> | null) {
      this.user = userData;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      return navigateTo("/home");
    },
    async fetchUser() {
      const tokenCookie = useCookie<string | null>("authToken");
      if (!tokenCookie.value) return;

      this.token = tokenCookie.value;

      try {
        const data = await $fetch("/api/auth/check", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.setUser(typeof data.user === "object" ? data.user : null);
      } catch (error) {
        this.setUser(null);
        this.setToken(null);
      }
    },
  },
});
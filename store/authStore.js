import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    isLoading: true,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la autenticación");
        }

        const data = await response.json();

        this.user = data.user;
        this.isAuthenticated = true;
        this.token = data.token;

        localStorage.setItem("auth_token", this.token);
      } catch (error) {
        console.error("Error durante el login:", error);
        throw error;
      }
    },
    async register(email, password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en el registro");
        }

        const data = await response.json();

        this.user = data.user;
        this.isAuthenticated = true;
        this.token = data.token;

        localStorage.setItem("auth_token", this.token);
      } catch (error) {
        console.error("Error durante el registro:", error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;

      localStorage.removeItem("auth_token");
    },
    async checkAuth(route) {
      this.isLoading = true;
      let token = null;

      token = localStorage.getItem("auth_token");

      if (token) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/dashboard/check-permission/${route}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al verificar el token");
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
          this.logout();
        }
      } else {
        this.logout();
      }
      this.isLoading = false;
    },
  },
});

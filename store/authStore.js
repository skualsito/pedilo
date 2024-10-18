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
      // Aquí iría la lógica de autenticación real
      // Por ahora, simularemos un login exitoso con un usuario admin
      this.user = { email, name: "Admin Usuario", isAdmin: true };
      this.isAuthenticated = true;
      this.token = "token_simulado";

      // Guardar el token en localStorage si está disponible
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("auth_token", this.token);
      }
    },
    async register(email, password) {
      // Aquí iría la lógica de registro real
      // Por ahora, simularemos un registro exitoso
      this.user = { email, name: "Nuevo Usuario" };
      this.isAuthenticated = true;
      this.token = "token_simulado";

      // Guardar el token en localStorage si está disponible
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("auth_token", this.token);
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;

      // Eliminar el token de localStorage si está disponible
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem("auth_token");
      }
    },
    async checkAuth() {
      this.isLoading = true;
      let token = null;
      if (typeof window !== "undefined" && window.localStorage) {
        token = window.localStorage.getItem("auth_token");
      }
      if (token) {
        try {
          // Aquí deberías verificar el token con tu backend
          // Por ahora, simularemos que el token es válido
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simular una llamada al backend
          this.token = token;
          this.isAuthenticated = true;
          this.user = {
            email: "admin@example.com",
            name: "Admin Usuario",
            isAdmin: true,
          };
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

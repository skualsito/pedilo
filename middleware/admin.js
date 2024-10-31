import { useAuthStore } from "@/store/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Verificar si estamos en el entorno del navegador
  if (typeof window !== "undefined") {
    // Pasar la ruta actual al método checkAuth
    await authStore.checkAuth(to.path);

    // Verificar la autenticación y si es administrador
    if (!authStore.isAuthenticated || !authStore.user?.isAdmin) {
      // Si no está autenticado o no es administrador, redirigir a la página de inicio
      return navigateTo("/");
    }
  }

  // Si estamos en el servidor o el usuario está autenticado y es administrador, permitir el acceso
});

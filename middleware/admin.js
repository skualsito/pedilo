import { useAuthStore } from "@/store/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const nuxtApp = useNuxtApp();

  // Verificar si estamos en el lado del cliente
  if (!nuxtApp.ssrContext) {
    // Esperar a que se complete la verificación de autenticación
    await authStore.checkAuth();

    // Verificar la autenticación
    if (!authStore.isAuthenticated) {
      // Si no está autenticado, redirigir a la página de inicio
      return navigateTo("/");
    }

    // Verificar si es administrador
    if (!authStore.user.isAdmin) {
      // Si no es administrador, redirigir a la página de inicio
      return navigateTo("/");
    }
  } else {
    // En el lado del servidor, permitir la navegación
    // La autenticación se verificará en el lado del cliente
    console.log(
      "Middleware ejecutado en el servidor, se omite la verificación de autenticación"
    );
  }

  // Si está autenticado y es administrador, o estamos en el servidor, permitir el acceso a la ruta actual
});

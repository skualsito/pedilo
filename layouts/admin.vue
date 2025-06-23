<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-[#3e40bf]/20 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2d2e8f]/20 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-40 left-40 w-80 h-80 bg-[#3e40bf]/15 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="flex h-screen relative z-10">
      <!-- Sidebar con fondo blanco y sombras -->
      <div
        :class="[
          'bg-white border-r border-gray-200 flex flex-col shadow-xl',
          'fixed left-0 inset-y-0 z-50 min-w-64 transition-transform duration-300 ease-in-out transform',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0',
        ]"
      >
        <div
          class="flex items-center justify-center h-16 border-b border-gray-200 bg-[#3e40bf]"
        >
          <!-- Logo -->
          <h1 class="text-2xl font-bold text-white">
            <NuxtLink to="/"> Admin PEDILO </NuxtLink>
          </h1>
        </div>

        <nav class="mt-8 overflow-y-auto flex-1 px-4">
          <NuxtLink
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.to"
            :class="[
              $route.path === link.to ? 'active-link' : 'hover-link',
              'flex items-center px-4 py-3 mt-2 text-sm rounded-xl transition-all duration-300',
            ]"
            @click="closeSidebarOnMobile"
          >
            <MdiIcon :name="link.icon" class="w-5 h-5 mr-3" />
            {{ link.text }}
          </NuxtLink>

          <!-- Subtítulo de estadísticas -->
          <h2
            class="text-xs uppercase font-semibold text-gray-500 mt-8 mb-3 px-4"
          >
            Estadísticas
          </h2>

          <!-- Botones de estadísticas -->
          <NuxtLink
            v-for="(link, index) in statsLinks"
            :key="`stats-${index}`"
            :to="link.to"
            :class="[
              $route.path === link.to ? 'active-link' : 'hover-link',
              'flex items-center px-4 py-3 mt-2 text-sm rounded-xl transition-all duration-300',
            ]"
            @click="closeSidebarOnMobile"
          >
            <MdiIcon :name="link.icon" class="w-5 h-5 mr-3" />
            {{ link.text }}
          </NuxtLink>
        </nav>

        <div class="mt-auto flex pb-4 border-t border-gray-200 flex-col px-4">
          <NuxtLink
            to="/"
            class="flex items-center px-4 py-3 mt-2 text-sm w-full rounded-xl hover-link transition-all duration-300"
            @click="closeSidebarOnMobile"
          >
            <MdiIcon name="arrowLeft" class="w-5 h-5 mr-3" />
            Volver al sitio
          </NuxtLink>
          <button
            @click="logout"
            class="flex items-center px-4 py-3 mt-2 text-sm w-full rounded-xl hover-link transition-all duration-300 text-left"
          >
            <MdiIcon name="Logout" class="w-5 h-5 mr-3" />
            Cerrar sesión
          </button>
        </div>
      </div>

      <!-- Overlay para cerrar el sidebar en móvil -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/20 z-40 md:hidden"
        @click="toggleSidebar"
      ></div>

      <!-- Main content -->
      <div class="flex-1 flex flex-col w-full">
        <!-- Top bar con fondo blanco y sombras -->
        <div
          class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 inset-x-0 left-0 md:left-64 z-30 shadow-lg"
        >
          <!-- Botón para abrir/cerrar el sidebar en móvil -->
          <button
            @click="toggleSidebar"
            class="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-300 md:hidden"
          >
            <MdiIcon :name="isSidebarOpen ? 'Close' : 'Menu'" class="w-6 h-6" />
          </button>

          <div class="relative max-w-[calc(100%-130px)]">
            <h1
              class="text-2xl font-bold text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {{ $route.meta?.head?.title || "Panel de Administración" }}
            </h1>
          </div>

          <div class="flex items-center space-x-4">
            <button
              class="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <MdiIcon name="bell" class="w-6 h-6" />
            </button>
            <div v-if="user" class="flex items-center space-x-3">
              <div class="bg-gray-100 rounded-full p-1 shadow-md">
                <img
                  :src="user.imagen || 'https://placehold.co/40x40'"
                  :alt="`${user.name || 'Usuario'} avatar`"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <span class="text-sm font-semibold text-gray-900 hidden md:block">
                {{ user.name || "Usuario" }}
              </span>
            </div>
            <div v-else class="flex items-center space-x-3">
              <div class="bg-gray-100 rounded-full p-1 shadow-md">
                <img
                  src="https://placehold.co/40x40"
                  alt="Avatar por defecto"
                  class="w-8 h-8 rounded-full"
                />
              </div>
              <span class="text-sm font-semibold text-gray-900 hidden sm:block"
                >Usuario</span
              >
            </div>
          </div>
        </div>

        <!-- Content area -->
        <div class="mt-16 md:ml-64 p-6 overflow-y-auto bg-gray-50">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore";
import { ref, computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user || null);

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
};

function logout() {
  closeSidebarOnMobile();
  authStore.logout();
}

const navLinks = [
  { to: "/admin", icon: "Home", text: "Dashboard" },
  { to: "/admin/pedidos", icon: "ClipboardList", text: "Pedidos" },
  { to: "/admin/productos", icon: "Food", text: "Productos" },
  { to: "/admin/sucursales", icon: "StoreMarker", text: "Sucursales" },
  { to: "/admin/usuarios", icon: "AccountGroup", text: "Usuarios" },
];

// Nuevos enlaces para estadísticas
const statsLinks = [
  { to: "/admin/estadisticas/ventas", icon: "ChartBar", text: "Ventas" },
  { to: "/admin/estadisticas/productos", icon: "ChartPie", text: "Productos" },
  { to: "/admin/estadisticas/balance", icon: "CashMultiple", text: "Balance" },
];
</script>

<style scoped>
.active-link {
  background: #3e40bf;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(62, 64, 191, 0.4);
}

.hover-link {
  color: #6b7280;
}

.hover-link:hover {
  background: #f3f4f6;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>

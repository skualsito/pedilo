<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar (oculto en móvil por defecto) -->
    <div
      :class="[
        'bg-gray-900 text-gray-100 flex flex-col',
        'fixed left-0 inset-y-0 z-50 min-w-64 transition-transform duration-300 ease-in-out transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
      ]"
    >
      <div class="flex items-center justify-center h-16">
        <!-- Logo -->
        <h1 class="text-2xl font-bold">
          Admin <NuxtLink to="/"> PEDILO </NuxtLink>
        </h1>
      </div>

      <nav class="mt-10">
        <NuxtLink
          v-for="(link, index) in navLinks"
          :key="index"
          :to="link.to"
          :class="[
            $route.path === link.to ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
          @click="closeSidebarOnMobile"
        >
          <MdiIcon :name="link.icon" class="w-5 h-5 mr-3" />
          {{ link.text }}
        </NuxtLink>

        <!-- Nuevo subtítulo de estadísticas -->
        <h2
          class="text-xs uppercase font-semibold text-gray-400 mt-6 mb-2 px-4"
        >
          Estadísticas
        </h2>

        <!-- Nuevos botones de estadísticas -->
        <NuxtLink
          v-for="(link, index) in statsLinks"
          :key="`stats-${index}`"
          :to="link.to"
          :class="[
            $route.path === link.to ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
          @click="closeSidebarOnMobile"
        >
          <MdiIcon :name="link.icon" class="w-5 h-5 mr-3" />
          {{ link.text }}
        </NuxtLink>
      </nav>

      <div class="mt-auto flex h-12 border-t border-gray-700">
        <NuxtLink
          to="/admin/perfil"
          :class="[
            $route.path === '/admin/perfil' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm w-full hover:font-semibold hover:bg-gray-800',
          ]"
          @click="closeSidebarOnMobile"
        >
          <MdiIcon name="Account" class="w-5 h-5 mr-3" />
          Perfil
        </NuxtLink>
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
      <!-- Top bar -->
      <div
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 inset-x-0 left-0 md:left-64 z-30"
      >
        <!-- Botón para abrir/cerrar el sidebar en móvil -->
        <button
          @click="toggleSidebar"
          class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:hidden"
        >
          <MdiIcon :name="isSidebarOpen ? 'Close' : 'Menu'" class="w-6 h-6" />
        </button>

        <div class="relative">
          <h1 class="text-2xl font-bold">
            {{ $route.meta?.head?.title || "Panel de Administración" }}
          </h1>
        </div>

        <div class="flex items-center">
          <MdiIcon name="bell" class="text-gray-400 w-6 h-6 mr-6" />
          <div v-if="user" class="flex items-center space-x-3">
            <img
              :src="user.profileImage || 'https://placehold.co/40x40'"
              :alt="`${user.name || 'Usuario'} avatar`"
              class="w-10 h-10 rounded-full"
            />
            <span class="text-sm font-semibold text-gray-900 hidden md:block">
              {{ user.name || "Usuario" }}
            </span>
          </div>
          <div v-else class="flex items-center space-x-3">
            <img
              src="https://placehold.co/40x40"
              alt="Avatar por defecto"
              class="w-10 h-10 rounded-full"
            />
            <span class="text-sm font-semibold text-gray-900 hidden sm:block"
              >Usuario</span
            >
          </div>
        </div>
      </div>

      <!-- Content area -->
      <div class="mt-16 md:ml-64">
        <slot />
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
  font-weight: 600;
  background-color: rgb(31 41 55);
}
</style>

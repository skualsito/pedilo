<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-900 text-gray-100 flex flex-col">
      <div class="flex items-center justify-center h-16">
        <!-- Logo -->
        <h1 class="text-2xl font-bold">
          Admin <NuxtLink to="/"> PEDILO </NuxtLink>
        </h1>
      </div>

      <nav class="mt-10">
        <NuxtLink
          to="/admin"
          :class="[
            $route.path === '/admin' ? 'active-link' : '',
            'flex items-center px-4 py-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="Home" class="w-5 h-5 mr-3" />
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/admin/pedidos"
          :class="[
            $route.path === '/admin/pedidos' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="ClipboardList" class="w-5 h-5 mr-3" />
          Pedidos
        </NuxtLink>
        <NuxtLink
          to="/admin/productos"
          :class="[
            $route.path === '/admin/productos' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="Food" class="w-5 h-5 mr-3" />
          Productos
        </NuxtLink>
        <NuxtLink
          to="/admin/sucursales"
          :class="[
            $route.path === '/admin/sucursales' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="Silverware" class="w-5 h-5 mr-3" />
          Sucursales
        </NuxtLink>
        <NuxtLink
          to="/admin/usuarios"
          :class="[
            $route.path === '/admin/usuarios' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="AccountGroup" class="w-5 h-5 mr-3" />
          Usuarios
        </NuxtLink>
      </nav>

      <div class="mt-auto flex h-12 border-t border-gray-700">
        <NuxtLink
          to="/admin/perfil"
          :class="[
            $route.path === '/admin/perfil' ? 'active-link' : '',
            'flex items-center px-4 py-2 mt-2 text-sm w-full hover:font-semibold hover:bg-gray-800',
          ]"
        >
          <MdiIcon name="Account" class="w-5 h-5 mr-3" />
          Perfil
        </NuxtLink>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      <div
        class="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6"
      >
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
            <span class="text-sm font-semibold text-gray-900">
              {{ user.name || "Usuario" }}
            </span>
            <MdiIcon name="ChevronDown" class="text-gray-400" />
          </div>
          <div v-else class="flex items-center space-x-3">
            <img
              src="https://placehold.co/40x40"
              alt="Avatar por defecto"
              class="w-10 h-10 rounded-full"
            />
            <span class="text-sm font-semibold text-gray-900">Usuario</span>
            <MdiIcon name="ChevronDown" class="text-gray-400" />
          </div>
        </div>
      </div>

      <!-- Content area -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const user = computed(() => authStore.user || null);
</script>

<style scoped>
.active-link {
  font-weight: 600;
  background-color: rgb(31 41 55);
}
</style>

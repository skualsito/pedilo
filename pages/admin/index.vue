<template>
  <div class="space-y-6">
    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Pedidos Hoy</p>
            <p class="text-3xl font-bold text-gray-900">24</p>
            <p class="text-green-600 text-sm">+12% vs ayer</p>
          </div>
          <div class="bg-green-100 rounded-full p-3">
            <MdiIcon name="ClipboardList" class="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Ingresos Hoy</p>
            <p class="text-3xl font-bold text-gray-900">$12,450</p>
            <p class="text-green-600 text-sm">+8% vs ayer</p>
          </div>
          <div class="bg-blue-100 rounded-full p-3">
            <MdiIcon name="CashMultiple" class="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Productos Activos</p>
            <p class="text-3xl font-bold text-gray-900">156</p>
            <p class="text-purple-600 text-sm">+3 nuevos</p>
          </div>
          <div class="bg-purple-100 rounded-full p-3">
            <MdiIcon name="Food" class="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Sucursales</p>
            <p class="text-3xl font-bold text-gray-900">8</p>
            <p class="text-orange-600 text-sm">Todas activas</p>
          </div>
          <div class="bg-orange-100 rounded-full p-3">
            <MdiIcon name="StoreMarker" class="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Orders -->
      <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Pedidos Recientes</h2>
          <NuxtLink
            to="/admin/pedidos"
            class="text-[#3e40bf] hover:text-[#2d2e8f] transition-colors duration-300 text-sm font-medium"
          >
            Ver todos →
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100 transition-colors duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-900 font-medium">Pedido #{{ 1000 + i }}</p>
                <p class="text-gray-600 text-sm">Restaurante {{ i }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-900 font-bold">${{ 1500 + i * 200 }}</p>
                <span class="text-green-600 text-sm">Completado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink
            to="/admin/pedidos"
            class="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 text-center group shadow-sm hover:shadow-md"
          >
            <MdiIcon
              name="ClipboardList"
              class="w-8 h-8 text-gray-700 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p class="text-gray-900 font-medium">Gestionar Pedidos</p>
          </NuxtLink>

          <NuxtLink
            to="/admin/productos"
            class="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 text-center group shadow-sm hover:shadow-md"
          >
            <MdiIcon
              name="Food"
              class="w-8 h-8 text-gray-700 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p class="text-gray-900 font-medium">Productos</p>
          </NuxtLink>

          <NuxtLink
            to="/admin/sucursales"
            class="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 text-center group shadow-sm hover:shadow-md"
          >
            <MdiIcon
              name="StoreMarker"
              class="w-8 h-8 text-gray-700 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p class="text-gray-900 font-medium">Sucursales</p>
          </NuxtLink>

          <NuxtLink
            to="/admin/usuarios"
            class="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all duration-300 text-center group shadow-sm hover:shadow-md"
          >
            <MdiIcon
              name="AccountGroup"
              class="w-8 h-8 text-gray-700 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p class="text-gray-900 font-medium">Usuarios</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Statistics Preview -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Estadísticas</h2>
        <div class="flex space-x-2">
          <NuxtLink
            to="/admin/estadisticas/ventas"
            class="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium transition-all duration-300"
          >
            Ventas
          </NuxtLink>
          <NuxtLink
            to="/admin/estadisticas/productos"
            class="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium transition-all duration-300"
          >
            Productos
          </NuxtLink>
          <NuxtLink
            to="/admin/estadisticas/balance"
            class="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm font-medium transition-all duration-300"
          >
            Balance
          </NuxtLink>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div
            class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <MdiIcon name="TrendingUp" class="w-8 h-8 text-green-600" />
          </div>
          <p class="text-gray-600 text-sm">Ventas del Mes</p>
          <p class="text-2xl font-bold text-gray-900">$45,230</p>
        </div>
        <div class="text-center">
          <div
            class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <MdiIcon name="ChartBar" class="w-8 h-8 text-blue-600" />
          </div>
          <p class="text-gray-600 text-sm">Pedidos del Mes</p>
          <p class="text-2xl font-bold text-gray-900">1,247</p>
        </div>
        <div class="text-center">
          <div
            class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <MdiIcon name="AccountGroup" class="w-8 h-8 text-purple-600" />
          </div>
          <p class="text-gray-600 text-sm">Usuarios Activos</p>
          <p class="text-2xl font-bold text-gray-900">892</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Dashboard",
  },
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Pedidos
          </h1>
          <p class="text-gray-600">
            Administra y monitorea todos los pedidos del sistema
          </p>
        </div>
        <button
          @click="abrirFormularioNuevoPedido"
          class="bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <MdiIcon name="Plus" class="w-5 h-5" />
          Nuevo Pedido
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Pedidos Pendientes</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ pedidosPendientes.length }}
            </p>
          </div>
          <div class="bg-orange-100 rounded-full p-3">
            <MdiIcon name="ClockOutline" class="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Pedidos Confirmados</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ pedidosConfirmadosCount }}
            </p>
          </div>
          <div class="bg-green-100 rounded-full p-3">
            <MdiIcon name="CheckCircle" class="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Ingresos</p>
            <p class="text-3xl font-bold text-gray-900">${{ totalIngresos }}</p>
          </div>
          <div class="bg-blue-100 rounded-full p-3">
            <MdiIcon name="CashMultiple" class="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div class="relative">
        <MdiIcon name="Magnify" class="absolute left-4 text-gray-400 top-3.5" />
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar pedidos..."
          class="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Pedidos Pendientes -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Pedidos Pendientes</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 text-gray-700 font-medium">ID</th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Cliente
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Fecha
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Total
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Estado
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pedido in pedidosPendientes"
              :key="pedido.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-900 font-medium">
                #{{ pedido.id }}
              </td>
              <td class="py-4 px-4 text-gray-900">{{ pedido.cliente }}</td>
              <td class="py-4 px-4 text-gray-600">
                {{ formatDate(pedido.fecha) }}
              </td>
              <td class="py-4 px-4 text-gray-900 font-bold">
                ${{ pedido.total }}
              </td>
              <td class="py-4 px-4">
                <span
                  class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ pedido.estado }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="verPedido(pedido)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 p-2 rounded-lg transition-all duration-300"
                    title="Ver"
                  >
                    <MdiIcon name="Eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="imprimirPedido(pedido)"
                    class="bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 p-2 rounded-lg transition-all duration-300"
                    title="Imprimir"
                  >
                    <MdiIcon name="Printer" class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmarPedido(pedido)"
                    class="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-lg transition-all duration-300"
                    title="Confirmar"
                  >
                    <MdiIcon name="Check" class="w-4 h-4" />
                  </button>
                  <button
                    @click="editarPedido(pedido)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-800 p-2 rounded-lg transition-all duration-300"
                    title="Editar"
                  >
                    <MdiIcon name="Pencil" class="w-4 h-4" />
                  </button>
                  <button
                    @click="borrarPedido(pedido)"
                    class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 p-2 rounded-lg transition-all duration-300"
                    title="Borrar"
                  >
                    <MdiIcon name="Delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Últimos Pedidos Confirmados -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Últimos Pedidos Confirmados
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 text-gray-700 font-medium">ID</th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Cliente
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Fecha
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Total
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pedido in ultimosPedidosConfirmados"
              :key="pedido.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-900 font-medium">
                #{{ pedido.id }}
              </td>
              <td class="py-4 px-4 text-gray-900">{{ pedido.cliente }}</td>
              <td class="py-4 px-4 text-gray-600">
                {{ formatDate(pedido.fecha) }}
              </td>
              <td class="py-4 px-4 text-gray-900 font-bold">
                ${{ pedido.total }}
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="verPedido(pedido)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 p-2 rounded-lg transition-all duration-300"
                    title="Ver"
                  >
                    <MdiIcon name="Eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="editarPedido(pedido)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-800 p-2 rounded-lg transition-all duration-300"
                    title="Editar"
                  >
                    <MdiIcon name="Pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Formulario -->
    <div
      v-if="dialogoFormulario"
      class="fixed inset-0 !mt-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ formularioTitulo }}
          </h2>
          <button
            @click="cerrarFormulario"
            class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <MdiIcon name="Close" :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarPedido" class="space-y-6">
          <div>
            <label class="block mb-2 text-gray-700 font-medium">Cliente</label>
            <input
              v-model="pedidoEditado.cliente"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Nombre del cliente"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Fecha</label>
            <input
              v-model="pedidoEditado.fecha"
              type="date"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Total</label>
            <input
              v-model="pedidoEditado.total"
              type="number"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="0.00"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="cerrarFormulario"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 transition-all duration-300 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Pedidos",
  },
});

import { ref, reactive, computed } from "vue";

const pedidos = ref([
  {
    id: 1,
    cliente: "Juan Pérez",
    fecha: "2023-05-01",
    total: 100,
    estado: "Pendiente",
  },
  {
    id: 2,
    cliente: "María García",
    fecha: "2023-05-02",
    total: 150,
    estado: "Pendiente",
  },
  {
    id: 3,
    cliente: "Carlos López",
    fecha: "2023-05-01",
    total: 200,
    estado: "Confirmado",
  },
  {
    id: 4,
    cliente: "Ana Martínez",
    fecha: "2023-05-03",
    total: 75,
    estado: "Confirmado",
  },
  {
    id: 5,
    cliente: "Luis Rodríguez",
    fecha: "2023-05-04",
    total: 300,
    estado: "Pendiente",
  },
]);

const pedidosPendientes = computed(() => {
  return pedidos.value?.filter((pedido) => pedido.estado === "Pendiente") || [];
});

const pedidosConfirmadosCount = computed(() => {
  return (
    pedidos.value?.filter((pedido) => pedido.estado === "Confirmado").length ||
    0
  );
});

const ultimosPedidosConfirmados = computed(() => {
  return (
    pedidos.value
      ?.filter((pedido) => pedido.estado === "Confirmado")
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5) || []
  );
});

const totalIngresos = computed(() => {
  return (
    pedidos.value
      ?.filter((pedido) => pedido.estado === "Confirmado")
      .reduce((total, pedido) => total + pedido.total, 0) || 0
  );
});

const dialogoFormulario = ref(false);
const formularioTitulo = ref("");
const pedidoEditado = reactive({
  id: null,
  cliente: "",
  fecha: "",
  total: 0,
});

const busqueda = ref("");

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const abrirFormularioNuevoPedido = () => {
  formularioTitulo.value = "Nuevo Pedido";
  pedidoEditado.id = null;
  pedidoEditado.cliente = "";
  pedidoEditado.fecha = "";
  pedidoEditado.total = 0;
  dialogoFormulario.value = true;
};

const verPedido = (item) => {
  console.log("Ver pedido:", item);
  // Implementa la lógica para ver el pedido
};

const imprimirPedido = (item) => {
  console.log("Imprimir pedido:", item);
  // Implementa la lógica para imprimir el pedido
};

const confirmarPedido = (item) => {
  item.estado = "Confirmado";
  item.fechaConfirmacion = new Date().toISOString().split("T")[0];
};

const editarPedido = (item) => {
  formularioTitulo.value = "Editar Pedido";
  pedidoEditado.id = item.id;
  pedidoEditado.cliente = item.cliente;
  pedidoEditado.fecha = item.fecha;
  pedidoEditado.total = item.total;
  dialogoFormulario.value = true;
};

const borrarPedido = (item) => {
  console.log("Borrar pedido:", item);
  // Implementa la lógica para borrar el pedido
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarPedido = () => {
  console.log("Guardar pedido:", pedidoEditado);
  cerrarFormulario();
};
</script>

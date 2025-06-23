<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Sucursales
          </h1>
          <p class="text-gray-600">Administra las sucursales y sus menús</p>
        </div>
        <button
          @click="abrirFormularioNuevaSucursal"
          class="bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <MdiIcon name="Plus" class="w-5 h-5" />
          Nueva Sucursal
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div class="relative">
        <MdiIcon name="Magnify" class="absolute left-4 text-gray-400 top-3.5" />
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar sucursales..."
          class="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Sucursales Table -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Sucursales</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Nombre
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Dirección
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Teléfono
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
              v-for="sucursal in sucursalesFiltradas"
              :key="sucursal.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-900 font-medium">
                {{ sucursal.nombre }}
              </td>
              <td class="py-4 px-4 text-gray-700">{{ sucursal.direccion }}</td>
              <td class="py-4 px-4 text-gray-700">{{ sucursal.telefono }}</td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    sucursal.activa
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ sucursal.activa ? "Activa" : "Inactiva" }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="verSucursal(sucursal)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 p-2 rounded-lg transition-all duration-300"
                    title="Ver"
                  >
                    <MdiIcon name="Eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="editarSucursal(sucursal)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-800 p-2 rounded-lg transition-all duration-300"
                    title="Editar"
                  >
                    <MdiIcon name="Pencil" class="w-4 h-4" />
                  </button>
                  <button
                    @click="borrarSucursal(sucursal)"
                    class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 p-2 rounded-lg transition-all duration-300"
                    title="Borrar"
                  >
                    <MdiIcon name="Delete" class="w-4 h-4" />
                  </button>
                  <button
                    @click="abrirMenuQR(sucursal)"
                    class="bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 p-2 rounded-lg transition-all duration-300"
                    title="Menú QR"
                  >
                    <MdiIcon name="Qrcode" class="w-4 h-4" />
                  </button>
                  <button
                    @click="abrirMenuWeb(sucursal)"
                    class="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-2 rounded-lg transition-all duration-300"
                    title="Menú Web"
                  >
                    <MdiIcon name="Web" class="w-4 h-4" />
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

        <form @submit.prevent="guardarSucursal" class="space-y-6">
          <div>
            <label class="block mb-2 text-gray-700 font-medium">Nombre</label>
            <input
              v-model="sucursalEditada.nombre"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Nombre de la sucursal"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium"
              >Dirección</label
            >
            <input
              v-model="sucursalEditada.direccion"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Dirección de la sucursal"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Teléfono</label>
            <input
              v-model="sucursalEditada.telefono"
              type="tel"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Teléfono de la sucursal"
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

    <!-- Modal de Menú -->
    <div
      v-if="dialogoMenu"
      class="fixed inset-0 !mt-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        <!-- Header del modal -->
        <div
          class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ tituloDialogoMenu }}
            </h2>
            <div class="flex items-center gap-3">
              <button
                @click="importarMenu"
                class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Importar Menú
              </button>
              <button
                @click="guardarMenu"
                class="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Guardar
              </button>
              <button
                @click="cerrarDialogoMenu"
                class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <MdiIcon name="Close" :size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Contenido del menú -->
        <div class="p-6">
          <div class="space-y-6">
            <div
              v-for="(categoria, index) in menuActual"
              :key="index"
              class="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div class="flex items-center gap-4 mb-4">
                <input
                  v-model="categoria.nombre"
                  type="text"
                  placeholder="Nombre de categoría"
                  class="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
                <button
                  @click="aplicarDescuentoCategoria(index)"
                  class="bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 p-3 rounded-lg transition-all duration-300"
                  title="Aplicar descuento a categoría"
                >
                  <MdiIcon name="Percent" class="w-5 h-5" />
                </button>
                <button
                  @click="eliminarCategoria(index)"
                  class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 p-3 rounded-lg transition-all duration-300"
                  title="Eliminar categoría"
                >
                  <MdiIcon name="Delete" class="w-5 h-5" />
                </button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(producto, prodIndex) in categoria.productos"
                  :key="prodIndex"
                  class="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200"
                >
                  <input
                    v-model="producto.nombre"
                    type="text"
                    placeholder="Nombre del producto"
                    class="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  />
                  <input
                    v-model="producto.precio"
                    type="number"
                    placeholder="Precio"
                    class="w-32 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  />
                  <button
                    @click="eliminarProducto(index, prodIndex)"
                    class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 p-2 rounded-lg transition-all duration-300"
                    title="Eliminar producto"
                  >
                    <MdiIcon name="Delete" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  @click="agregarProducto(index)"
                  class="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdiIcon name="Plus" class="w-4 h-4" />
                  Agregar Producto
                </button>
              </div>
            </div>

            <button
              @click="agregarCategoria"
              class="w-full bg-[#3e40bf] hover:bg-[#2d2e8f] text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MdiIcon name="Plus" class="w-5 h-5" />
              Agregar Categoría
            </button>
          </div>
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
    title: "Sucursales",
  },
});

import { ref, reactive, computed } from "vue";

const sucursales = ref([
  {
    id: 1,
    nombre: "Sucursal Centro",
    direccion: "Av. Principal 123",
    telefono: "123-456-7890",
    activa: true,
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    direccion: "Calle Norte 456",
    telefono: "098-765-4321",
    activa: true,
  },
  {
    id: 3,
    nombre: "Sucursal Sur",
    direccion: "Boulevard Sur 789",
    telefono: "555-123-4567",
    activa: false,
  },
]);

const busqueda = ref("");
const dialogoFormulario = ref(false);
const dialogoMenu = ref(false);
const formularioTitulo = ref("");
const tituloDialogoMenu = ref("");
const sucursalSeleccionada = ref(null);

const sucursalEditada = reactive({
  id: null,
  nombre: "",
  direccion: "",
  telefono: "",
});

const menuActual = ref([
  {
    nombre: "Entradas",
    productos: [
      { nombre: "Ensalada César", precio: 8.5 },
      { nombre: "Sopa del día", precio: 6.0 },
    ],
  },
  {
    nombre: "Platos Principales",
    productos: [
      { nombre: "Pasta Carbonara", precio: 15.0 },
      { nombre: "Pollo a la parrilla", precio: 18.5 },
    ],
  },
]);

const sucursalesFiltradas = computed(() => {
  if (!busqueda.value) return sucursales.value;
  return sucursales.value.filter(
    (sucursal) =>
      sucursal.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      sucursal.direccion.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

function abrirFormularioNuevaSucursal() {
  formularioTitulo.value = "Nueva Sucursal";
  sucursalEditada.id = null;
  sucursalEditada.nombre = "";
  sucursalEditada.direccion = "";
  sucursalEditada.telefono = "";
  dialogoFormulario.value = true;
}

function editarSucursal(sucursal) {
  formularioTitulo.value = "Editar Sucursal";
  sucursalEditada.id = sucursal.id;
  sucursalEditada.nombre = sucursal.nombre;
  sucursalEditada.direccion = sucursal.direccion;
  sucursalEditada.telefono = sucursal.telefono;
  dialogoFormulario.value = true;
}

function cerrarFormulario() {
  dialogoFormulario.value = false;
}

function guardarSucursal() {
  if (sucursalEditada.id) {
    // Editar sucursal existente
    const index = sucursales.value.findIndex(
      (s) => s.id === sucursalEditada.id
    );
    if (index !== -1) {
      sucursales.value[index] = { ...sucursalEditada };
    }
  } else {
    // Nueva sucursal
    const nuevaSucursal = {
      id: Date.now(),
      nombre: sucursalEditada.nombre,
      direccion: sucursalEditada.direccion,
      telefono: sucursalEditada.telefono,
      activa: true,
    };
    sucursales.value.push(nuevaSucursal);
  }
  cerrarFormulario();
}

function verSucursal(sucursal) {
  console.log("Ver sucursal:", sucursal);
}

function borrarSucursal(sucursal) {
  if (
    confirm(
      `¿Estás seguro de que quieres eliminar la sucursal "${sucursal.nombre}"?`
    )
  ) {
    const index = sucursales.value.findIndex((s) => s.id === sucursal.id);
    if (index !== -1) {
      sucursales.value.splice(index, 1);
    }
  }
}

function abrirMenuQR(sucursal) {
  sucursalSeleccionada.value = sucursal;
  tituloDialogoMenu.value = `Menú QR - ${sucursal.nombre}`;
  dialogoMenu.value = true;
}

function abrirMenuWeb(sucursal) {
  sucursalSeleccionada.value = sucursal;
  tituloDialogoMenu.value = `Menú Web - ${sucursal.nombre}`;
  dialogoMenu.value = true;
}

function cerrarDialogoMenu() {
  dialogoMenu.value = false;
  sucursalSeleccionada.value = null;
}

function importarMenu() {
  console.log("Importar menú");
}

function guardarMenu() {
  console.log("Guardar menú:", menuActual.value);
  cerrarDialogoMenu();
}

function agregarCategoria() {
  menuActual.value.push({
    nombre: "Nueva Categoría",
    productos: [],
  });
}

function eliminarCategoria(index) {
  if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
    menuActual.value.splice(index, 1);
  }
}

function agregarProducto(categoriaIndex) {
  menuActual.value[categoriaIndex].productos.push({
    nombre: "Nuevo Producto",
    precio: 0,
  });
}

function eliminarProducto(categoriaIndex, productoIndex) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    menuActual.value[categoriaIndex].productos.splice(productoIndex, 1);
  }
}

function aplicarDescuentoCategoria(index) {
  const descuento = prompt("Ingresa el porcentaje de descuento:");
  if (descuento && !isNaN(descuento)) {
    const categoria = menuActual.value[index];
    categoria.productos.forEach((producto) => {
      producto.precio = producto.precio * (1 - descuento / 100);
    });
  }
}
</script>

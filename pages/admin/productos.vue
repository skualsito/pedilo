<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Productos
          </h1>
          <p class="text-gray-600">
            Administra el catálogo de productos del sistema
          </p>
        </div>
        <button
          @click="abrirFormularioNuevoProducto"
          class="bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <MdiIcon name="Plus" class="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Total Productos</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ productos.length }}
            </p>
          </div>
          <div class="bg-purple-100 rounded-full p-3">
            <MdiIcon name="Food" class="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Categorías</p>
            <p class="text-3xl font-bold text-gray-900">
              {{ categorias.length }}
            </p>
          </div>
          <div class="bg-blue-100 rounded-full p-3">
            <MdiIcon name="Tag" class="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium">Valor Total</p>
            <p class="text-3xl font-bold text-gray-900">
              ${{ valorTotalInventario }}
            </p>
          </div>
          <div class="bg-green-100 rounded-full p-3">
            <MdiIcon name="CashMultiple" class="w-8 h-8 text-green-600" />
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
          placeholder="Buscar productos..."
          class="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Lista de Productos</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 text-gray-700 font-medium">ID</th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Imagen
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Nombre
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Descripción
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Precio
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="producto in productosFiltrados"
              :key="producto.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-900 font-medium">
                #{{ producto.id }}
              </td>
              <td class="py-4 px-4">
                <div
                  class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <img
                    :src="producto.imagen || 'https://via.placeholder.com/150'"
                    :alt="producto.nombre"
                    class="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td class="py-4 px-4 text-gray-900 font-medium">
                {{ producto.nombre }}
              </td>
              <td class="py-4 px-4 text-gray-600 max-w-xs truncate">
                {{ producto.descripcion }}
              </td>
              <td class="py-4 px-4 text-gray-900 font-bold">
                ${{ producto.precio }}
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="verProducto(producto)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 p-2 rounded-lg transition-all duration-300"
                    title="Ver"
                  >
                    <MdiIcon name="Eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="editarProducto(producto)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-800 p-2 rounded-lg transition-all duration-300"
                    title="Editar"
                  >
                    <MdiIcon name="Pencil" class="w-4 h-4" />
                  </button>
                  <button
                    @click="borrarProducto(producto)"
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

    <!-- Product Form Modal -->
    <div
      v-if="dialogoFormulario"
      class="fixed inset-0 !mt-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
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

        <form @submit.prevent="guardarProducto" class="space-y-6">
          <!-- Image Upload Section -->
          <div
            class="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Imagen del Producto
            </h3>
            <div class="flex items-center gap-6">
              <div
                class="w-32 h-32 rounded-xl overflow-hidden bg-gray-200 border-2 border-gray-300"
              >
                <img
                  :src="previewImagen || 'https://via.placeholder.com/150'"
                  :alt="productoEditado.nombre"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <label class="block mb-2 text-gray-700 font-medium"
                  >Seleccionar Imagen</label
                >
                <input
                  type="file"
                  accept="image/*"
                  @change="previsualizarImagen"
                  class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <!-- Basic Info Section -->
          <div
            class="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-gray-700 font-medium"
                  >Nombre</label
                >
                <input
                  v-model="productoEditado.nombre"
                  type="text"
                  required
                  class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  placeholder="Nombre del producto"
                />
              </div>

              <div>
                <label class="block mb-2 text-gray-700 font-medium"
                  >Precio</label
                >
                <input
                  v-model="productoEditado.precio"
                  type="number"
                  required
                  class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Categories Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-gray-700 font-medium"
                  >Categoría</label
                >
                <div class="flex gap-2">
                  <select
                    v-model="productoEditado.categoria"
                    required
                    class="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="" class="text-gray-500">
                      Seleccionar categoría
                    </option>
                    <option
                      v-for="categoria in categorias"
                      :key="categoria"
                      :value="categoria"
                      class="text-gray-700"
                    >
                      {{ categoria }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="abrirModalCategoria('categoria', 'agregar')"
                    class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-all duration-300"
                    title="Agregar categoría"
                  >
                    <MdiIcon name="Plus" class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    @click="abrirModalCategoria('categoria', 'editar')"
                    :disabled="!productoEditado.categoria"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Editar categoría"
                  >
                    <MdiIcon name="Pencil" class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    @click="borrarCategoria('categoria')"
                    :disabled="!productoEditado.categoria"
                    class="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Borrar categoría"
                  >
                    <MdiIcon name="Delete" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label class="block mb-2 text-gray-700 font-medium"
                  >Subcategoría</label
                >
                <div class="flex gap-2">
                  <select
                    v-model="productoEditado.subcategoria"
                    required
                    class="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="" class="text-gray-500">
                      Seleccionar subcategoría
                    </option>
                    <option
                      v-for="subcategoria in subcategorias"
                      :key="subcategoria"
                      :value="subcategoria"
                      class="text-gray-700"
                    >
                      {{ subcategoria }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="abrirModalCategoria('subcategoria', 'agregar')"
                    class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-all duration-300"
                    title="Agregar subcategoría"
                  >
                    <MdiIcon name="Plus" class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    @click="abrirModalCategoria('subcategoria', 'editar')"
                    :disabled="!productoEditado.subcategoria"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Editar subcategoría"
                  >
                    <MdiIcon name="Pencil" class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    @click="borrarCategoria('subcategoria')"
                    :disabled="!productoEditado.subcategoria"
                    class="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Borrar subcategoría"
                  >
                    <MdiIcon name="Delete" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div>
              <label class="block mb-2 text-gray-700 font-medium"
                >Descripción</label
              >
              <textarea
                v-model="productoEditado.descripcion"
                required
                rows="4"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none"
                placeholder="Descripción del producto..."
              ></textarea>
            </div>
          </div>

          <!-- Ingredients Section -->
          <div
            class="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Ingredientes</h3>
              <button
                type="button"
                @click="abrirModalIngrediente"
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <MdiIcon name="Plus" class="w-4 h-4" />
                Nuevo Ingrediente
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 text-gray-700 font-medium">
                      Nombre
                    </th>
                    <th class="text-left py-3 px-4 text-gray-700 font-medium">
                      Precio
                    </th>
                    <th class="text-left py-3 px-4 text-gray-700 font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(ingrediente, index) in productoEditado.ingredientes"
                    :key="index"
                    class="border-b border-gray-100"
                  >
                    <td class="py-3 px-4 text-gray-700">
                      {{ ingrediente.nombre }}
                    </td>
                    <td class="py-3 px-4 text-gray-900 font-bold">
                      ${{ ingrediente.precio }}
                    </td>
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          @click="editIngrediente(ingrediente)"
                          class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all duration-300"
                          title="Editar"
                        >
                          <MdiIcon name="Pencil" class="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          @click="deleteIngrediente(ingrediente)"
                          class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300"
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

          <!-- Form Actions -->
          <div class="flex gap-3 pt-6">
            <button
              type="button"
              @click="cerrarFormulario"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 transition-all duration-300 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MdiIcon name="ContentSave" class="w-5 h-5" />
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Ingredient Modal -->
    <div
      v-if="dialogIngrediente"
      class="fixed inset-0 !mt-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ formTitleIngrediente }}
          </h2>
          <button
            @click="closeIngrediente"
            class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <MdiIcon name="Close" :size="24" />
          </button>
        </div>

        <form @submit.prevent="saveIngrediente" class="space-y-6">
          <div>
            <label class="block mb-2 text-gray-700 font-medium">Nombre</label>
            <input
              v-model="editedIngrediente.nombre"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Nombre del ingrediente"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Precio</label>
            <input
              v-model="editedIngrediente.precio"
              type="number"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="0.00"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeIngrediente"
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

    <!-- Category Modal -->
    <div
      v-if="dialogoCategoria"
      class="fixed inset-0 !mt-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ tituloModalCategoria }}
          </h2>
          <button
            @click="cerrarModalCategoria"
            class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <MdiIcon name="Close" :size="24" />
          </button>
        </div>

        <form @submit.prevent="guardarCategoria" class="space-y-6">
          <div>
            <label class="block mb-2 text-gray-700 font-medium">{{
              labelModalCategoria
            }}</label>
            <input
              v-model="categoriaEditada"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              :placeholder="labelModalCategoria"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="cerrarModalCategoria"
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
    title: "Productos",
  },
});

import { ref, reactive, computed, nextTick } from "vue";

const productos = ref([
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    descripcion: "Deliciosa hamburguesa con carne, lechuga, tomate y queso",
    precio: 1200,
    imagen: "https://via.placeholder.com/150",
    categoria: "Hamburguesas",
    subcategoria: "Clásicas",
    ingredientes: [
      { nombre: "Pan de hamburguesa", precio: 200 },
      { nombre: "Carne de res", precio: 800 },
      { nombre: "Lechuga", precio: 50 },
      { nombre: "Tomate", precio: 50 },
      { nombre: "Queso", precio: 100 },
    ],
  },
  {
    id: 2,
    nombre: "Pizza Margherita",
    descripcion: "Pizza tradicional con salsa de tomate, mozzarella y albahaca",
    precio: 1800,
    imagen: "https://via.placeholder.com/150",
    categoria: "Pizzas",
    subcategoria: "Tradicionales",
    ingredientes: [
      { nombre: "Masa de pizza", precio: 300 },
      { nombre: "Salsa de tomate", precio: 200 },
      { nombre: "Mozzarella", precio: 800 },
      { nombre: "Albahaca", precio: 100 },
      { nombre: "Aceite de oliva", precio: 50 },
    ],
  },
]);

const dialogoFormulario = ref(false);
const formularioTitulo = ref("");
const productoEditado = reactive({
  id: null,
  nombre: "",
  descripcion: "",
  precio: 0,
  imagen: "",
  categoria: "",
  subcategoria: "",
  ingredientes: [],
});

const imagenSeleccionada = ref(null);
const previewImagen = ref(null);
const busqueda = ref("");

const categorias = ref([
  "Hamburguesas",
  "Pizzas",
  "Bebidas",
  "Postres",
  "Ensaladas",
]);
const subcategorias = ref([
  "Clásicas",
  "Especiales",
  "Vegetarianas",
  "Tradicionales",
  "Gourmet",
]);

const headerIngredientes = [
  { title: "Nombre", key: "nombre" },
  { title: "Precio", key: "precio" },
  { title: "Acciones", key: "actions", sortable: false, align: "end" },
];

const dialogIngrediente = ref(false);
const editedIngrediente = reactive({
  nombre: "",
  precio: "",
});
const editedIndex = ref(-1);

const formTitleIngrediente = computed(() => {
  return editedIndex.value === -1 ? "Nuevo Ingrediente" : "Editar Ingrediente";
});

const productosFiltrados = computed(() => {
  if (!busqueda.value) return productos.value;
  return productos.value.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

const valorTotalInventario = computed(() => {
  return productos.value.reduce(
    (total, producto) => total + producto.precio,
    0
  );
});

const closeIngrediente = () => {
  dialogIngrediente.value = false;
  nextTick(() => {
    editedIngrediente.nombre = "";
    editedIngrediente.precio = "";
    editedIndex.value = -1;
  });
};

const abrirModalIngrediente = () => {
  editedIngrediente.nombre = "";
  editedIngrediente.precio = "";
  editedIndex.value = -1;
  dialogIngrediente.value = true;
};

const saveIngrediente = () => {
  if (editedIndex.value > -1) {
    Object.assign(
      productoEditado.ingredientes[editedIndex.value],
      editedIngrediente
    );
  } else {
    if (editedIngrediente.nombre && editedIngrediente.precio) {
      productoEditado.ingredientes.push({ ...editedIngrediente });
    }
  }
  closeIngrediente();
};

const editIngrediente = (item) => {
  editedIndex.value = productoEditado.ingredientes.indexOf(item);
  editedIngrediente.nombre = item.nombre;
  editedIngrediente.precio = item.precio;
  dialogIngrediente.value = true;
};

const deleteIngrediente = (item) => {
  const index = productoEditado.ingredientes.indexOf(item);
  if (confirm("¿Estás seguro de que quieres eliminar este ingrediente?")) {
    productoEditado.ingredientes.splice(index, 1);
  }
};

const abrirFormularioNuevoProducto = () => {
  formularioTitulo.value = "Nuevo Producto";
  productoEditado.id = null;
  productoEditado.nombre = "";
  productoEditado.descripcion = "";
  productoEditado.precio = 0;
  productoEditado.imagen = "";
  productoEditado.categoria = "";
  productoEditado.subcategoria = "";
  productoEditado.ingredientes = [];
  imagenSeleccionada.value = null;
  previewImagen.value = null;
  dialogoFormulario.value = true;
};

const verProducto = (item) => {
  console.log("Ver producto:", item);
};

const editarProducto = (item) => {
  formularioTitulo.value = "Editar Producto";
  productoEditado.id = item.id;
  productoEditado.nombre = item.nombre;
  productoEditado.descripcion = item.descripcion;
  productoEditado.precio = item.precio;
  productoEditado.imagen = item.imagen;
  productoEditado.categoria = item.categoria || "";
  productoEditado.subcategoria = item.subcategoria || "";
  productoEditado.ingredientes = item.ingredientes || [];
  previewImagen.value = item.imagen;
  dialogoFormulario.value = true;
};

const borrarProducto = (item) => {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    const index = productos.value.indexOf(item);
    productos.value.splice(index, 1);
  }
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarProducto = () => {
  if (productoEditado.id) {
    // Editar producto existente
    const index = productos.value.findIndex((p) => p.id === productoEditado.id);
    if (index !== -1) {
      productos.value[index] = { ...productoEditado };
    }
  } else {
    // Crear nuevo producto
    const nuevoProducto = {
      ...productoEditado,
      id: productos.value.length + 1,
    };
    productos.value.push(nuevoProducto);
  }
  cerrarFormulario();
};

const previsualizarImagen = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImagen.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const dialogoCategoria = ref(false);
const tipoCategoria = ref("");
const accionCategoria = ref("");
const categoriaEditada = ref("");
const categoriaIndex = ref(-1);

const tituloModalCategoria = computed(() => {
  const tipo =
    tipoCategoria.value === "categoria" ? "Categoría" : "Subcategoría";
  const accion = accionCategoria.value === "agregar" ? "Nueva" : "Editar";
  return `${accion} ${tipo}`;
});

const labelModalCategoria = computed(() => {
  return tipoCategoria.value === "categoria"
    ? "Nombre de la categoría"
    : "Nombre de la subcategoría";
});

const abrirModalCategoria = (tipo, accion) => {
  if (accion === "editar" && !productoEditado[tipo]) {
    return;
  }

  tipoCategoria.value = tipo;
  accionCategoria.value = accion;
  categoriaEditada.value = "";
  categoriaIndex.value = -1;

  if (accion === "editar") {
    const lista = tipo === "categoria" ? categorias.value : subcategorias.value;
    const seleccionada = productoEditado[tipo];
    categoriaIndex.value = lista.indexOf(seleccionada);
    categoriaEditada.value = seleccionada;
  }

  dialogoCategoria.value = true;
};

const cerrarModalCategoria = () => {
  dialogoCategoria.value = false;
};

const guardarCategoria = () => {
  if (categoriaEditada.value) {
    const lista =
      tipoCategoria.value === "categoria" ? categorias : subcategorias;

    if (accionCategoria.value === "agregar") {
      lista.value.push(categoriaEditada.value);
    } else if (
      accionCategoria.value === "editar" &&
      categoriaIndex.value !== -1
    ) {
      lista.value[categoriaIndex.value] = categoriaEditada.value;
    }

    cerrarModalCategoria();
  }
};

const borrarCategoria = (tipo) => {
  if (!productoEditado[tipo]) {
    return;
  }

  const lista = tipo === "categoria" ? categorias : subcategorias;
  const seleccionada = productoEditado[tipo];
  const index = lista.value.indexOf(seleccionada);

  if (
    index !== -1 &&
    confirm(`¿Estás seguro de que quieres eliminar esta ${tipo}?`)
  ) {
    lista.value.splice(index, 1);
    productoEditado[tipo] = "";
  }
};
</script>

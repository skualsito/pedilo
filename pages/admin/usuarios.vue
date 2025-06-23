<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Usuarios
          </h1>
          <p class="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <button
          @click="abrirFormularioNuevoUsuario"
          class="bg-[#3e40bf] hover:bg-[#2d2e8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <MdiIcon name="Plus" class="w-5 h-5" />
          Nuevo Usuario
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
          placeholder="Buscar usuarios..."
          class="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Usuarios</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 text-gray-700 font-medium">ID</th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Nombre
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">
                Email
              </th>
              <th class="text-left py-4 px-4 text-gray-700 font-medium">Rol</th>
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
              v-for="usuario in usuariosFiltrados"
              :key="usuario.id"
              class="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="py-4 px-4 text-gray-900 font-medium">
                #{{ usuario.id }}
              </td>
              <td class="py-4 px-4 text-gray-900">{{ usuario.nombre }}</td>
              <td class="py-4 px-4 text-gray-700">{{ usuario.email }}</td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    usuario.rol === 'Administrador'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700',
                  ]"
                >
                  {{ usuario.rol }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    usuario.activo
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ usuario.activo ? "Activo" : "Inactivo" }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="verUsuario(usuario)"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 p-2 rounded-lg transition-all duration-300"
                    title="Ver"
                  >
                    <MdiIcon name="Eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="editarUsuario(usuario)"
                    class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-800 p-2 rounded-lg transition-all duration-300"
                    title="Editar"
                  >
                    <MdiIcon name="Pencil" class="w-4 h-4" />
                  </button>
                  <button
                    @click="borrarUsuario(usuario)"
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

        <form @submit.prevent="guardarUsuario" class="space-y-6">
          <div>
            <label class="block mb-2 text-gray-700 font-medium">Nombre</label>
            <input
              v-model="usuarioEditado.nombre"
              type="text"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              v-model="usuarioEditado.email"
              type="email"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label class="block mb-2 text-gray-700 font-medium">Rol</label>
            <select
              v-model="usuarioEditado.rol"
              required
              class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 transition-all duration-300"
            >
              <option value="" class="text-gray-500">Seleccionar rol</option>
              <option value="Administrador" class="text-gray-700">
                Administrador
              </option>
              <option value="Usuario" class="text-gray-700">Usuario</option>
              <option value="Editor" class="text-gray-700">Editor</option>
            </select>
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
    title: "Usuarios",
  },
});

import { ref, reactive, computed } from "vue";

const usuarios = ref([
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    rol: "Administrador",
    activo: true,
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@ejemplo.com",
    rol: "Usuario",
    activo: true,
  },
  {
    id: 3,
    nombre: "Carlos López",
    email: "carlos@ejemplo.com",
    rol: "Editor",
    activo: false,
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    email: "ana@ejemplo.com",
    rol: "Usuario",
    activo: true,
  },
]);

const busqueda = ref("");
const dialogoFormulario = ref(false);
const formularioTitulo = ref("");

const usuarioEditado = reactive({
  id: null,
  nombre: "",
  email: "",
  rol: "",
});

const usuariosFiltrados = computed(() => {
  if (!busqueda.value) return usuarios.value;
  return usuarios.value.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

function abrirFormularioNuevoUsuario() {
  formularioTitulo.value = "Nuevo Usuario";
  usuarioEditado.id = null;
  usuarioEditado.nombre = "";
  usuarioEditado.email = "";
  usuarioEditado.rol = "";
  dialogoFormulario.value = true;
}

function editarUsuario(usuario) {
  formularioTitulo.value = "Editar Usuario";
  usuarioEditado.id = usuario.id;
  usuarioEditado.nombre = usuario.nombre;
  usuarioEditado.email = usuario.email;
  usuarioEditado.rol = usuario.rol;
  dialogoFormulario.value = true;
}

function cerrarFormulario() {
  dialogoFormulario.value = false;
}

function guardarUsuario() {
  if (usuarioEditado.id) {
    // Editar usuario existente
    const index = usuarios.value.findIndex((u) => u.id === usuarioEditado.id);
    if (index !== -1) {
      usuarios.value[index] = { ...usuarios.value[index], ...usuarioEditado };
    }
  } else {
    // Nuevo usuario
    const nuevoUsuario = {
      id: Date.now(),
      nombre: usuarioEditado.nombre,
      email: usuarioEditado.email,
      rol: usuarioEditado.rol,
      activo: true,
    };
    usuarios.value.push(nuevoUsuario);
  }
  cerrarFormulario();
}

function verUsuario(usuario) {
  console.log("Ver usuario:", usuario);
}

function borrarUsuario(usuario) {
  if (
    confirm(
      `¿Estás seguro de que quieres eliminar al usuario "${usuario.nombre}"?`
    )
  ) {
    const index = usuarios.value.findIndex((u) => u.id === usuario.id);
    if (index !== -1) {
      usuarios.value.splice(index, 1);
    }
  }
}
</script>

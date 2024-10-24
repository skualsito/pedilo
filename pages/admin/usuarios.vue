<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12" class="flex justify-end">
        <v-btn
          color="primary"
          @click="abrirFormularioNuevoUsuario"
          class="ms-auto"
        >
          <v-icon start icon="mdi-plus"></v-icon>
          Nuevo Usuario
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="usuarios"
      :items-per-page="5"
      :search="busqueda"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field
          v-model="busqueda"
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          single-line
          hide-details
          class="mb-4"
        ></v-text-field>
      </template>

      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn
          size="x-small"
          color="primary"
          class="me-2"
          icon
          @click="verUsuario(item)"
        >
          <v-icon>mdi-eye</v-icon>
          <v-tooltip activator="parent" location="top">Ver</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="warning"
          class="me-2"
          icon
          @click="editarUsuario(item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="error"
          class="me-2"
          icon
          @click="borrarUsuario(item)"
        >
          <v-icon>mdi-delete</v-icon>
          <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogoFormulario" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formularioTitulo }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formulario">
            <v-text-field
              v-model="usuarioEditado.nombre"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="usuarioEditado.email"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="usuarioEditado.rol"
              label="Rol"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cerrarFormulario"
            >Cancelar</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="guardarUsuario"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Usuarios",
  },
});
import { ref, reactive } from "vue";

const headers = [
  { title: "ID", key: "id" },
  { title: "Nombre", key: "nombre" },
  { title: "Email", key: "email" },
  { title: "Rol", key: "rol" },
  { title: "Acciones", key: "acciones", sortable: false, align: "end" },
];

const usuarios = ref([
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    rol: "Administrador",
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@ejemplo.com",
    rol: "Usuario",
  },
  // Añade más usuarios aquí
]);

const dialogoFormulario = ref(false);
const formularioTitulo = ref("");
const usuarioEditado = reactive({
  id: null,
  nombre: "",
  email: "",
  rol: "",
});

const busqueda = ref("");

const abrirFormularioNuevoUsuario = () => {
  formularioTitulo.value = "Nuevo Usuario";
  usuarioEditado.id = null;
  usuarioEditado.nombre = "";
  usuarioEditado.email = "";
  usuarioEditado.rol = "";
  dialogoFormulario.value = true;
};

const verUsuario = (item) => {
  // Implementa la lógica para ver el usuario
  console.log("Ver usuario:", item);
};

const editarUsuario = (item) => {
  formularioTitulo.value = "Editar Usuario";
  usuarioEditado.id = item.id;
  usuarioEditado.nombre = item.nombre;
  usuarioEditado.email = item.email;
  usuarioEditado.rol = item.rol;
  dialogoFormulario.value = true;
};

const borrarUsuario = (item) => {
  // Implementa la lógica para borrar el usuario
  console.log("Borrar usuario:", item);
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarUsuario = () => {
  // Implementa la lógica para guardar el usuario
  console.log("Guardar usuario:", usuarioEditado);
  cerrarFormulario();
};
</script>

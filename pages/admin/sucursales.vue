<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="abrirFormularioNuevaSucursal">
          <v-icon start icon="mdi-plus"></v-icon>
          Nueva Sucursal
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="sucursales"
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
          @click="verSucursal(item)"
        >
          <v-icon>mdi-eye</v-icon>
          <v-tooltip activator="parent" location="top">Ver</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="warning"
          class="me-2"
          icon
          @click="editarSucursal(item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="error"
          class="me-2"
          icon
          @click="borrarSucursal(item)"
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
              v-model="sucursalEditada.nombre"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="sucursalEditada.direccion"
              label="Dirección"
              required
            ></v-text-field>
            <v-text-field
              v-model="sucursalEditada.telefono"
              label="Teléfono"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cerrarFormulario"
            >Cancelar</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="guardarSucursal"
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
    title: "Sucursales",
  },
});
import { ref, reactive } from "vue";

const headers = [
  { title: "ID", key: "id" },
  { title: "Nombre", key: "nombre" },
  { title: "Dirección", key: "direccion" },
  { title: "Teléfono", key: "telefono" },
  { title: "Acciones", key: "acciones", sortable: false, align: "end" },
];

const sucursales = ref([
  {
    id: 1,
    nombre: "Sucursal Centro",
    direccion: "Calle Principal 123",
    telefono: "555-1234",
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    direccion: "Avenida Norte 456",
    telefono: "555-5678",
  },
  // Añade más sucursales aquí
]);

const dialogoFormulario = ref(false);
const formularioTitulo = ref("");
const sucursalEditada = reactive({
  id: null,
  nombre: "",
  direccion: "",
  telefono: "",
});

const busqueda = ref("");

const abrirFormularioNuevaSucursal = () => {
  formularioTitulo.value = "Nueva Sucursal";
  sucursalEditada.id = null;
  sucursalEditada.nombre = "";
  sucursalEditada.direccion = "";
  sucursalEditada.telefono = "";
  dialogoFormulario.value = true;
};

const verSucursal = (item) => {
  // Implementa la lógica para ver la sucursal
  console.log("Ver sucursal:", item);
};

const editarSucursal = (item) => {
  formularioTitulo.value = "Editar Sucursal";
  sucursalEditada.id = item.id;
  sucursalEditada.nombre = item.nombre;
  sucursalEditada.direccion = item.direccion;
  sucursalEditada.telefono = item.telefono;
  dialogoFormulario.value = true;
};

const borrarSucursal = (item) => {
  // Implementa la lógica para borrar la sucursal
  console.log("Borrar sucursal:", item);
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarSucursal = () => {
  // Implementa la lógica para guardar la sucursal
  console.log("Guardar sucursal:", sucursalEditada);
  cerrarFormulario();
};
</script>

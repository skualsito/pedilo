<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="abrirFormularioNuevoProducto">
          <v-icon start icon="mdi-plus"></v-icon>
          Nuevo Producto
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="productos"
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

      <template v-slot:[`item.imagen`]="{ item }">
        <v-img :src="item.imagen" height="50" width="50" cover></v-img>
      </template>

      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn
          size="x-small"
          color="primary"
          class="me-2"
          icon
          @click="verProducto(item)"
        >
          <v-icon>mdi-eye</v-icon>
          <v-tooltip activator="parent" location="top">Ver</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="warning"
          class="me-2"
          icon
          @click="editarProducto(item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="error"
          class="me-2"
          icon
          @click="borrarProducto(item)"
        >
          <v-icon>mdi-delete</v-icon>
          <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialogoFormulario"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="cerrarFormulario">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ formularioTitulo }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="guardarProducto">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="formulario">
              <v-row>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-avatar size="150" class="mt-2">
                        <v-img
                          :src="
                            previewImagen || 'https://via.placeholder.com/150'
                          "
                          cover
                        ></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="9">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="productoEditado.nombre"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="productoEditado.categoria"
                        :items="categorias"
                        label="Categoría"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="productoEditado.subcategoria"
                        :items="subcategorias"
                        label="Subcategoría"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="productoEditado.precio"
                        label="Precio"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="productoEditado.sucursales"
                        :items="sucursales"
                        label="Sucursales disponibles"
                        multiple
                        chips
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-file-input
                        v-model="imagenSeleccionada"
                        label="Imagen del producto"
                        accept="image/*"
                        @change="previsualizarImagen"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="productoEditado.descripcion"
                    label="Descripción"
                    required
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-data-table
                    :headers="headerIngredientes"
                    :items="productoEditado.ingredientes"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Ingredientes</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogIngrediente" max-width="500px">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              color="primary"
                              variant="elevated"
                              class="mb-2"
                              v-bind="props"
                            >
                              Nuevo Ingrediente
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="text-h5">{{
                                formTitleIngrediente
                              }}</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6">
                                    <v-text-field
                                      v-model="editedIngrediente.nombre"
                                      label="Nombre"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-text-field
                                      v-model="editedIngrediente.precio"
                                      label="Precio"
                                      type="number"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="closeIngrediente"
                                >Cancelar</v-btn
                              >
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="saveIngrediente"
                                >Guardar</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-btn
                        size="x-small"
                        color="warning"
                        class="me-2"
                        icon
                        @click="editIngrediente(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                        <v-tooltip activator="parent" location="top"
                          >Editar</v-tooltip
                        >
                      </v-btn>
                      <v-btn
                        size="x-small"
                        color="error"
                        class="me-2"
                        icon
                        @click="deleteIngrediente(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="top"
                          >Borrar</v-tooltip
                        >
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Productos",
  },
});
import { ref, reactive, computed } from "vue";

const headers = [
  { title: "ID", key: "id" },
  { title: "Imagen", key: "imagen" },
  { title: "Nombre", key: "nombre" },
  { title: "Descripción", key: "descripcion" },
  { title: "Precio", key: "precio" },
  { title: "Acciones", key: "acciones", sortable: false, align: "end" },
];

const productos = ref([
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Descripción del producto 1",
    precio: 100,
    imagen: "https://via.placeholder.com/150",
    ingredientes: [],
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Descripción del producto 2",
    precio: 150,
    imagen: "https://via.placeholder.com/150",
    ingredientes: [],
  },
  // Añade más productos aquí
]);

const dialogoFormulario = ref(false);
const formularioTitulo = ref("");
const productoEditado = reactive({
  id: null,
  nombre: "",
  descripcion: "",
  precio: 0,
  imagen: "",
});

const imagenSeleccionada = ref(null);
const previewImagen = ref(null);

const busqueda = ref("");

const categorias = ref(["Categoría 1", "Categoría 2", "Categoría 3"]);
const subcategorias = ref([
  "Subcategoría 1",
  "Subcategoría 2",
  "Subcategoría 3",
]);
const sucursales = ref(["Sucursal A", "Sucursal B", "Sucursal C"]);

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

const closeIngrediente = () => {
  dialogIngrediente.value = false;
  nextTick(() => {
    editedIngrediente.nombre = "";
    editedIngrediente.precio = "";
    editedIndex.value = -1;
  });
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
      console.log("Ingrediente añadido:", editedIngrediente);
      console.log(
        "Lista actualizada de ingredientes:",
        productoEditado.ingredientes
      );
    } else {
      console.warn(
        "No se puede añadir un ingrediente con nombre o precio vacíos"
      );
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
  productoEditado.ingredientes = [];
  imagenSeleccionada.value = null;
  previewImagen.value = null;
  dialogoFormulario.value = true;
};

const verProducto = (item) => {
  // Implementa la lógica para ver el producto
  console.log("Ver producto:", item);
};

const editarProducto = (item) => {
  formularioTitulo.value = "Editar Producto";
  productoEditado.id = item.id;
  productoEditado.nombre = item.nombre;
  productoEditado.descripcion = item.descripcion;
  productoEditado.precio = item.precio;
  productoEditado.imagen = item.imagen;
  productoEditado.ingredientes = item.ingredientes;
  previewImagen.value = item.imagen;
  dialogoFormulario.value = true;
};

const borrarProducto = (item) => {
  // Implementa la lógica para borrar el producto
  console.log("Borrar producto:", item);
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarProducto = () => {
  // Implementa la lógica para guardar el producto
  console.log("Guardar producto:", productoEditado);
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
</script>

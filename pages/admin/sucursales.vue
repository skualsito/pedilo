<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12" class="flex justify-end">
        <v-btn
          color="primary"
          @click="abrirFormularioNuevaSucursal"
          class="ms-auto"
        >
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
        <v-btn
          size="x-small"
          color="info"
          class="me-2"
          icon
          @click="abrirMenuQR(item)"
        >
          <v-icon>mdi-qrcode</v-icon>
          <v-tooltip activator="parent" location="top">Menú QR</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="success"
          class="me-2"
          icon
          @click="abrirMenuWeb(item)"
        >
          <v-icon>mdi-web</v-icon>
          <v-tooltip activator="parent" location="top">Menú Web</v-tooltip>
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

    <v-dialog
      v-model="dialogoMenu"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          class="!fixed top-0 left-0 right-0 z-50"
        >
          <v-btn icon dark @click="cerrarDialogoMenu">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ tituloDialogoMenu }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text color="secondary" @click="importarMenu">
              Importar Menú Existente
            </v-btn>
            <v-btn text @click="guardarMenu">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-16">
          <v-container>
            <v-row v-for="(categoria, index) in menuActual" :key="index">
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    <v-col cols="12" class="flex align-center">
                      <v-text-field
                        v-model="categoria.nombre"
                        label="Categoría"
                        class="mr-2"
                      ></v-text-field>
                      <v-btn
                        icon
                        color="success"
                        @click="aplicarDescuentoCategoria(index)"
                        class="mr-2"
                      >
                        <v-icon>mdi-percent</v-icon>
                        <v-tooltip activator="parent" location="top"
                          >Aplicar descuento a categoría</v-tooltip
                        >
                      </v-btn>
                      <v-btn
                        icon
                        color="error"
                        @click="eliminarCategoria(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="top"
                          >Eliminar categoría</v-tooltip
                        >
                      </v-btn>
                    </v-col>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item
                        v-for="(producto, prodIndex) in categoria.productos"
                        :key="prodIndex"
                      >
                        <v-row>
                          <v-col cols="8" class="!pr-0">
                            <v-text-field
                              v-model="producto.nombre"
                              label="Producto"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4" class="flex align-center !pr-0">
                            <v-text-field
                              v-model="producto.precio"
                              label="Precio"
                              type="number"
                              class="mr-2"
                            ></v-text-field>
                            <v-btn
                              icon
                              color="success"
                              @click="
                                aplicarDescuentoProducto(index, prodIndex)
                              "
                              class="mr-2"
                            >
                              <v-icon>mdi-percent</v-icon>
                              <v-tooltip activator="parent" location="top"
                                >Aplicar descuento</v-tooltip
                              >
                            </v-btn>
                            <v-btn
                              icon
                              color="error"
                              @click="eliminarProducto(index, prodIndex)"
                              class="mr-5"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item>
                    </v-list>
                    <v-btn color="primary" @click="agregarProducto(index)">
                      Agregar Producto
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="primary" @click="agregarCategoria">
                  Agregar Categoría
                </v-btn>
              </v-col>
            </v-row>
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

const dialogoMenu = ref(false);
const tituloDialogoMenu = ref("");
const menuActual = ref([]);
const sucursalActual = ref(null);

const abrirMenuQR = (item) => {
  abrirDialogoMenu(item, "Menú QR");
};

const abrirMenuWeb = (item) => {
  abrirDialogoMenu(item, "Menú Web");
};

const abrirDialogoMenu = (item, titulo) => {
  sucursalActual.value = item;
  tituloDialogoMenu.value = `${titulo} - ${item.nombre}`;
  menuActual.value = item.menu || [];
  dialogoMenu.value = true;
};

const cerrarDialogoMenu = () => {
  dialogoMenu.value = false;
};

const agregarCategoria = () => {
  menuActual.value.push({ nombre: "Nueva Categoría", productos: [] });
};

const eliminarCategoria = (index) => {
  menuActual.value.splice(index, 1);
};

const agregarProducto = (categoriaIndex) => {
  menuActual.value[categoriaIndex].productos.push({
    nombre: "Nuevo Producto",
    precio: 0,
  });
};

const eliminarProducto = (categoriaIndex, productoIndex) => {
  menuActual.value[categoriaIndex].productos.splice(productoIndex, 1);
};

const importarMenu = () => {
  // Implementa la lógica para importar un menú existente
  console.log("Importar menú");
};

const guardarMenu = () => {
  // Implementa la lógica para guardar el menú en la sucursal actual
  sucursalActual.value.menu = menuActual.value;
  console.log("Guardar menú:", menuActual.value);
  cerrarDialogoMenu();
};

const aplicarDescuentoCategoria = (categoriaIndex) => {
  // Implementa la lógica para aplicar descuento a toda la categoría
  console.log("Aplicar descuento a categoría:", categoriaIndex);
};

const aplicarDescuentoProducto = (categoriaIndex, productoIndex) => {
  // Implementa la lógica para aplicar descuento a un producto específico
  console.log("Aplicar descuento a producto:", categoriaIndex, productoIndex);
};
</script>

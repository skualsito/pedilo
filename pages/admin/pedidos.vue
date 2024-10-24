<template>
  <v-container fluid>
    <div class="flex w-full justify-between items-center mb-4 ml-2">
      <h2 class="text-xl font-bold">Pedidos Pendientes</h2>
      <v-btn color="primary" @click="abrirFormularioNuevoPedido">
        <v-icon start icon="mdi-plus"></v-icon>
        Nuevo Pedido
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="pedidosPendientes"
      :items-per-page="5"
      :search="busqueda"
      class="elevation-1 mb-8"
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

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado === 'Pendiente' ? 'warning' : 'success'">
          {{ item.estado }}
        </v-chip>
      </template>

      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn
          size="x-small"
          color="primary"
          class="me-2"
          icon
          @click="verPedido(item)"
        >
          <v-icon>mdi-eye</v-icon>
          <v-tooltip activator="parent" location="top">Ver</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="info"
          class="me-2"
          icon
          @click="imprimirPedido(item)"
          v-if="item.estado === 'Pendiente'"
        >
          <v-icon>mdi-printer</v-icon>
          <v-tooltip activator="parent" location="top">Imprimir</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="success"
          class="me-2"
          icon
          @click="confirmarPedido(item)"
          v-if="item.estado === 'Pendiente'"
        >
          <v-icon>mdi-check</v-icon>
          <v-tooltip activator="parent" location="top">Confirmar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="warning"
          class="me-2"
          icon
          @click="editarPedido(item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="error"
          class="me-2"
          icon
          @click="borrarPedido(item)"
          v-if="item.estado === 'Pendiente'"
        >
          <v-icon>mdi-delete</v-icon>
          <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
        </v-btn>
      </template>
    </v-data-table>

    <h2 class="text-xl font-bold mb-4">Últimos 5 Pedidos Confirmados</h2>
    <v-data-table
      :headers="headersConfirmados"
      :items="ultimosPedidosConfirmados"
      :items-per-page="5"
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

      <template v-slot:[`item.estado`]="{ item }">
        <v-chip :color="item.estado === 'Pendiente' ? 'warning' : 'success'">
          {{ item.estado }}
        </v-chip>
      </template>

      <template v-slot:[`item.acciones`]="{ item }">
        <v-btn
          size="x-small"
          color="primary"
          class="me-2"
          icon
          @click="verPedido(item)"
        >
          <v-icon>mdi-eye</v-icon>
          <v-tooltip activator="parent" location="top">Ver</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="info"
          class="me-2"
          icon
          @click="imprimirPedido(item)"
          v-if="item.estado === 'Pendiente'"
        >
          <v-icon>mdi-printer</v-icon>
          <v-tooltip activator="parent" location="top">Imprimir</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="success"
          class="me-2"
          icon
          @click="confirmarPedido(item)"
          v-if="item.estado === 'Pendiente'"
        >
          <v-icon>mdi-check</v-icon>
          <v-tooltip activator="parent" location="top">Confirmar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="warning"
          class="me-2"
          icon
          @click="editarPedido(item)"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Editar</v-tooltip>
        </v-btn>
        <v-btn
          size="x-small"
          color="error"
          class="me-2"
          icon
          @click="borrarPedido(item)"
          v-if="item.estado === 'Pendiente'"
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
              v-model="pedidoEditado.cliente"
              label="Cliente"
              required
            ></v-text-field>
            <v-text-field
              v-model="pedidoEditado.fecha"
              label="Fecha"
              type="date"
              required
            ></v-text-field>
            <v-text-field
              v-model="pedidoEditado.total"
              label="Total"
              type="number"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cerrarFormulario"
            >Cancelar</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="guardarPedido"
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
    title: "Pedidos",
  },
});
import { ref, reactive, computed } from "vue";

const headers = [
  { title: "ID", key: "id" },
  { title: "Cliente", key: "cliente" },
  { title: "Fecha", key: "fecha" },
  { title: "Total", key: "total" },
  { title: "Estado", key: "estado" },
  { title: "Acciones", key: "acciones", sortable: false, align: "end" },
];

const headersConfirmados = [
  { title: "ID", key: "id" },
  { title: "Cliente", key: "cliente" },
  { title: "Fecha", key: "fecha" },
  { title: "Total", key: "total" },
  { title: "Acciones", key: "acciones", sortable: false, align: "end" },
];

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
  // Añade más pedidos aquí
]);

const pedidosPendientes = computed(() => {
  return pedidos.value.filter((pedido) => pedido.estado === "Pendiente");
});

const ultimosPedidosConfirmados = computed(() => {
  return pedidos.value
    .filter((pedido) => pedido.estado === "Confirmado")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5);
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

const abrirFormularioNuevoPedido = () => {
  formularioTitulo.value = "Nuevo Pedido";
  pedidoEditado.id = null;
  pedidoEditado.cliente = "";
  pedidoEditado.fecha = "";
  pedidoEditado.total = 0;
  dialogoFormulario.value = true;
};

const verPedido = (item) => {
  // Implementa la lógica para ver el pedido
  console.log("Ver pedido:", item);
};

const imprimirPedido = (item) => {
  // Implementa la lógica para imprimir el pedido
  console.log("Imprimir pedido:", item);
};

const confirmarPedido = (item) => {
  item.estado = "Confirmado";
  item.fechaConfirmacion = new Date().toISOString().split("T")[0]; // Añadir fecha de confirmación
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
  // Implementa la lógica para borrar el pedido
  console.log("Borrar pedido:", item);
};

const cerrarFormulario = () => {
  dialogoFormulario.value = false;
};

const guardarPedido = () => {
  // Implementa la lógica para guardar el pedido
  console.log("Guardar pedido:", pedidoEditado);
  cerrarFormulario();
};
</script>

<template>
  <div class="w-full flex py-4">
    <div class="w-full flex flex-col items-center justify-center">
      <div
        class="w-full flex flex-row items-center sm:justify-center pb-5 overflow-x-auto no-scrollbar"
      >
        <Category
          v-for="(categoria, index) in categorias"
          :key="index"
          :titulo="categoria.titulo"
          :icono="categoria.icono"
        />
      </div>

      <div class="w-full flex justify-end">
        <button
          @click="abrirModalFiltros"
          class="bg-[#3e40bf] text-white text-sm font-medium px-6 py-2 rounded-full flex"
        >
          <MdiIcon name="FilterVariant" :size="20" class="mr-2" />
          Filtros
        </button>
      </div>

      <div class="w-full flex flex-col items-center justify-center py-5">
        <Restaurant
          :shops="shopsFiltrados"
          @restaurant-click="goToRestaurant"
        />
      </div>
    </div>

    <!-- Modal de filtros -->
    <div
      v-if="mostrarModalFiltros"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-80">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Filtros</h2>
          <button
            @click="cerrarModalFiltros"
            class="text-black text-sm font-medium px-2 py-2 rounded-full shadow-md hover:bg-[#3e40bf] hover:!text-white transition-all duration-100"
          >
            <MdiIcon name="Close" :size="24" />
          </button>
        </div>

        <div class="mb-4">
          <label for="localidad" class="block mb-2 text-gray-600"
            >Localidad:</label
          >
          <select
            id="localidad"
            v-model="filtros.localidad"
            class="w-full border rounded-md px-2 py-1"
          >
            <option value="">Todas</option>
            <option
              v-for="localidad in localidades"
              :key="localidad"
              :value="localidad"
            >
              {{ getLocalidad(localidad) }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <p class="mb-2 text-gray-600">Tipo de servicio:</p>
          <label class="block mb-2">
            <input
              type="radio"
              v-model="filtros.tipoServicio"
              value="takeaway"
              class="mr-2"
            />
            Take Away
          </label>
          <label class="block">
            <input
              type="radio"
              v-model="filtros.tipoServicio"
              value="delivery"
              class="mr-2"
            />
            Delivery
          </label>
        </div>

        <button
          @click="resetearFiltros"
          class="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-full w-full mb-2"
        >
          Resetear filtros
        </button>
        <button
          @click="aplicarFiltros"
          class="w-full bg-[#3e40bf] text-white px-4 py-2 rounded-full"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import shopsData from "@/data.json";

export default {
  data() {
    return {
      shops: shopsData.shops,
      categorias: [
        { titulo: "Hamburguesas", icono: "hamburger" },
        { titulo: "Empanadas", icono: "Seed" },
        { titulo: "Pizzas", icono: "pizza" },
        { titulo: "Papas Fritas", icono: "FrenchFries" },
        { titulo: "Pollo", icono: "FoodDrumstick" },
        { titulo: "Ensaladas", icono: "Bowl" },
      ],
      filtros: {
        localidad: "",
        tipoServicio: "",
      },
      localidades: [],
      mostrarModalFiltros: false,
    };
  },
  computed: {
    shopsFiltrados() {
      return this.shops.filter((shop) => {
        const cumpleLocalidad =
          !this.filtros.localidad || shop.localidad === this.filtros.localidad;
        const cumpleTipoServicio =
          !this.filtros.tipoServicio || shop[this.filtros.tipoServicio];
        return cumpleLocalidad && cumpleTipoServicio;
      });
    },
  },
  methods: {
    goToRestaurant(restaurantId) {
      this.$router.push(`/restaurant/${restaurantId}`);
    },
    abrirModalFiltros() {
      this.mostrarModalFiltros = true;
    },
    cerrarModalFiltros() {
      this.mostrarModalFiltros = false;
    },
    resetearFiltros() {
      this.filtros = {
        localidad: "",
        tipoServicio: "",
      };
    },

    aplicarFiltros() {
      this.cerrarModalFiltros();
    },
    getLocalidad(localidadId) {
      const localidades = {
        1: "San Clemente del Tuyú",
        2: "Las Toninas",
        3: "Santa Teresita",
        4: "Mar del Tuyú",
        5: "Costa del Este",
        6: "Aguas Verdes",
        7: "La Lucila del Mar",
        8: "San Bernardo",
        9: "Mar de Ajó",
        10: "Nueva Atlantis",
        11: "Punta Médanos",
        12: "Pinar del Sol",
      };
      return localidades[localidadId] || "Desconocida";
    },
  },
  created() {
    // Obtener todas las localidades únicas de los shops
    this.localidades = [...new Set(this.shops.map((shop) => shop.localidad))];
  },
};
</script>

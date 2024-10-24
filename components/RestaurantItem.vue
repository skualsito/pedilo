<template>
  <div>
    <div class="w-full group cursor-pointer">
      <div
        class="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col sm:h-[325px] transition-shadow duration-300 group-hover:shadow-black/40"
      >
        <div class="flex sm:flex-col h-full">
          <div
            class="relative w-28 h-28 sm:w-full sm:h-48 mr-4 sm:mr-0 flex-shrink-0"
          >
            <img
              :src="`/images/${item.imagen}`"
              :alt="item.titulo"
              class="w-full h-full object-cover"
            />
            <div
              v-if="item.calificacion"
              class="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-lg px-2 py-1 flex items-center"
            >
              <MdiIcon class="text-yellow-400 mr-1" name="star" :size="16" />
              <span class="text-gray-600 text-sm">{{ item.calificacion }}</span>
            </div>
          </div>
          <div class="flex-grow pl-0 pr-2 sm:pl-4 sm:pr-4 py-2 flex flex-col">
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold line-clamp-1 mb-2">
                {{ item.titulo }}
              </h3>
              <p
                v-if="item.descripcion"
                class="text-gray-600 text-sm mb-2 line-clamp-2"
              >
                {{ item.descripcion }}
              </p>
            </div>
            <div class="flex items-center justify-between mt-auto">
              <span v-if="item.precio" class="text-[#3e40bf] font-medium">
                {{ item.precio }}
              </span>
              <button
                @click.stop="openModal"
                class="bg-[#3e40bf] text-white p-2 rounded-full hover:bg-[#2d2e8f] transition-colors duration-300"
                title="Añadir al carrito"
              >
                <MdiIcon name="cartPlus" :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de ingredientes -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <MdiIcon name="close" :size="24" />
        </button>
        <h2 class="text-xl font-bold mb-4">Ingredientes {{ item.titulo }}</h2>
        <IngredientesComponent
          :ingredientes="ingredientes"
          @update="updateIngredientes"
        />
        <div class="mt-6 flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            @click="addToCartWithIngredientes"
            class="bg-[#3e40bf] text-white px-4 py-2 rounded"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cartStore";
import IngredientesComponent from "./IngredientesComponent.vue";

export default {
  components: {
    IngredientesComponent,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      ingredientes: [],
    };
  },
  methods: {
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
    openModal() {
      this.ingredientes = JSON.parse(
        JSON.stringify(this.item.ingredientes || [])
      );
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    removeIngrediente(index) {
      if (this.ingredientes[index].cantidad > 0) {
        this.ingredientes[index].cantidad--;
      }
    },
    addIngrediente(index) {
      this.ingredientes[index].cantidad++;
    },
    addToCartWithIngredientes() {
      const cartStore = useCartStore();
      cartStore.addItem({
        id: this.item.id,
        title: this.item.titulo,
        price: parseFloat(this.item.precio.replace("$", "").replace(",", "")),
        ingredientes: this.ingredientes,
        restaurantName: this.$parent.restaurant.titulo,
      });
      this.closeModal();
    },
    updateIngredientes(newIngredientes) {
      this.ingredientes = newIngredientes;
    },
  },
};
</script>

<style scoped>
.shadow-darker {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
}
</style>

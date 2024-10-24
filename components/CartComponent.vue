<template>
  <div class="flex justify-between items-center py-2">
    <div>
      <h4 class="font-medium">{{ title }}</h4>
      <p class="text-sm text-gray-500">${{ price }} x {{ quantity }}</p>
      <button
        @click="openIngredientesModal"
        class="text-sm text-[#3e40bf] mt-1 hover:underline"
      >
        Modificar ingredientes
      </button>
    </div>
    <div class="flex items-center">
      <button
        @click="$emit('decrease')"
        class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
      >
        <MdiIcon name="minus" :size="16" />
      </button>
      <span class="w-8 text-center">{{ quantity }}</span>
      <button
        @click="$emit('increase')"
        class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
      >
        <MdiIcon name="plus" :size="16" />
      </button>
    </div>

    <!-- Modal de ingredientes -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <MdiIcon name="close" :size="24" />
        </button>
        <h2 class="text-xl font-bold mb-4">Ingredientes {{ title }}</h2>
        <IngredientesComponent
          :ingredientes="localIngredientes"
          @update="updateLocalIngredientes"
        />
        <div class="mt-6 flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            @click="updateIngredientes"
            class="bg-[#3e40bf] text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import IngredientesComponent from "./IngredientesComponent.vue";

export default {
  components: {
    IngredientesComponent,
  },
  props: {
    title: String,
    price: Number,
    quantity: Number,
    ingredientes: Array,
  },
  setup(props, { emit }) {
    const showModal = ref(false);
    const localIngredientes = ref([]);

    const openIngredientesModal = () => {
      localIngredientes.value = JSON.parse(JSON.stringify(props.ingredientes));
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const removeIngrediente = (index) => {
      if (localIngredientes.value[index].cantidad > 0) {
        localIngredientes.value[index].cantidad--;
      }
    };

    const addIngrediente = (index) => {
      localIngredientes.value[index].cantidad++;
    };

    const updateIngredientes = () => {
      emit("update-ingredientes", localIngredientes.value);
      closeModal();
    };

    const updateLocalIngredientes = (newIngredientes) => {
      localIngredientes.value = newIngredientes;
    };

    return {
      showModal,
      localIngredientes,
      openIngredientesModal,
      closeModal,
      removeIngrediente,
      addIngrediente,
      updateIngredientes,
      updateLocalIngredientes,
    };
  },
};
</script>

<template>
  <div class="flex justify-between items-center py-2">
    <div>
      <h4 class="font-medium">{{ title }}</h4>
      <p class="text-sm text-gray-500">${{ price }} x {{ quantity }}</p>
      <button
        @click="openIngredientesModal"
        v-if="ingredientes.length > 0"
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

    <IngredientesComponent
      :ingredientes="ingredientes"
      :showModal="showModal"
      :title="title"
      confirmButtonText="Actualizar"
      @update="updateIngredientes"
      @close="closeModal"
    />
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

    const openIngredientesModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const updateIngredientes = (newIngredientes) => {
      emit("update-ingredientes", newIngredientes);
      closeModal();
    };

    return {
      showModal,
      openIngredientesModal,
      closeModal,
      updateIngredientes,
    };
  },
};
</script>

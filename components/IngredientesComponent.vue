<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-0"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <MdiIcon name="close" :size="24" />
      </button>
      <h2 class="text-xl font-bold mb-4">Ingredientes {{ title }}</h2>
      <div class="mt-2">
        <ul class="text-xs">
          <li
            v-for="(ingrediente, index) in localIngredientes"
            :key="index"
            class="flex justify-between items-center mb-1 text-sm"
          >
            <span>{{ ingrediente.nombre }}</span>
            <div class="flex items-center">
              <button
                @click="updateIngrediente(index, -1)"
                class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
              >
                <MdiIcon name="minus" :size="16" />
              </button>
              <div class="w-8 text-center">
                <span>{{ ingrediente.cantidad }}</span>
              </div>
              <button
                @click="updateIngrediente(index, 1)"
                class="w-8 h-8 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
              >
                <MdiIcon name="plus" :size="16" />
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="closeModal"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
        >
          Cancelar
        </button>
        <button
          @click="confirmIngredientes"
          class="bg-[#3e40bf] text-white px-4 py-2 rounded"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    ingredientes: {
      type: Array,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    confirmButtonText: {
      type: String,
      default: "Confirmar",
    },
  },
  emits: ["update", "close"],
  setup(props, { emit }) {
    const localIngredientes = ref([]);

    watch(
      () => props.showModal,
      (newValue) => {
        if (newValue) {
          localIngredientes.value = JSON.parse(
            JSON.stringify(props.ingredientes)
          );
        }
      }
    );

    const updateIngrediente = (index, change) => {
      localIngredientes.value[index].cantidad += change;
      if (localIngredientes.value[index].cantidad < 0) {
        localIngredientes.value[index].cantidad = 0;
      }
    };

    const closeModal = () => {
      emit("close");
    };

    const confirmIngredientes = () => {
      emit("update", localIngredientes.value);
      closeModal();
    };

    return {
      localIngredientes,
      updateIngrediente,
      closeModal,
      confirmIngredientes,
    };
  },
};
</script>

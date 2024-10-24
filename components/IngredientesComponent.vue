<template>
  <div class="mt-2">
    <ul class="text-xs">
      <li
        v-for="(ingrediente, index) in ingredientes"
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
</template>

<script>
export default {
  props: {
    ingredientes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateIngrediente(index, change) {
      const newIngredientes = [...this.ingredientes];
      newIngredientes[index].cantidad += change;
      if (newIngredientes[index].cantidad < 0) {
        newIngredientes[index].cantidad = 0;
      }
      this.$emit("update", newIngredientes);
    },
  },
};
</script>

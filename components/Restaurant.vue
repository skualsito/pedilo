<template>
  <div class="w-full">
    <div class="flex flex-wrap -mx-2">
      <div
        v-for="shop in shops"
        :key="shop.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 group cursor-pointer"
        @click="onRestaurantClick(shop.id)"
      >
        <div
          class="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[350px] transition-shadow duration-300 group-hover:shadow-black/40"
        >
          <div
            class="flex justify-between items-center m-2 rounded-lg overflow-hidden"
          >
            <img
              :src="`/images/${shop.logo}`"
              alt="Restaurant"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="flex flex-col flex-grow">
            <div class="px-4">
              <h3 class="text-lg font-semibold mb-2 line-clamp-1">
                {{ shop.titulo }}
              </h3>
              <p class="text-gray-600 text-sm mb-2 line-clamp-2">
                {{ shop.descripcion }}
              </p>
            </div>
            <div class="mt-auto pb-4 px-4 flex items-center justify-between">
              <span class="text-[#3e40bf] text-sm">{{
                getLocalidad(shop.localidad)
              }}</span>

              <MdiIcon
                class="text-gray-600 text-sm"
                name="arrowRight"
                :size="16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      required: true,
    },
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
    onRestaurantClick(shopId) {
      this.$emit("restaurant-click", shopId);
    },
  },
};
</script>

<style scoped>
.shadow-darker {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
}
</style>

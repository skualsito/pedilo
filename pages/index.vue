<template>
  <div class="w-full flex py-4">
    <div class="w-full flex flex-col items-center justify-center">
      <div class="w-full flex flex-row items-center justify-center py-5">
        <Category
          v-for="(categoria, index) in categorias"
          :key="index"
          :titulo="categoria.titulo"
          :icono="categoria.icono"
        />
      </div>
      <h1 class="text-2l font-semibold text-gray-600 self-start">
        Restaurantes
      </h1>
      <div class="w-full flex flex-col items-center justify-center py-5">
        <Restaurant :shops="shops" @restaurant-click="goToRestaurant" />
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
        { titulo: "Papas Fritas", icono: "FrenchFries" },
        { titulo: "Pizzas", icono: "pizza" },
        { titulo: "Cervezas", icono: "beer" },
        { titulo: "Ensaladas", icono: "Bowl" },
      ],
    };
  },
  methods: {
    goToRestaurant(restaurantId) {
      this.$router.push(`/restaurant/${restaurantId}`);
    },
  },
};
</script>

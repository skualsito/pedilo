<template>
  <div class="py-4">
    <div v-if="restaurant">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-4">{{ restaurant.titulo }}</h1>
        <button
          @click="goBack"
          class="text-black text-sm font-medium px-2 py-2 rounded-full shadow-md hover:bg-[#3e40bf] hover:!text-white transition-all duration-100"
        >
          <MdiIcon name="close" :size="20" />
        </button>
      </div>

      <p class="mb-2">
        <strong>Descripción:</strong> {{ restaurant.descripcionLarga }}
      </p>
      <p class="mb-2"><strong>Dirección:</strong> {{ restaurant.direccion }}</p>
      <p v-if="restaurant.whatsapp" class="mb-2">
        <strong>WhatsApp:</strong> {{ restaurant.whatsapp }}
      </p>
      <p v-if="restaurant.instagram" class="mb-2">
        <strong>Instagram:</strong> @{{ restaurant.instagram }}
      </p>
      <p v-if="restaurant.facebook" class="mb-2">
        <strong>Facebook:</strong>
        <a
          :href="restaurant.facebook"
          target="_blank"
          rel="noopener noreferrer"
          >{{ restaurant.facebook }}</a
        >
      </p>
      <h2 class="text-xl font-semibold mt-4 mb-2">Menú</h2>
      <div
        v-for="category in restaurant.menu"
        :key="category.titulo"
        class="mb-4"
      >
        <h3 class="text-lg font-semibold mb-2">{{ category.titulo }}</h3>
        <ul>
          <li v-for="item in category.items" :key="item.titulo" class="mb-2">
            <strong>{{ item.titulo }}</strong>
            <p v-if="item.descripcion" class="text-sm text-gray-600">
              {{ item.descripcion }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>Cargando...</div>
  </div>
</template>

<script>
import shopsData from "@/data.json";

export default {
  data() {
    return {
      restaurant: null,
    };
  },
  mounted() {
    const restaurantId = parseInt(this.$route.params.id);
    this.restaurant = shopsData.shops.find((shop) => shop.id === restaurantId);
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

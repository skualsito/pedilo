<template>
  <div class="py-4">
    <div v-if="restaurant">
      <div class="flex flex-col items-center mb-4">
        <div class="relative">
          <img
            :src="`/images/${restaurant.logo}`"
            :alt="restaurant.titulo"
            class="w-24 h-24 rounded-xl shadow-md mb-2 object-cover"
          />
          <div
            class="absolute bottom-0 -right-2 transform -translate-y-1/6 bg-white rounded-xl px-2 py-1 flex items-center shadow-md"
          >
            <MdiIcon name="star" :size="12" class="text-yellow-400 mr-1" />
            <span class="text-gray-600 text-xs">{{
              restaurant.calificacion
            }}</span>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-center mt-4">
          {{ restaurant.titulo }}
        </h1>
      </div>
      <div class="absolute top-4 right-4">
        <button
          @click="goBack"
          class="text-black text-sm font-medium px-2 py-2 rounded-full shadow-md hover:bg-[#3e40bf] hover:!text-white transition-all duration-100"
        >
          <MdiIcon name="close" :size="20" />
        </button>
      </div>

      <p class="mb-2 text-gray-600">
        {{ restaurant.descripcionLarga }}
      </p>
      <p class="mb-2 flex items-center">
        <MdiIcon name="mapMarker" :size="20" class="mr-1" />
        <span class="text-gray-600">{{ restaurant.direccion }}</span>
      </p>
      <div class="flex flex-col sm:flex-row">
        <div v-if="restaurant.whatsapp" class="mb-2 mr-2 w-fit">
          <a
            :href="restaurant.whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              class="flex items-center bg-green-500 text-white px-3 py-1 rounded-full"
            >
              <MdiIcon name="whatsapp" :size="20" class="mr-2" />
              <span>WhatsApp</span>
            </button>
          </a>
        </div>
        <div v-if="restaurant.instagram" class="mb-2 mr-2 w-fit">
          <a
            :href="restaurant.instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              class="flex items-center bg-pink-500 text-white px-3 py-1 rounded-full"
            >
              <MdiIcon name="instagram" :size="20" class="mr-2" />
              <span>Instagram</span>
            </button>
          </a>
        </div>
        <div v-if="restaurant.facebook" class="mb-2 mr-2 w-fit">
          <a
            :href="restaurant.facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              class="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full"
            >
              <MdiIcon name="facebook" :size="20" class="mr-2" />
              <span>Facebook</span>
            </button>
          </a>
        </div>
      </div>
      <div
        v-for="category in restaurant.menu"
        :key="category.titulo"
        class="w-full mb-4"
      >
        <h3 class="text-xl font-bold mt-4 mb-2">{{ category.titulo }}</h3>
        <hr class="my-2" />
        <ul class="flex flex-wrap -mx-2">
          <li
            v-for="item in category.items"
            :key="item.titulo"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 cursor-pointer"
          >
            <RestaurantItem :item="item" />
          </li>
        </ul>
      </div>
    </div>
    <div v-else>Cargando...</div>
  </div>
</template>

<script>
import shopsData from "@/data.json";
import RestaurantItem from "~/components/RestaurantItem.vue";

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
  components: {
    RestaurantItem,
  },
};
</script>

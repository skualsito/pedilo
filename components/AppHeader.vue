<template>
  <header>
    <div class="w-full h-[60px] flex items-center justify-between py-2">
      <!-- Logo -->
      <div class="flex items-center">
        <span class="text-lg font-semibold text-[#3e40bf] ml-1">PEDILO</span>
      </div>

      <!-- Search Bar -->
      <div
        class="flex items-center w-[600px] bg-[rgb(244,245,247)] rounded-full px-4 py-2"
      >
        <MdiIcon name="magnify" :size="24" class="text-[#BDBDBD]" />
        <input
          type="text"
          placeholder="Buscar un restaurante o comidas"
          class="bg-transparent outline-none w-full pl-4 text-sm text-[#BDBDBD]"
        />
        <button
          class="bg-[#3e40bf] text-white text-sm font-medium px-6 py-2 rounded-full"
        >
          Buscar
        </button>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <!-- Notification Icon -->
        <div class="relative">
          <MdiIcon
            name="cart"
            :size="24"
            class="text-[#4F4F4F] cursor-pointer hover:text-[#3e40bf]"
            @click="openCart"
          />
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartItemCount }}
          </span>
        </div>

        <!-- Profile Image -->
        <img
          src="https://placehold.co/40x40"
          alt="Profile"
          class="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { useCartStore } from "@/store/cartStore";
import { storeToRefs } from "pinia";

export default {
  name: "AppHeader",
  setup() {
    const cartStore = useCartStore();
    const { itemCount } = storeToRefs(cartStore);

    return {
      openCart: cartStore.openCart,
      cartItemCount: itemCount,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para el header */
</style>

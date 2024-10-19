<template>
  <div
    :class="[
      'w-[350px] max-w-full bg-white rounded-lg shadow-lg z-30 p-6 fixed inset-y-0 right-0 h-full flex flex-col transition-transform ease-in-out transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold">Mi Orden</h1>
      <button
        @click="closeCart"
        class="text-black text-sm font-medium px-2 py-2 rounded-full shadow-md hover:bg-[#3e40bf] hover:!text-white transition-all duration-100"
      >
        <MdiIcon name="close" :size="20" />
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <h3 class="text-sm text-[#3e40bf] font-semibold">BACÁN BURGUER</h3>
        <CartComponent
          v-for="item in cartItems"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :quantity="item.quantity"
          @increase="increaseQuantity(item.id)"
          @decrease="decreaseQuantity(item.id)"
        />
      </div>
    </div>
    <div class="space-y-4 mt-auto">
      <!-- Total Amount -->
      <div class="mt-6 border-t pt-4">
        <div class="flex justify-between text-gray-500">
          <p class="text-lg">Total</p>
          <p class="text-lg font-semibold text-black">${{ totalAmount }}</p>
        </div>
      </div>

      <!-- Checkout Button -->
      <button
        class="w-full mt-6 bg-[#3e40bf] text-white py-3 rounded-lg flex items-center justify-center"
      >
        <span class="mr-2">Proceder al pago</span>
        <MdiIcon name="arrowRight" :size="20" />
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cartStore";
import { storeToRefs } from "pinia";
import CartComponent from "./CartComponent.vue";

export default {
  components: {
    CartComponent,
  },
  setup() {
    const cartStore = useCartStore();
    const { items: cartItems, isOpen, totalAmount } = storeToRefs(cartStore);

    const closeCart = () => cartStore.closeCart();
    const increaseQuantity = (itemId) =>
      cartStore.updateQuantity(
        itemId,
        cartStore.items.find((item) => item.id === itemId).quantity + 1
      );
    const decreaseQuantity = (itemId) => {
      const item = cartStore.items.find((item) => item.id === itemId);
      if (item.quantity > 1) {
        cartStore.updateQuantity(itemId, item.quantity - 1);
      } else {
        cartStore.removeItem(itemId);
      }
    };

    return {
      cartItems,
      isOpen,
      totalAmount,
      closeCart,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>

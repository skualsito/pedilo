<template>
  <div class="max-w-[1040px] mx-auto">
    <AppHeader @open-cart="handleOpenCart" />
    <slot />
    <Cart :isOpen="isCartOpen" @close="closeCart" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import { useCartStore } from "@/store/cartStore";
import { storeToRefs } from "pinia";

export default {
  components: {
    AppHeader,
  },
  setup() {
    const cartStore = useCartStore();
    const { isOpen } = storeToRefs(cartStore);

    return {
      isCartOpen: isOpen,
      closeCart: cartStore.closeCart,
    };
  },
  methods: {
    handleOpenCart() {
      this.$root.$emit("open-cart");
    },
  },
};
</script>

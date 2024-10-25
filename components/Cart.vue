<template>
  <div
    :class="[
      'w-full sm:w-[350px] max-w-full bg-white shadow-2xl z-30 p-6 fixed inset-y-0 right-0 h-full flex flex-col transition-transform ease-in-out transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold">
        {{ showSummary ? "Resumen de Compra" : "Mi Orden" }}
      </h1>
      <button
        @click="closeCart"
        class="text-black text-sm font-medium px-2 py-2 rounded-full shadow-md hover:bg-[#3e40bf] hover:!text-white transition-all duration-100"
      >
        <MdiIcon name="close" :size="20" />
      </button>
    </div>

    <div
      v-if="!showSummary"
      class="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]"
    >
      <div
        v-for="(restaurantItems, restaurantName) in groupedCartItems"
        :key="restaurantName"
      >
        <NuxtLink
          :to="`/restaurant/${getRestaurantId(restaurantName)}`"
          class="text-sm text-[#3e40bf] font-semibold hover:underline"
        >
          {{ restaurantName }}
        </NuxtLink>
        <CartComponent
          v-for="item in restaurantItems"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :quantity="item.quantity"
          :ingredientes="item.ingredientes"
          @increase="increaseQuantity(item)"
          @decrease="decreaseQuantity(item)"
          @update-ingredientes="updateIngredientes(item, $event)"
        />
      </div>
    </div>

    <div v-else class="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div
        v-for="(restaurantItems, restaurantName) in groupedCartItems"
        :key="restaurantName"
        class="mb-4"
      >
        <h3 class="font-bold">{{ restaurantName }}</h3>
        <ul class="list-disc pl-5">
          <li v-for="item in restaurantItems" :key="item.id" class="text-sm">
            {{ item.title }} x {{ item.quantity }} <br />
            <strong class="font-semibold"
              >${{ (item.price * item.quantity).toFixed(2) }}</strong
            >
          </li>
        </ul>
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

      <!-- Nota del cliente -->
      <div v-if="showSummary" class="space-y-2">
        <h3 class="text-md font-semibold">Nota para el restaurante</h3>
        <textarea
          v-model="clientNote"
          class="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Agrega una nota para tu pedido (opcional)"
        ></textarea>
      </div>

      <!-- Método de pago -->
      <div v-if="showSummary" class="space-y-4">
        <h3 class="text-md font-semibold mt-4">Método de pago</h3>
        <div class="flex space-x-4">
          <button
            @click="paymentMethod = 'efectivo'"
            :class="[
              'px-4 py-2 rounded',
              paymentMethod === 'efectivo'
                ? 'bg-[#3e40bf] text-white'
                : 'bg-gray-200',
            ]"
          >
            💵 Efectivo
          </button>
          <button
            @click="paymentMethod = 'tarjeta'"
            :class="[
              'px-4 py-2 rounded',
              paymentMethod === 'tarjeta'
                ? 'bg-[#3e40bf] text-white'
                : 'bg-gray-200',
            ]"
          >
            💳 Tarjeta
          </button>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex space-x-4">
        <button
          v-if="showSummary"
          @click="volverAtras"
          class="flex-1 bg-gray-200 text-black py-3 rounded-lg flex items-center justify-center"
        >
          <span class="mr-2">Volver</span>
          <MdiIcon name="arrowLeft" :size="20" />
        </button>
        <button
          @click="procederAlPago"
          class="flex-1 bg-[#3e40bf] text-white py-3 rounded-lg flex items-center justify-center"
          :class="{ 'opacity-80': Object.keys(groupedCartItems).length === 0 }"
          :disabled="Object.keys(groupedCartItems).length === 0"
        >
          <span class="mr-2">{{
            showSummary ? "Pagar" : "Proceder al pago"
          }}</span>
          <MdiIcon name="arrowRight" :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cartStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import CartComponent from "./CartComponent.vue";

export default {
  components: {
    CartComponent,
  },
  setup() {
    const cartStore = useCartStore();
    const { items: cartItems, isOpen, totalAmount } = storeToRefs(cartStore);

    const groupedCartItems = computed(() => {
      const grouped = {};
      cartItems.value.forEach((item) => {
        if (!grouped[item.restaurantName]) {
          grouped[item.restaurantName] = [];
        }
        grouped[item.restaurantName].push(item);
      });
      return grouped;
    });

    const closeCart = () => cartStore.closeCart();
    const increaseQuantity = (item) =>
      cartStore.updateQuantity(item, item.quantity + 1);
    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item, item.quantity - 1);
      } else {
        cartStore.removeItem(item);
      }
    };
    const updateIngredientes = (item, newIngredientes) => {
      cartStore.updateIngredientes(item, newIngredientes);
    };

    const getRestaurantId = (restaurantName) => {
      const firstItem = cartItems.value.find(
        (item) => item.restaurantName === restaurantName
      );
      return firstItem ? firstItem.restaurantId : null;
    };

    const showSummary = ref(false);
    const paymentMethod = ref("");
    const clientNote = ref("");

    const procederAlPago = () => {
      if (!showSummary.value) {
        showSummary.value = true;
      } else if (paymentMethod.value) {
        // Aquí iría la lógica para procesar el pago
        console.log("Procesando pago con", paymentMethod.value);
        console.log("Nota del cliente:", clientNote.value);
        // Resetear el estado después del pago
        showSummary.value = false;
        paymentMethod.value = "";
        clientNote.value = ""; // Limpiar la nota
        // Vaciar el carrito
        cartStore.clearCart();
      } else {
        alert("Por favor, seleccione un método de pago");
      }
    };

    const volverAtras = () => {
      showSummary.value = false;
      paymentMethod.value = "";
      clientNote.value = ""; // Limpiar la nota al volver atrás
    };

    return {
      groupedCartItems,
      isOpen,
      totalAmount,
      closeCart,
      increaseQuantity,
      decreaseQuantity,
      updateIngredientes,
      getRestaurantId,
      showSummary,
      paymentMethod,
      clientNote,
      procederAlPago,
      volverAtras,
    };
  },
};
</script>

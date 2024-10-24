import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false,
  }),
  getters: {
    itemCount: (state) => state.items.length,
    totalAmount: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
  },
  actions: {
    addItem(item) {
      const existingItemIndex = this.items.findIndex(
        (i) =>
          i.id === item.id &&
          i.restaurantName === item.restaurantName &&
          JSON.stringify(i.ingredientes) === JSON.stringify(item.ingredientes)
      );
      if (existingItemIndex !== -1) {
        this.items[existingItemIndex].quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(item) {
      const index = this.items.findIndex(
        (i) =>
          i.id === item.id &&
          i.restaurantName === item.restaurantName &&
          JSON.stringify(i.ingredientes) === JSON.stringify(item.ingredientes)
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    updateQuantity(item, quantity) {
      const foundItem = this.items.find(
        (i) =>
          i.id === item.id &&
          i.restaurantName === item.restaurantName &&
          JSON.stringify(i.ingredientes) === JSON.stringify(item.ingredientes)
      );
      if (foundItem) {
        foundItem.quantity = quantity;
      }
    },
    updateIngredientes(item, newIngredientes) {
      const index = this.items.findIndex(
        (i) =>
          i.id === item.id &&
          i.restaurantName === item.restaurantName &&
          JSON.stringify(i.ingredientes) === JSON.stringify(item.ingredientes)
      );
      if (index !== -1) {
        // Si los ingredientes son diferentes, creamos un nuevo item
        if (
          JSON.stringify(this.items[index].ingredientes) !==
          JSON.stringify(newIngredientes)
        ) {
          this.items.push({
            ...this.items[index],
            ingredientes: newIngredientes,
            quantity: 1,
          });
          this.items[index].quantity--;
          if (this.items[index].quantity === 0) {
            this.items.splice(index, 1);
          }
        } else {
          this.items[index].ingredientes = newIngredientes;
        }
      }
    },
    openCart() {
      this.isOpen = true;
    },
    closeCart() {
      this.isOpen = false;
    },
    clearCart() {
      this.items = [];
    },
  },
});

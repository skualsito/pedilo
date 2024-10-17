import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [
      { id: 1, title: "Chesse Burguer", price: 10500, quantity: 2 },
      { id: 2, title: "Blue Onion Burger", price: 12500, quantity: 1 },
      {
        id: 3,
        title: "Porción de papas fritas con cheddar y bacon",
        price: 8750,
        quantity: 3,
      },
    ],
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
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    updateQuantity(itemId, quantity) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
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

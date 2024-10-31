<template>
  <div>
    <header>
      <div class="w-full bg-white fixed top-0 left-0 right-0 z-30">
        <div
          class="w-full mx-auto max-w-[1056px] h-[60px] flex items-center justify-between py-2 px-4"
        >
          <!-- Logo -->
          <div class="flex items-center">
            <nuxt-link to="/">
              <span class="text-lg font-semibold text-[#3e40bf] ml-1"
                >PEDILO</span
              >
            </nuxt-link>
          </div>

          <!-- Icons -->
          <div class="flex items-center space-x-4">
            <!-- Notification Icon -->
            <div
              class="w-10 h-10 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100 relative"
            >
              <MdiIcon name="cart" :size="24" @click="openCart" />
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItemCount }}
              </span>
            </div>

            <!-- Imagen de perfil o iniciales o icono de usuario -->
            <div v-if="isAuthenticated" class="relative">
              <div
                @click="toggleUserMenu"
                class="w-10 h-10 rounded-full overflow-hidden shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:shadow-black/20 transition-all duration-100"
              >
                <img
                  v-if="user.imagen"
                  :src="user.imagen"
                  :alt="user.name"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-[#3e40bf] flex items-center justify-center text-white font-semibold"
                >
                  {{ getUserInitials(user.name) }}
                </div>
              </div>
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
              >
                <button
                  v-if="user.isAdmin"
                  @click="goToAdmin"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3e40bf] hover:text-white hover:rounded-t-md transition-all duration-100 w-full text-left"
                >
                  Admin
                </button>
                <button
                  @click="goToProfile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3e40bf] hover:text-white hover:rounded-t-md transition-all duration-100 w-full text-left"
                >
                  Perfil
                </button>
                <button
                  @click="goToContact"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3e40bf] hover:text-white hover:rounded-t-md transition-all duration-100 w-full text-left"
                >
                  Contacto
                </button>
                <hr />
                <button
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3e40bf] hover:text-white hover:rounded-b-md hover:border-t-[#3e40bf] transition-all duration-100 w-full text-left"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
            <div
              v-else
              @click="openLoginModal"
              class="w-10 h-10 rounded-full overflow-hidden shadow-lg flex items-center justify-center cursor-pointer text-[#4F4F4F] hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
            >
              <MdiIcon name="account" :size="24" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-center mt-14">
        <!-- Search Bar 244,245,247 -->
        <div
          class="flex items-center w-full max-w-[800px] bg-[rgb(244,245,247)] rounded-full pl-4 pr-2 py-2"
        >
          <MdiIcon name="magnify" :size="24" class="text-[#BDBDBD]" />
          <input
            type="text"
            placeholder="Buscar un restaurante o comidas"
            class="bg-transparent outline-none w-full pl-4 text-sm text-[#BDBDBD]"
          />
          <button
            class="bg-[#3e40bf] text-white text-sm font-medium px-6 py-2 rounded-full hidden sm:flex"
          >
            Buscar
          </button>
        </div>
      </div>
    </header>

    <!-- Modal de Login/Registro -->
    <LoginModal v-if="showLoginModal" @close="closeLoginModal" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import LoginModal from "./LoginModal.vue";
import { useRouter } from "vue-router";

export default {
  name: "AppHeader",
  components: {
    LoginModal,
  },
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const { itemCount } = storeToRefs(cartStore);
    const { user, isAuthenticated } = storeToRefs(authStore);
    const router = useRouter();

    function getUserInitials(name) {
      if (!name) return "U";
      if (!name.includes(" ")) return name[0]?.toUpperCase() || "U";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("");
    }

    const showLoginModal = ref(false);
    const showUserMenu = ref(false);

    function openCart() {
      showUserMenu.value = false;
      cartStore.openCart();
    }

    function openLoginModal() {
      showLoginModal.value = true;
    }

    function closeLoginModal() {
      showLoginModal.value = false;
    }

    function toggleUserMenu() {
      showUserMenu.value = !showUserMenu.value;
    }

    function goToAdmin() {
      showUserMenu.value = false;
      router.push("/admin");
    }

    function goToProfile() {
      showUserMenu.value = false;
      router.push("/perfil");
    }

    function goToContact() {
      showUserMenu.value = false;
      router.push("/contacto");
    }

    function logout() {
      showUserMenu.value = false;
      authStore.logout();
    }

    return {
      openCart,
      cartItemCount: itemCount,
      user,
      isAuthenticated,
      getUserInitials,
      showLoginModal,
      openLoginModal,
      closeLoginModal,
      showUserMenu,
      toggleUserMenu,
      goToAdmin,
      goToProfile,
      goToContact,
      logout,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para el header */
</style>

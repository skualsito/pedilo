<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4">
        {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block mb-2">Mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <div v-if="!isLogin" class="mb-4">
          <label for="confirmPassword" class="block mb-2"
            >Confirmar contraseña</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#3e40bf] text-white px-4 py-2 rounded-full"
        >
          {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
        </button>
      </form>

      <p class="mt-4 text-center">
        {{ isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?" }}
        <a href="#" @click.prevent="toggleForm" class="text-[#3e40bf]">
          {{ isLogin ? "Regístrate" : "Inicia sesión" }}
        </a>
      </p>

      <button
        @click="$emit('close')"
        class="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-full w-full"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";

export default {
  name: "LoginModal",
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    async handleSubmit() {
      const authStore = useAuthStore();
      try {
        if (this.isLogin) {
          await authStore.login(this.email, this.password);
        } else {
          if (this.password !== this.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
          }
          await authStore.register(this.email, this.password);
        }
        this.$emit("close");
      } catch (error) {
        console.error("Error de autenticación:", error);
        alert("Hubo un error. Por favor, intenta de nuevo.");
      }
    },
  },
};
</script>

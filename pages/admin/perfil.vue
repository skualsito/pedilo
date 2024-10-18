<template>
  <v-container fluid>
    <v-form @submit.prevent="guardarCambios">
      <v-text-field
        v-model="perfil.nombre"
        label="Nombre"
        required
      ></v-text-field>
      <v-text-field
        v-model="perfil.email"
        label="Correo electrónico"
        type="email"
        required
      ></v-text-field>
      <v-text-field v-model="perfil.telefono" label="Teléfono"></v-text-field>
      <v-btn type="submit" color="primary">Guardar cambios</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Perfil",
  },
});

const perfil = ref({
  nombre: "",
  email: "",
  telefono: "",
  // ... más campos según sea necesario ...
});

const guardarCambios = async () => {
  try {
    // Aquí iría la lógica para guardar los cambios en el backend
    console.log("Guardando cambios:", perfil.value);
    // Ejemplo: await axios.post('/api/perfil', perfil.value);
    alert("Cambios guardados con éxito");
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    alert("Error al guardar los cambios");
  }
};

// Aquí podrías agregar una función para cargar los datos iniciales del perfil
// const cargarPerfil = async () => { ... }
// onMounted(cargarPerfil);
</script>

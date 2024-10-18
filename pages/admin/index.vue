<template>
  <v-container>
    <p>Bienvenido al panel de administración de PEDILO.</p>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Dashboard",
  },
});
</script>

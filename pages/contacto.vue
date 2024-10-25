<template>
  <v-container>
    <h1 class="text-2xl font-bold mb-4">Contacto</h1>

    <v-form @submit.prevent="enviarMensaje">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formulario.empresa"
            label="Empresa"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formulario.email"
            label="Correo electrónico"
            type="email"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="formulario.mensaje"
            label="Mensaje"
            required
            rows="4"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <button
            type="submit"
            class="bg-[#3e40bf] text-white text-sm font-medium px-6 py-2 rounded-full"
          >
            Enviar Mensaje
          </button>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formulario: {
        empresa: "",
        email: "",
        mensaje: "",
      },
    };
  },
  methods: {
    enviarMensaje() {
      // Aquí puedes implementar la lógica para enviar el mensaje
      console.log("Mensaje a enviar:", this.formulario);
    },
  },
};
</script>

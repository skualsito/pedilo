<template>
  <v-container>
    <h1 class="text-2xl font-bold mb-4">Perfil de Usuario</h1>
    <div class="flex justify-center mb-6">
      <div class="w-32 h-32 rounded-full overflow-hidden shadow-xl">
        <img
          v-if="perfil.previewImagen || perfil.imagen"
          :src="perfil.previewImagen || perfil.imagen"
          alt="Foto de perfil"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600"
        >
          <span class="text-4xl">{{ obtenerIniciales }}</span>
        </div>
      </div>
    </div>

    <v-form @submit.prevent="guardarPerfil">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="perfil.nombre"
            label="Nombre"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="perfil.apellido"
            label="Apellido"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-file-input
            v-model="perfil.imagen"
            label="Imagen de perfil"
            accept="image/*"
            @change="manejarImagen"
          ></v-file-input>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="perfil.telefono"
            label="Teléfono"
            type="tel"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="perfil.direccion"
            label="Dirección"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <button
            type="submit"
            class="bg-[#3e40bf] text-white text-sm font-medium px-6 py-2 rounded-full"
          >
            Guardar Perfil
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
      perfil: {
        nombre: "",
        apellido: "",
        imagen: null,
        previewImagen: null,
        telefono: "",
        direccion: "",
      },
    };
  },
  computed: {
    obtenerIniciales() {
      const nombre = this.perfil.nombre.charAt(0) || "";
      const apellido = this.perfil.apellido.charAt(0) || "";
      return (nombre + apellido).toUpperCase();
    },
  },
  methods: {
    manejarImagen(event) {
      this.perfil.imagen = event.target.files[0];
      if (this.perfil.imagen) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.perfil.previewImagen = e.target.result;
        };
        reader.readAsDataURL(this.perfil.imagen);
      }
    },
    guardarPerfil() {
      // Aquí puedes implementar la lógica para guardar el perfil
      console.log("Perfil a guardar:", this.perfil);
    },
  },
};
</script>

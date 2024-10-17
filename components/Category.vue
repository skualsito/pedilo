<template>
  <div class="flex flex-col items-center mr-5 cursor-pointer group">
    <div
      class="w-[80px] h-[80px] bg-white text-[#4F4F4F] rounded-2xl shadow-xl flex items-center justify-center group-hover:shadow-lg group-hover:bg-[#3e40bf] group-hover:text-white group-hover:shadow-black/40 transition-all duration-100"
    >
      <MdiIcon :name="icono" :size="24" />
    </div>
    <span class="mt-2 text-sm text-[#4F4F4F]">{{ titulo }}</span>
  </div>
</template>
<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true,
    },
    icono: {
      type: String,
      required: true,
    },
  },
};
</script>

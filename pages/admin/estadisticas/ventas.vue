<template>
  <div class="p-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Ventas Mensuales</h3>
          <div class="chart-container">
            <Bar :data="ventasMensualesData" :options="chartOptions" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Productos Más Vendidos</h3>
          <div class="chart-container">
            <Pie :data="productosMasVendidosData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  height: 300px; /* Ajusta este valor según tus necesidades */
}
</style>

<script setup>
import { ref } from "vue";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Estadísticas de Ventas",
  },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  height: 300, // Altura en píxeles
});

const ventasMensualesData = ref({
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Ventas ($)",
      data: [12000, 19000, 15000, 22000, 18000, 25000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
});

const productosMasVendidosData = ref({
  labels: [
    "Producto A",
    "Producto B",
    "Producto C",
    "Producto D",
    "Producto E",
  ],
  datasets: [
    {
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
    },
  ],
});
</script>

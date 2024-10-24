<template>
  <div class="p-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Inventario por Categoría</h3>
          <div class="chart-container">
            <Doughnut
              :data="inventarioPorCategoriaData"
              :options="chartOptions"
            />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">
            Tendencia de Ventas por Producto
          </h3>
          <div class="chart-container">
            <Line :data="tendenciaVentasData" :options="chartOptions" />
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
import { Doughnut, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Estadísticas de Productos",
  },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  height: 300, // Altura en píxeles
});

const inventarioPorCategoriaData = ref({
  labels: ["Electrónicos", "Ropa", "Hogar", "Deportes", "Libros"],
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

const tendenciaVentasData = ref({
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Producto A",
      data: [65, 59, 80, 81, 56, 55],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Producto B",
      data: [28, 48, 40, 19, 86, 27],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
  ],
});
</script>

<template>
  <div class="p-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Ingresos vs Gastos</h3>
          <div class="chart-container">
            <Bar :data="ingresosVsGastosData" :options="chartOptions" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Flujo de Caja</h3>
          <div class="chart-container">
            <Line :data="flujoCajaData" :options="chartOptions" />
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
import { Bar, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

definePageMeta({
  layout: "admin",
  middleware: "admin",
  head: {
    title: "Balance Financiero",
  },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const ingresosVsGastosData = ref({
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Ingresos",
      data: [50000, 60000, 55000, 65000, 70000, 75000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Gastos",
      data: [45000, 55000, 50000, 60000, 65000, 70000],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
  ],
});

const flujoCajaData = ref({
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
  datasets: [
    {
      label: "Flujo de Caja",
      data: [5000, 10000, 15000, 20000, 25000, 30000],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
    },
  ],
});
</script>

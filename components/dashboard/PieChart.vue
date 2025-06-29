<template>
  <div class="bg-base-200 shadow-lg rounded-2xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        สถานะการเข้างานวันนี้
      </h3>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ new Date().toLocaleDateString('th-TH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) }}
      </div>
    </div>

    <div class="flex flex-col lg:flex-row items-center gap-6">
      <!-- Chart Container -->
      <div class="w-full lg:w-2/3 h-80 lg:h-96">
        <canvas ref="chartCanvas" width="400" height="400"></canvas>
      </div>

      <!-- Legend -->
      <div class="w-full lg:w-1/3 space-y-4">
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          รายละเอียด
        </div>
        <div v-for="(item, index) in chartData" :key="index"
          class="flex items-center justify-between p-3 rounded-lg bg-base-100">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-3" :style="{ backgroundColor: item.backgroundColor }"></div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ item.label }}
            </span>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-gray-800 dark:text-gray-200">
              {{ item.value }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ item.percentage }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const chartCanvas = ref(null)
let chart = null

// Data matching StatsCard structure
const attendanceData = ref([
  {
    label: 'มาตรงเวลา',
    value: 180,
    backgroundColor: '#6EE7B7', // very soft green
    borderColor: '#34D399', // medium green
    percentage: 95.8
  },
  {
    label: 'มาสาย',
    value: 41,
    backgroundColor: '#FCA5A5', // very soft red
    borderColor: '#F87171', // medium red
    percentage: 22.8
  },
  {
    label: 'ยังไม่เข้างาน',
    value: 19,
    backgroundColor: '#FDE68A', // very soft amber
    borderColor: '#FBBF24', // medium amber
    percentage: 10.6
  }
])

const chartData = ref(attendanceData.value)

onMounted(async () => {
  if (!process.client) return
  
  await nextTick()
  
  if (!chartCanvas.value) {
    console.error('PieChart canvas not found')
    return
  }

  try {
    // Use chart.js/auto for easier setup
    const Chart = (await import('chart.js/auto')).default
    const ChartDataLabels = await import('chartjs-plugin-datalabels')

    // Register the datalabels plugin
    Chart.register(ChartDataLabels.default)

    const ctx = chartCanvas.value.getContext('2d')

    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartData.value.map(item => item.label),
        datasets: [{
          data: chartData.value.map(item => item.value),
          backgroundColor: chartData.value.map(item => item.backgroundColor),
          borderColor: chartData.value.map(item => item.borderColor),
          borderWidth: 2,
          hoverOffset: 4,
          cutout: '60%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || ''
                const value = context.parsed
                const percentage = chartData.value[context.dataIndex]?.percentage || 0
                return `${label}: ${value} คน (${percentage}%)`
              }
            }
          },
          datalabels: {
            color: '#ffffff',
            font: {
              weight: 'bold',
              size: 13
            },
            formatter: function (value, context) {
              const percentage = chartData.value[context.dataIndex]?.percentage || 0
              return `${value}\n${percentage}%`
            },
            anchor: 'center',
            align: 'center',
            textAlign: 'center',
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowBlur: 2
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        }
      }
    })
    
    console.log('PieChart created successfully:', chart)
  } catch (error) {
    console.error('Error creating PieChart:', error)
  }
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})

// Method to update chart data (can be called from parent component)
const updateChartData = (newData) => {
  if (chart && newData) {
    chartData.value = newData
    chart.data.labels = newData.map(item => item.label)
    chart.data.datasets[0].data = newData.map(item => item.value)
    chart.data.datasets[0].backgroundColor = newData.map(item => item.backgroundColor)
    chart.data.datasets[0].borderColor = newData.map(item => item.borderColor)

    // Update the chart with animation
    chart.update('active')
  }
}

// Expose method for parent component
defineExpose({
  updateChartData
})
</script>

<style scoped>
/* Custom styles for better dark mode support */
:global([data-theme="cyberpunk"]) .bg-base-200 {
  background-color: #1f2937;
}

:global([data-theme="cyberpunk"]) .bg-base-100 {
  background-color: #374151;
}
</style>

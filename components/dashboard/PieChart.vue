<template>
  <div class="bg-gradient-to-br from-base-200 to-base-200/80 shadow-xl rounded-2xl p-6 border border-base-300/50">
    <!-- Enhanced Header -->
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-base-300/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-base-content">
            สถานะการเข้างานวันนี้
          </h3>
          <p class="text-sm text-base-content/70">ภาพรวมการเข้างานของพนักงานทั้งหมด</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="px-3 py-2 bg-success/10 text-success rounded-lg text-sm font-medium">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ new Date().toLocaleDateString('th-TH', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            }) }}
          </div>
        </div>
        <!-- Menu Dropdown -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-circle hover:bg-base-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
            <li><a class="text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>ส่งออกรายงาน</a></li>
            <li><a class="text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>แชร์ข้อมูล</a></li>
            <li><a class="text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>ตั้งค่า</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Chart and Legend Container -->
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <!-- Chart Container with Enhanced Styling -->
      <div class="w-full lg:w-3/5 relative">
        <div class="bg-gradient-to-br from-base-100 to-base-100/80 rounded-2xl p-6 shadow-inner border border-base-300/30">
          <div class="h-80 lg:h-96 relative">
            <canvas ref="chartCanvas" width="400" height="400" class="drop-shadow-lg"></canvas>
            <!-- Center Info -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="text-center bg-base-100/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-base-300/50">
                <div class="text-2xl font-bold text-base-content">{{ totalEmployees }}</div>
                <div class="text-sm text-base-content/70">พนักงานทั้งหมด</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Legend -->
      <div class="w-full lg:w-2/5 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-semibold text-base-content flex items-center gap-2">
            <svg class="w-5 h-5 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            รายละเอียด
          </h4>
          <div class="text-xs text-base-content/50">อัปเดตล่าสุด: {{ new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) }}</div>
        </div>
        
        <div v-for="(item, index) in chartData" :key="index"
          class="group relative overflow-hidden rounded-xl bg-gradient-to-r from-base-100 to-base-100/80 p-4 shadow-md border border-base-300/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" :style="{ backgroundColor: item.backgroundColor }"></div>
          </div>
          
          <div class="relative flex items-center justify-between">
            <div class="flex items-center gap-3">
              <!-- Enhanced Status Indicator -->
              <div class="relative">
                <div class="w-6 h-6 rounded-xl shadow-lg flex items-center justify-center" 
                     :style="{ backgroundColor: item.backgroundColor, borderColor: item.borderColor }"
                     :class="{ 'border-2': true }">
                  <svg v-if="item.label === 'มาตรงเวลา'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <svg v-else-if="item.label === 'มาสาย'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  <svg v-else class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <!-- Pulse animation for active status -->
                <div v-if="item.label === 'มาตรงเวลา'" class="absolute inset-0 rounded-xl animate-pulse" 
                     :style="{ backgroundColor: item.backgroundColor }" 
                     style="opacity: 0.3;"></div>
              </div>
              
              <div>
                <div class="font-semibold text-base-content group-hover:text-primary transition-colors">
                  {{ item.label }}
                </div>
                <div class="text-xs text-base-content/60">
                  {{ getStatusDescription(item.label) }}
                </div>
              </div>
            </div>

            <div class="text-right">
              <div class="text-xl font-bold text-base-content group-hover:scale-110 transition-transform">
                {{ item.value }}
              </div>
              <div class="text-sm text-base-content/70 font-medium">
                {{ item.percentage }}%
              </div>
              <!-- Progress Bar -->
              <div class="w-16 h-1.5 bg-base-300 rounded-full mt-2 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 ease-out"
                     :style="{ 
                       backgroundColor: item.borderColor, 
                       width: item.percentage + '%',
                       boxShadow: `0 0 8px ${item.borderColor}40`
                     }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Footer -->
        <div class="mt-6 p-4 bg-gradient-to-r from-base-300/30 to-base-300/10 rounded-xl border border-base-300/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-base-content/70">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              อัตราการเข้างานตรงเวลา
            </div>
            <div class="text-lg font-bold" :class="attendanceRate >= 90 ? 'text-success' : attendanceRate >= 80 ? 'text-warning' : 'text-error'">
              {{ attendanceRate }}%
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <button class="btn btn-sm btn-outline btn-primary flex-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              ดูรายงานเต็ม
            </button>
            <button class="btn btn-sm btn-outline btn-secondary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              ส่งออก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

const chartCanvas = ref(null)
let chart = null

// Data matching StatsCard structure
const attendanceData = ref([
  {
    label: 'มาตรงเวลา',
    value: 180,
    backgroundColor: '#34D399', // success green
    borderColor: '#10B981', // darker green
    percentage: 75.0
  },
  {
    label: 'มาสาย',
    value: 41,
    backgroundColor: '#F87171', // error red
    borderColor: '#EF4444', // darker red
    percentage: 17.1
  },
  {
    label: 'ยังไม่เข้างาน',
    value: 19,
    backgroundColor: '#FBBF24', // warning amber
    borderColor: '#F59E0B', // darker amber
    percentage: 7.9
  }
])

const chartData = ref(attendanceData.value)

// Computed properties
const totalEmployees = computed(() => {
  return chartData.value.reduce((sum, item) => sum + item.value, 0)
})

const attendanceRate = computed(() => {
  const onTimeEmployees = chartData.value.find(item => item.label === 'มาตรงเวลา')?.value || 0
  return Math.round((onTimeEmployees / totalEmployees.value) * 100)
})

// Helper function for status descriptions
const getStatusDescription = (label) => {
  const descriptions = {
    'มาตรงเวลา': 'เข้างานตามกำหนด',
    'มาสาย': 'เข้างานช้ากว่ากำหนด',
    'ยังไม่เข้างาน': 'ยังไม่มาทำงาน'
  }
  return descriptions[label] || ''
}

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
          borderWidth: 3,
          hoverOffset: 8,
          cutout: '65%'
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
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 12,
            displayColors: true,
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
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
              size: 14
            },
            formatter: function (value, context) {
              const percentage = chartData.value[context.dataIndex]?.percentage || 0
              return `${value}\n${percentage}%`
            },
            anchor: 'center',
            align: 'center',
            textAlign: 'center',
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowBlur: 3
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1500,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'index'
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
/* Enhanced animations and effects */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar for dropdown */
.dropdown-content {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-content::-webkit-scrollbar {
  width: 4px;
}

.dropdown-content::-webkit-scrollbar-track {
  background: hsl(var(--b2));
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: hsl(var(--b3));
  border-radius: 2px;
}

/* Custom focus styles */
.btn:focus {
  outline: 2px solid hsl(var(--p));
  outline-offset: 2px;
}
</style>

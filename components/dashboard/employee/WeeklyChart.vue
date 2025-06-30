<template>
  <div class="card bg-base-200 shadow-lg">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
          <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          สถิติการทำงานรายสัปดาห์
        </h2>
        <div class="badge badge-info badge-outline">7 วันที่ผ่านมา</div>
      </div>

      <!-- Chart Container -->
      <div class="relative bg-gradient-to-br from-base-100 to-base-100/50 rounded-xl p-6 border border-base-300 shadow-inner mb-6">
        <div class="h-64 flex items-center justify-center">
          <canvas ref="weeklyChartCanvas" width="400" height="256" class="w-full h-full"></canvas>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-success">42.5</div>
          <div class="text-xs text-base-content/70">ชั่วโมงรวม</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">8.5</div>
          <div class="text-xs text-base-content/70">เฉลี่ย/วัน</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-warning">2.5</div>
          <div class="text-xs text-base-content/70">ชั่วโมง OT</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-info">95%</div>
          <div class="text-xs text-base-content/70">ประสิทธิภาพ</div>
        </div>
      </div>

      <!-- Daily Details -->
      <div class="space-y-3">
        <div v-for="(day, index) in weeklyData" :key="index"
             class="flex items-center justify-between p-3 rounded-lg bg-base-100 hover:bg-base-300/50 transition-colors">
          <div class="flex items-center gap-3">
            <div :class="`w-3 h-3 rounded-full ${getStatusColor(day.hours)}`"></div>
            <div>
              <div class="font-medium text-base-content">{{ day.day }}</div>
              <div class="text-sm text-base-content/70">{{ day.date }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold text-base-content">{{ day.hours }} ชม.</div>
            <div :class="`text-sm ${getStatusTextColor(day.hours)}`">
              {{ getStatusText(day.hours) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Indicator -->
      <div class="mt-6 pt-4 border-t border-base-300">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2 text-base-content/70">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            ประสิทธิภาพการทำงาน
          </div>
          <div class="flex items-center gap-2">
            <div class="text-success font-bold">ดีเยี่ยม</div>
            <svg class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Chart variables
const weeklyChartCanvas = ref(null)
let weeklyChart = null

// Mock data for weekly work hours
const weeklyData = ref([
  { day: 'จันทร์', date: '25 ธ.ค.', hours: 8.5 },
  { day: 'อังคาร', date: '26 ธ.ค.', hours: 8.0 },
  { day: 'พุธ', date: '27 ธ.ค.', hours: 9.0 },
  { day: 'พฤหัสบดี', date: '28 ธ.ค.', hours: 8.5 },
  { day: 'ศุกร์', date: '29 ธ.ค.', hours: 8.0 },
  { day: 'เสาร์', date: '30 ธ.ค.', hours: 0 },
  { day: 'อาทิตย์', date: '31 ธ.ค.', hours: 0.5 }
])

// Helper methods
const getStatusColor = (hours) => {
  if (hours >= 8) return 'bg-success'
  if (hours >= 6) return 'bg-warning'
  if (hours > 0) return 'bg-error'
  return 'bg-base-300'
}

const getStatusTextColor = (hours) => {
  if (hours >= 8) return 'text-success'
  if (hours >= 6) return 'text-warning'
  if (hours > 0) return 'text-error'
  return 'text-base-content/50'
}

const getStatusText = (hours) => {
  if (hours >= 8) return 'เต็มเวลา'
  if (hours >= 6) return 'ไม่เต็ม'
  if (hours > 0) return 'น้อย'
  return 'หยุด'
}

onMounted(async () => {
  console.log('WeeklyChart component mounted, initializing chart...')
  await nextTick()
  setTimeout(() => {
    initChart()
  }, 100)
})

const initChart = async () => {
  console.log('initChart called, process.client:', process.client)
  
  if (!process.client) return
  
  if (!weeklyChartCanvas.value) {
    console.error('Chart canvas element not found')
    return
  }
  
  // Destroy previous chart if exists
  if (weeklyChart) {
    weeklyChart.destroy()
    weeklyChart = null
  }
  
  try {
    // Import Chart.js
    const Chart = (await import('chart.js/auto')).default
    console.log('Chart.js imported successfully')
    
    const ctx = weeklyChartCanvas.value.getContext('2d')
    
    const chartData = {
      labels: weeklyData.value.map(d => d.day),
      datasets: [{
        label: 'ชั่วโมงทำงาน',
        data: weeklyData.value.map(d => d.hours),
        backgroundColor: weeklyData.value.map(d => {
          if (d.hours >= 8) return '#22c55e'  // success
          if (d.hours >= 6) return '#eab308'  // warning
          if (d.hours > 0) return '#ef4444'   // error
          return '#d1d5db'  // neutral
        }),
        borderColor: weeklyData.value.map(d => {
          if (d.hours >= 8) return '#16a34a'
          if (d.hours >= 6) return '#ca8a04'
          if (d.hours > 0) return '#dc2626'
          return '#9ca3af'
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    }
    
    weeklyChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} ชั่วโมง`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              callback: function(value) {
                return value + ' ชม.'
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    })
    
    console.log('Weekly chart created successfully')
    
  } catch (error) {
    console.error('Error creating weekly chart:', error)
  }
}

// Cleanup
onUnmounted(() => {
  if (weeklyChart) {
    weeklyChart.destroy()
  }
})

// Resize handler
if (process.client) {
  window.addEventListener('resize', () => {
    if (weeklyChart) {
      weeklyChart.resize()
    }
  })
}
</script>

<style scoped>
/* Add any custom styles here */
</style> 
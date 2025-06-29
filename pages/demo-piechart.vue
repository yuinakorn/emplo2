<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-200">
    <!-- Navigation -->
    <CommonNav 
      subtitle="Demo Pie Chart"
      :breadcrumbs="[
        { label: 'Demo', path: '/demo-piechart' }
      ]"
      :showLogout="false"
    >
      <template #actions>
        <NuxtLink to="/" class="btn btn-primary btn-sm">
          กลับหน้าหลัก
        </NuxtLink>
      </template>
    </CommonNav>

    <div class="p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-base-content mb-4">
          ตัวอย่าง Doughnut Chart - สถานะการเข้างาน
        </h1>
        <p class="text-base-content/70">
          แสดงข้อมูลสถานะการเข้างานวันนี้ในรูปแบบ Doughnut Chart พร้อมข้อมูลจาก StatsCard
        </p>
      </div>

      <!-- Stats Cards for reference -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-base-content mb-4">ข้อมูลจาก StatsCard</h2>
        <dashboardStatsCard />
      </div>

      <!-- Doughnut Chart -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-base-content mb-4">Doughnut Chart</h2>
        <dashboardPieChart ref="pieChartRef" />
      </div>

      <!-- Interactive Controls -->
      <div class="card bg-base-200 shadow-lg">
        <div class="card-body">
          <h3 class="text-lg font-semibold text-base-content mb-4">ทดสอบการอัปเดตข้อมูล</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text">มาตรงเวลา</span>
              </label>
              <input 
                v-model.number="demoData[0].value" 
                type="number" 
                class="input input-bordered"
                min="0"
                max="300"
              />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">มาสาย</span>
              </label>
              <input 
                v-model.number="demoData[1].value" 
                type="number" 
                class="input input-bordered"
                min="0"
                max="50"
              />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">ยังไม่เข้างาน</span>
              </label>
              <input 
                v-model.number="demoData[2].value" 
                type="number" 
                class="input input-bordered"
                min="0"
                max="50"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="updateChart" class="btn btn-primary">
              อัปเดต Chart
            </button>
            <button @click="resetData" class="btn btn-outline">
              รีเซ็ตข้อมูล
            </button>
            <button @click="generateRandomData" class="btn btn-secondary">
              สุ่มข้อมูล
            </button>
          </div>
        </div>
      </div>

      <!-- Data Summary -->
      <div class="card bg-base-200 shadow-lg">
        <div class="card-body">
          <h3 class="text-lg font-semibold text-base-content mb-4">สรุปข้อมูล</h3>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>สถานะ</th>
                  <th>จำนวน (คน)</th>
                  <th>เปอร์เซ็นต์</th>
                  <th>สี</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in demoData" :key="index">
                  <td>{{ item.label }}</td>
                  <td>{{ item.value }}</td>
                  <td>{{ calculatePercentage(item.value) }}%</td>
                  <td>
                    <div 
                      class="w-6 h-6 rounded-full"
                      :style="{ backgroundColor: item.backgroundColor }"
                    ></div>
                  </td>
                </tr>
                <tr class="font-bold">
                  <td>รวม</td>
                  <td>{{ totalEmployees }}</td>
                  <td>100%</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

useHead({
  title: 'Demo Pie Chart - Empo2'
})

const pieChartRef = ref(null)

// Demo data matching StatsCard structure
const demoData = ref([
  { 
    label: 'มาตรงเวลา',
    value: 230,
    backgroundColor: '#10B981',
    borderColor: '#059669',
    percentage: 95.8
  },
  { 
    label: 'มาสาย',
    value: 12,
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
    percentage: 5.0
  },
  { 
    label: 'ยังไม่เข้างาน/ไปราชการ/ลา',
    value: 17,
    backgroundColor: '#F59E0B',
    borderColor: '#D97706',
    percentage: 7.1
  }
])

// Calculate total employees
const totalEmployees = computed(() => {
  return demoData.value.reduce((sum, item) => sum + item.value, 0)
})

// Calculate percentage for each category
const calculatePercentage = (value) => {
  if (totalEmployees.value === 0) return 0
  return ((value / totalEmployees.value) * 100).toFixed(1)
}

// Update chart with new data
const updateChart = () => {
  if (pieChartRef.value) {
    // Update percentages
    demoData.value.forEach(item => {
      item.percentage = parseFloat(calculatePercentage(item.value))
    })
    
    // Call the update method on the pie chart component
    pieChartRef.value.updateChartData(demoData.value)
  }
}

// Reset data to original values
const resetData = () => {
  demoData.value = [
    { 
      label: 'มาตรงเวลา',
      value: 230,
      backgroundColor: '#10B981',
      borderColor: '#059669',
      percentage: 95.8
    },
    { 
      label: 'มาสาย',
      value: 12,
      backgroundColor: '#EF4444',
      borderColor: '#DC2626',
      percentage: 5.0
    },
    { 
      label: 'ยังไม่เข้างาน/ไปราชการ/ลา',
      value: 17,
      backgroundColor: '#F59E0B',
      borderColor: '#D97706',
      percentage: 7.1
    }
  ]
  updateChart()
}

// Generate random data for testing
const generateRandomData = () => {
  const total = 240 // Total employees
  const onTime = Math.floor(Math.random() * (total - 20) + 180) // 180-220
  const late = Math.floor(Math.random() * 20) + 5 // 5-25
  const absent = total - onTime - late

  demoData.value[0].value = onTime
  demoData.value[1].value = late
  demoData.value[2].value = absent

  updateChart()
}

// Watch for changes in demo data
watch(demoData, () => {
  // Auto-update percentages when values change
  demoData.value.forEach(item => {
    item.percentage = parseFloat(calculatePercentage(item.value))
  })
}, { deep: true })
</script>

<style scoped>
/* Custom styles for the demo page */
.card {
  border-radius: 1rem;
}

.table th {
  font-weight: 600;
  color: hsl(var(--bc));
}

.table td {
  color: hsl(var(--bc));
}
</style> 
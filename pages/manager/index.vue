<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-200">
    <!-- Navigation -->
    <CommonNav subtitle="ผู้จัดการ" :breadcrumbs="[
      { label: 'แดชบอร์ด', path: '/manager' }
    ]" :showUserMenu="true" :userName="'ผู้จัดการระบบ'" @logout="logout" />

    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-base-content">แดชบอร์ดผู้จัดการระบบ</h1>
        <div class="text-sm text-base-content/70">{{ currentDate }}</div>
      </div>

      <!-- Stats Card -->
      <dashboardStatsCard />

      <!-- Pie Chart - Full Width -->
      <div class="mb-6 w-full">
        <dashboardPieChart />
      </div>

      <!-- Department Table - Full Width -->
      <div class="mb-6 w-full">
        <dashboardDepartmentTable />
      </div>

      <!-- Bar Chart & Top Late Employees -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Bar Chart Section -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <h2 class="text-lg font-semibold text-base-content mb-4">5 แผนกที่พนักงานมาสายบ่อยที่สุด (เดือนนี้)</h2>
            <div class="h-72 min-h-[288px] flex items-center justify-center">
              <canvas ref="barChartCanvas" width="400" height="288" class="w-full h-full"></canvas>
            </div>
          </div>
        </div>
        <!-- Top 5 Late Employees Section -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <h2 class="text-lg font-semibold text-base-content mb-4">5 บุคลากรที่มาสายบ่อยที่สุด (เดือนนี้)</h2>
            <div class="space-y-3">
              <div v-for="(person, idx) in topLateEmployees" :key="idx" class="flex items-center p-3 rounded-lg bg-base-100 shadow-sm">
                <div class="avatar placeholder">
                  <div class="bg-error text-white rounded-full w-10">
                    <span class="text-xs font-bold">{{ person.initials }}</span>
                  </div>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm font-medium text-base-content">{{ person.name }}</p>
                  <p class="text-xs text-base-content/70">{{ person.department }}</p>
                </div>
                <span class="badge badge-error badge-outline font-semibold px-3 py-2">
                  {{ person.lateCount }} ครั้ง
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline';

useHead({
  title: 'แดชบอร์ดผู้จัดการ - Empo2'
})

// Current date in Thai format
const currentDate = computed(() => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    locale: 'th-TH'
  };
  return new Date().toLocaleDateString('th-TH', options);
});


// Quick actions
const quickActions = ref([
  { label: 'อนุมัติคำขอ', icon: PlusIcon },
  { label: 'เพิ่มพนักงาน', icon: UserPlusIcon },
  { label: 'ออกรายงาน', icon: DocumentChartBarIcon },
  { label: 'การตั้งค่า', icon: Cog6ToothIcon },
]);

// Team members
const teamMembers = ref([
  { id: 1, name: 'สมชาย ใจดี', role: 'หัวหน้าทีม', status: 'online', initials: 'สช' },
  { id: 2, name: 'สมหญิง ตั้งใจ', role: 'พนักงาน', status: 'online', initials: 'สญ' },
  { id: 3, name: 'เอก ใจกล้า', role: 'พนักงาน', status: 'offline', initials: 'อก' },
  { id: 4, name: 'น้องใหม่ สดใส', role: 'พนักงานฝึกงาน', status: 'online', initials: 'นม' },
]);

// ข้อมูลตัวอย่างสำหรับตารางสถานะพนักงานรายแผนก
const departments = ref([
  { name: 'แผนกการเงินและบัญชี', total: 28, ontime: 25, late: 2, absent: 0, status: 'ติดตาม' },
  { name: 'แผนกการตลาด', total: 32, ontime: 28, late: 3, absent: 0, status: 'เร่งด่วน' },
  { name: 'แผนกทรัพยากรบุคคล', total: 22, ontime: 18, late: 3, absent: 0, status: 'เร่งด่วน' },
  { name: 'แผนกเทคโนโลยีสารสนเทศ', total: 15, ontime: 12, late: 2, absent: 0, status: 'ติดตาม' },
  { name: 'แผนกบริการลูกค้า', total: 25, ontime: 20, late: 4, absent: 0, status: 'เร่งด่วน' },
  { name: 'แผนกบริหารงานทั่วไป', total: 45, ontime: 32, late: 8, absent: 1, status: 'เร่งด่วน' },
  { name: 'แผนกประชาสัมพันธ์', total: 18, ontime: 14, late: 2, absent: 0, status: 'ติดตาม' },
]);

const logout = () => {
  // Add logout logic here
  alert('ออกจากระบบสำเร็จ')
  navigateTo('/login')
}

// Mock data for bar chart and late employees
const barChartCanvas = ref(null)
let barChart = null
const topLateDepartments = ref([
  { name: 'การตลาด', lateCount: 12 },
  { name: 'ทรัพยากรบุคคล', lateCount: 10 },
  { name: 'เทคโนโลยีสารสนเทศ', lateCount: 8 },
  { name: 'การเงินและบัญชี', lateCount: 7 },
  { name: 'บริการลูกค้า', lateCount: 6 }
])
const topLateEmployees = ref([
  { name: 'สมชาย ใจดี', initials: 'สจ', department: 'การตลาด', lateCount: 6 },
  { name: 'วราภรณ์ สายใจ', initials: 'วส', department: 'ทรัพยากรบุคคล', lateCount: 5 },
  { name: 'อนุชา รักดี', initials: 'อร', department: 'เทคโนโลยีสารสนเทศ', lateCount: 5 },
  { name: 'ปิยะดา สายสมร', initials: 'ปส', department: 'การเงินและบัญชี', lateCount: 4 },
  { name: 'จิราภรณ์ สายทอง', initials: 'จส', department: 'บริการลูกค้า', lateCount: 4 }
])

onMounted(async () => {
  console.log('Manager page mounted, initializing chart...')
  await nextTick()
  setTimeout(() => {
    initChart()
  }, 100)
})

const initChart = async () => {
  console.log('initChart called, process.client:', process.client)
  
  if (!process.client) return
  
  console.log('barChartCanvas.value:', barChartCanvas.value)
  
  if (!barChartCanvas.value) {
    console.error('Chart canvas element not found')
    return
  }
  
  // Destroy previous chart if it exists
  if (barChart) {
    console.log('Destroying previous chart')
    barChart.destroy()
    barChart = null
  }
  
  try {
    console.log('Importing Chart.js...')
    // Use chart.js/auto which includes all components
    const Chart = (await import('chart.js/auto')).default
    console.log('Chart.js imported successfully:', Chart)
    
    const ctx = barChartCanvas.value.getContext('2d')
    console.log('Canvas context:', ctx)
    
    const chartData = {
      labels: topLateDepartments.value.map(d => d.name),
      datasets: [{
        label: 'จำนวนมาสาย (ครั้ง)',
        data: topLateDepartments.value.map(d => d.lateCount),
        backgroundColor: [
          '#ef4444',   // Red
          '#f59e0b',   // Orange  
          '#eab308',   // Yellow
          '#22c55e',   // Green
          '#3b82f6'    // Blue
        ],
        borderColor: [
          '#dc2626',
          '#d97706', 
          '#ca8a04',
          '#16a34a',
          '#2563eb'
        ],
        borderWidth: 1
      }]
    }
    
    console.log('Chart data:', chartData)
    
    // Create chart with simplified configuration
    barChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: false 
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    
    console.log('Bar chart created successfully:', barChart)
    
  } catch (error) {
    console.error('Error creating bar chart:', error)
  }
}

// Clean up chart when component is unmounted
onUnmounted(() => {
  if (barChart) {
    barChart.destroy()
  }
})

// Update chart when window is resized
if (process.client) {
  window.addEventListener('resize', () => {
    if (barChart) {
      barChart.resize()
    }
  })
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
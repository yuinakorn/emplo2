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
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
                <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                5 แผนกที่พนักงานมาสายบ่อยที่สุด
              </h2>
              <div class="badge badge-warning badge-outline">เดือนนี้</div>
            </div>

            <!-- Chart Container with Enhanced Styling -->
            <div class="relative bg-gradient-to-br from-base-100 to-base-100/50 rounded-xl p-6 border border-base-300 shadow-inner mb-6">
              <div class="absolute top-4 right-4">
                <div class="dropdown dropdown-end">
                  <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </div>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>ส่งออกข้อมูล</a></li>
                    <li><a>แชร์รายงาน</a></li>
                    <li><a>ตั้งค่าการแจ้งเตือน</a></li>
                  </ul>
                </div>
              </div>
              
              <div class="h-72 min-h-[288px] flex items-center justify-center">
                <canvas ref="barChartCanvas" width="400" height="288" class="w-full h-full"></canvas>
              </div>
            </div>

            <!-- Department Stats Cards -->
            <div class="grid grid-cols-1 gap-3">
              <div v-for="(dept, idx) in topLateDepartments" :key="idx"
                   class="relative group bg-gradient-to-r from-base-100 to-base-100/50 hover:from-warning/5 hover:to-warning/10 
                          rounded-xl p-4 border border-base-300 hover:border-warning/20 transition-all duration-300 
                          hover:shadow-md transform hover:-translate-y-1">
                
                <!-- Ranking Badge -->
                <div class="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                     :class="{
                       'bg-gradient-to-br from-yellow-400 to-yellow-600': idx === 0,
                       'bg-gradient-to-br from-gray-300 to-gray-500': idx === 1,
                       'bg-gradient-to-br from-amber-600 to-amber-800': idx === 2,
                       'bg-gradient-to-br from-orange-400 to-orange-600': idx > 2
                     }">
                  {{ idx + 1 }}
                </div>

                <div class="flex items-center gap-4">
                  <!-- Department Icon -->
                  <div class="relative">
                    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-lg">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    <!-- Alert indicator -->
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-error rounded-full border-2 border-white flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- Department Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="text-base font-semibold text-base-content truncate">{{ dept.name }}</h3>
                      <div class="badge badge-ghost badge-sm">แผนก</div>
                    </div>
                    
                    <!-- Late Count with Progress Bar -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-base-content/70">จำนวนครั้งที่มาสาย</span>
                        <span class="font-bold text-warning">{{ dept.lateCount }} ครั้ง</span>
                      </div>
                      
                      <!-- Progress Bar -->
                      <div class="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-warning to-warning/70 rounded-full transition-all duration-500 ease-out"
                             :style="{ width: `${(dept.lateCount / Math.max(...topLateDepartments.map(d => d.lateCount))) * 100}%` }">
                        </div>
                      </div>
                      
                      <!-- Performance Indicator -->
                      <div class="flex items-center gap-2 text-xs">
                        <div class="flex items-center gap-1"
                             :class="dept.lateCount > 8 ? 'text-error' : dept.lateCount > 5 ? 'text-warning' : 'text-success'">
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" v-if="dept.lateCount > 8">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                          </svg>
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" v-else-if="dept.lateCount > 5">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                          </svg>
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" v-else>
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>{{ dept.lateCount > 8 ? 'ต้องปรับปรุงเร่งด่วน' : dept.lateCount > 5 ? 'ต้องติดตาม' : 'อยู่ในเกณฑ์ดี' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex flex-col items-end gap-2">
                    <button class="btn btn-ghost btn-sm hover:btn-warning group-hover:shadow-md transition-all duration-200">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      รายงาน
                    </button>
                  </div>
                </div>

                <!-- Hover Effect Overlay -->
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Summary Footer -->
            <div class="mt-6 pt-4 border-t border-base-300">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2 text-base-content/70">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  รวมทั้งหมด {{ topLateDepartments.reduce((sum, dept) => sum + dept.lateCount, 0) }} ครั้ง
                </div>
                <div class="flex gap-2">
                  <button class="btn btn-outline btn-sm">
                    ส่งแจ้งเตือน
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 3v5H4l5-5zM21 15.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8.5l2-2h14l2 2z"></path>
                    </svg>
                  </button>
                  <button class="btn btn-outline btn-sm">
                    ดูรายงานเต็ม
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Top 5 Late Employees Section -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
                <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                5 บุคลากรที่มาสายบ่อยที่สุด
              </h2>
              <div class="badge badge-error badge-outline">เดือนนี้</div>
            </div>
            
            <div class="space-y-4">
              <div v-for="(person, idx) in topLateEmployees" :key="idx" 
                   class="relative group bg-gradient-to-r from-base-100 to-base-100/50 hover:from-error/5 hover:to-error/10 
                          rounded-xl p-4 border border-base-300 hover:border-error/20 transition-all duration-300 
                          hover:shadow-md transform hover:-translate-y-1">
                
                <!-- Ranking Badge -->
                <div class="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                     :class="{
                       'bg-gradient-to-br from-yellow-400 to-yellow-600': idx === 0,
                       'bg-gradient-to-br from-gray-300 to-gray-500': idx === 1,
                       'bg-gradient-to-br from-amber-600 to-amber-800': idx === 2,
                       'bg-gradient-to-br from-red-400 to-red-600': idx > 2
                     }">
                  {{ idx + 1 }}
                </div>

                <div class="flex items-center gap-4">
                  <!-- Avatar with Status -->
                  <div class="relative">
                    <div class="avatar placeholder">
                      <div class="bg-gradient-to-br from-error to-error/80 text-white rounded-full w-14 h-14 shadow-lg">
                        <span class="text-lg font-bold">{{ person.initials }}</span>
                      </div>
                    </div>
                    <!-- Warning indicator -->
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-warning rounded-full border-2 border-white flex items-center justify-center">
                      <svg class="w-3 h-3 text-warning-content" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>

                  <!-- Employee Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="text-base font-semibold text-base-content truncate">{{ person.name }}</h3>
                      <div class="badge badge-ghost badge-sm">{{ person.department }}</div>
                    </div>
                    
                    <!-- Late Count with Progress Bar -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-base-content/70">จำนวนครั้งที่มาสาย</span>
                        <span class="font-bold text-error">{{ person.lateCount }} ครั้ง</span>
                      </div>
                      
                      <!-- Progress Bar -->
                      <div class="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-error to-error/70 rounded-full transition-all duration-500 ease-out"
                             :style="{ width: `${(person.lateCount / Math.max(...topLateEmployees.map(e => e.lateCount))) * 100}%` }">
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Action Button -->
                  <div class="flex flex-col items-end gap-2">
                    <button class="btn btn-ghost btn-sm hover:btn-error group-hover:shadow-md transition-all duration-200">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>

                <!-- Hover Effect Overlay -->
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-error/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Summary Footer -->
            <div class="mt-6 pt-4 border-t border-base-300">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2 text-base-content/70">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  รวมทั้งหมด {{ topLateEmployees.reduce((sum, emp) => sum + emp.lateCount, 0) }} ครั้ง
                </div>
                <button class="btn btn-outline btn-sm">
                  ดูรายงานเต็ม
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
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
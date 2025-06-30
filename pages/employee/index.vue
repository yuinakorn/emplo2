<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-200">
    <!-- Navigation -->
    <CommonNav 
      subtitle="พนักงาน"
      :breadcrumbs="[
        { label: 'แดชบอร์ด', path: '/employee' }
      ]"
      :showUserMenu="true"
      :userName="'สมชาย ใจดี'"
      @logout="logout"
    />

    <div class="p-6">
      <!-- Header with Welcome Message -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-base-content mb-2">
            สวัสดี สมชาย! 👋
          </h1>
          <p class="text-lg text-base-content/70">
            วันนี้เป็นวันที่ดีในการทำงาน เริ่มต้นวันใหม่ด้วยพลังใจที่เต็มเปี่ยม
          </p>
        </div>
        <div class="text-right">
          <div class="text-sm text-base-content/70">วันนี้</div>
          <div class="text-lg font-medium text-base-content">{{ currentDate }}</div>
          <div class="text-sm text-primary font-medium">{{ currentTime }}</div>
        </div>
      </div>

      <!-- Stats Cards -->
      <DashboardEmployeeStatsCard />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Time Tracker - Takes 1 column -->
        <div class="lg:col-span-1">
          <DashboardEmployeeTimeTracker />
        </div>

        <!-- Today's Schedule - Takes 2 columns -->
        <div class="lg:col-span-2">
          <DashboardEmployeeTodaySchedule />
        </div>
      </div>

      <!-- Weekly Chart - Full Width -->
      <div class="mb-6 w-full">
        <DashboardEmployeeWeeklyChart />
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activities -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                กิจกรรมล่าสุด
              </h2>
              <div class="badge badge-accent badge-outline">Live</div>
            </div>
            
            <div class="space-y-4">
              <div v-for="(activity, index) in recentActivities" :key="index" 
                   class="flex items-start gap-4 p-3 rounded-xl bg-base-100 hover:bg-base-300/50 transition-all duration-300">
                <div :class="`p-3 rounded-full ${activity.bgColor} bg-opacity-20 flex-shrink-0`">
                  <component :is="activity.icon" class="w-5 h-5" :class="activity.textColor" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-base-content">{{ activity.description }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <p class="text-xs text-base-content/50">{{ activity.time }}</p>
                    <div :class="`w-2 h-2 rounded-full ${activity.statusColor}`"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- View All Button -->
            <div class="mt-6 pt-4 border-t border-base-300">
              <button class="btn btn-outline btn-sm w-full">
                ดูกิจกรรมทั้งหมด
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions & Tools -->
        <div class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
                <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                เครื่องมือด่วน
              </h2>
            </div>

            <!-- Quick Action Buttons -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button 
                v-for="(action, index) in quickActions" 
                :key="index"
                @click="action.handler"
                :class="`btn h-20 flex-col gap-2 ${action.buttonClass} hover:shadow-lg transition-all duration-300`"
              >
                <component :is="action.icon" class="w-6 h-6" />
                <span class="text-xs font-medium">{{ action.label }}</span>
              </button>
            </div>

            <!-- Shortcuts -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-base-content/70 mb-3">ทางลัดที่ใช้บ่อย</h3>
              <div v-for="(shortcut, index) in shortcuts" :key="index"
                   class="flex items-center justify-between p-3 rounded-lg bg-base-100 hover:bg-base-300/50 transition-colors cursor-pointer">
                <div class="flex items-center gap-3">
                  <component :is="shortcut.icon" class="w-4 h-4 text-base-content/70" />
                  <span class="text-sm text-base-content">{{ shortcut.label }}</span>
                </div>
                <kbd class="kbd kbd-xs">{{ shortcut.key }}</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Widget -->
      <div class="mt-6">
        <div class="card bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-lg">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-base-content mb-2">
                  🎯 เป้าหมายสัปดาห์นี้
                </h3>
                <p class="text-sm text-base-content/70">
                  คุณทำงานได้ดีมาก! ทำงานครบ 40 ชั่วโมงภายในสัปดาห์นี้
                </p>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-primary">85%</div>
                <div class="text-sm text-base-content/70">34/40 ชั่วโมง</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-base-300 rounded-full h-3">
                <div class="h-3 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                     style="width: 85%">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  ClockIcon, 
  CheckCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BellIcon,
  CogIcon,
  ChatBubbleLeftIcon,
  DocumentArrowUpIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'

useHead({
  title: 'แดชบอร์ดพนักงาน - Empo2'
})

// Time state
const currentTime = ref('')

// Update current time
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

// Current date in Thai format
const currentDate = computed(() => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    locale: 'th-TH' 
  }
  return new Date().toLocaleDateString('th-TH', options)
})

// Recent activities with enhanced data
const recentActivities = ref([
  {
    description: 'บันทึกเวลาเข้างานสำเร็จ',
    time: '2 นาทีที่แล้ว',
    icon: ClockIcon,
    bgColor: 'bg-success',
    textColor: 'text-success',
    statusColor: 'bg-success'
  },
  {
    description: 'อัปโหลดไฟล์รายงานโปรเจค A',
    time: '15 นาทีที่แล้ว',
    icon: DocumentArrowUpIcon,
    bgColor: 'bg-primary',
    textColor: 'text-primary',
    statusColor: 'bg-primary'
  },
  {
    description: 'เข้าร่วมประชุมทีมออนไลน์',
    time: '1 ชั่วโมงที่แล้ว',
    icon: ChatBubbleLeftIcon,
    bgColor: 'bg-info',
    textColor: 'text-info',
    statusColor: 'bg-info'
  },
  {
    description: 'ส่งคำขอลาป่วย',
    time: '3 ชั่วโมงที่แล้ว',
    icon: DocumentTextIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning',
    statusColor: 'bg-warning'
  }
])

// Enhanced quick actions
const quickActions = ref([
  { 
    label: 'แจ้งลาหยุด', 
    icon: CalendarDaysIcon,
    buttonClass: 'btn-warning btn-outline',
    handler: () => alert('เปิดหน้าแจ้งลาหยุด')
  },
  { 
    label: 'ส่งรายงาน', 
    icon: DocumentTextIcon,
    buttonClass: 'btn-primary btn-outline',
    handler: () => alert('เปิดหน้าส่งรายงาน')
  },
  { 
    label: 'ติดต่อ HR', 
    icon: PhoneIcon,
    buttonClass: 'btn-info btn-outline',
    handler: () => alert('โทรติดต่อ HR')
  },
  { 
    label: 'การตั้งค่า', 
    icon: CogIcon,
    buttonClass: 'btn-ghost btn-outline',
    handler: () => alert('เปิดหน้าการตั้งค่า')
  }
])

// Keyboard shortcuts
const shortcuts = ref([
  { label: 'บันทึกเวลา', icon: ClockIcon, key: 'Ctrl+T' },
  { label: 'ส่งรายงาน', icon: DocumentTextIcon, key: 'Ctrl+R' },
  { label: 'แจ้งเตือน', icon: BellIcon, key: 'Ctrl+N' },
  { label: 'อีเมล', icon: EnvelopeIcon, key: 'Ctrl+E' }
])

// Methods
const logout = () => {
  alert('ออกจากระบบสำเร็จ')
  navigateTo('/login')
}

// Lifecycle
let timeInterval = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
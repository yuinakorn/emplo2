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
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-base-content">แดชบอร์ดพนักงาน</h1>
        <div class="text-sm text-base-content/70">{{ currentDate }}</div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.title" class="card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex items-center">
              <div :class="`p-3 rounded-full ${stat.bgColor} bg-opacity-20`">
                <component :is="stat.icon" class="w-6 h-6" :class="stat.textColor" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-base-content/70">{{ stat.title }}</p>
                <p class="text-2xl font-semibold text-base-content">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activities -->
        <div class="lg:col-span-2 card bg-base-200 shadow-lg">
          <div class="card-body">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-base-content">กิจกรรมล่าสุด</h2>
              <button class="btn btn-link btn-sm">ดูทั้งหมด</button>
            </div>
            <div class="space-y-4">
              <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-start pb-4 border-b border-base-300">
                <div :class="`p-2 rounded-full ${activity.bgColor} bg-opacity-20`">
                  <component :is="activity.icon" class="w-5 h-5" :class="activity.textColor" />
                </div>
                <div class="ml-4">
                  <p class="text-sm text-base-content">{{ activity.description }}</p>
                  <p class="text-xs text-base-content/50 mt-1">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-6">
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="text-lg font-semibold text-base-content mb-4">การดำเนินการด่วน</h2>
              <div class="space-y-3">
                <button 
                  v-for="(action, index) in quickActions" 
                  :key="index"
                  @click="action.handler"
                  class="w-full flex items-center p-3 text-left rounded-lg hover:bg-base-300 transition-colors"
                >
                  <component :is="action.icon" class="w-5 h-5 text-base-content/70" />
                  <span class="ml-3 text-sm text-base-content">{{ action.label }}</span>
                  <ChevronRightIcon class="w-4 h-4 ml-auto text-base-content/50" />
                </button>
              </div>
            </div>
          </div>

          <!-- Today's Schedule -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="text-lg font-semibold text-base-content mb-4">ตารางงานวันนี้</h2>
              <div class="space-y-4">
                <div v-for="(schedule, index) in todaysSchedule" :key="index" class="flex items-start">
                  <div class="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-base-content">{{ schedule.time }}</p>
                    <p class="text-sm text-base-content/80">{{ schedule.task }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Time Tracking -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="text-lg font-semibold text-base-content mb-4">บันทึกเวลา</h2>
              <div class="space-y-4">
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary mb-2">{{ currentTime }}</div>
                  <div class="text-sm text-base-content/70">{{ currentDate }}</div>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="clockIn" 
                    :disabled="isClockedIn"
                    class="btn btn-success btn-sm flex-1"
                  >
                    <ClockIcon class="w-4 h-4 mr-2" />
                    เข้างาน
                  </button>
                  <button 
                    @click="clockOut" 
                    :disabled="!isClockedIn"
                    class="btn btn-error btn-sm flex-1"
                  >
                    <CheckCircleIcon class="w-4 h-4 mr-2" />
                    ออกงาน
                  </button>
                </div>
                <div v-if="isClockedIn" class="text-center">
                  <div class="text-sm text-base-content/70">เริ่มงานเมื่อ</div>
                  <div class="text-sm font-medium text-base-content">{{ clockInTime }}</div>
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
import { ref, computed, onMounted } from 'vue';
import { 
  ClockIcon, 
  CheckCircleIcon,
  PlusIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';

useHead({
  title: 'แดชบอร์ดพนักงาน - Empo2'
})

// Time tracking state
const isClockedIn = ref(false)
const clockInTime = ref('')
const currentTime = ref('')

// Update current time
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
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
  };
  return new Date().toLocaleDateString('th-TH', options);
});

// Stats data
const stats = ref([
  { 
    title: 'ชั่วโมงทำงานวันนี้', 
    value: '8.5 ชม.', 
    icon: ClockIcon,
    bgColor: 'bg-primary',
    textColor: 'text-primary'
  },
  { 
    title: 'งานที่เสร็จแล้ว', 
    value: '5/8', 
    icon: CheckCircleIcon,
    bgColor: 'bg-success',
    textColor: 'text-success'
  },
  { 
    title: 'การลาคงเหลือ', 
    value: '12 วัน', 
    icon: CalendarDaysIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning'
  },
  { 
    title: 'โอที', 
    value: '3.5 ชม.', 
    icon: ClockIcon,
    bgColor: 'bg-secondary',
    textColor: 'text-secondary'
  },
]);

// Recent activities
const recentActivities = ref([
  {
    description: 'บันทึกเวลาออกงานแล้ว',
    time: '5 นาทีที่แล้ว',
    icon: CheckCircleIcon,
    bgColor: 'bg-success',
    textColor: 'text-success'
  },
  {
    description: 'ส่งรายงานประจำวัน',
    time: '1 ชั่วโมงที่แล้ว',
    icon: DocumentTextIcon,
    bgColor: 'bg-primary',
    textColor: 'text-primary'
  },
  {
    description: 'บันทึกเวลาเข้างาน',
    time: '9 ชั่วโมงที่แล้ว',
    icon: ClockIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning'
  },
]);

// Quick actions
const quickActions = ref([
  { 
    label: 'บันทึกเวลางาน', 
    icon: PlusIcon,
    handler: () => console.log('Record work time')
  },
  { 
    label: 'แจ้งลาหยุด', 
    icon: CalendarDaysIcon,
    handler: () => console.log('Request leave')
  },
  { 
    label: 'ส่งรายงาน', 
    icon: DocumentTextIcon,
    handler: () => console.log('Submit report')
  },
]);

// Today's schedule
const todaysSchedule = ref([
  { time: '09:00 - 10:00', task: 'ประชุมทีม' },
  { time: '10:30 - 12:00', task: 'พัฒนาระบบ' },
  { time: '13:00 - 14:00', task: 'ประชุมลูกค้า' },
  { time: '14:30 - 17:00', task: 'ทำงานต่อเนื่อง' },
]);

// Methods
const clockIn = () => {
  isClockedIn.value = true
  clockInTime.value = new Date().toLocaleTimeString('th-TH', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
  alert('บันทึกเวลาเข้างานแล้ว')
}

const clockOut = () => {
  isClockedIn.value = false
  clockInTime.value = ''
  alert('บันทึกเวลาออกงานแล้ว')
}

const logout = () => {
  // Handle logout
  alert('ออกจากระบบสำเร็จ')
  navigateTo('/login')
}

// Lifecycle
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
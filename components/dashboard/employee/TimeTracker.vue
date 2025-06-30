<template>
  <div class="card bg-base-200 shadow-lg">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          บันทึกเวลาทำงาน
        </h2>
        <div class="badge badge-primary badge-outline">สด</div>
      </div>

      <!-- Current Time Display -->
      <div class="text-center mb-8 relative">
        <div class="relative inline-block">
          <!-- Animated Clock Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl"></div>
          <div class="relative bg-gradient-to-br from-base-100 to-base-100/50 rounded-2xl p-8 border border-base-300 shadow-inner">
            <div class="text-5xl font-bold text-primary mb-2 font-mono tracking-wider">
              {{ currentTime }}
            </div>
            <div class="text-sm text-base-content/70 mb-4">{{ currentDate }}</div>
            <div class="flex items-center justify-center gap-2">
              <div class="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span class="text-xs text-base-content/70">เวลาแบบเรียลไทม์</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Clock In/Out Buttons -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <button 
          @click="clockIn" 
          :disabled="isClockedIn"
          :class="isClockedIn ? 'btn-disabled' : 'btn-success hover:shadow-lg'"
          class="btn flex-1 h-16 text-lg font-medium transition-all duration-300"
        >
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          เข้างาน
        </button>
        <button 
          @click="clockOut" 
          :disabled="!isClockedIn"
          :class="!isClockedIn ? 'btn-disabled' : 'btn-error hover:shadow-lg'"
          class="btn flex-1 h-16 text-lg font-medium transition-all duration-300"
        >
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          ออกงาน
        </button>
      </div>

      <!-- Work Status -->
      <div v-if="isClockedIn" class="bg-gradient-to-r from-success/10 to-success/5 rounded-xl p-4 mb-6 border border-success/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-base-content">กำลังทำงาน</span>
          </div>
          <div class="text-right">
            <div class="text-sm text-base-content/70">เริ่มงานเมื่อ</div>
            <div class="text-sm font-bold text-success">{{ clockInTime }}</div>
          </div>
        </div>
        <div class="mt-3">
          <div class="flex justify-between text-xs text-base-content/70 mb-1">
            <span>เวลาทำงานแล้ว</span>
            <span>{{ workingHours }}</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2">
            <div class="h-2 bg-gradient-to-r from-success to-success/70 rounded-full transition-all duration-1000"
                 :style="{ width: `${workProgress}%` }">
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">8:30</div>
          <div class="text-xs text-base-content/70">เข้างาน</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-warning">12:00</div>
          <div class="text-xs text-base-content/70">พักเที่ยง</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-error">17:30</div>
          <div class="text-xs text-base-content/70">ออกงาน</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-6 pt-4 border-t border-base-300">
        <div class="grid grid-cols-2 gap-3">
          <button class="btn btn-outline btn-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            แจ้งลา
          </button>
          <button class="btn btn-outline btn-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            รายงาน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const isClockedIn = ref(false)
const clockInTime = ref('')
const currentTime = ref('')
const workStartTime = ref(null)

// Computed
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

const workingHours = computed(() => {
  if (!workStartTime.value) return '0:00'
  const now = new Date()
  const diff = now - workStartTime.value
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}:${minutes.toString().padStart(2, '0')}`
})

const workProgress = computed(() => {
  if (!workStartTime.value) return 0
  const now = new Date()
  const diff = now - workStartTime.value
  const hours = diff / (1000 * 60 * 60)
  return Math.min((hours / 8) * 100, 100) // 8 hours = 100%
})

// Methods
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const clockIn = () => {
  isClockedIn.value = true
  workStartTime.value = new Date()
  clockInTime.value = new Date().toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit'
  })
  // Show success notification
  if (typeof window !== 'undefined') {
    alert('บันทึกเวลาเข้างานแล้ว')
  }
}

const clockOut = () => {
  isClockedIn.value = false
  workStartTime.value = null
  clockInTime.value = ''
  // Show success notification
  if (typeof window !== 'undefined') {
    alert('บันทึกเวลาออกงานแล้ว')
  }
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
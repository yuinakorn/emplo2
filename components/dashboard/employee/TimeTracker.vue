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

      <!-- Work Shift Information -->
      <div class="mb-6 p-4 bg-gradient-to-r from-info/10 to-info/5 rounded-xl border border-info/20">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-sm font-medium text-base-content">กะการทำงานของคุณ</span>
          </div>
          <div class="badge badge-info badge-sm">{{ shiftStatus }}</div>
        </div>
        
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-base-100 rounded-lg p-3">
            <div class="text-lg font-bold text-success">{{ workShift.start }}</div>
            <div class="text-xs text-base-content/70">เข้างาน</div>
          </div>
          <div class="bg-base-100 rounded-lg p-3">
            <div class="text-lg font-bold text-warning">{{ workShift.break }}</div>
            <div class="text-xs text-base-content/70">พักเที่ยง</div>
          </div>
          <div class="bg-base-100 rounded-lg p-3">
            <div class="text-lg font-bold text-error">{{ workShift.end }}</div>
            <div class="text-xs text-base-content/70">ออกงาน</div>
          </div>
        </div>
        
        <!-- Shift Progress Bar -->
        <div class="mt-4">
          <div class="flex justify-between text-xs text-base-content/70 mb-1">
            <span>ความคืบหน้าของกะ</span>
            <span>{{ shiftProgress }}%</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2">
            <div class="h-2 bg-gradient-to-r from-info to-info/70 rounded-full transition-all duration-1000"
                 :style="{ width: `${shiftProgress}%` }">
            </div>
          </div>
        </div>
      </div>

      <!-- Fingerprint Scanner Status -->
      <div class="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
        <div class="flex items-center justify-center gap-3">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
          </svg>
          <div class="text-center">
            <div class="text-lg font-semibold text-primary">ระบบสแกนลายนิ้วมือ</div>
            <div class="text-sm text-base-content/70">เวลาการเข้า-ออกงานจะบันทึกโดยอัตโนมัติ</div>
          </div>
        </div>
      </div>

      <!-- Today's Attendance Status -->
      <div class="space-y-4 mb-6">
        <!-- Clock In Status -->
        <div v-if="attendanceStatus.clockIn" class="p-4 rounded-xl border" 
             :class="attendanceStatus.clockIn.isLate ? 'bg-error/10 border-error/20' : 'bg-success/10 border-success/20'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg v-if="attendanceStatus.clockIn.isLate" class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              <div>
                <div class="text-sm font-medium" 
                     :class="attendanceStatus.clockIn.isLate ? 'text-error' : 'text-success'">
                  เข้างาน: {{ attendanceStatus.clockIn.status }}
                </div>
                <div class="text-xs text-base-content/70">
                  เวลา {{ attendanceStatus.clockIn.time }} น.
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-medium" 
                   :class="attendanceStatus.clockIn.isLate ? 'text-error' : 'text-success'">
                {{ attendanceStatus.clockIn.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- Clock Out Status -->
        <div v-if="attendanceStatus.clockOut" class="p-4 rounded-xl border"
             :class="attendanceStatus.clockOut.isEarly ? 'bg-warning/10 border-warning/20' : 'bg-info/10 border-info/20'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg v-if="attendanceStatus.clockOut.isEarly" class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <div>
                <div class="text-sm font-medium" 
                     :class="attendanceStatus.clockOut.isEarly ? 'text-warning' : 'text-info'">
                  ออกงาน: {{ attendanceStatus.clockOut.status }}
                </div>
                <div class="text-xs text-base-content/70">
                  เวลา {{ attendanceStatus.clockOut.time }} น.
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-medium" 
                   :class="attendanceStatus.clockOut.isEarly ? 'text-warning' : 'text-info'">
                {{ attendanceStatus.clockOut.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- No Clock Out Yet -->
        <div v-if="!attendanceStatus.clockOut" class="p-4 rounded-xl border bg-base-100 border-base-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="text-sm font-medium text-base-content/70">
                  ออกงาน: รอสแกนลายนิ้วมือ
                </div>
                <div class="text-xs text-base-content/50">
                  กำหนดออกงาน {{ workShift.end }} น.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Work Progress (if currently working) -->
      <div v-if="isClockedIn" class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-base-content">กำลังทำงาน</span>
          </div>
          <div class="text-sm text-base-content/70">เวลาทำงานแล้ว: {{ workingHours }}</div>
        </div>
        <div class="w-full bg-base-300 rounded-full h-2">
          <div class="h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
               :style="{ width: `${workProgress}%` }">
          </div>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="grid grid-cols-2 gap-6">
        <div class="text-center">
          <div class="text-2xl font-bold" 
               :class="attendanceStatus.clockIn?.isLate ? 'text-error' : 'text-success'">
            {{ attendanceStatus.clockIn?.time || '--:--' }}
          </div>
          <div class="text-xs text-base-content/70">เข้างานจริง</div>
          <div v-if="attendanceStatus.clockIn" class="text-xs mt-1"
               :class="attendanceStatus.clockIn.isLate ? 'text-error' : 'text-success'">
            {{ attendanceStatus.clockIn.status }}
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold" 
               :class="attendanceStatus.clockOut ? (attendanceStatus.clockOut.isEarly ? 'text-warning' : 'text-info') : 'text-base-content/30'">
            {{ attendanceStatus.clockOut?.time || '--:--' }}
          </div>
          <div class="text-xs text-base-content/70">ออกงานจริง</div>
          <div v-if="attendanceStatus.clockOut" class="text-xs mt-1"
               :class="attendanceStatus.clockOut.isEarly ? 'text-warning' : 'text-info'">
            {{ attendanceStatus.clockOut.status }}
          </div>
          <div v-else class="text-xs mt-1 text-base-content/50">
            ยังไม่ออกงาน
          </div>
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

// Work shift information
const workShift = ref({
  start: '08:30',
  break: '12:00-13:00',
  end: '16:30'
})

// Attendance tracking
const attendanceStatus = ref({
  clockIn: null,
  clockOut: null
})

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

const shiftStatus = computed(() => {
  const now = new Date()
  const currentTimeStr = now.toTimeString().substring(0, 5) // HH:MM format
  
  if (currentTimeStr < workShift.value.start) {
    return 'ยังไม่ถึงเวลา'
  } else if (currentTimeStr >= workShift.value.start && currentTimeStr < '12:00') {
    return 'กะเช้า'
  } else if (currentTimeStr >= '12:00' && currentTimeStr < '13:00') {
    return 'พักเที่ยง'
  } else if (currentTimeStr >= '13:00' && currentTimeStr < workShift.value.end) {
    return 'กะบ่าย'
  } else {
    return 'หลังเลิกงาน'
  }
})

const shiftProgress = computed(() => {
  const now = new Date()
  const currentTimeStr = now.toTimeString().substring(0, 5) // HH:MM format
  
  const currentMinutes = timeToMinutes(currentTimeStr)
  const startMinutes = timeToMinutes(workShift.value.start)
  const endMinutes = timeToMinutes(workShift.value.end)
  
  if (currentMinutes < startMinutes) {
    return 0
  } else if (currentMinutes > endMinutes) {
    return 100
  } else {
    const totalWorkMinutes = endMinutes - startMinutes
    const workedMinutes = currentMinutes - startMinutes
    return Math.round((workedMinutes / totalWorkMinutes) * 100)
  }
})

// Utility functions
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

const calculateTimeDifference = (time1, time2) => {
  const minutes1 = timeToMinutes(time1)
  const minutes2 = timeToMinutes(time2)
  const diff = Math.abs(minutes1 - minutes2)
  const hours = Math.floor(diff / 60)
  const minutes = diff % 60
  
  if (hours > 0) {
    return `${hours} ชั่วโมง ${minutes} นาที`
  } else {
    return `${minutes} นาที`
  }
}

// Methods
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Load attendance data from fingerprint scanner database
// TODO: Replace with actual API call to fingerprint scanner database
const loadAttendanceData = async () => {
  try {
    // Example API call (replace with actual endpoint):
    // const response = await fetch('/api/attendance/today')
    // const data = await response.json()
    
    // Mock data for demo - replace with actual database data
    const mockClockInTime = '08:10' // Example: came in at 8:45 AM (late)
    const mockClockOutTime = null // Example: clocked out at 4:00 PM (early)
    
    // Real implementation would be:
    // const mockClockInTime = data.clockInTime
    // const mockClockOutTime = data.clockOutTime
    
    if (mockClockInTime) {
      const isLate = timeToMinutes(mockClockInTime) > timeToMinutes(workShift.value.start)
      
      attendanceStatus.value.clockIn = {
        time: mockClockInTime,
        isLate: isLate,
        status: isLate ? 'มาสาย' : 'ตรงเวลา',
        message: isLate 
          ? `สาย ${calculateTimeDifference(mockClockInTime, workShift.value.start)}` 
          : 'เข้างานตรงเวลา'
      }
      
      isClockedIn.value = true
      clockInTime.value = mockClockInTime
      // Set work start time for progress calculation
      const today = new Date()
      const [hours, minutes] = mockClockInTime.split(':')
      today.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      workStartTime.value = today
    }
    
    if (mockClockOutTime) {
      const isEarly = timeToMinutes(mockClockOutTime) < timeToMinutes(workShift.value.end)
      
      attendanceStatus.value.clockOut = {
        time: mockClockOutTime,
        isEarly: isEarly,
        status: isEarly ? 'ออกก่อนเวลา' : 'ออกตามเวลา',
        message: isEarly 
          ? `ออกก่อนเวลา ${calculateTimeDifference(mockClockOutTime, workShift.value.end)}` 
          : 'ออกงานตามเวลาที่กำหนด'
      }
      
      isClockedIn.value = false
    }
  } catch (error) {
    console.error('Error loading attendance data:', error)
  }
}

// Lifecycle
let timeInterval = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  // Load attendance data from fingerprint scanner database
  loadAttendanceData()
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
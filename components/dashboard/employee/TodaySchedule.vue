<template>
  <div class="card bg-base-200 shadow-lg">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
          <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          ตารางงานวันนี้
        </h2>
        <div class="badge badge-secondary badge-outline">{{ today }}</div>
      </div>

      <!-- Progress Overview -->
      <div class="mb-6 p-4 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-base-content">ความคืบหน้าวันนี้</span>
          <span class="text-sm font-bold text-secondary">{{ completedTasks }}/{{ totalTasks }}</span>
        </div>
        <div class="w-full bg-base-300 rounded-full h-3">
          <div class="h-3 bg-gradient-to-r from-secondary to-secondary/70 rounded-full transition-all duration-500"
               :style="{ width: `${progressPercentage}%` }">
          </div>
        </div>
        <div class="flex justify-between text-xs text-base-content/70 mt-2">
          <span>เสร็จแล้ว {{ completedTasks }} งาน</span>
          <span>{{ progressPercentage }}%</span>
        </div>
      </div>

      <!-- Schedule List -->
      <div class="space-y-4">
        <div v-for="(task, index) in todaySchedule" :key="index"
             :class="`relative group p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${getTaskClasses(task)}`">
          
          <!-- Time Indicator -->
          <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
               :class="getTimeIndicatorColor(task)">
          </div>
          
          <div class="flex items-start gap-4 ml-3">
            <!-- Status Icon -->
            <div class="flex-shrink-0 mt-1">
              <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${getStatusBgColor(task.status)}`">
                <svg v-if="task.status === 'completed'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else-if="task.status === 'in-progress'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else-if="task.status === 'overdue'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>

            <!-- Task Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <h3 :class="`font-semibold ${task.status === 'completed' ? 'line-through text-base-content/60' : 'text-base-content'}`">
                  {{ task.title }}
                </h3>
                <div :class="`badge badge-sm ${getStatusBadgeColor(task.status)}`">
                  {{ getStatusText(task.status) }}
                </div>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-base-content/70 mb-2">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ task.time }}
                </div>
                <div class="flex items-center gap-1" v-if="task.location">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ task.location }}
                </div>
              </div>
              
              <p class="text-sm text-base-content/80">{{ task.description }}</p>
              
              <!-- Progress Bar for in-progress tasks -->
              <div v-if="task.status === 'in-progress' && task.progress" class="mt-3">
                <div class="flex justify-between text-xs text-base-content/70 mb-1">
                  <span>ความคืบหน้า</span>
                  <span>{{ task.progress }}%</span>
                </div>
                <div class="w-full bg-base-300 rounded-full h-2">
                  <div class="h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                       :style="{ width: `${task.progress}%` }">
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex-shrink-0">
              <button v-if="task.status === 'pending'" 
                      @click="startTask(index)"
                      class="btn btn-primary btn-sm">
                เริ่ม
              </button>
              <button v-else-if="task.status === 'in-progress'" 
                      @click="completeTask(index)"
                      class="btn btn-success btn-sm">
                เสร็จ
              </button>
              <button v-else-if="task.status === 'completed'" 
                      class="btn btn-ghost btn-sm cursor-default">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Footer -->
      <div class="mt-6 pt-4 border-t border-base-300">
        <div class="text-center">
          <div class="text-sm text-base-content/70">งานที่เหลือ</div>
          <div class="text-2xl font-bold text-primary">{{ totalTasks - completedTasks }}</div>
          <div class="text-xs text-base-content/50">จาก {{ totalTasks }} งาน</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data for today's schedule
const todaySchedule = ref([
  {
    title: 'ประชุมทีมประจำสัปดาห์',
    time: '09:00 - 10:00',
    location: 'ห้องประชุม A',
    description: 'ประชุมรายงานความคืบหน้าโปรเจคและวางแผนงานสัปดาห์หน้า',
    status: 'completed'
  },
  {
    title: 'พัฒนา Feature ใหม่',
    time: '10:30 - 12:00',
    location: 'โต๊ะทำงาน',
    description: 'สร้างระบบ Login และ Authentication',
    status: 'in-progress',
    progress: 65
  },
  {
    title: 'พักเที่ยง',
    time: '12:00 - 13:00',
    location: 'โรงอาหาร',
    description: 'พักรับประทานอาหารกลางวัน',
    status: 'pending'
  },
  {
    title: 'ประชุมกับลูกค้า',
    time: '13:30 - 14:30',
    location: 'ห้องประชุม B',
    description: 'นำเสนอ Demo และรับ Feedback จากลูกค้า',
    status: 'pending'
  },
  {
    title: 'Testing และ Debug',
    time: '15:00 - 17:00',
    location: 'โต๊ะทำงาน',
    description: 'ทดสอบระบบและแก้ไข Bug ที่พบ',
    status: 'pending'
  }
])

// Computed properties
const today = computed(() => {
  return new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  })
})

const completedTasks = computed(() => {
  return todaySchedule.value.filter(task => task.status === 'completed').length
})

const totalTasks = computed(() => {
  return todaySchedule.value.length
})

const progressPercentage = computed(() => {
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

// Helper methods
const getTaskClasses = (task) => {
  switch (task.status) {
    case 'completed':
      return 'bg-success/5 border-success/20'
    case 'in-progress':
      return 'bg-primary/5 border-primary/20'
    case 'overdue':
      return 'bg-error/5 border-error/20'
    default:
      return 'bg-base-100 border-base-300 hover:bg-base-300/50'
  }
}

const getTimeIndicatorColor = (task) => {
  switch (task.status) {
    case 'completed':
      return 'bg-success'
    case 'in-progress':
      return 'bg-primary'
    case 'overdue':
      return 'bg-error'
    default:
      return 'bg-base-300'
  }
}

const getStatusBgColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-success'
    case 'in-progress':
      return 'bg-primary'
    case 'overdue':
      return 'bg-error'
    default:
      return 'bg-base-300'
  }
}

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'completed':
      return 'badge-success'
    case 'in-progress':
      return 'badge-primary'
    case 'overdue':
      return 'badge-error'
    default:
      return 'badge-ghost'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'เสร็จแล้ว'
    case 'in-progress':
      return 'กำลังทำ'
    case 'overdue':
      return 'เลยกำหนด'
    default:
      return 'รอดำเนินการ'
  }
}

// Actions
const startTask = (index) => {
  todaySchedule.value[index].status = 'in-progress'
  todaySchedule.value[index].progress = 0
}

const completeTask = (index) => {
  todaySchedule.value[index].status = 'completed'
  delete todaySchedule.value[index].progress
}
</script>

<style scoped>
/* Add any custom styles here */
</style> 
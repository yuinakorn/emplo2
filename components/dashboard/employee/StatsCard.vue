<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div v-for="(stat, index) in employeeStats" :key="index" 
         class="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="card-body relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
          <svg viewBox="0 0 100 100" class="w-full h-full fill-current" :class="stat.textColor">
            <circle cx="50" cy="50" r="40" />
            <circle cx="30" cy="30" r="15" />
            <circle cx="70" cy="70" r="10" />
          </svg>
        </div>
        
        <div class="flex items-center relative z-10">
          <div :class="`p-4 rounded-xl ${stat.bgColor} bg-opacity-20 shadow-lg`">
            <component :is="stat.icon" class="w-8 h-8" :class="stat.textColor" />
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/70 mb-1">{{ stat.title }}</p>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl font-bold text-base-content">{{ stat.value }}</p>
              <span v-if="stat.unit" class="text-sm text-base-content/50">{{ stat.unit }}</span>
            </div>
            <div v-if="stat.change" class="flex items-center mt-2">
              <svg v-if="stat.change.type === 'increase'" class="w-4 h-4 text-success mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg v-else class="w-4 h-4 text-error mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span :class="stat.change.type === 'increase' ? 'text-success' : 'text-error'" 
                    class="text-sm font-medium">
                {{ stat.change.value }}
              </span>
              <span class="text-xs text-base-content/50 ml-1">{{ stat.change.period }}</span>
            </div>
          </div>
        </div>
        
        <!-- Progress Bar for certain stats -->
        <div v-if="stat.progress" class="mt-4 relative z-10">
          <div class="flex justify-between text-xs text-base-content/70 mb-1">
            <span>ความคืบหน้า</span>
            <span>{{ stat.progress.current }}/{{ stat.progress.total }}</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2">
            <div :class="`h-2 rounded-full transition-all duration-500 ${stat.bgColor}`"
                 :style="{ width: `${(stat.progress.current / stat.progress.total) * 100}%` }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ClockIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'

const employeeStats = ref([
  {
    title: 'ชั่วโมงทำงานวันนี้',
    value: '8.5',
    unit: 'ชม.',
    icon: ClockIcon,
    bgColor: 'bg-primary',
    textColor: 'text-primary',
    change: {
      type: 'increase',
      value: '+0.5 ชม.',
      period: 'จากเมื่อวาน'
    }
  },
  {
    title: 'งานที่เสร็จแล้ว',
    value: '5',
    unit: '/8',
    icon: CheckCircleIcon,
    bgColor: 'bg-success',
    textColor: 'text-success',
    progress: {
      current: 5,
      total: 8
    },
    change: {
      type: 'increase',
      value: '+2 งาน',
      period: 'วันนี้'
    }
  },
  {
    title: 'วันลาคงเหลือ',
    value: '12',
    unit: 'วัน',
    icon: CalendarDaysIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning',
    change: {
      type: 'decrease',
      value: '-1 วัน',
      period: 'เดือนนี้'
    }
  },
  {
    title: 'ชั่วโมง OT',
    value: '3.5',
    unit: 'ชม.',
    icon: BoltIcon,
    bgColor: 'bg-secondary',
    textColor: 'text-secondary',
    change: {
      type: 'increase',
      value: '+1.5 ชม.',
      period: 'สัปดาห์นี้'
    }
  }
])
</script>

<style scoped>
/* Add any custom styles here */
</style> 
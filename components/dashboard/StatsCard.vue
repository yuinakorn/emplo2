<template>
  <!-- Modern Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div 
      v-for="stat in stats" 
      :key="stat.title" 
      class="bg-base-200 shadow-lg rounded-2xl hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div class="p-6"> 
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 card-subtext mb-1">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-800 dark:text-gray-400 card-text">{{ stat.value }}</p>
          </div>
          <div :class="['p-3', 'rounded-xl', stat.bgColor, 'bg-opacity-10']">
            <component :is="stat.icon" class="w-6 h-6" :class="stat.textColor" />
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-base-300">
          <div class="flex items-center text-sm">
            <span :class="['w-2', 'h-2', 'rounded-full', stat.indicatorColor, 'mr-2']"></span>
            <span class="text-gray-500 dark:text-gray-400 card-subtext">{{ stat.trendText }}</span>
            <span :class="['ml-1', 'font-medium', stat.trendColor]">{{ stat.trendValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { UserGroupIcon, BuildingOfficeIcon, ClockIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
const stats = ref([
    { 
      title: 'พนักงานทั้งหมด',     
      value: '240',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600',
      icon: UserGroupIcon,
      trendText: 'คิดเป็น',
      trendValue: '100%',
      trendColor: 'text-green-500',
      indicatorColor: 'bg-blue-500'
    },
    { 
      title: 'มาตรงเวลา', 
      value: '180', 
      icon: CheckCircleIcon,
      bgColor: 'bg-green-500',
      textColor: 'text-green-600',
      trendText: 'คิดเป็น',
      trendValue: '95.8%',
      trendColor: 'text-green-500',
      indicatorColor: 'bg-green-500'
    },
    { 
      title: 'มาสาย', 
      value: '41',
      icon: ClockIcon,
      bgColor: 'bg-red-500',
      textColor: 'text-red-600',
      trendText: 'คิดเป็น',
      trendValue: '-12.5%',
      trendColor: 'text-red-500',
      indicatorColor: 'bg-red-500'
    },
    { 
      title: 'ยังไม่เข้างาน/ไปราชการ/ลา', 
      value: '19', 
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-600',
      trendText: 'คิดเป็น',
      trendValue: '-7.1%',
      trendColor: 'text-amber-500',
      indicatorColor: 'bg-amber-500'
    },
  ])
</script>

<style scoped>
/* Cyberpunk theme styles */
:global([data-theme="cyberpunk"]) .card-text {
  color: white;
}
:global([data-theme="cyberpunk"]) .card-subtext {
  color: #d1d5db; /* gray-300 */
}
</style>
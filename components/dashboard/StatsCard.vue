<template>
  <!-- Enhanced Modern Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div 
      v-for="(stat, index) in stats" 
      :key="stat.title" 
      class="group relative bg-gradient-to-br from-base-200 to-base-200/80 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-base-300/50"
      :class="{ 'animate-fade-in-up': true }"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0 bg-gradient-to-br" :class="stat.bgColor"></div>
      </div>
      
      <!-- Glow Effect on Hover -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br" :class="stat.bgColor"></div>
      
      <div class="relative p-6"> 
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <p class="text-sm font-medium text-base-content/70">{{ stat.title }}</p>
              <div class="w-2 h-2 rounded-full animate-pulse" :class="stat.indicatorColor"></div>
            </div>
            <p class="text-3xl font-bold text-base-content group-hover:scale-110 transition-transform duration-300">
              {{ stat.value }}
            </p>
            <div class="mt-2 text-xs text-base-content/50">
              {{ stat.subtitle }}
            </div>
          </div>
          
          <!-- Enhanced Icon Container -->
          <div class="relative">
            <div :class="['p-4', 'rounded-2xl', 'shadow-lg', 'group-hover:shadow-xl', 'transition-all', 'duration-300', 'group-hover:scale-110']" 
                 :style="{ backgroundColor: getIconBgColor(stat.bgColor) }">
              <component :is="stat.icon" class="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <!-- Floating indicator -->
            <!-- <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" :class="stat.indicatorColor"></div> -->
            <!-- <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full" :class="stat.indicatorColor"></div> -->
          </div>
        </div>
        
        <!-- Enhanced Stats Footer -->
        <div class="pt-4 border-t border-base-300/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm">
              <div class="flex items-center gap-2">
                <svg v-if="stat.trendDirection === 'up'" class="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else-if="stat.trendDirection === 'down'" class="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-4 h-4 text-info" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-base-content/70">{{ stat.trendText }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span :class="['font-bold', 'text-sm', stat.trendColor]">{{ stat.trendValue }}</span>
              <div class="w-12 h-2 bg-base-300 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 ease-out" 
                     :class="stat.indicatorColor"
                     :style="{ width: getProgressWidth(stat.value, stat.maxValue) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Info on Hover -->
        <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             :class="stat.bgColor"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { UserGroupIcon, BuildingOfficeIcon, ClockIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

const stats = ref([
  { 
    title: 'พนักงานทั้งหมด',     
    value: '240',
    subtitle: 'จำนวนพนักงานในระบบ',
    bgColor: 'bg-primary',

    textColor: 'text-primary',
    icon: UserGroupIcon,
    trendText: 'คิดเป็น',
    trendValue: '100%',
    trendColor: 'text-primary',
    trendDirection: 'stable',
    indicatorColor: 'bg-primary',
    maxValue: 240
  },
  { 
    title: 'มาตรงเวลา', 
    value: '180', 
    subtitle: 'เข้างานตามเวลาที่กำหนด',
    icon: CheckCircleIcon,
    bgColor: 'bg-success',
    textColor: 'text-success',
    trendText: 'คิดเป็น',
    trendValue: '75.0%',
    trendColor: 'text-success',
    trendDirection: 'up',
    indicatorColor: 'bg-success',
    maxValue: 240
  },
  { 
    title: 'มาสาย', 
    value: '41',
    subtitle: 'เข้างานช้ากว่าเวลาที่กำหนด',
    icon: ClockIcon,
    bgColor: 'bg-error',
    textColor: 'text-error',
    trendText: 'คิดเป็น',
    trendValue: '17.1%',
    trendColor: 'text-error',
    trendDirection: 'down',
    indicatorColor: 'bg-error',
    maxValue: 240
  },
  { 
    title: 'ยังไม่เข้างาน/ลา', 
    value: '19', 
    subtitle: 'ยังไม่มาทำงาน หรือ ลาป่วย/กิจ',
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-warning',
    textColor: 'text-warning',
    trendText: 'คิดเป็น',
    trendValue: '7.9%',
    trendColor: 'text-warning', 
    trendDirection: 'stable',
    indicatorColor: 'bg-warning',
    maxValue: 240
  },
])

// Helper function to get icon background color with better opacity
const getIconBgColor = (bgClass) => {
  const colorMap = {
    'bg-primary': '#3B82F6',     // Bright blue
    'bg-success': '#10B981',     // Bright green
    'bg-error': '#EF4444',       // Bright red
    'bg-warning': '#F59E0B',     // Bright amber
    'bg-info': '#06B6D4'         // Bright cyan
    // 'bg-primary': 'rgba(59, 130, 246, 0.8)',     // Semi-transparent blue
    // 'bg-success': 'rgba(16, 185, 129, 0.8)',     // Semi-transparent green
    // 'bg-error': 'rgba(239, 68, 68, 0.8)',        // Semi-transparent red
    // 'bg-warning': 'rgba(245, 158, 11, 0.8)',     // Semi-transparent amber
    // 'bg-info': 'rgba(6, 182, 212, 0.8)'          // Semi-transparent cyan
  }
  return colorMap[bgClass] || '#3B82F6'
}

// Helper function to calculate progress width
const getProgressWidth = (current, max) => {
  return Math.round((parseInt(current) / max) * 100)
}
</script>

<style scoped>
/* Enhanced animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Custom pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom ping animation */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Hover effects */
.group:hover .animate-ping {
  animation-duration: 0.5s;
}

/* Responsive text scaling */
@media (max-width: 768px) {
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}

/* Custom scrollbar for overflow content */
.overflow-hidden:hover {
  overflow: visible;
}

/* Enhanced shadow effects */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Dark mode enhancements */
:global([data-theme="dark"]) .group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Cyberpunk theme compatibility */
:global([data-theme="cyberpunk"]) .text-base-content {
  color: white;
}

:global([data-theme="cyberpunk"]) .text-base-content\/70 {
  color: rgba(255, 255, 255, 0.7);
}

:global([data-theme="cyberpunk"]) .text-base-content\/50 {
  color: rgba(255, 255, 255, 0.5);
}

:global([data-theme="cyberpunk"]) .border-base-300\/50 {
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
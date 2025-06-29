<template>
  <div class="min-h-screen bg-base-100 transition-colors duration-200">
    <!-- Navigation -->
    <CommonNav 
      subtitle="ผู้จัดการ"
      :breadcrumbs="[
        { label: 'แดชบอร์ด', path: '/manager' }
      ]"
      :showUserMenu="true"
      :userName="'ผู้จัดการระบบ'"
      @logout="logout"
    />

    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-base-content">แดชบอร์ดผู้จัดการ</h1>
        <div class="text-sm text-base-content/70">{{ currentDate }}</div>
      </div>

      <dashboardStatsCard />

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <dashboardActivities />

        <!-- Quick Actions -->
        <div class="space-y-6">
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="text-lg font-semibold text-base-content mb-4">การดำเนินการด่วน</h2>
              <div class="space-y-3">
                <button 
                  v-for="(action, index) in quickActions" 
                  :key="index"
                  class="w-full flex items-center p-3 text-left rounded-lg hover:bg-base-300 transition-colors"
                >
                  <component :is="action.icon" class="w-5 h-5 text-base-content/70" />
                  <span class="ml-3 text-sm text-base-content">{{ action.label }}</span>
                  <ChevronRightIcon class="w-4 h-4 ml-auto text-base-content/50" />
                </button>
              </div>
            </div>
          </div>

          <!-- Team Overview -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body">
              <h2 class="text-lg font-semibold text-base-content mb-4">ทีมงาน</h2>
              <div class="space-y-4">
                <div v-for="member in teamMembers" :key="member.id" class="flex items-center">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-10">
                      <span class="text-xs">{{ member.initials }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-base-content">{{ member.name }}</p>
                    <p class="text-xs text-base-content/70">{{ member.role }}</p>
                  </div>
                  <span :class="`ml-auto badge badge-sm ${member.status === 'online' ? 'badge-success' : 'badge-neutral'}`">
                    {{ member.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์' }}
                  </span>
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
import { ref, computed } from 'vue';
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
  { label: 'เพิ่มงานใหม่', icon: PlusIcon },
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

const logout = () => {
  // Add logout logic here
  alert('ออกจากระบบสำเร็จ')
  navigateTo('/login')
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
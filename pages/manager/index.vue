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
      <dashboardManagerStatsCard />

      <!-- Pie Chart - Full Width -->
      <div class="mb-6 w-full">
        <dashboardManagerPieChart />
      </div>

      <!-- Department Table - Full Width -->
      <div class="mb-6 w-full">
        <dashboardManagerDepartmentTable />
      </div>

      <!-- Bar Chart & Top Late Employees -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top 5 Departments Section -->
        <dashboardManagerTop5Dep />

        <!-- Top 5 Late Employees Section -->
        <dashboardManagerTop5Employee />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  PlusIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
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

const logout = () => {
  // Add logout logic here
  alert('ออกจากระบบสำเร็จ')
  navigateTo('/login')
}

</script>

<style scoped>
/* Add any custom styles here */
</style>
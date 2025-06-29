<template>
    <!-- Recent Activities -->
    <div class="lg:col-span-2 card bg-base-200 shadow-lg">
        <div class="card-body">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-semibold text-base-content">กิจกรรมล่าสุด</h2>
                <button class="btn btn-link btn-sm">ดูทั้งหมด</button>
            </div>
            <div class="space-y-4">
                <div v-for="(activity, index) in recentActivities" :key="index"
                    class="flex items-start pb-4 border-b border-base-300">
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
</template>
<script setup>
import { ref } from 'vue';
import { CheckCircleIcon, DocumentTextIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline';
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
        bgColor: 'bg-info',
        textColor: 'text-info'
    },
    {
        description: 'แจ้งลาหยุด',
        time: '2 ชั่วโมงที่แล้ว',
        icon: CalendarDaysIcon,
        bgColor: 'bg-warning',
        textColor: 'text-warning'
    },
    {
        description: 'แจ้งลาหยุด',
        time: '2 ชั่วโมงที่แล้ว',
        icon: CalendarDaysIcon,
        bgColor: 'bg-warning',
        textColor: 'text-warning'
    },
])
</script>
<style scoped></style>

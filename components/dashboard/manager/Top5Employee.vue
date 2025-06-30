<template>
  <div class="card bg-base-200 shadow-lg">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-base-content flex items-center gap-2">
          <svg class="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          5 บุคลากรที่มาสายบ่อยที่สุด
        </h2>
        <div class="badge badge-error badge-outline">เดือนนี้</div>
      </div>
      
      <div class="space-y-4">
        <div v-for="(person, idx) in topLateEmployees" :key="idx" 
             class="relative group bg-gradient-to-r from-base-100 to-base-100/50 hover:from-error/5 hover:to-error/10 
                    rounded-xl p-4 border border-base-300 hover:border-error/20 transition-all duration-300 
                    hover:shadow-md transform hover:-translate-y-1">
          
          <!-- Ranking Badge -->
          <div class="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
               :class="{
                 'bg-gradient-to-br from-yellow-400 to-yellow-600': idx === 0,
                 'bg-gradient-to-br from-gray-300 to-gray-500': idx === 1,
                 'bg-gradient-to-br from-amber-600 to-amber-800': idx === 2,
                 'bg-gradient-to-br from-red-400 to-red-600': idx > 2
               }">
            {{ idx + 1 }}
          </div>

          <div class="flex items-center gap-4">
            <!-- Avatar with Status -->
            <div class="relative">
              <div class="avatar placeholder">
                <div class="bg-gradient-to-br from-error to-error/80 text-white rounded-full w-14 h-14 shadow-lg">
                  <span class="text-lg font-bold">{{ person.initials }}</span>
                </div>
              </div>
              <!-- Warning indicator -->
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-warning rounded-full border-2 border-white flex items-center justify-center">
                <svg class="w-3 h-3 text-warning-content" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>

            <!-- Employee Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-base font-semibold text-base-content truncate">{{ person.name }}</h3>
                <div class="badge badge-ghost badge-sm">{{ person.department }}</div>
              </div>
              
              <!-- Late Count with Progress Bar -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-base-content/70">จำนวนครั้งที่มาสาย</span>
                  <span class="font-bold text-error">{{ person.lateCount }} ครั้ง</span>
                </div>
                
                <!-- Progress Bar -->
                <div class="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-error to-error/70 rounded-full transition-all duration-500 ease-out"
                       :style="{ width: `${(person.lateCount / Math.max(...topLateEmployees.map(e => e.lateCount))) * 100}%` }">
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex flex-col items-end gap-2">
              <button class="btn btn-ghost btn-sm hover:btn-error group-hover:shadow-md transition-all duration-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                ดูรายละเอียด
              </button>
            </div>
          </div>

          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-error/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <!-- Summary Footer -->
      <div class="mt-6 pt-4 border-t border-base-300">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2 text-base-content/70">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            รวมทั้งหมด {{ topLateEmployees.reduce((sum, emp) => sum + emp.lateCount, 0) }} ครั้ง
          </div>
          <button class="btn btn-outline btn-sm">
            ดูรายงานเต็ม
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topLateEmployees = ref([
  { name: 'สมชาย ใจดี', initials: 'สจ', department: 'การตลาด', lateCount: 6 },
  { name: 'วราภรณ์ สายใจ', initials: 'วส', department: 'ทรัพยากรบุคคล', lateCount: 5 },
  { name: 'อนุชา รักดี', initials: 'อร', department: 'เทคโนโลยีสารสนเทศ', lateCount: 5 },
  { name: 'ปิยะดา สายสมร', initials: 'ปส', department: 'การเงินและบัญชี', lateCount: 4 },
  { name: 'จิราภรณ์ สายทอง', initials: 'จส', department: 'บริการลูกค้า', lateCount: 4 }
])
</script>

<style scoped>
/* Add any custom styles here */
</style>

<template>
    <div class="lg:col-span-2 card bg-base-200 shadow-lg h-[90vh]">
        <div class="card-body p-0 h-full flex flex-col">
            <!-- Enhanced Header -->
            <div class="px-6 pt-6 pb-4 flex-shrink-0 bg-gradient-to-r from-base-200 to-base-200/80 border-b border-base-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-base-content">สถานะพนักงานรายแผนก</h2>
                            <p class="text-sm text-base-content/70">ภาพรวมการเข้างานของพนักงานแต่ละแผนก</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- Sort Status Indicator -->
                        <div v-if="sortKey" class="hidden md:flex items-center gap-2 px-3 py-2 bg-info/10 text-info rounded-lg text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                            </svg>
                            <span>เรียงตาม: {{ getSortLabel(sortKey) }} ({{ sortOrder === 'asc' ? 'น้อยไปมาก' : 'มากไปน้อย' }})</span>
                        </div>
                        <!-- Clear Filter Button -->
                        <button 
                            v-if="sortKey" 
                            @click="clearFilter" 
                            class="btn btn-outline btn-sm gap-2 hover:btn-error"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            ล้าง
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced Search and Filter Section -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Search Box with Icon -->
                    <div class="form-control flex-1">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                placeholder="ค้นหาด้วยชื่อแผนก..." 
                                class="input input-bordered w-full pl-10 pr-10 bg-base-100 focus:ring-2 focus:ring-primary/20"
                            />
                            <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button 
                                    @click="clearSearch" 
                                    class="p-1 hover:bg-base-300 rounded-full transition-colors"
                                >
                                    <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Sort Dropdown -->
                    <div class="form-control w-full sm:w-64">
                        <div class="relative">
                            <select 
                                v-model="dropdownSort" 
                                @change="applyDropdownSort"
                                class="select select-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">เรียงลำดับตาม...</option>
                                <option value="name-asc">📝 ชื่อแผนก (ก-ฮ)</option>
                                <option value="total-desc">👥 จำนวนพนักงาน (มาก-น้อย)</option>
                                <option value="ontime-desc">✅ มาตรงเวลา (มาก-น้อย)</option>
                                <option value="late-desc">⏰ มาสาย (มาก-น้อย)</option>
                                <option value="leave-desc">❌ ยังไม่มา (มาก-น้อย)</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Summary -->
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                    <div class="flex items-center gap-4 text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-success"></div>
                            <span class="text-base-content/70">แผนกครบ: {{ departments.filter(d => d.status === 'ครบ').length }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-error"></div>
                            <span class="text-base-content/70">แผนกขาด: {{ departments.filter(d => d.status === 'ขาด').length }}</span>
                        </div>
                    </div>
                    <div class="text-sm text-base-content/70">
                        แสดง {{ filteredAndSortedDepartments.length }} จาก {{ departments.length }} แผนก
                    </div>
                </div>
            </div>
            
            <!-- Enhanced Table Container -->
            <div class="px-6 flex-1 overflow-hidden">
                <div class="overflow-y-auto h-full">
                    <table class="table table-zebra font-normal w-full">
                        <thead class="sticky top-0 bg-gradient-to-r from-base-300 to-base-300/90 z-10 shadow-sm">
                            <tr>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('name')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                        แผนก
                                        <span v-if="sortKey === 'name'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('total')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                        จำนวนพนักงาน
                                        <span v-if="sortKey === 'total'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('ontime')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        มาตรงเวลา
                                        <span v-if="sortKey === 'ontime'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('late')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        มาสาย
                                        <span v-if="sortKey === 'late'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('leave')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        ยังไม่มา
                                        <span v-if="sortKey === 'leave'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-primary/10 transition-all duration-200 group" @click="sortBy('status')">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                        สถานะ
                                        <span v-if="sortKey === 'status'" class="text-primary">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                    </div>
                                </th>
                                <th class="font-bold">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        รายละเอียด
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(department, index) in filteredAndSortedDepartments" :key="index"
                                class="hover:bg-primary/5 transition-all duration-200 cursor-pointer group border-b border-base-200">
                                <td class="font-semibold text-base-content group-hover:text-primary transition-colors">
                                    {{ department.name }}
                                </td>
                                <td class="font-medium">
                                    <div class="flex items-center gap-2">
                                        <span class="text-base-content">{{ department.total }}</span>
                                        <span class="text-xs text-base-content/50">คน</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-2 h-2 rounded-full bg-success"></div>
                                        <span class="font-medium text-success">{{ department.ontime }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-2 h-2 rounded-full bg-error"></div>
                                        <span class="font-medium text-error">{{ department.late }}</span>
                                        <div v-if="department.late > 0" class="px-2 py-1 bg-error/10 text-error text-xs rounded-full">
                                            {{ ((department.late / department.total) * 100).toFixed(1) }}%
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-2 h-2 rounded-full bg-warning"></div>
                                        <span class="font-medium text-warning">{{ department.leave }}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="badge badge-lg shadow-sm"
                                        :class="department.status === 'ครบ' ? 'bg-success/20 text-success border-success/30' : 'bg-error/20 text-error border-error/30'">
                                        <svg v-if="department.status === 'ครบ'" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <svg v-else class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                        </svg>
                                        {{ department.status }}
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-ghost btn-sm hover:btn-primary group-hover:shadow-md transition-all duration-200">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        ดูรายละเอียด
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const departments = ref([
    { name: 'การเงินและบัญชี', total: 28, ontime: 28, late: 0, leave: 0, status: 'ครบ' },
    { name: 'การตลาด', total: 32, ontime: 28, late: 3, leave: 1, status: 'ขาด' },
    { name: 'ทรัพยากรบุคคล', total: 22, ontime: 18, late: 3, leave: 1, status: 'ขาด' },
    { name: 'เทคโนโลยีสารสนเทศ', total: 15, ontime: 15, late: 0, leave: 0, status: 'ครบ' },
    { name: 'บริการลูกค้า', total: 25, ontime: 25, late: 0, leave: 0, status: 'ครบ' },
    { name: 'บริหารงานทั่วไป', total: 45, ontime: 45, late: 0, leave: 0, status: 'ครบ' },
    { name: 'ประชาสัมพันธ์', total: 18, ontime: 18, late: 0, leave: 0, status: 'ครบ' },
    { name: 'แพทย์', total: 30, ontime: 28, late: 1, leave: 1, status: 'ขาด' },
    { name: 'พยาบาล', total: 35, ontime: 34, late: 0, leave: 1, status: 'ครบ' },
    { name: 'เภสัชกร', total: 20, ontime: 20, late: 0, leave: 0, status: 'ครบ' },
    { name: 'การป้องกันควบคุมโรค', total: 40, ontime: 37, late: 2, leave: 1, status: 'ขาด' },
    { name: 'การตรวจสุขภาพ', total: 22, ontime: 21, late: 1, leave: 0, status: 'ขาด' },
    { name: 'ผู้ช่วยพยาบาล', total: 26, ontime: 25, late: 0, leave: 1, status: 'ครบ' },
    { name: 'การดูแลสุขภาพ', total: 28, ontime: 26, late: 2, leave: 0, status: 'ขาด' },
    { name: 'ซ่อมบำรุง', total: 10, ontime: 10, late: 0, leave: 0, status: 'ครบ' },
    { name: 'ศูนย์ยานยนต์', total: 12, ontime: 9, late: 3, leave: 0, status: 'ขาด' },

]);

const sortKey = ref('');
const sortOrder = ref('asc');
const searchQuery = ref('');
const dropdownSort = ref('');

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function applyDropdownSort() {
  if (!dropdownSort.value) {
    clearFilter();
    return;
  }
  
  const [key, order] = dropdownSort.value.split('-');
  sortKey.value = key;
  sortOrder.value = order;
}

function clearFilter() {
  sortKey.value = '';
  sortOrder.value = 'asc';
  dropdownSort.value = '';
}

function clearSearch() {
  searchQuery.value = '';
}

function getSortLabel(key) {
  const labels = {
    'name': 'ชื่อแผนก',
    'total': 'จำนวนพนักงาน',
    'ontime': 'มาตรงเวลา',
    'late': 'มาสาย',
    'leave': 'ยังไม่มา',
    'status': 'สถานะ'
  };
  return labels[key] || key;
}

// Filter departments by search query
const filteredDepartments = computed(() => {
  if (!searchQuery.value.trim()) {
    return departments.value;
  }
  
  const query = searchQuery.value.toLowerCase().trim();
  return departments.value.filter(department => 
    department.name.toLowerCase().includes(query)
  );
});

// Sort filtered departments
const filteredAndSortedDepartments = computed(() => {
  const arr = [...filteredDepartments.value];
  if (!sortKey.value) return arr;
  return arr.sort((a, b) => {
    let aVal = a[sortKey.value];
    let bVal = b[sortKey.value];
    
    // Handle string comparison for status
    if (sortKey.value === 'status') {
      aVal = aVal === 'ครบ' ? 1 : 0;
      bVal = bVal === 'ครบ' ? 1 : 0;
    }
    
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
});
</script>
<style scoped>
.table th,
.table td {
    padding: 0.75rem 1rem;
}

.table :where(thead, tbody) :where(tr:not(:last-child)),
.table :where(thead, tbody) :where(tr:first-child:last-child) {
    border-bottom: 1px solid hsl(var(--b2) / var(--tw-border-opacity));
}

/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: hsl(var(--b2));
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: hsl(var(--b3));
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.3);
}

/* Ensure sticky header works properly */
.sticky {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>

<template>
    <div class="lg:col-span-2 card bg-base-200 shadow-lg h-[90vh]">
        <div class="card-body p-0 h-full flex flex-col">
            <div class="flex justify-between items-center px-6 pt-6 pb-2 flex-shrink-0">
                <div class="flex items-center gap-4">
                    <h2 class="text-lg font-semibold text-base-content">สถานะพนักงานรายแผนก</h2>
                </div>
                <div class="flex items-center gap-2">
                    <!-- Sort Status Indicator -->
                    <div v-if="sortKey" class="text-xs text-base-content/70">
                        เรียงตาม: {{ getSortLabel(sortKey) }} 
                        ({{ sortOrder === 'asc' ? 'น้อยไปมาก' : 'มากไปน้อย' }})
                    </div>
                    <!-- Clear Filter Button -->
                    <button 
                        v-if="sortKey" 
                        @click="clearFilter" 
                        class="btn btn-outline btn-sm gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        ล้างการเรียงลำดับ
                    </button>
                </div>
            </div>
            
            <!-- Search Box -->
            <div class="px-6 pb-4 flex-shrink-0">
                <div class="flex gap-4 items-end">
                    <div class="form-control flex-1">
                        <div class="input-group">
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                placeholder="ค้นหาด้วยชื่อแผนก..." 
                                class="input input-bordered w-full"
                            />
                            <!-- <button 
                                v-if="searchQuery" 
                                @click="clearSearch" 
                                class="btn btn-square btn-outline"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button> -->
                        </div>
                    </div>
                    
                    <!-- Sort Dropdown -->
                    <div class="form-control">
                        <select 
                            v-model="dropdownSort" 
                            @change="applyDropdownSort"
                            class="select select-bordered w-full"
                        >
                            <option value="">ไม่เรียงลำดับ</option>
                            <option value="name-asc">ชื่อแผนก</option>
                            <option value="ontime-desc">จำนวนมาตรงเวลา</option>
                            <option value="late-desc">จำนวนที่มาสาย</option>
                            <option value="leave-desc">จำนวนที่ยังไม่มา</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="px-6 flex-1 overflow-hidden">
                <div class="overflow-y-auto h-full">
                    <table class="table table-zebra font-normal w-full">
                        <thead class="sticky top-0 bg-base-200 z-10">
                            <tr class="bg-base-300">
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('name')">
                                    แผนก
                                    <span v-if="sortKey === 'name'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('total')">
                                    จำนวนพนักงาน
                                    <span v-if="sortKey === 'total'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('ontime')">
                                    มาตรงเวลา
                                    <span v-if="sortKey === 'ontime'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('late')">
                                    มาสาย
                                    <span v-if="sortKey === 'late'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('leave')">
                                    ยังไม่มา
                                    <span v-if="sortKey === 'leave'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold cursor-pointer hover:bg-base-100 transition-colors" @click="sortBy('status')">
                                    สถานะ
                                    <span v-if="sortKey === 'status'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                                </th>
                                <th class="font-bold">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(department, index) in filteredAndSortedDepartments" :key="index"
                                class="hover:bg-base-300 transition-colors cursor-pointer">
                                <td class="font-medium">{{ department.name }}</td>
                                <td>{{ department.total }}</td>
                                <td class="text-success">{{ department.ontime }}</td>
                                <td class="text-error bg-red-100">{{ department.late }}</td>
                                <td class="text-warning">{{ department.leave }}</td>
                                <td>
                                    <div class="badge"
                                        :class="department.status === 'ครบ' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'">
                                        {{ department.status }}
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-ghost btn-xs">ดูรายละเอียด</button>
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

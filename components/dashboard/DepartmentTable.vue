<template>
    <!-- Department Status -->
    <div class="lg:col-span-2 card bg-base-200 shadow-lg">
        <div class="card-body p-0">
            <div class="flex justify-between items-center p-6 pb-4">
                <h2 class="text-lg font-semibold text-base-content">สถานะพนักงานรายแผนก</h2>
                <button class="btn btn-link btn-sm">ดูทั้งหมด</button>
            </div>
            <div class="p-6">
                <div class="overflow-x-auto">
                    <table class="table table-zebra font-normal">
                        <thead>
                            <tr class="bg-base-300">
                                <th class="font-semibold">แผนก</th>
                                <th class="font-semibold">จำนวนพนักงาน</th>
                                <th class="font-semibold">มาตรงเวลา</th>
                                <th class="font-semibold">มาสาย</th>
                                <th class="font-semibold">ยังไม่มา</th>
                                <th class="font-semibold">สถานะ</th>
                                <th class="font-semibold">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(department, index) in departments" :key="index"
                                class="hover:bg-base-300 transition-colors cursor-pointer">
                                <td class="font-medium">{{ department.name }}</td>
                                <td>{{ department.total }}</td>
                                <td class="text-success">{{ department.ontime }}</td>
                                <td class="text-error bg-red-100">{{ department.late }}</td>
                                <td class="text-warning">{{ department.leave }}</td>
                                <td>
                                    <div class="flex items-center">
                                        <div
                                            :class="`w-2 h-2 rounded-full mr-2 ${department.status === 'ครบ' ? 'bg-success' : 'bg-error'}`">
                                        </div>
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
import { ref } from 'vue';

const departments = ref([
    { name: 'การเงินและบัญชี', total: 28, ontime: 28, late: 0, leave: 0, status: 'ครบ' },
    { name: 'การตลาด', total: 32, ontime: 28, late: 3, leave: 1, status: 'ขาด' },
    { name: 'ทรัพยากรบุคคล', total: 22, ontime: 18, late: 3, leave: 1, status: 'ขาด' },
    { name: 'เทคโนโลยีสารสนเทศ', total: 15, ontime: 15, late: 0, leave: 0, status: 'ครบ' },
    { name: 'บริการลูกค้า', total: 25, ontime: 25, late: 0, leave: 0, status: 'ครบ' },
    { name: 'บริหารงานทั่วไป', total: 45, ontime: 45, late: 0, leave: 0, status: 'ครบ' },
    { name: 'ประชาสัมพันธ์', total: 18, ontime: 18, late: 0, leave: 0, status: 'ครบ' },
]);
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
</style>

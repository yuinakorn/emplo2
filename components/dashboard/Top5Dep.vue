<template>
    <div class="card bg-base-200 shadow-lg">
        <div class="card-body">
            <h2 class="text-lg font-semibold text-base-content mb-4">5 แผนกที่พนักงานมาสายบ่อยที่สุด (เดือนนี้)</h2>
            <div class="space-y-4">
                <div v-for="dep in top5Dep" :key="dep.id">
                    <div class="flex items-center">
                        <div class="avatar placeholder">
                            <div class="bg-neutral text-neutral-content rounded-full w-10">
                                <span class="text-xs">{{ dep.initials }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const top5Dep = ref([])

        return {
            top5Dep
        }
    }
}
</script>

<style scoped></style>
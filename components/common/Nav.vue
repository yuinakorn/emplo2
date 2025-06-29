<template>
  <nav class="w-full bg-base-200 shadow-lg">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left side - Title and breadcrumb -->
        <div class="flex items-center">
          <div class="flex items-center space-x-4">
            <!-- Logo/Brand -->
            <div class="flex items-center">
              <span class="text-xl font-bold text-primary">Emplo2</span>
              <span v-if="subtitle" class="text-base-content/70 ml-2">- {{ subtitle }}</span>
            </div>

            <!-- Breadcrumb -->
            <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="hidden md:flex items-center space-x-2">
              <div class="flex items-center space-x-2">
                <span v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
                  <NuxtLink v-if="crumb.path && index < breadcrumbs.length - 1" :to="crumb.path"
                    class="text-base-content/70 hover:text-primary transition-colors">
                    {{ crumb.label }}
                  </NuxtLink>
                  <span v-else
                    :class="index === breadcrumbs.length - 1 ? 'text-base-content font-medium' : 'text-base-content/70'">
                    {{ crumb.label }}
                  </span>
                  <ChevronRightIcon v-if="index < breadcrumbs.length - 1" class="w-4 h-4 text-base-content/50 mx-2" />
                </span>
              </div>
            </nav>
          </div>
        </div>

        <!-- Right side - Actions -->
        <div class="flex items-center space-x-4">
          <!-- Custom actions slot -->
          <slot name="actions">
            <!-- Default actions -->
            <div class="flex items-center space-x-2">
              <!-- Notifications -->
              <button v-if="showNotifications" @click="toggleNotifications" class="btn btn-ghost btn-sm relative"
                title="การแจ้งเตือน">
                <BellIcon class="w-5 h-5" />
                <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 badge badge-error badge-xs">
                  {{ notificationCount > 99 ? '99+' : notificationCount }}
                </span>
              </button>

              <!-- Theme Selector -->
              <ThemeSelector />

              <!-- User Menu -->
              <div v-if="showUserMenu" class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-8">
                      <span class="text-xs">{{ userInitials }}</span>
                    </div>
                  </div>
                  <span class="ml-2 hidden sm:inline">{{ userName }}</span>
                  <ChevronDownIcon class="w-4 h-4 ml-1" />
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li v-if="userProfilePath">
                    <NuxtLink :to="userProfilePath">
                      <UserIcon class="w-4 h-4" />
                      โปรไฟล์
                    </NuxtLink>
                  </li>
                  <li v-if="userSettingsPath">
                    <NuxtLink :to="userSettingsPath">
                      <Cog6ToothIcon class="w-4 h-4" />
                      ตั้งค่า
                    </NuxtLink>
                  </li>
                  <li>
                    <a>
                      <PlusIcon class="w-4 h-4" />
                      อนุมัติคำขอ
                    </a>
                  </li>
                  <li>
                    <a>
                      <UserPlusIcon class="w-4 h-4" />
                      เพิ่มพนักงาน
                    </a>
                  </li>
                  <li>
                    <a>
                      <DocumentChartBarIcon class="w-4 h-4" />
                      ออกรายงาน
                    </a>
                  </li>
                  <li>
                    <a>
                      <Cog6ToothIcon class="w-4 h-4" />
                      การตั้งค่า
                    </a>
                  </li>
                  <li>
                    <hr class="my-1" />
                  </li>
                  <li>
                    <button @click="handleLogout" class="text-error">
                      <ArrowRightOnRectangleIcon class="w-4 h-4" />
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Simple Logout Button (fallback) -->
              <button v-else-if="showLogout" @click="handleLogout" class="btn btn-ghost btn-sm" title="ออกจากระบบ">
                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                <span class="ml-1 hidden sm:inline">ออกจากระบบ</span>
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Mobile breadcrumb -->
    <div v-if="breadcrumbs && breadcrumbs.length > 0" class="md:hidden px-4 py-2 border-t border-base-300">
      <div class="flex items-center space-x-2 overflow-x-auto">
        <span v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center whitespace-nowrap">
          <NuxtLink v-if="crumb.path && index < breadcrumbs.length - 1" :to="crumb.path"
            class="text-base-content/70 hover:text-primary transition-colors text-sm">
            {{ crumb.label }}
          </NuxtLink>
          <span v-else
            :class="index === breadcrumbs.length - 1 ? 'text-base-content font-medium' : 'text-base-content/70'"
            class="text-sm">
            {{ crumb.label }}
          </span>
          <ChevronRightIcon v-if="index < breadcrumbs.length - 1" class="w-3 h-3 text-base-content/50 mx-1" />
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {
  BellIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  UserPlusIcon,
  DocumentChartBarIcon
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
  subtitle: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  showNotifications: {
    type: Boolean,
    default: false
  },
  showUserMenu: {
    type: Boolean,
    default: false
  },
  showLogout: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  userName: {
    type: String,
    default: 'ผู้ใช้'
  },
  userProfilePath: {
    type: String,
    default: ''
  },
  userSettingsPath: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['logout', 'toggleNotifications'])

// Computed
const userInitials = computed(() => {
  if (!props.userName) return 'U'
  return props.userName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Methods
const handleLogout = () => {
  emit('logout')
}

const toggleNotifications = () => {
  emit('toggleNotifications')
}
</script>

<style scoped>
/* Custom styles for navigation */
.dropdown-content {
  @apply mt-2;
}

/* Smooth transitions */
.btn {
  @apply transition-all duration-200;
}

/* Hover effects */
.btn:hover {
  @apply transform scale-105;
}

/* Active states */
.btn:active {
  @apply transform scale-95;
}
</style>
<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <span class="ml-2">ธีม</span>
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 mt-2">
      <li v-for="theme in themes" :key="theme.name">
        <button 
          @click="setTheme(theme.name)" 
          :class="{'active': currentTheme === theme.name}"
          class="flex items-center justify-between w-full"
        >
          <span>{{ theme.label }}</span>
          <span v-if="currentTheme === theme.name" class="text-primary">✓</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

const { currentTheme, themes, setTheme } = useTheme()
</script>

<style scoped>
.active {
  @apply bg-primary text-primary-content;
}
</style> 
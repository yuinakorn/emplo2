// plugins/theme.client.ts
import { useTheme } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  const { initTheme } = useTheme()
  
  // Initialize theme immediately when plugin loads
  initTheme()
  
  // Also initialize on mount as backup
  onMounted(() => {
    initTheme()
  })
}) 
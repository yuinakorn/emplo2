// composables/useTheme.ts
export const useTheme = () => {
  const currentTheme = useState('theme', () => 'light')
  
  const themes = [
    { name: 'light', label: '☀️ ธีมสว่าง', class: 'light' },
    { name: 'dark', label: '🌙 ธีมมืด', class: 'dark' },
    { name: 'cupcake', label: '🧁 ธีมคัพเค้ก', class: 'cupcake' },
    { name: 'cyberpunk', label: '🚀 ไซเบอร์พังก์', class: 'cyberpunk' }
  ]

  const setTheme = (themeName: string) => {
    if (process.client) {
      const html = document.documentElement
      
      // Remove all theme classes
      html.classList.remove('light', 'dark', 'cupcake', 'cyberpunk', 'theme-cyberpunk')
      
      // Set the new theme
      html.setAttribute('data-theme', themeName)
      
      // Handle dark mode
      if (themeName === 'dark') {
        html.classList.add('dark')
      }
      
      // Handle cyberpunk theme
      if (themeName === 'cyberpunk') {
        html.classList.add('theme-cyberpunk')
      }
      
      // Save to localStorage
      localStorage.setItem('theme', themeName)
      
      // Update state
      currentTheme.value = themeName
    }
  }

  const initTheme = () => {
    if (process.client) {
      // Check for saved theme preference
      let savedTheme = localStorage.getItem('theme')
      
      // If no saved theme, default to light mode (not system preference)
      if (!savedTheme) {
        savedTheme = 'light'
        localStorage.setItem('theme', 'light') // Save the default
      }
      
      // Ensure the theme is valid, default to light if not
      const validThemes = themes.map(t => t.name)
      const themeToApply = validThemes.includes(savedTheme) ? savedTheme : 'light'
      
      // Apply the theme
      setTheme(themeToApply)
      
      // Watch for system theme changes when no theme is set
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          setTheme('light') // Always default to light instead of following system preference
        }
      }
      
      prefersDark.addEventListener('change', handleSystemThemeChange)
      
      // Cleanup function
      return () => {
        prefersDark.removeEventListener('change', handleSystemThemeChange)
      }
    }
  }

  return {
    currentTheme: readonly(currentTheme),
    themes,
    setTheme,
    initTheme
  }
} 
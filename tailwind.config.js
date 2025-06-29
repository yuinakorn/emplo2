/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Thai', 'sans-serif'],
        'noto-sans-thai': ['Noto Sans Thai', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    fontFamily: true,
  },
  important: true,
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#3b82f6',
          secondary: '#6b7280',
          accent: '#ec4899',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#3b82f6',
          secondary: '#9ca3af',
          accent: '#ec4899',
        },
      },
      {
        cupcake: {
          ...require('daisyui/src/theming/themes')['cupcake'],
          primary: '#65c3c8',
          secondary: '#ef9fbc',
          accent: '#eeaf3a',
          neutral: '#291334',
          'base-100': '#faf7f5',
          'base-200': '#efeae6',
          'base-300': '#e7e2df',
          'base-content': '#291334',
        },
      },
      {
        cyberpunk: {
          'color-scheme': 'light',
          primary: '#ff2a6d',
          'primary-content': '#ffffff',
          secondary: '#ffd300',
          'secondary-content': '#000000',
          accent: '#00f7ff',
          'accent-content': '#000000',
          neutral: '#20134e',
          'neutral-content': '#ffffff',
          'base-100': '#1e1e2e',
          'base-200': '#181825',
          'base-300': '#11111b',
          'base-content': '#cdd6f4',
          info: '#89b4fa',
          success: '#a6e3a1',
          warning: '#f9e2af',
          error: '#f38ba8',
          '--rounded-box': '0',
          '--rounded-btn': '0',
          '--rounded-badge': '0',
          '--tab-radius': '0',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-text-case': 'uppercase',
          '--btn-focus-scale': '0.95',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-spacing': '0.5rem',
        },
      },
    ],
    darkTheme: 'dark',
    // Disable automatic dark mode detection
    // as we're handling it manually
    darkMode: false,
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  }
} 
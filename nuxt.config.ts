// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'th'
      },
      script: [
        {
          innerHTML: `
            (function() {
              // Immediately set theme to prevent flash
              var savedTheme = localStorage.getItem('theme');
              
              // If no saved theme, default to light mode
              if (!savedTheme) {
                savedTheme = 'light';
                localStorage.setItem('theme', 'light');
              }
              
              // Remove any existing theme classes
              document.documentElement.classList.remove('light', 'dark', 'cupcake', 'cyberpunk', 'theme-cyberpunk');
              
              // Set the theme
              document.documentElement.setAttribute('data-theme', savedTheme);
              
              // Handle specific theme classes
              if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (savedTheme === 'cyberpunk') {
                document.documentElement.classList.add('theme-cyberpunk');
              }
            })();
          `,
          type: 'text/javascript'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800;900&display=swap'
        }
      ]
    }
  }
})

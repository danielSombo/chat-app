// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'



// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   daisyui: { 
//     themes: ["light",
//       "dark",
// ]
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@vitejs/plugin-react')) {
              return 'vendor-framework' // Séparer React et Vite
            }
            if (id.includes('tailwindcss') || id.includes('@tailwindcss/vite')) {
              return 'vendor-tailwind' // Séparer Tailwind CSS
            }
            return 'vendor' // Autres dépendances
          }
        }
      }
    }
  },
  daisyui: { 
    themes: ["light", "dark"]
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ============================================================
  // CHANGE THIS to match your deployment URL path
  // e.g., '/my-learning-app/v0/' for yoursite.com/my-learning-app/v0/
  // ============================================================
  base: '/learner_inkscape/v0/',
})

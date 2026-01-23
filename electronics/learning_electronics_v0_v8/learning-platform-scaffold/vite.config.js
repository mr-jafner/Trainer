import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ============================================================
  // CHANGE THIS to match your deployment URL path
  // e.g., '/my-learning-app/v0/' for yoursite.com/my-learning-app/v0/
  // ============================================================
  // Jeff's planned deployment:
  // https://jafner.com/learning_electronics/v0
  base: '/learning_electronics/v0/',
})

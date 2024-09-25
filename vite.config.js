import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.CALENDR_APP_API_URL': JSON.stringify(env.CALENDR_APP_API_URL)
    },
  plugins: [react()],
    css: {
      preprocessorOptions: {
          scss: {
            implementation: sass,
          }
      }
    }
  }
})
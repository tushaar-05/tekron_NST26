import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            '7f57ea85afb7.ngrok-free.app',
            'localhost'  // Keep localhost for local development
        ]
    }
})

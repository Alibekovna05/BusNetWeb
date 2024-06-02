import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-apexcharts',
        'apexcharts',
        '@mui/material',
        '@mui/icons-material',
        '@mui/lab',
        '@mui/styles',
        '@mui/system',
        '@mui/x-date-pickers',
        '@emotion/react',
        '@emotion/styled',
      ]
    }
  }
});

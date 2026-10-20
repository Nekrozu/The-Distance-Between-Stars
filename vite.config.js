import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions sets PAGES_BASE_PATH to /<repository>/ automatically.
// Locally it stays '/', so the same code works with npm run dev.
export default defineConfig({
  plugins: [react()],
  base: process.env.PAGES_BASE_PATH || '/',
});

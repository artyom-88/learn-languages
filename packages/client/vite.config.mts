import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_DOMAIN = 'localhost';
const DEFAULT_PORT = 8080;
const PROD = 'production';
const DEV = 'development';

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const isDevelopment = mode !== PROD;
  const host = `${env.VITE_DOMAIN || DEFAULT_DOMAIN}`;
  const port = +env.VITE_PORT || DEFAULT_PORT;
  return {
    mode: isDevelopment ? DEV : PROD,
    plugins: isDevelopment ? [react(), basicSsl()] : [react()],
    resolve: {
      alias: {
        app: resolve(__dirname, 'src', 'app'),
        common: resolve(__dirname, 'src', 'common'),
        features: resolve(__dirname, 'src', 'features'),
        test: resolve(__dirname, 'src', 'test'),
      },
    },
    server: {
      host: host,
      port: port,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            antd: ['antd', '@ant-design/icons'],
            vendors: ['react', 'react-dom', 'react-router-dom', 'ky', 'zustand'],
          },
        },
      },
      sourcemap: isDevelopment,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/test-setup.ts',
    },
  };
});

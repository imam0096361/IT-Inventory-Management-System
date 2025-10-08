import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';

interface VitestConfig extends UserConfig {
  test: {
    globals: boolean;
    environment: 'jsdom';
    setupFiles: string[];
    css?: boolean;
  };
}


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const config: VitestConfig = {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        css: true
      },
    };
    return config;
});

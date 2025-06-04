import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const vitePrerender = require('vite-plugin-prerender')
const chromium = require('@sparticuz/chromium')

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const executablePath = await chromium.executablePath();
  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      renderer: new vitePrerender.PuppeteerRenderer({
        executablePath,
        args: chromium.args,
        headless: true,
        renderAfterElementExists: '.hero'
      })
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', 'lucide-react']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    assetsInlineLimit: 0, // Força todas as imagens serem arquivos externos
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  };
});

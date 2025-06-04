import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": path.resolve(__dirname, "node_modules/react"),
    },
  },
  build: {
    // Otimizações de performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
      }
    },
    // Melhora o code splitting
    cssCodeSplit: true,
    // Otimiza o tamanho dos chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa vendors em chunks específicos
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('tailwind')) {
              return 'ui-vendor';
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    // Otimiza o tamanho dos assets
    assetsInlineLimit: 4096,
    // Habilita source maps em produção para debug
    sourcemap: true,
    // Melhora o tree shaking
    reportCompressedSize: true,
  },
  // Otimizações de performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
}));

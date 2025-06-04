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
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    // Melhora o code splitting
    cssCodeSplit: true,
    // Otimiza o tamanho dos chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-select'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'lucide-react']
        }
      }
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

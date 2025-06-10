import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        // Simplified manual chunks for better performance
        // Optimize asset naming with content hashing
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            extType = 'images';
          } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      },
      // Tree shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom', 
      'react-dom/client',
      'react-router-dom',
      'react/jsx-runtime',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      '@tanstack/react-query'
    ],
    exclude: [
      // Exclude large dependencies that benefit from lazy loading
      '@radix-ui/react-dialog',
      '@radix-ui/react-select'
    ],
    // Force pre-bundling for better dev performance
    force: mode === 'development'
  },
  // Enhanced CSS optimization
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      // Add any CSS preprocessor options if needed
    }
  },
  // Performance optimizations
  esbuild: {
    // Drop console and debugger in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Enable tree shaking
    treeShaking: true
  },
  // Experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `"${filename}"` };
      } else {
        return filename;
      }
    }
  }
}));
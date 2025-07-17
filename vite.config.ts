import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    {
      name: 'async-css-loader',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/<link rel="stylesheet" href="(.*?)">/g, (full, href) => {
          return full.includes('media=') || full.includes('onload=')
            ? full
            : `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">`;
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack/react-query')) {
              return 'vendor_react-query';
            }
            if (id.includes('react-router-dom') || id.includes('react-router')) {
              return 'vendor_react-router';
            }
            if (id.includes('@supabase')) {
              return 'vendor_supabase';
            }
            if (id.includes('react-dom')) {
              return 'vendor_react-dom';
            }
            if (id.includes('react')) {
              return 'vendor_react';
            }
            return 'vendor';
          }
        },
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
      }
    }
  }
}));

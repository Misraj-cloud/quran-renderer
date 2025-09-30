import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json' })],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'misraj-quran-renderer',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
      styles: path.resolve(__dirname, 'src/styles.ts'),
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  // Make Sass @use/@import like "src/styles/..." work in any .scss file
  // and allow using the existing aliases inside styles as well.
  css: {
    preprocessorOptions: {
      scss: {
        // Support absolute-style imports, e.g. @use "src/styles/constants";
        // We add both the project root and src so either
        // "src/..." or "..." under src resolves correctly.
        loadPaths: [path.resolve(__dirname), path.resolve(__dirname, 'src')],
      },
      // Also support the indented Sass syntax if used anywhere
      sass: {
        loadPaths: [path.resolve(__dirname), path.resolve(__dirname, 'src')],
      },
    },
  },
});

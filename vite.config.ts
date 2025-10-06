import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      entryRoot: 'src',
      outDir: 'dist',
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        styles: path.resolve(__dirname, 'src/styles.ts'),
      },
      name: 'misraj-mushaf-renderer',
      formats: ['es', 'cjs'],
      fileName: (format, entry) => `${entry}.${format}.js`,
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
    modules: {
      generateScopedName: (name, filename) => {
        const componentName = path.basename(filename, '.module.scss');
        return `${componentName}-${name}`;
      },
    },
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

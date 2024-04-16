import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

export default ({ mode }: { mode: string }): any => {
  // const env = loadEnv(mode, process.cwd(), '')

  const configWindow = {}

  return defineConfig({
    base: './',
    define: configWindow,
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
      ]
    },
    plugins: [react()],
    build: {
      target: 'ES2022',
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]'
        }
      }
    }
  })
}

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { cwd } from 'process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = dirname(__filenameNew)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // eslintPlugin({
    //   include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    // })
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
      '@': resolve(__dirnameNew, 'src'),
      '@views': resolve('./src/views')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080, // 自定义端口
    open: true // 设置服务启动时是否自动打开浏览器
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/styles/mixin.scss";@import "@/styles/variables.scss";'
      }
    }
  }
})

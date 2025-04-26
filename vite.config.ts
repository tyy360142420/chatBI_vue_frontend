import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from "unocss/vite";
// import { pathResolve } from './build/utils';
import path from 'path'
// https://vite.dev/config/
export default defineConfig( (env) => {
  const viteEnv = loadEnv(env.mode, process.cwd())
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '#': path.resolve(__dirname, './src/types'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      port: 3002, // 端口号
      host: true, // 监听所有地址
      open: true, // 项目启动时是否自动在浏览器中打开应用程序
      hmr: true, // 开启热更新
      cors: true, // 跨域允许
      proxy:{
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      } // 跨域处理, see：https://cn.vitejs.dev/config/server-options.html#server-proxy
    }
  }
})

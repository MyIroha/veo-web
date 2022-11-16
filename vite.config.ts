import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default {
  proxy: {
    '/api': {
      target: 'http://localhost:8081/',  //你要跨域访问的网址
      changeOrigin: true,   // 允许跨域
      rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
    }
  },
  plugins: [
    vue(),
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ],
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
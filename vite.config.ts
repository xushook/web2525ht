import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'//图表分析插件
import viteCompression from 'vite-plugin-compression'
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({ open: true }),
        importToCDN({//第三步 开启cdn加速
            modules: [
                {
                    name: "vue",
                    var: "Vue", // 根据main.ts中定义的来
                    path: "https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.runtime.global.prod.js",
                },
                {
                    name: "element-plus",
                    var: "ElementPlus", // 根据main.ts中定义的来
                    path: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.4/index.full.min.js",
                    css: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.4/index.min.css",
                },
                {
                    name: "vue-router",
                    var: "VueRouter", // 根据main.ts中定义的来
                    path: "https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.0/vue-router.global.min.js",
                },
                {
                    name: "echarts",
                    var: "echarts", // 根据main.ts中定义的来
                    path: "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js",
                },
                {
                    name: "vue-demi",
                    var: "VueDemi", // 根据main.ts中定义的来
                    path: "https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.11/index.iife.js",
                },
            ],
        }),
        WindiCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    //@ts-ignore
    theme: {
        colors: {
            // 在这里配置你的调色板
        },
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    build: {
        minify: 'terser', // 启用 terser 压缩  
        terserOptions: {
            compress: {
                pure_funcs: ['console.log'], // 只删除 console.log  
                drop_debugger: true, // 删除 debugger  
            }
        },
        rollupOptions: {
            plugins: [//开启gzip压缩
                viteCompression({
                    verbose: true, // 是否在控制台中输出压缩结果
                    disable: false,
                    threshold: 1024, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
                    algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
                    ext: '.gz',
                    deleteOriginFile: true // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
                })
            ],
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
            }
        }
    },
    output: {
        // 最小化拆分包
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
        }
    },
    server: {
        open: true,
        proxy: {
            // 选项写法
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,//允许跨域
            },
            '/examples': {
                target: 'https://echarts.apache.org',
                changeOrigin: true,//允许跨域
            },
        }
    }
})

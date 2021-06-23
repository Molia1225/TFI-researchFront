const { resolve } = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

export default {
  server: {
    port: 3088,
    host: '0.0.0.0',
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  srcDir: '',
  router: {
    base:'/official/'
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: '天风国际证券研究报告', //process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: "format-detection",
        content: 'telephone=no'
      }
    ],
    script: [
      {
        src: 'js/jquery@1.12.4.min.js',
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      {
        href:
          'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css',
        rel: 'stylesheet',
      },
      /* {
        href:
          '/theme/index.css',
        rel: 'stylesheet',
      }, */
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/static/theme/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   ** nuxt 会在vue.js程序运行前,执行所有注册的插件
   */
  plugins: [
    '~/plugins/svg-icons', //注册svg插件文件
    {
      src: '~plugins/ElementUI',
      ssr: true,
    },
    '~/plugins/lodash'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios', '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    // prefix: '/api'
  },
  /*
   ** proxy
   */
  /* proxy: {
    '/api': {
      target: 'http://research.tfisec.com/reportsservice', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
    }
  }, */
  styleResources: {
    less: [
      './assets/less/custom.less',
      './assets/less/main.less',
    ],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    parallel: true,
    // extractCSS: true,
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    postcss: [
      /* require("postcss-px2rem")({
        remUnit:100
      }) */
    ],
    extend (config, { isDev, isClient, isServer }) {
      if (isClient) {
        config.entry = {
          polyfill: ['babel-polyfill'],
        }
      }
      config.module.rules.find(
        (rule) => rule.use && rule.use[0]['loader'] == 'url-loader'
      ).use[0]['options']['limit'] = 15000
      config.plugins.unshift(new LodashModuleReplacementPlugin())
      // rules[2].use[0] is babel-loader
      config.module.rules[2].use[0].options.plugins = ['lodash']
      if (isDev && isClient) {
        config.devtool = 'cheap-module-eval-source-map'
      }
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, 'assets/icons/svg')]
      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolve(__dirname, 'assets/icons/svg')], //将存放svg的目录加入到loader处理目录
        use: [
          { loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } },
        ],
      })
    },
    vendor: ['element-ui']
  },
}

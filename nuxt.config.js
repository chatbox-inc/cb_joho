export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['animate.css/animate.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/day.js'],
  /*
   ** Nuxt.js dev-modules
   */
  devDependencies: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  /*
   ** Nuxt.js modules
   */
  /* modules: ['@nuxtjs/tailwindcss'], */

  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/pwa'],
  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  /*
   ** PWAの設定
   */
  pwa: {
    manifest: {
      name: '時報', // アプリの名称
      short_name: '時報アプリ', // ホーム画面に表示される名称
      display: 'standalone', // 表示モード  'fullscreen' 'standalone' 'minimal-ui' 'browser'
      theme_color: '#5BA9FF', // アプリケーションの既定のテーマ色を定義
      background_color: '#ffdce6', // 背景の色
      lang: 'ja', // 言語
      start_url: '/', // アイコンから起動した時のURL
      icons: [
        {
          src: '@/static/icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
}

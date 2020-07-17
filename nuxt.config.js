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

  buildModules: ['@nuxtjs/tailwindcss'],
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
  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  }
}

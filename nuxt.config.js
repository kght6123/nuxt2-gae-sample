const webpack = require('webpack')
const pkg = require('./package')

// read env.
try { var defaultEnvConfig = require(`./env.js`) } catch (err) {}
try { var nodeEnvConfig = require(`./env.${process.env.NODE_ENV}.js`) } catch (err) {}
try { var nodeEnvHostConfig = require(`./env.${process.env.NODE_ENV}.${process.env.NODE_ENV_HOST}.js`) } catch (err) {}
const envObj = Object.assign({}, defaultEnvConfig, nodeEnvConfig ? nodeEnvConfig : {}, nodeEnvHostConfig ? nodeEnvHostConfig : {})

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - サイト名',
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:site_name', property: 'og:site_name', content: 'サイト名' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://example.com' },
      { hid: 'og:title', property: 'og:title', content: 'サイト名' },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { hid: 'og:image', property: 'og:image', content: 'https://example.com/img/ogp/common.jpg' },
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
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/firebase.js',
    { src: "~/plugins/persistedstate.js", ssr: false },
    '~/plugins/vue-js-modal',
    '~/plugins/fontawesome.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  styleResources: {
    sass: [
      '~/assets/scss/custom.scss'
    ]
  },

  /*
   ** PWA manifest
   */
  manifest: {
    name: 'nuxt2-gae-sample',
    lang: 'ja'
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /**
     * add external plugins
     */
    vendor: ['jquery', 'bootstrap', 'popper.js'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map'
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  },
  env: envObj,

  serverMiddleware: [
    //'redirect-ssl',
    //{ path: '/api', handler: '~/api/index.js' },
    '~/api/index.js',
    '~/api/private.js',
  ],

  router: {
    middleware: ['authenticated']
  },
}

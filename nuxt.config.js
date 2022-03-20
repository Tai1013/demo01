const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/demo01/'
    }
} : {}

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'demo01',
        htmlAttrs: {
            lang: 'en',
            theme: '1c97ce',
            system: 'light'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/normalize.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/scss/main.scss',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/fontawesome',
        {
            src: '@/plugins/axios',
            ssr: true // 預設為true，會同時在服務端（asyncData（{$axios}））和客戶端（this.$axios）同時攔截axios請求，設為false就只會攔截客戶端
        }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        scss: ['@/assets/scss/_variables.scss']
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios'
    ],
    // variables

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    router: {
        middleware: ['authenticated','device']
    },

    loading: {},

    ...routerBase
}

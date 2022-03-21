<template>
    <div>
        <h1>真人</h1>
    </div>
</template>

<script>
export default {
    name: 'LivePage',
    layout(context) {
        if (context.store.getters.DEVICE_TYPE === 'desktop') return 'desktop'
        return 'mobile'
    },
    head() {
        return {
            title: 'demo01 - 真人'
        }
    },
    computed: {
        isMobile() {
            if (this.$store.getters.DEVICE_TYPE === 'desktop') this.$nuxt.setLayout('desktop')
            else this.$nuxt.setLayout('mobile')
            return this.$store.getters.DEVICE_TYPE
        },
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize)
    },
    methods: {
        onResize() {
            this.$store.dispatch('getDeviceType')
            
        },
    },
}
</script>
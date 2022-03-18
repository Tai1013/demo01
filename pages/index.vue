<template>
    <div>
        <!-- <Tutorial /> -->
        {{ isMobile }}
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    layout(context) {
        if (context.store.getters.DEVICE_TYPE === 'desktop') return 'default'
        return 'mobile'
    },
    computed: {
        isMobile() {
            if (this.$store.getters.DEVICE_TYPE === 'desktop') this.$nuxt.setLayout('default')
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

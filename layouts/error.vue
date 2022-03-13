<template>
    <div>
        <h1 v-if="error.statusCode === 404">Page not found</h1>
    </div>
</template>
<script>
export default {
    layout: 'error',
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
}
</script>
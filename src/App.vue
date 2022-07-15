<template>
    <div id="app">
        <router-view v-if="isRouterActive"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'app',
        provide () {
            return {
                reloadAll: this.reloadAll
            }
        },
        data () {
            return {
                isRouterActive: true
            }
        },
        methods: {
            reloadAll () {
                this.isRouterActive = false
                this.$nextTick(() => {
                    this.isRouterActive = true
                })
            }
        }
    }

</script>
<style>
</style>

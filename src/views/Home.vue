<template>
    <el-container style="width:auto;height:100%;overflow:hidden;">
        <el-header height="80px" style="background:#c2ece4;">
            <Head/>
        </el-header>
        <el-container style="background:aliceblue;">
            <el-aside style="height:100%;">
                <el-scrollbar :max-height="maxAsideHeight"   style="background: white">
                <Aside/>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar :max-height="maxHeight">
                <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Head from '@/views/Head.vue'
    import Aside from '@/views/Aside.vue'

    export default {
        name: 'Home',
        components: {
            Head, Aside
        },
        data() {
            return {
                maxAsideHeight: 0,
                maxHeight: 0
            }
        }, mounted() {
            this.maxAsideHeight = window.innerHeight - 80;
            this.maxHeight = window.innerHeight - 100;
            window.onresize = () => {
                return (() => {
                    this.maxAsideHeight = window.innerHeight - 80;
                    this.maxHeight = window.innerHeight - 100;
                })();
            };
        }
    }



</script>
<style>
</style>

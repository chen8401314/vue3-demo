<template>
    <el-container style="width:auto;height:100%;overflow:hidden;">
        <el-header height="80px" style="background:#c2ece4;">
            <Head/>
        </el-header>
        <el-container style="background:aliceblue;">
            <el-aside style="height:100%;">
                <Aside/>
            </el-aside>
            <el-main>
                <Main/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Head from '@/views/Head.vue'
    import Aside from '@/views/Aside.vue'
    import Main from '@/views/Main.vue'
    import {getUserInfo} from '@/common/api.js'
    import {getCurrentInstance} from 'vue'
    export default {
        name: 'Home',
        components: {
            Head, Aside, Main
        },setup() {
            const { proxy } = getCurrentInstance();
            proxy.$Global =  getUserInfo();
            console.log("user=",proxy.$Global)
        }
    }
</script>
<style>
</style>

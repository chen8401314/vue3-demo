<template>
    <el-container style="width:auto;height:100%;overflow:hidden;" v-loading="!isInit">
        <el-header height="80px" style="background:#c2ece4;" >
            <Head v-if="isInit" />
        </el-header>
        <el-container style="background:aliceblue;">
            <el-aside style="height:100%;">
                <el-scrollbar :max-height="maxAsideHeight" style="background: white">
                    <Aside/>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar :max-height="maxHeight"  v-if="isInit" >
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Head from '@/views/Head.vue'
    import Aside from '@/views/Aside.vue'
    import {useStore} from "vuex";

    export default {
        name: 'Home',
        components: {
            Head, Aside
        },
        data() {
            return {
                maxAsideHeight: 0,
                maxHeight: 0,
                isInit:false
            }
        }, methods: {
            async init() {
                const store = useStore();
                await store.dispatch("getUserInfo");
                console.log("init");
                this.isInit = true;
            }
        }, mounted() {
            this.init();
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

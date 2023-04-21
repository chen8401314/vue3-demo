<template>
    <el-container style="width:auto;height:100%;overflow:hidden;" v-loading="!isInit">
        <el-header height="80px" style="background:#c2ece4;">
            <Head v-if="isInit"/>
        </el-header>
        <el-container style="background:aliceblue;">
            <el-aside style="height:100%;">
                <el-scrollbar :max-height="maxAsideHeight" style="background: white">
                    <Aside/>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar :max-height="maxHeight" v-if="isInit">
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
    import Head from '@/views/Head.vue'
    import Aside from '@/views/Aside.vue'
    import {useStore} from "vuex";
    import {onMounted, ref} from "vue";
    import {useRouter} from "vue-router";
    import {ElMessage} from "element-plus";

    const router = useRouter();

    const maxAsideHeight = ref('0')
    const maxHeight = ref('0')
    const isInit = ref(false)

    const store = useStore();
    const init = async () => {
        await store.dispatch("getUserInfo");
        isInit.value = true;

    }
    onMounted(() => {
        init();
        maxAsideHeight.value = window.innerHeight - 80;
        maxHeight.value = window.innerHeight - 100;
        window.onresize = () => {
            return (() => {
                maxAsideHeight.value = window.innerHeight - 80;
                maxHeight.value = window.innerHeight - 100;
            })();
        };
    })
</script>
<style>
    .el-pagination {
        background: white;
        padding: 5px;
        padding-left: 10px;
        border: 1px solid var(--el-border-color-lighter);
        border-top: 0px;
    }

</style>

<template>

    <el-row align="middle" justify="space-between" style="height:100%;">
        <el-col :span="5">
            <el-image style="margin-left: 20px;width: 60px; height: 60px" :src="require('@/assets/logo.png')"
                      :fit="fit"/>
        </el-col>
        <el-col :span="10" style="text-align:center">
            <span style="font-size: 40px; color: black;letter-spacing: 10px;font-family: 'STCaiyun'">测试管理系统</span>
        </el-col>
        <el-col :span="5" style="">
            <div style="text-align: right">
                登录用户:{{ userInfo.username }}
                <el-avatar :icon="UserFilled"/>
                <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
           <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-col>

    </el-row>


</template>
<script setup>
    import {logout} from "../common/api.js"
    import {useStore} from "vuex";
    import {onMounted, ref} from "vue";
    import {useRouter} from "vue-router";
    import { UserFilled } from '@element-plus/icons-vue'

    const store = useStore()
    const userInfo = ref({})
    const router = useRouter();

    const handleCommand = async (command) => {
        if (command == 'logout') {
            await logout();
            router.push({
                name: 'Login'
            })
        }
    }
    onMounted(() => {
        userInfo.value = store.state.userInfo
    })
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
        vertical-align: center;
        padding-top: 20px;
    }

    .el-dropdown {
        height: 20px;
    }
</style>

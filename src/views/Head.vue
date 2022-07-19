<template>
    <el-row type="flex" justify="end">
        <el-dropdown split-button type="primary"  @command="handleCommand">
            当前登录用户:{{username}}
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-row>
</template>
<script>
    //import axios from 'axios';
    //import {testList} from "../common/api.js";
    import {ElMessage} from 'element-plus'
    import {logout} from "../common/api.js"
    import {getCurrentInstance} from 'vue'
    export default {
        name: 'Head',
        data() {
            return {
                username: '123'
            }
        },
        methods: {
            //点击第几页
            logout() {
                ElMessage(`click on item `)
            },
            async handleCommand(command) {
                if (command == 'logout') {
                    await logout();
                    this.$router.push({
                        name: 'Login'
                    })
                }
            }
        }, mounted() {
            const { proxy } = getCurrentInstance();
            this.username = proxy.$Global.userInfo.useranme;
        }
    }
</script>
<style scoped>
</style>

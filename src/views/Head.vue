<template>

    <el-row align="middle" justify="space-between" style="height:100%;">
        <el-col :span="2">
        </el-col>
        <el-col :span="16" style="text-align:center">
                <span  style="font-size: 40px; color: black;letter-spacing: 10px;font-family: 'STCaiyun'">测试管理系统</span>
        </el-col>
        <el-col :span="2">
            <div>
                登录用户:{{userInfo.username}}
                <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
           <el-icon class="el-icon--right"><arrow-down /></el-icon>
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
<script>
    import {logout} from "../common/api.js"
    import { useStore } from "vuex";
    export default {
        name: 'Head',
        data() {
            return {
                userInfo: {},
                store:useStore()
            }
        },
        methods: {
            //点击第几页
            async handleCommand(command) {
                if (command == 'logout') {
                    await logout();
                    this.$router.push({
                        name: 'Login'
                    })
                }
            }
        },mounted() {
            this.userInfo = this.store.state.userInfo
        }
    }
</script>
<style>
  .el-dropdown-link {
     cursor: pointer;
     color: var(--el-color-primary);
     display: flex;
     align-items: center;
 }
  .el-dropdown {
      height: 20px;
  }
</style>

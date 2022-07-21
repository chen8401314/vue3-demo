<template>
    <el-row type="flex" justify="end" style="height:100%;vertical-align:middle;">
        <div style="top:30px;position:absolute">
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
    </el-row>
</template>
<script>
    import {logout} from "../common/api.js"
    import { useStore } from "vuex";
    export default {
        name: 'Head',
        data() {
            return {
                userInfo: {}
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
        },async mounted() {
            const store = useStore();
            await store.dispatch("getUserInfo");
            this.userInfo = store.state.userInfo
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

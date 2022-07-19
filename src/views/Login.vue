<template>
    <div id="login">
        <el-form :model="form" label-width="120px" id="form">
            <el-form-item label="用户名：">
                <el-input v-model="username"  placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" placeholder="请输入密码" v-model="password"  show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" @keyup.enter="keyDown(e)" style="padding-left:20px;padding-right:20px;height:30px;">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { login } from "../common/api.js";
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: ''
            }
        },methods:{
         async onSubmit() {
             await login({username: this.username, password: this.password});
             this.$router.push({
                 name:'Home'
             })
            },
            keyDown(e) {
                // 回车则执行登录方法 enter键的ASCII是13
                if (e.keyCode == 13 || e.keyCode == 100) {
                    this.onSubmit(); // 定义的登录方法
                }
            },

        },mounted(){
            // 绑定监听事件
            window.addEventListener("keydown", this.keyDown);
        },destroyed() {
            // 销毁事件
            window.removeEventListener("keydown", this.keyDown, false);
        }
    }
</script>
<style>
    #form {
        border: 2px solid var(--el-border-color);
        border-radius: 20px;
        text-align: center;
        width: 400px;
        height: 200px;
        position: absolute;
        padding-right: 50px;
        padding-top: 70px;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background: aliceblue;
    }

    .el-input {
        height: 30px;
    }

    .el-form-item__label {
        font-size: 14px;
    }
</style>



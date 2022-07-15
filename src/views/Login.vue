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
                <el-button type="primary" @click="onSubmit" style="padding-left:20px;padding-right:20px;height:30px;">登录</el-button>
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
            }
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



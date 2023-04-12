<template>
    <div id="login">
        <el-form :model="form" label-width="120px" id="form">
            <el-form-item label="用户名：">
                <el-input v-model="username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" placeholder="请输入密码" v-model="password" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" @keyup.enter="keyDown(e)"
                           style="padding-left:20px;padding-right:20px;height:30px;">登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import {login} from "../common/api/userApi.js";
    import {onMounted, onUnmounted, ref} from "vue"
    import {useRouter} from "vue-router";

    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const onSubmit = async () => {
        await login({username: username.value, password: password.value});
        router.push({
            name: 'Home'
        })
    }
    const keyDown = (e) => {
        // 回车则执行登录方法 enter键的ASCII是13
        if (e.keyCode == 13 || e.keyCode == 100) {
            onSubmit(); // 定义的登录方法
        }
    }
    onMounted(() => {
        // 绑定监听事件
        window.addEventListener("keydown", keyDown);
    })
    onUnmounted(() => {
        // 销毁事件
        window.removeEventListener("keydown", keyDown, false);
    })
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


</style>



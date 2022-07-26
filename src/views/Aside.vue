<template>
    <el-scrollbar :max-height="maxHeight">
        <el-menu
                active-text-color="#ffd04b"
                background-color="#545c64"
                class="el-menu-vertical-demo"
                default-active="1"
                text-color="#fff"
                @open="handleOpen"
                @close="handleClose"
                unique-opened="true"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>菜单一</span>
                </template>
                <el-sub-menu index="1-1">
                    <template #title>子菜单1</template>
                    <el-menu-item index="1-1-1">子菜单1-1</el-menu-item>
                    <el-menu-item index="1-1-1">子菜单1-2</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>菜单二</span>
                </template>
                <el-sub-menu index="1-1">
                    <template #title>子菜单2</template>
                    <el-menu-item index="1-1-1">子菜单2-1</el-menu-item>
                    <el-menu-item index="1-1-1">子菜单2-2</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>菜单三</span>
                </template>
                <el-sub-menu index="3-1">
                    <template #title>子菜单3</template>
                    <el-menu-item index="3-1-1">子菜单3-1</el-menu-item>
                    <el-menu-item index="3-1-2">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-3">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-4">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-5">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-6">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-7">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-8">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-9">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-10">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-11">子菜单3-2</el-menu-item>
                    <el-menu-item index="3-1-12">子菜单3-22222</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>

        </el-menu>

    </el-scrollbar>
</template>
<script>
    export default {
        data() {
            return {
                maxHeight: 0
            }
        }, mounted() {
            this.maxHeight = window.innerHeight - 80;
            window.onresize = () => {
                return (() => {
                    this.maxHeight = window.innerHeight - 80;
                })();
            };
        }
    }

</script>
<style>
/*    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }*/
</style>

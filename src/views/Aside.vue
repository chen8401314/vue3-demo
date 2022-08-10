<template>
        <el-menu
                class="el-menu-vertical-demo"
                default-active="0"
                @open="handleOpen"
                @close="handleClose"
                unique-opened="true"
                router
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <Operation/>
                    </el-icon>
                    <span>菜单一</span>
                </template>
                <el-sub-menu  index="1-1">
                    <template #title>子菜单1</template>
                    <el-menu-item index="/list">子菜单1-1</el-menu-item>
                    <el-menu-item index="/test">子菜单1-2</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu>
                <template #title>
                    <el-icon>
                        <Operation/>
                    </el-icon>
                    <span>菜单二</span>
                </template>
                <el-sub-menu>
                    <template #title>子菜单2</template>
                    <el-menu-item index="/list1">子菜单2-1</el-menu-item>
                    <el-menu-item index="/test1">子菜单2-2</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>

</template>
<script setup>


</script>
<style>
</style>

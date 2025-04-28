<template>
  <!-- 添加动态宽度和过渡效果 -->
  <el-container
      :style="{
      width: isCollapse ? '64px' : '200px',
      transition: 'width 0.3s ease',

    }"
      style="height:100%;overflow:hidden;"
  >
    <el-header height="40px" style="display: flex; align-items: center;">
      <!-- 添加点击事件 -->
      <el-icon
          style="margin-left: auto; cursor: pointer;"
          @click="toggleCollapse"
      >
        <d-arrow-left :class="{ 'rotate-icon': isCollapse }"/>
      </el-icon>
    </el-header>
    <el-menu
        unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="defaultPath"
        router>
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <Operation/>
          </el-icon>
          <span>菜单一</span>
        </template>
        <el-sub-menu index="1-1">
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
  </el-container>


</template>
<script setup>
import {ref} from "vue";

const defaultPath = ref('/list');
const isCollapse = ref(false);

const emit = defineEmits(['collapse-change'])
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('collapse-change', isCollapse.value) // 新增此行
}



</script>
<style>/* 添加图标旋转动画 */
.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
/* 图标间距 */
.el-menu-item > i, .el-sub-menu__title > i {
  margin-right: 8px;
}
</style>

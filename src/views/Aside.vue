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
        :collapse="isCollapse"
        :default-active="defaultPath"
        router
        unique-opened
    >
      <!-- 递归渲染菜单项 -->
      <menu-item
          v-for="item in menuData"
          :key="item.index"
          :item="item"
      />
    </el-menu>
  </el-container>


</template>
<script setup>
import {ref} from "vue";
import { resolveComponent } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { h } from 'vue'

const defaultPath = ref('/list');
const isCollapse = ref(false);

const emit = defineEmits(['collapse-change'])
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('collapse-change', isCollapse.value) // 新增此行
}

// 菜单数据
const menuData = ref([
  {
    index: '1',
    title: '菜单一',
    icon: 'Operation',
    children: [
      {
        index: '1-1',
        title: '子菜单1',
        children: [
          { index: '/list', title: '子菜单1-8' },
          { index: '/test', title: '子菜单1-2' }
        ]
      }
    ]
  },
  {
    index: '2',
    title: '菜单二',
    icon: 'Operation',
    children: [
      {
        index: '2-1',
        title: '子菜单2',
        children: [
          { index: '/list1', title: '子菜单2-1' },
          { index: '/test1', title: '子菜单2-2' }
        ]
      }
    ]
  }
])
const MenuItem = {
  name: 'MenuItem',
  props: ['item'],
  setup(props) {
    const renderIcon = (iconName) => {
      try {
        if (!iconName) return h('span') // 添加空span占位
        const IconComponent = resolveComponent(iconName)
        return IconComponent ? h(IconComponent) : h('span')
      } catch (e) {
        console.error('图标渲染失败:', iconName, e)
        return h('span')
      }
    }

    return () => {
      try {
        const item = props.item
        if (!item?.index) { // 加强空值检查
          console.warn('无效的菜单项:', item)
          return null
        }

        // 使用Fragment包裹内容
        const iconContent = item.icon ?
            h(ElIcon, null, renderIcon(item.icon)) :
            h('span', { class: 'icon-placeholder' })

        return item.children?.length ?
            h(ElSubMenu, {
              index: item.index,
              class: { 'has-icon': !!item.icon }
            }, {
              title: () => [
                iconContent,
                h('span', { class: 'menu-title' }, item.title)
              ],
              default: () => item.children.map(child =>
                  h(MenuItem, { item: child })
              )
            }) :
            h(ElMenuItem, {
              index: item.index,
              class: { 'has-icon': !!item.icon }
            }, () => [
              iconContent,
              h('span', { class: 'menu-title' }, item.title)
            ])
      } catch (e) {
        console.error('菜单项渲染失败:', e)
        return null
      }
    }
  }
}

</script>
<style>/* 添加图标旋转动画 */
.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
/* 添加无图标时的对齐样式 */
.el-menu-item > span,
.el-sub-menu__title > span {
  margin-left: 8px; /* 保持与有图标时相同的缩进 */
}

/* 当没有图标时移除左边距 */
.el-menu-item:not(.has-icon) > span,
.el-sub-menu__title:not(.has-icon) > span {
  margin-left: 0;
}
</style>

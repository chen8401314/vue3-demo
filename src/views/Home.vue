<template>
    <el-container style="width:auto;height:100%;overflow:hidden;" v-loading="!isInit">
        <el-header height="80px" style="background:#c2ece4;">
            <Head v-if="isInit"/>
        </el-header>
      <el-container style="flex:1;background:aliceblue;">
          <!-- 添加动态宽度和过渡 -->
          <el-aside
              :style="{
          width: asideWidth,
          position: 'relative', // 关键修改
          transition: 'width 0.3s'
        }"
          >
            <el-scrollbar :max-height="maxAsideHeight" style="background: white">
              <Aside @collapse-change="handleCollapse"/>
            </el-scrollbar>
          </el-aside>

        <!-- 主内容区域改用动态padding -->
        <el-main
            :style="{
          transition: 'padding 0.3s',
          width: '100%' // 新增宽度约束
        }"
        >
            <el-scrollbar :max-height="maxHeight" v-if="isInit">
              <router-view></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
    import Head from '@/views/Head.vue'
    import Aside from '@/views/Aside.vue'
    import {useStore} from "vuex";
    import {onMounted, ref} from "vue";

    const handleCollapse = (state) => {
      isCollapse.value = state
      asideWidth.value = state ? '64px' : '200px'
    }
    // 添加折叠状态管理
    const isCollapse = ref(false)
    const asideWidth = ref('200px')
    const maxAsideHeight = ref('0')
    const maxHeight = ref('0')
    const isInit = ref(false)

    const store = useStore();
    const init = async () => {
      try {
        await store.dispatch("getUserInfo");
        isInit.value = true;
      } catch (error){

      }

    }
    onMounted(() => {
        init();
        maxAsideHeight.value = window.innerHeight - 80;
        maxHeight.value = window.innerHeight - 100;
        window.onresize = () => {
            return (() => {
                maxAsideHeight.value = window.innerHeight - 80;
                maxHeight.value = window.innerHeight - 100;
            })();
        };
    })
</script>
<style>
.main-container {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.el-container.el-container--default {
  display: flex !important;
}
.el-main {
  flex: 1;
  min-width: 0; /* 修复flex布局溢出问题 */
}
/* 确保滚动条正常显示 */
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>

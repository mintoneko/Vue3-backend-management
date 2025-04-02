<script setup>
import { ref, computed } from 'vue'

// 动态引入图片
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}`, import.meta.url).href
}

// 状态控制
import { useAllDateState } from '@/stores'
const store = useAllDateState()
function handleCollapse() {
  store.setIsCollapse(!store.state.isCollapse)
}
</script>

<template>
  <div class="header">
    <!--左侧菜单-->
    <div class="l-content">
      <!-- 需要这个图标控制左侧菜单的呼入和呼出，故需要引入pinia,对应了左侧某部件:collapse="false" -->
      <el-button size="small" @click="handleCollapse">
        <component class="icons" is="menu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{
          current.label
          }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--右侧用户头像-->
    <div class="r-content">
      <el-dropdown>
        <span>
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.icons {
  width: 20px;
  height: 20px;

}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
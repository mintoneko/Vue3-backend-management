<script setup>
import { ref, computed } from 'vue'

// 遍历生成
const list = ref([
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'house',
    url: 'Home'
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: 'video-play',
    url: 'Mall'
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'user',
    url: 'User'
  },
  {
    path: 'other',
    label: '其他',
    icon: 'location',
    children: [
      {
        path: '/page1',
        name: 'page1',
        label: '页面1',
        icon: 'setting',
        url: 'Page1'
      },
      {
        path: '/page2',
        name: 'page2',
        label: '页面2',
        icon: 'setting',
        url: 'Page2'
      }
    ]
  }
])
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))

// 状态控制
import { useAllDateState } from '@/stores'
const store = useAllDateState()
const isCollapse = computed(() => store.state.isCollapse)
const isWidth = computed(() => store.state.isCollapse ? '64px' : '180px')
</script>

<template>
  <!-- 这里利用Vue绑定需要加上: -->
  <el-aside :width=isWidth>
    <!-- 注意这里修改element组件样式，不是使用style，直接使用绑定 -->
    <el-menu background-color="#545c64" text-color="#fff" :collapse="isCollapse">
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path">
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <!-- 和上面一样的遍历，然后使用icon和label -->
      <el-sub-menu v-for="item in hasChildren" :key="item.path" :index="item.path">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subItem.path" :index="subItem.path">
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}

.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>

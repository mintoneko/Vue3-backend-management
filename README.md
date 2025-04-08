## Vue3后台管理系统

![image-20250402162552235](images/image-20250402162552235.png)

### 创建项目

```node
npm create vue@latest
```

参考基础模板，删除无用组件即可

```js
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  // 别名，方便引入文件
  /*
  alias: {
    find: '@',
    replacement: "/src"
  }
  */
},
```

### Element-plus用法

https://element-plus.org/zh-CN/guide/quickstart.html

- main.js导入

- vite导入
- vite导入：按需

### Main组件

```vue
<script setup>
import CommonAside from '@/components/CommonAside.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧组件，驼峰式和短线式都能被Vue所识别 -->
      <common-aside />
      <el-container>
        <el-header class="el-header">
          <common-header />
        </el-header>
        <el-main class="right-main">
          main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100%;
  width: 100%;
}

.el-header {
  width: 100%;
  background-color: pink;
}
</style>
```

可见插件将其自动渲染为想要的页面了

### Aside组件

https://element-plus.org/zh-CN/component/menu.html

找到相应的组件，直接导入即可，但是注意按需调整想要的样式

```vue
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

```

> 注意elelment-plus这几个组件，习惯了就更容易编写了

左边导航栏就大致完成，初步体验element组件的使用

### Header组件

```vue
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
```

### Pinia状态管理

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function initState() {
  return {
    isCollapse: false,
  }
}
export const useAllDateState = defineStore('main', () => {
  const state = ref(initState());
  const setIsCollapse = () => {
    state.value.isCollapse = !state.value.isCollapse
  }
  return { state, setIsCollapse }
},
  {
    persist: true,
  },
)
// 引入持久化插件
```

显而易见，作用是让头部组件和菜单组件联动，控制菜单的展开和伸缩

注意`el-menu`的`:collapse="isCollapse"`这个属性

过渡属性：`:collapse-transition="false"`打开之后过渡就比较丝滑

### 子路由管理

- Home

```js
const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    redirect: "/home",
    children: [
      {
        // 注意这里不要有/
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
    ]
  }
]
```

配置好子路由后需要在对应位置放路由出口

```js
<view-router></view-router>
```

### 封装axios

https://www.axios-http.cn/docs/intro

```js
axios({
  method: "get",
  url: "/api/home/getTableDate",
})
  .then((res) => {
    console.log(res.data)
  });
```

安装好依赖之后就可以直接使用了

### 导入Mock

https://github.com/nuysoft/Mock/wiki/Getting-Started

阿里开源的前端请求工具

```js
import Mock from 'mockjs'
import home from '@/api/data/home'

console.log("mock start...")
Mock.mock('/api/home/getTableData', 'get', home.getTableData)
```

### 二次封装axios

> 实现自定义相应请求器和拦截器

```js
import axios from 'axios';
import { ElMessage } from 'element-plus';
const service = axios.create();

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code == 200) {
    return data;
  }
  else {
    const NETWORD_ERROR = '网络错误...';
    ElMessage.error(msg || NETWORD_ERROR);
    return Promise.reject(new Error(msg || NETWORD_ERROR));
  }
});

function request(options) {
  options.method = options.method || 'get';
  return service(options);
}

export default request;
// 导出request
```

然后统一写入api.js进行管理

```js
/**
 * 整个项目的api接口统一管理
 */

import request from "./request";

// 获取首页左下角数据
export function getTableData() {
  return request({
    url: '/api/home/getTableData',
    method: 'get'
  })
}
```

全局注册api

```js
import api from '@/api/api.js'

app.config.globalProperties.$api = api
// 注册全局属性$api，方便在组件中使用->通过this.$api调用api.js中的方法
```

替换之前Home.vue组件中直接用axios请求的部分代码

原

```js
axios({
  method: "get",
  url: "/api/home/getTableData",
})
  .then((res) => {
    if (res.data.code === 200) {
      tableData.value = res.data.data.tableData;
    }
  });
```

改

```js
const getTableData = async () => {
  const data = await proxy.$api.getTableData();
  tableData.value = data.tableData;
}

onMounted(() => {
  getTableData()
})
```

### 统一管理mock地址

> 简历加分项

添加@/config/index.js

```js
/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境-dev
 * 测试环境-test
 * 线上环境-prod
 */

// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
}

export default {
  env,
  mock: false,
  ...EnvConfig[env]
}
```

修改request部分

```js
const service = axios.create({
  baseURL: config.baseApi,
});

function request(options) {
  options.method = options.method || 'get';
  // 关于GET请求参数的调整
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  // 对mock开关的处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  // 针对环境做处理
  if (config.env === "prod") {
    // 生产环境禁用mock
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return service(options);
}
```

> 真实开发环境的多种api地址处理方式

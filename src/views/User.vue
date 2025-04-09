<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
const { proxy } = getCurrentInstance()

const handleClick = () => {
  console.log('click')
}

const tableData = ref([])

const tableLabel = reactive([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'sexLable',
    label: '性别',
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 200
  },
  {
    prop: 'addr',
    label: '地址',
    width: 400
  }
])

const getUserList = async () => {
  const data = await proxy.$api.getUserData()
  // tableData.value = data.list
  // 需要对性别进行处理->利用map方法，对数组进行遍历，返回一个新数组
  tableData.value = data.list.map(item => {
    return {
      ...item,
      sexLable: item.sex === 1 ? '男' : '女'
    }
  })
}

onMounted(() => {
  getUserList()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"
        :width="item.width ? item.width : 125" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
}

.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .el-table {
    width: 100%;
    height: 500px;
  }
}

.select-clearn {
  display: flex;
}
</style>

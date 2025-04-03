<script setup>
import { ref } from 'vue'
import axios from 'axios'

const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

//假数据，等会我们使用axios请求mock数据
const tableData = ref([
  {
    name: "Java",
    todayBuy: 100,
    monthBuy: 200,
    totalBuy: 300,
  },
  {
    name: "Python",
    todayBuy: 100,
    monthBuy: 200,
    totalBuy: 300,
  }
])

// 表格表头
const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
})

axios({
  method: "get",
  url: "/api/home/getTableData",
})
  .then((res) => {
    if (res.data.code === 200) {
      tableData.value = res.data.data.tableData;
    }
  });
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" class="temp">
        <div class="user">
          <img :src="getImageUrl('user')" class="user" />
          <div class="user-info">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-7-11</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="table">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
        <!-- 利用el的表格快速搭建 -->
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: hidden;

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;

    }

    .user-info {
      p {
        line-height: 40px;
      }

      .user-info-p {
        color: #999;
      }

      .user-info-admin {
        font-size: 35px
      }
    }
  }

  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;

      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }

  .temp {
    margin-bottom: 20px;
  }

  .user-table {
    margin-top: 20px;
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }

    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 30px;
        margin-bottom: 10px
      }

      .txt {
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }

  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}
</style>

/**
 * 整个项目的api接口统一管理
 */

import request from "./request";

// 获取首页左下角数据
export default {
  getTableData() {
    return request({
      url: '/home/getTableData',
      method: 'get'
    })
  },
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get'
    })
  },
  getChartData() {
    return request({
      url: '/home/getChartData',
      method: 'get'
    })
  }
}
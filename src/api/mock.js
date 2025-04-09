import Mock from 'mockjs'
import home from '@/api/data/home'

console.log("mock start...")
Mock.mock('/api/home/getTableData', 'get', home.getTableData)
Mock.mock('/api/home/getCountData', 'get', home.getCountData)
Mock.mock('/api/home/getChartData', 'get', home.getChartData)
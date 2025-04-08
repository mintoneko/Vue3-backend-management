/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境-dev
 * 测试环境-test
 * 线上环境-prod
 */

// 当前的环境
const env = import.meta.env.MODE || 'prod' // 通过Vite环境变量控制

const EnvConfig = {
  development: {
    baseApi: '/api', // 本机服务器地址->通常配合反向代理解决跨域问题
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  test: {
    baseApi: '//test.future.com/api', // 测试服务器地址
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  prod: {
    baseApi: '//future.com/api', // 线上服务器地址
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
}

export default {
  env,
  mock: false,
  ...EnvConfig[env]
}
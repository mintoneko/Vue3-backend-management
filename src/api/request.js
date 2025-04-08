import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';

const service = axios.create({
  baseURL: config.baseApi,
});

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

export default request;
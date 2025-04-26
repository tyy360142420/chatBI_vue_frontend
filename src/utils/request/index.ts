import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// import { useAppStore } from "@/store";
// import qs from "qs";
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  // paramsSerializer: (params) => qs.stringify(params),
});
// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const accessToken = useAppStore().token;
    // 如果 Authorization 设置为 no-auth，则不携带 Token，用于登录、刷新 Token 等接口
    if (config.headers.Authorization !== "no-auth") {
      config.headers.Authorization = `Bearer ${import.meta.env.VITE_APP_API_KEY}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应是二进制流，则直接返回，用于下载文件、Excel 导出等
    if (response.config.responseType === "blob") {
      return response;
    }

    if (response.status === 200) {
      return response;
    }

    throw new Error(response.status.toString());
  },
  async (error) => {
    return Promise.reject(error)
  }
);

export default service;

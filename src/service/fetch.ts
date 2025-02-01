import axios from "axios";
import { message } from "antd";

interface ResDataType {
  [key: string]: any;
}
interface ResType {
  errno: number;
  data?: ResDataType;
  msg?: string;
}
const instance = axios.create({
  timeout: 3000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    console.log("request", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const resData = (response.data || {}) as ResType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
      if (msg) message.error(msg);
      throw new Error(msg);
    }
    return data as any;
  },
  (error) => {
    message.error("网络错误");
    return Promise.reject(error);
  }
);
export default function fetch(options: any) {
  return new Promise((resolve, reject) => {
    instance(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

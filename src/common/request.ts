/* eslint-disable no-shadow */
import axios from 'axios';
import { message } from 'antd';
import { VISITOR_TEXT } from '@/common/constants/user';

const request = (config: any) => {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
  });

  // 请求拦截
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    };
    return config;
  });

  // 响应拦截
  instance.interceptors.response.use(
    (res) => {
      console.log('res-------', res);
      return res.data ? res.data : res;
    },
    (error) => {
      console.log('error===', error.response);
      const { response } = error;
      if (response.status === 401) {
        window.location.href = '/login';
        message.error('token过期，请重新登录');
      }
      if (response.status === 403) {
        message.error(VISITOR_TEXT);
      }
    }
  );

  return instance(config);
};

export default request;

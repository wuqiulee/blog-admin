/* eslint-disable no-shadow */
import axios from 'axios';
import { get } from 'loadsh';
import { message } from 'antd';
import { VISITOR_TEXT } from '@/common/constants/user';
import { ErrorCode } from '@/common/constants/errCode';

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
      const status = get(error, 'response.status', 400);
      const errCode = get(error, 'response.data.code', -1);
      if (status === 401) {
        window.location.href = '/login';
        message.error('token过期，请重新登录');
        return;
      }
      if (status === 403) {
        message.error(VISITOR_TEXT);
        return;
      }
      // 统一处理业务接口error提示
      message.error(ErrorCode[errCode] || '接口调用失败');
    }
  );

  return instance(config);
};

export default request;

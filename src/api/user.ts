import request from '@/common/request';
import { LoginType } from '@/interface/api';

export const userLogin = async (data: LoginType) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  });
};

export const test = async (data: any) => {
  return request({
    url: '/test',
    method: 'POST',
    data,
  });
};

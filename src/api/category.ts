import request from '@/common/request';
import { CategoryType } from '@/interface/api';

// 创建分类
export const createCategory = async (data: CategoryType) => {
  return request({
    url: '/category/create',
    method: 'POST',
    data,
  });
};

// 获取分类列表
export const getCategoryList: any = async (params: any) => {
  return request({
    url: '/category/List',
    params,
  });
};

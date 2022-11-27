import request from '@/common/request';
import { CategoryType, UpdateCategoryType } from '@/interface/api';

// 创建分类
export const createCategory = async (data: CategoryType) => {
  return request({
    url: '/category/create',
    method: 'POST',
    data,
  });
};

// 获取分类列表
export const getCategoryList: any = async () => {
  return request({
    url: '/category/List',
  });
};

// 更新分类
export const updateCategory = async (data: UpdateCategoryType) => {
  return request({
    url: '/category/update',
    method: 'POST',
    data,
  });
};

// 删除分类
export const deleteCategory = async (data: { id: number }) => {
  return request({
    url: '/category/delete',
    method: 'POST',
    data,
  });
};

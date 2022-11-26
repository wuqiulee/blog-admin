import request from '@/common/request';
import { TagyType } from '@/interface/api';

// 创建标签
export const createTag = async (data: TagyType) => {
  return request({
    url: '/tag/create',
    method: 'POST',
    data,
  });
};

// 获取标签列表
export const getTagList: any = async (params: any) => {
  return request({
    url: '/tag/List',
    params,
  });
};

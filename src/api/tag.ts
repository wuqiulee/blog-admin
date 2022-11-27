import request from '@/common/request';
import { TagyType, UpdateTagType } from '@/interface/api';

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

// 更新标签
export const updateTag = async (data: UpdateTagType) => {
  return request({
    url: '/tag/update',
    method: 'POST',
    data,
  });
};

// 删除标签
export const deleteTag = async (data: { id: number }) => {
  return request({
    url: '/tag/delete',
    method: 'POST',
    data,
  });
};

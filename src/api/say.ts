import request from '@/common/request';
import { PublishSayType, UpdateshSayType } from '@/interface/api';

// 发表说说
export const publishSay = async (data: PublishSayType) => {
  return request({
    url: '/say/publish',
    method: 'POST',
    data,
  });
};

// 获取说说列表
export const getSayList = async () => {
  return request({
    url: '/say/list',
  });
};

// 更新说说
export const updateSay = async (data: UpdateshSayType) => {
  return request({
    url: '/say/update',
    method: 'POST',
    data,
  });
};

// 删除说说
export const deleteSay = async (data: { id: number }) => {
  return request({
    url: '/say/delete',
    method: 'POST',
    data,
  });
};

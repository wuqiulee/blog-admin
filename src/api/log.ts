import request from '@/common/request';
import { CreateLogType, UpdateLogType } from '@/interface/api';

// 添加日志
export const createLog = async (data: CreateLogType) => {
  return request({
    url: '/log/create',
    method: 'POST',
    data,
  });
};

// 获取日志列表
export const getLogList = async () => {
  return request({
    url: '/log/list',
  });
};

// 更新日志
export const updateLog = async (data: UpdateLogType) => {
  return request({
    url: '/log/update',
    method: 'POST',
    data,
  });
};

// 删除日志
export const deleteLog = async (data: { id: string }) => {
  return request({
    url: '/log/delete',
    method: 'POST',
    data,
  });
};

import request from '@/common/request';
import { CreateMessageType } from '@/interface/api';

// 添加留言
export const createMessage = async (data: CreateMessageType) => {
  return request({
    url: '/message/create',
    method: 'POST',
    data,
  });
};

// 回复留言
export const replyMessage = async (data: CreateMessageType) => {
  return request({
    url: '/message/reply',
    method: 'POST',
    data,
  });
};

// 获取留言列表
export const getMessageList = async () => {
  return request({
    url: '/message/list',
  });
};

// 删除留言
export const deleteMessage = async (data: { id: number }) => {
  return request({
    url: '/message/delete',
    method: 'POST',
    data,
  });
};

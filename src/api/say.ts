import request from '@/common/request';
import { PublishSayType } from '@/interface/api';

// 发表说说
export const publishSay = async (data: PublishSayType) => {
  return request({
    url: '/say/publish',
    method: 'POST',
    data,
  });
};

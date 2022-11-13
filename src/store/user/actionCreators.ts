import { SET_USER_INFO } from './constants';
import { UserPayloadType } from '@/interface/reducer';

// 设置用户信息
export const setUserInfoAction = (payload: UserPayloadType) => ({
  type: SET_USER_INFO,
  payload,
});

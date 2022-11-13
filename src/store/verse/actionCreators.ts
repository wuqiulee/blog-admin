import { GET_JRSC_API } from './constants';
import { JrscPayloadType } from '@/interface/reducer';

// 获取每日诗句和ip
export const getJrscApiAction = (payload: JrscPayloadType) => ({
  type: GET_JRSC_API,
  payload,
});

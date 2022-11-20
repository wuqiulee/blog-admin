import { TimeMap } from '@/common/constants/home';
import { TimeInfoType } from '@/interface/home';

/**
 * 检测是否已经登录
 */
export const checkLogin = () =>
  localStorage.getItem('token') || sessionStorage.getItem('isLogin') === 'true';

/**
 * @description 根据时间返回对应的描述
 * @param {number} 当前时间单位小时
 * @return {object} 时间对应的描述详情
 */
export const renderTimeInfo = (hour: number): TimeInfoType => {
  const timeInfo: string | undefined = Object.keys(TimeMap).find((key) => hour < Number(key));
  return TimeMap[timeInfo!];
};

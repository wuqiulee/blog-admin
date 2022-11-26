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

/**
 * @description 防抖
 * @param {number} fn 外部传入需防抖处理的函数
 * @param {string} delay 延迟执行的时长
 * @return {function} 防抖包装后的函数
 */
export const debounce = (fn: Function, delay: number) => {
  // 定义一个定时器, 保存上一次的定时器
  let timer: any = null;
  // 真正执行的函数
  // eslint-disable-next-line no-underscore-dangle
  const _debounce = (...args: any[]) => {
    // 取消上一次的定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数
      fn.apply(this, args);
    }, delay);
  };

  return _debounce;
};

import React from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { RoleEnum } from '@/store/user/reducer';
import { VISITOR_NAME, VISITOR_TEXT } from '@/common/constants/user';

/**
 * @description 权限校验
 */
const useVerifyAuth = () => {
  const { userInfo } = useSelector((state: any) => state);
  return (fn: () => void) => {
    if (
      sessionStorage.getItem('isLogin') === 'true' ||
      userInfo.user === VISITOR_NAME ||
      userInfo.role === RoleEnum.VISITOR
    ) {
      message.warning(VISITOR_TEXT);
    } else {
      fn();
    }
  };
};

export default useVerifyAuth;

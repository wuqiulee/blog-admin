import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TimeInfoType } from '@/interface/home';
import { renderTimeInfo } from '@/utils';
import Styles from './index.module.scss';

const Header: React.FC = () => {
  const { userInfo, verse } = useSelector((state: any) => state);
  const timeInfo: TimeInfoType = useMemo(() => {
    const hour = moment().hours();
    return renderTimeInfo(hour);
  }, []);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.userInfo}>
        <div>
          {timeInfo.status}，<span>{userInfo.user}</span>！<i>{timeInfo.desc}</i>
        </div>
        <p>
          “{verse.content}” —— {verse.author}({verse.dynasty})
        </p>
      </div>
      <div className={Styles.address}>
        <div className={Styles.date}>{verse.date}</div>
        <div className={Styles.ip}>{verse.ipAddress}</div>
      </div>
      <div>3</div>
    </div>
  );
};

export default Header;

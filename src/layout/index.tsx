import React, { useEffect, useState, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { MenuProps } from 'antd';
import { Layout, Menu, Popconfirm, notification } from 'antd';
import moment from 'moment';
import { load as loadJrscApi } from 'jinrishici';
import { LoginOutlined } from '@ant-design/icons';
import Styles from './index.module.scss';
import { renderMenu, formatSelectKey } from '@/utils/renderMenu';
import routes from '@/router';
import { getJrscApiAction } from '@/store/verse/actionCreators';
import { checkLogin } from '@/utils';

const { Header, Footer, Sider, Content } = Layout;
const Index: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const initKey = useMemo(() => {
    return formatSelectKey(pathname);
  }, []);
  const [selectedKeys, SetSelectedKeys] = useState<string[]>([initKey]);

  const MenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    SetSelectedKeys([formatSelectKey(key)]);
  };

  // 退出登录
  const logout = () => {
    // 清空本地存储
    localStorage.clear();
    sessionStorage.clear();
    // 跳转到登录页
    navigate('/login');
    notification.success({
      message: '已退出',
      description: '期待再次使用！',
      placement: 'topRight',
    });
  };

  useEffect(() => {
    if (!checkLogin()) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    loadJrscApi((res: any) => {
      const { status, data, ipAddress } = res;
      const { content, origin } = data;
      const { author, dynasty } = origin;
      if (status === 'success') {
        dispatch(
          getJrscApiAction({
            ipAddress,
            content,
            author,
            dynasty: dynasty.slice(0, 1),
            date: moment().format('YYYY-MM-DD'),
          })
        );
      }
    });
  }, []);

  return (
    <Layout>
      <Header className={Styles.header}>
        <span>个人博客</span>
        <Popconfirm
          placement="bottomRight"
          title="确定要退出登录吗？"
          onConfirm={logout}
          okText="Yes"
          cancelText="No"
        >
          <LoginOutlined className={Styles.logout} />
        </Popconfirm>
      </Header>
      <Layout>
        <Sider
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: 64,
          }}
        >
          <Menu
            mode="inline"
            items={renderMenu(routes[2].children!)}
            selectedKeys={selectedKeys}
            style={{ height: '100%', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 8%)' }}
            onClick={MenuClick}
          />
        </Sider>
        <Layout className={Styles.content}>
          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button, Space, Form, notification, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Styles from './Login.module.scss';
import { userLogin } from '@/api/user';
import { LoginType } from '@/interface/api';
import { setUserInfoAction } from '@/store/user/actionCreators';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: LoginType) => {
    try {
      const res: any = await userLogin(values);
      if (res.code === 0) {
        const { token, user, role } = res.data;
        console.log(res.data, 'res.data');
        // 保存登录状态
        localStorage.setItem('token', token);
        // 用户信息存储全局store
        dispatch(
          setUserInfoAction({
            user,
            role,
          })
        );
        // 跳转到首页
        navigate('/home');
        notification.success({
          message: '登录成功',
          description: '欢迎进入博客后台管理系统！',
          placement: 'topRight',
        });
      }
    } catch (err) {
      message.error('登录失败~');
      console.error(err, '登录失败');
    }
  };
  return (
    <div className={Styles.continer}>
      <div className={Styles.wrapper}>
        <h3>博客后台管理系统</h3>
        <p>上午好，祝你开心每一天！</p>
        <Form onFinish={onFinish}>
          <Form.Item
            name="user"
            rules={[{ required: true, message: '请输入用户名!', whitespace: true }]}
          >
            <Input size="large" placeholder=" 请输入用户名" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!', whitespace: true }]}
          >
            <Input.Password size="large" placeholder=" 请输入密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Space size={70} style={{ marginTop: 20 }}>
            <Button type="primary">游客</Button>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  TagsOutlined,
  AppstoreOutlined,
  MessageOutlined,
  CommentOutlined,
  DatabaseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Router } from '@/interface/router';

// 组件懒加载
const lazyLoad = (component: string) => {
  const path = `pages/${component}`;
  const Module = lazy(() => import(`@/${!component ? 'layout' : path}`));
  return (
    <Suspense
      fallback={
        <div>
          <Spin />
        </div>
      }
    >
      <Module />
    </Suspense>
  );
};

const routes: Router[] = [
  {
    name: '登录页',
    path: '/login',
    element: lazyLoad('Login'),
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    element: lazyLoad(''),
    children: [
      {
        name: '首页',
        path: '/home',
        icon: <HomeOutlined />,
        element: lazyLoad('Home'),
      },
      {
        name: '文章管理',
        path: '/article',
        icon: <ReadOutlined />,
        element: lazyLoad('Article'),
      },
      {
        name: '创建文章',
        path: '/article/create',
        element: lazyLoad('Article/components/CreateArticle'),
      },
      {
        name: '标签管理',
        path: '/tag',
        icon: <TagsOutlined />,
        element: lazyLoad('Tag'),
      },
      {
        name: '分类管理',
        path: '/category',
        icon: <AppstoreOutlined />,
        element: lazyLoad('Category'),
      },
      {
        name: '说说管理',
        path: '/say',
        icon: <MessageOutlined />,
        element: lazyLoad('Say'),
      },
      {
        name: '留言板管理',
        path: '/message',
        icon: <CommentOutlined />,
        element: lazyLoad('Message'),
      },
      {
        name: '建站日志',
        path: '/log',
        icon: <DatabaseOutlined />,
        element: lazyLoad('Log'),
      },
      {
        name: '关于管理',
        path: '/about',
        icon: <UserOutlined />,
        element: lazyLoad('About'),
      },
    ],
  },
];

export default routes;

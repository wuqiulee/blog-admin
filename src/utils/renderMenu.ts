import { Router } from '@/interface/router';

// 渲染菜单
export const renderMenu = (routes: Router[]) => {
  return routes?.reduce((pre: any, cur: Router) => {
    if (cur.path.split('/').length > 2) {
      return pre;
    }
    return pre.concat({
      label: cur.name,
      key: cur.path,
      icon: cur.icon,
    });
  }, []);
};

// 解析selectKey
export const formatSelectKey = (key: string) => {
  return `/${key.split('/')[1]}`;
};

import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { DataSourceType } from '@/interface/category';
import { getCategoryList } from '@/api/category';
import Styles from './index.module.scss';

const Chart: React.FC = () => {
  const [data, setData] = useState<DataSourceType[]>([]);
  const config = {
    appendPadding: 30,
    autoFit: true,
    data,
    angleField: 'articleCount',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'outer',
      autoRotate: false,
      content: '{name} {percentage}',
      style: {
        fontSize: 16,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      { type: 'element-active' },
    ],
  };

  // 获取分类列表
  const getCategoryData = async () => {
    const res = await getCategoryList();
    const { code, data: categoryData } = res;
    const ret = categoryData?.result?.filter((v: DataSourceType) => v.articleCount);
    if (code === 0) {
      setData(ret);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);
  return (
    <div className={Styles.wrapper}>
      <span>文章概览</span>
      <Pie {...config} />
    </div>
  );
};

export default Chart;

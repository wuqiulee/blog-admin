/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import CategoryModal from '@/components/Modal';
import Styles from './index.module.scss';
import { createCategory, getCategoryList } from '@/api/category';

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getDataSource = async () => {
    const res = await getCategoryList({ pageNum: 1, pageSize: 10 });
    setDataSource(res.data.result);
  };

  const onCreate = useCallback(async (values: { name: string }) => {
    const res = await createCategory(values);
    setIsModalOpen(false);
    getDataSource();
  }, []);
  const onCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  useEffect(() => {
    getDataSource();
  }, []);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'creatTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'uodateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">修改</Button>
          <Button type="primary">删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <Card
      title="分类管理"
      className={Styles.wrapper}
      extra={
        <Button type="primary" onClick={showModal}>
          添加分类
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} />
      <CategoryModal title="分类" open={isModalOpen} onCreate={onCreate} onCancel={onCancel} />
    </Card>
  );
};

export default Category;

import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import CategoryModal from '@/components/Modal';
import Styles from './index.module.scss';
import { createTag, getTagList } from '@/api/tag';

const TagCmp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getDataSource = async () => {
    const res = await getTagList();
    if (res.code === 0) {
      setDataSource(res.data.result);
    }
  };

  const onCreate = useCallback(async (values: { name: string }) => {
    const res: any = await createTag(values);
    if (res.code === 0) {
      setIsModalOpen(false);
      getDataSource();
    }
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
      title="标签管理"
      className={Styles.wrapper}
      extra={
        <Button type="primary" onClick={showModal}>
          添加标签
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} bordered />
      <CategoryModal title="标签" open={isModalOpen} onCreate={onCreate} onCancel={onCancel} />
    </Card>
  );
};

export default TagCmp;

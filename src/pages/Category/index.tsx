/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Table, Tag, Space, Form, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import CategoryModal from '@/components/Modal';
import Styles from './index.module.scss';
import { createCategory, deleteCategory, getCategoryList, updateCategory } from '@/api/category';
import { DataSourceType } from '@/interface/category';
import useVerifyAuth from '@/hooks/useVerifyAuth';

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  // 修改还是添加
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 修改的分类id
  const [categoryId, setCategoryId] = useState<number>(0);
  const verifyAuth = useVerifyAuth();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getDataSource = async () => {
    const res = await getCategoryList();
    const { code, data } = res;
    if (code === 0) {
      setDataSource(data?.result);
    }
  };

  const onCreate = useCallback(
    async (values: { name: string }) => {
      const res: any = isEdit
        ? await updateCategory({ id: categoryId, name: values.name })
        : await createCategory(values);
      if (res.code === 0) {
        setIsModalOpen(false);
        getDataSource();
        message.success(`${isEdit ? '修改' : '创建'}成功`);
      }
    },
    [isEdit]
  );

  const onCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 修改分类
  const editCategory = (id: number, name: string) => {
    setIsEdit(true);
    setCategoryId(id);
    form.setFieldsValue({ name });
    showModal();
  };

  // 删除分类
  const delCategory = (id: number) => {
    verifyAuth(async () => {
      const res: any = await deleteCategory({ id });
      if (res?.code === 0) {
        getDataSource();
        message.success('分类删除成功');
      }
    });
  };

  useEffect(() => {
    getDataSource();
  }, []);

  const columns: ColumnsType<DataSourceType> = [
    {
      title: '分类名称',
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
          <Button type="primary" onClick={() => editCategory(record.id, record.name)}>
            修改
          </Button>
          <Popconfirm
            title="确定要删除该分类吗?"
            placement="topRight"
            onConfirm={() => delCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
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
      <CategoryModal
        title="分类"
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={onCancel}
        isEdit={isEdit}
        form={form}
      />
    </Card>
  );
};

export default Category;

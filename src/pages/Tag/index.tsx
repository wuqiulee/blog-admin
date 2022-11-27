import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Table, Tag, Space, Form, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import CategoryModal from '@/components/Modal';
import Styles from './index.module.scss';
import { createTag, getTagList, updateTag, deleteTag } from '@/api/tag';
import { DataSourceType } from '@/interface/tag';
import useVerifyAuth from '@/hooks/useVerifyAuth';

const TagCmp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  // 修改还是添加
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 修改的标签id
  const [tagId, setTagId] = useState<number>(0);
  const verifyAuth = useVerifyAuth();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getDataSource = async () => {
    const res = await getTagList();
    if (res.code === 0) {
      setDataSource(res.data.result);
    }
  };

  const onCreate = useCallback(
    async (values: { name: string }) => {
      const res: any = isEdit
        ? await updateTag({ id: tagId, name: values.name })
        : await createTag(values);
      if (res.code === 0) {
        setIsModalOpen(false);
        getDataSource();
        message.success(`${isEdit ? '修改' : '创建'}成功`);
      }
    },
    [isEdit]
  );

  const onCancel = useCallback(() => {
    setIsEdit(false);
    setIsModalOpen(false);
  }, []);

  // 修改标签
  const editTag = (id: number, name: string) => {
    setIsEdit(true);
    setTagId(id);
    form.setFieldsValue({ name });
    showModal();
  };

  // 删除标签
  const delTag = (id: number) => {
    verifyAuth(async () => {
      const res: any = await deleteTag({ id });
      if (res?.code === 0) {
        getDataSource();
        message.success('标签删除成功');
      }
    });
  };

  useEffect(() => {
    getDataSource();
  }, []);

  const columns: ColumnsType<DataSourceType> = [
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
          <Button type="primary" onClick={() => editTag(record.id, record.name)}>
            修改
          </Button>
          <Popconfirm
            title="确定要删除该标签吗?"
            placement="topRight"
            onConfirm={() => delTag(record.id)}
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
      title="标签管理"
      className={Styles.wrapper}
      extra={
        <Button type="primary" onClick={showModal}>
          添加标签
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} bordered />
      <CategoryModal
        title="标签"
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={onCancel}
        isEdit={isEdit}
        form={form}
      />
    </Card>
  );
};

export default TagCmp;

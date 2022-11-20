import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Button, Modal, Form, Input, message, Table, Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Styles from './index.module.scss';
import { publishSay, getSayList, updateSay, deleteSay } from '@/api/say';
import { DataSourceType } from '@/interface/say';
import useVerifyAuth from '@/hooks/useVerifyAuth';

const { TextArea } = Input;

const Say: React.FC = () => {
  const verifyAuth = useVerifyAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 修改还是添加
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 修改的说说id
  const [sayId, setSayId] = useState<number>(0);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 获取说说列表数据
  const getDataSource = async () => {
    try {
      const res: any = await getSayList({
        pageNum: 1,
        pageSize: 10,
      });
      const { code, data } = res;
      if (code === 0) {
        setDataSource(data.result);
      }
    } catch (err) {
      console.log(err, '获取说说列表失败');
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: { content: string }) => {
        verifyAuth(async () => {
          const res: any = isEdit
            ? await updateSay({ ...values, id: sayId })
            : await publishSay(values);
          if (res?.code === 0) {
            getDataSource();
            form.resetFields();
            message.success(`${isEdit ? '更新' : '发表'}说说成功`);
            setIsModalOpen(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 取消模态框
  const handleCancel = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalOpen(false);
  };

  // 修改说说
  const editSay = (content: string, id: number) => {
    setIsEdit(true);
    setSayId(id);
    form.setFieldsValue({ content });
    showModal();
  };

  // 删除说说
  const removeSay = (id: string) => {
    verifyAuth(async () => {
      const res: any = await deleteSay({ id });
      if (res.code === 0) {
        getDataSource();
        message.success('删除说说成功');
      }
    });
  };

  const columns: ColumnsType<DataSourceType> = [
    {
      title: '说说内容',
      dataIndex: 'content',
      key: 'content',
      width: 800,
    },
    {
      title: '发布日期',
      dataIndex: 'publishTime',
      key: 'publishTime',
      width: 200,
      sortDirections: ['ascend'],
      sorter: (a, b) => a.id - b.id,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editSay(record.content, record.id)}>
            修改
          </Button>
          <Popconfirm
            title="确定要删除该说说吗?"
            placement="topRight"
            onConfirm={() => removeSay(record.id)}
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

  useEffect(() => {
    getDataSource();
  }, []);

  return (
    <Card
      className={Styles.wrapper}
      title="说说管理"
      extra={
        <Button type="primary" onClick={showModal}>
          发表说说
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} bordered />
      <Modal
        title={`${isEdit ? '更新' : '发表'}说说`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="content" rules={[{ required: true, message: '请说点啥再发表！' }]}>
            <TextArea rows={4} placeholder="说点什么吧~" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Say;

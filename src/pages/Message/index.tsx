import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, message, Input, Table, Popconfirm, Space } from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import Styles from './index.module.scss';
import { createMessage, replyMessage, getMessageList, deleteMessage } from '@/api/message';
import useVerifyAuth from '@/hooks/useVerifyAuth';
import { CreateMessageType } from '@/interface/api';
import { DataSourceType } from '@/interface/message';

const { TextArea } = Input;

const Message: React.FC = () => {
  const verifyAuth = useVerifyAuth();
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 添加还是回复
  const [isReply, setIsReply] = useState<boolean>(false);
  // 回复的留言id
  const [messageId, setMessageId] = useState<number>(0);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 获取留言列表数据
  const getDataSource = async () => {
    try {
      const res: any = await getMessageList();
      const { code, data } = res;
      if (code === 0) {
        setDataSource(data.result);
      }
    } catch (err) {
      console.log(err, '获取留言列表失败');
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: CreateMessageType) => {
        verifyAuth(async () => {
          const res: any = isReply
            ? await replyMessage({ ...values, replyId: messageId })
            : await createMessage(values);
          if (res?.code === 0) {
            getDataSource();
            form.resetFields();
            message.success(`${isReply ? '回复' : '添加'}留言成功`);
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
    setIsReply(false);
    setIsModalOpen(false);
  };

  // 回复留言
  const replayMessage = (id: number) => {
    setIsReply(true);
    setMessageId(id);
    showModal();
  };

  // 删除留言
  const removeMessage = (id: number) => {
    verifyAuth(async () => {
      const res: any = await deleteMessage({ id });
      if (res.code === 0) {
        getDataSource();
        message.success('删除说说成功');
      }
    });
  };

  const columns: ColumnsType<DataSourceType> = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (_, record) => {
        if (!record.replyId) {
          return '留言板';
        }
        const ret = dataSource.find((v) => record?.replyId === v.id);
        return `回复「${ret?.nickName}」`;
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 800,
    },
    {
      title: '日期',
      dataIndex: 'createTime',
      key: 'createTime',
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
          <Button type="primary" onClick={() => verifyAuth(() => replayMessage(record.id))}>
            回复
          </Button>
          <Popconfirm
            title="确定要删除该留言吗?"
            placement="topRight"
            onConfirm={() => removeMessage(record.id)}
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
      title="留言板管理"
      extra={
        <Button type="primary" onClick={() => verifyAuth(showModal)}>
          添加留言
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} bordered />
      <Modal
        title={`${isReply ? '回复' : '添加'}留言`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: '请输入昵称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请说点啥再发表！' }]}
          >
            <TextArea rows={4} placeholder="说点什么吧~" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Message;

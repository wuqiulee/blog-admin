import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, message, Table, Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { createLog, updateLog, getLogList, deleteLog } from '@/api/log';
import { DataSourceType } from '@/interface/log';
import useVerifyAuth from '@/hooks/useVerifyAuth';

const { TextArea } = Input;

const Log: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const verifyAuth = useVerifyAuth();
  // 修改还是添加
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 修改的事件id
  const [LogId, setLogId] = useState<number>(0);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 取消模态框
  const handleCancel = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalOpen(false);
  };

  // 获取日志列表数据
  const getDataSource = async () => {
    try {
      const res: any = await getLogList();
      const { code, data } = res;
      if (code === 0) {
        setDataSource(data.result);
      }
    } catch (err) {
      console.log(err, '获取日志列表失败');
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        console.log(values, 'values');
        verifyAuth(async () => {
          const res: any = isEdit
            ? await updateLog({ ...values, id: LogId })
            : await createLog(values);
          if (res?.code === 0) {
            getDataSource();
            form.resetFields();
            message.success(`${isEdit ? '更新' : '添加'}日志成功`);
            setIsModalOpen(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 修改日志
  const editLog = (logDate: string, content: string, id: number) => {
    setIsEdit(true);
    setLogId(id);
    form.setFieldsValue({ logDate, content });
    showModal();
  };

  // 删除日志
  const removeLog = (id: string) => {
    verifyAuth(async () => {
      const res: any = await deleteLog({ id });
      if (res.code === 0) {
        getDataSource();
        message.success('删除日志成功');
      }
    });
  };

  const columns: ColumnsType<DataSourceType> = [
    {
      title: '日期',
      dataIndex: 'logDate',
      key: 'logDate',
      width: 200,
    },
    {
      title: '日志内容',
      dataIndex: 'content',
      key: 'content',
      width: 800,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editLog(record.logDate, record.content, record.id)}>
            修改
          </Button>
          <Popconfirm
            title="确定要删除该日志吗?"
            placement="topRight"
            onConfirm={() => removeLog(record.id)}
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
      title="添加日志"
      extra={
        <Button type="primary" onClick={showModal}>
          添加日志
        </Button>
      }
    >
      <Table columns={columns} dataSource={dataSource} bordered />
      <Modal
        title={`${isEdit ? '更新' : '发表'}日志`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={{ logDate: moment().format('YYYY-MM-DD') }}>
          <Form.Item
            name="logDate"
            label="日期"
            rules={[{ required: true, message: '请输入日期！' }]}
          >
            <Input placeholder="请输入日期" />
          </Form.Item>
          <Form.Item
            name="content"
            label="事件"
            rules={[{ required: true, message: '请添加事件！' }]}
          >
            <TextArea rows={4} placeholder="请输入事件!" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Log;

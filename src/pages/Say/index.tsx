import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, message } from 'antd';
import Styles from './index.module.scss';
import { publishSay } from '@/api/say';

const { TextArea } = Input;

const Say: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values: { content: string }) => {
        const res: any = await publishSay(values);
        if (res.code === 0) {
          message.success('说说发表成功');
          setIsModalOpen(false);
          form.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      <Modal title="发表说说" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item name="content" rules={[{ required: true, message: '请输入说说内容!' }]}>
            <TextArea rows={4} placeholder="请输入说说内容" maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Say;

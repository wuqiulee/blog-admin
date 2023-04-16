import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import useVerifyAuth from '@/hooks/useVerifyAuth';

interface Values {
  name: string;
}

interface Iprops {
  title: string;
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  isEdit: boolean;
  form: any;
}

const CategoryModal: React.FC<Iprops> = (props) => {
  const verifyAuth = useVerifyAuth();
  const { title, open, onCreate, onCancel, isEdit, form } = props;

  const handleOk = () => {
    form
      .validateFields()
      .then((values: Values) => {
        verifyAuth(() => {
          onCreate(values);
          form.resetFields();
        });
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const handleCancel = async () => {
    await onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title={`${isEdit ? '修改' : '添加'}${title}`}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item
          label={`${title}名称`}
          name="name"
          rules={[{ required: true, message: `请输入${title}名称!` }]}
        >
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(CategoryModal);

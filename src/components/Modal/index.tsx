import React from 'react';
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
}

const CategoryModal: React.FC<Iprops> = (props) => {
  const verifyAuth = useVerifyAuth();
  const { title, open, onCreate, onCancel } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        verifyAuth(() => {
          onCreate(values);
          form.resetFields();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = async () => {
    await onCancel();
    form.resetFields();
  };

  return (
    <Modal title={`添加${title}`} open={open} onOk={handleOk} onCancel={handleCancel}>
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

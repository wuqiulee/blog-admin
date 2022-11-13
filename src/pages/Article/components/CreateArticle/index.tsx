import React, { useRef } from 'react';
import { Button, Form, Input, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import Editor from 'for-editor';

interface Iprops {
  children: React.ReactNode;
}

const FormatRow = (props: Iprops) => (
  <Row>
    <Col span={12}>{props.children}</Col>
  </Row>
);

const CreateArticle: React.FC = () => {
  const editorRef = useRef<any>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const goBack = () => {
    navigate(-1);
  };
  const onFinish = (val: any) => {
    console.log(val, 'val');
  };
  const onSave = (val: any) => {
    const fieldsVal = form.getFieldsValue();
    console.log(fieldsVal, 'fieldsVal');

    console.log(val, 'save');
  };
  const addImg = async (file: any) => {
    console.log(file, 'file');
    const formData = new FormData();
    formData.append('file', file);
    const res = '/imgurl';
    // const res = [
    //   {
    //     hash: 'FgOETQ8j4Zpygl6WWpZQ_75N20Sf',
    //     key: '3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //     url: 'http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //   },
    // ];
    if (res) {
      editorRef.current.$img2Url(file.name, res);
    }
  };
  return (
    <Card
      title="添加文章"
      extra={
        <Button type="primary" onClick={goBack}>
          返回
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <FormatRow>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题!' }]}
          >
            <Input />
          </Form.Item>
        </FormatRow>
        <FormatRow>
          <Form.Item
            label="文章分类"
            name="category"
            rules={[{ required: true, message: '请输入文章分类!' }]}
          >
            <Input />
          </Form.Item>
        </FormatRow>
        <FormatRow>
          <Form.Item
            label="文章标签"
            name="title"
            rules={[{ required: true, message: '请输入文章标签!' }]}
          >
            <Input />
          </Form.Item>
        </FormatRow>
        <Form.Item name="content" rules={[{ required: true, message: '请撰写文章' }]}>
          <Editor ref={editorRef} addImg={addImg} placeholder="请撰写文章" />
        </Form.Item>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
        <Button type="primary" htmlType="submit">
          发布
        </Button>
      </Form>
    </Card>
  );
};

export default CreateArticle;

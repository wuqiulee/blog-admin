import React from 'react';
import { Card, Button, Col, Row, Form, Input, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

import Styles from './index.module.scss';

const { RangePicker } = DatePicker;

const Article: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
  ];

  const onFinish = (val: any) => {
    console.log(val);
  };

  const addArticle = () => {
    navigate('/article/create');
  };

  return (
    <Card
      title="文章管理"
      className={Styles.wrapper}
      extra={
        <Button type="primary" onClick={addArticle}>
          添加文章
        </Button>
      }
    >
      <Form onFinish={onFinish}>
        <Row gutter={32}>
          <Col span={6}>
            <Form.Item label="标题" name="title">
              <Input placeholder="请输入标题" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="分类" name="category">
              <Select mode="multiple" placeholder="请选择分类" options={options} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="标签" name="tag">
              <Select mode="multiple" placeholder="请选择标签" options={options} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="发布状态" name="publishStatus">
              <Select placeholder="请选择发布状态" options={options} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={6}>
            <Form.Item label="创建时间" name="createTime">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="修改时间" name="modifyTime">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="reset">
              重置
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Article;

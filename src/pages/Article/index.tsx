import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Col, Row, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { get } from 'loadsh';
import Styles from './index.module.scss';
import { ArticleOptionType, TableDataType } from '@/interface/article';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import { getArticleList, deleteArticle, queryArticle } from '@/api/article';
import TabelComp from './components/Table';
import { debounce } from '@/utils';

const Article: React.FC = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<ArticleOptionType>({
    categoryOption: [],
    labelOption: [],
  });
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [form] = Form.useForm();

  const addArticle = () => {
    navigate('/article/create');
  };

  // 按分类 标签搜索
  const handleChange = async (value: string, field: string) => {
    form.resetFields(['title', `${field === 'category' ? 'tag' : 'category'}`]);
    const res: any = await queryArticle({ [field]: value });
    const { code, data } = res;
    if (code === 0) {
      setTableData(data?.result);
    }
  };

  // 按标题搜索
  const handleSearch = debounce(async (e: React.ChangeEvent) => {
    form.resetFields(['category', 'tag']);
    const target = e.target as HTMLInputElement;
    const res: any = await queryArticle({ title: target.value });
    const { code, data } = res;
    if (code === 0) {
      setTableData(data?.result);
    }
  }, 500);

  // 获取文章列表
  const getArticleData = async () => {
    const res: any = await getArticleList();
    const { code, data } = res;
    if (code === 0) {
      setTableData(data?.result);
    }
  };

  // 删除文章
  const removeArticle = useCallback(async (id: number) => {
    const res: any = await deleteArticle({ id });
    if (res?.code === 0) {
      getArticleData();
      message.success('文章删除成功');
    }
  }, []);

  const init = async () => {
    getArticleData();
    const categoryRes = await getCategoryList();
    const labelRes = await getTagList();
    setOptions({
      categoryOption: get(categoryRes, 'data.result', []),
      labelOption: get(labelRes, 'data.result', []),
    });
  };

  useEffect(() => {
    init();
  }, []);

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
      <Form form={form}>
        <Row gutter={32}>
          <Col span={6}>
            <Form.Item label="标题" name="title">
              <Input placeholder="请输入标题" onChange={handleSearch} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="分类" name="category">
              <Select
                allowClear
                placeholder="请选择分类"
                options={options.categoryOption}
                fieldNames={{ label: 'name', value: 'name' }}
                onChange={(value) => handleChange(value, 'category')}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="标签" name="tag">
              <Select
                allowClear
                placeholder="请选择标签"
                options={options.labelOption}
                fieldNames={{ label: 'name', value: 'name' }}
                onChange={(value) => handleChange(value, 'tag')}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="发布状态" name="publishStatus">
              <Select
                placeholder="请选择发布状态"
                options={[
                  {
                    value: 0,
                    label: '已发布',
                  },
                  {
                    value: 1,
                    label: '待发布',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Button type="primary" htmlType="reset" onClick={getArticleData}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
      <TabelComp dataSource={tableData} removeArticle={removeArticle} />
    </Card>
  );
};

export default Article;

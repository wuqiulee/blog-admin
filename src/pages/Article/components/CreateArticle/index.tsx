import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, Input, Card, Col, Row, Select, Space, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { get } from 'loadsh';
import MdEditor from 'md-editor-rt';
import { getCategoryList } from '@/api/category';
import { getTagList } from '@/api/tag';
import { ArticleOptionType, PUBLISH_STATUS } from '@/interface/article';
import { publishArticle, updateArticle, queryArticle } from '@/api/article';
import { PublishArticleType } from '@/interface/api';
import 'md-editor-rt/lib/style.css';

interface Iprops {
  children: React.ReactNode;
}

const FormatRow = (props: Iprops) => (
  <Row>
    <Col span={12}>{props.children}</Col>
  </Row>
);

const CreateArticle: React.FC = () => {
  const [options, setOptions] = useState<ArticleOptionType>({
    categoryOption: [],
    labelOption: [],
  });
  const [text, setText] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const isEdit = searchParams.has('id');
  const articleId = Number(searchParams.get('id'));

  const goBack = () => {
    navigate(-1);
  };

  const onFinish = async (values: PublishArticleType) => {
    const res: any = isEdit
      ? await updateArticle({
          ...values,
          publishStatus: PUBLISH_STATUS.PUBLISHED,
          id: articleId,
        })
      : await publishArticle({
          ...values,
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        });
    if (res?.code === 0) {
      message.success('文章发布成功！');
      goBack();
    }
  };

  // 保存文章
  const onSave = async () => {
    const fieldsVal = form.getFieldsValue();
    const res: any = isEdit
      ? await updateArticle({
          ...fieldsVal,
          publishStatus: PUBLISH_STATUS.RELEASED,
          id: articleId,
        })
      : await publishArticle({
          ...fieldsVal,
          publishStatus: PUBLISH_STATUS.RELEASED,
        });
    if (res?.code === 0) {
      message.success('文章保存成功！');
      goBack();
    }
  };

  // 获取文章详情
  const getArticleDetails = async () => {
    const res: any = await queryArticle({ id: articleId });
    const { code, data } = res;
    if (code === 0) {
      form.setFieldsValue(data?.result[0]);
      setText(data?.result[0].content);
    }
  };

  const init = async () => {
    // if edit
    if (isEdit) {
      getArticleDetails();
    }
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
            <Select
              placeholder="请选择分类"
              options={options.categoryOption}
              fieldNames={{ label: 'name', value: 'name' }}
            />
          </Form.Item>
        </FormatRow>
        <FormatRow>
          <Form.Item
            label="文章标签"
            name="tag"
            rules={[{ required: true, message: '请输入文章标签!' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择标签"
              options={options.labelOption}
              fieldNames={{ label: 'name', value: 'name' }}
            />
          </Form.Item>
        </FormatRow>
        <Form.Item name="content" rules={[{ required: true, message: '请撰写文章' }]}>
          <MdEditor
            modelValue={text}
            previewTheme="default"
            placeholder="请撰写文章"
            onChange={(modelValue) => {
              setText(modelValue);
            }}
          />
        </Form.Item>
        <Space size="middle" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default CreateArticle;

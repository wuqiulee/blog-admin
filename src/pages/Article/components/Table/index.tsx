import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Popconfirm, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { TableDataType } from '@/interface/article';
import { PublishText, PublishIcon, TagBgColor } from '@/common/constants/article';
import useVerifyAuth from '@/hooks/useVerifyAuth';

interface Iprops {
  dataSource: TableDataType[];
  removeArticle: Function;
}

const TableComp: React.FC<Iprops> = ({ dataSource, removeArticle }) => {
  const verifyAuth = useVerifyAuth();
  const navigate = useNavigate();
  const editArticle = (id: number) => {
    verifyAuth(() => navigate(`/article/create?id=${id}`));
  };

  const onConfirm = (id: number) => {
    verifyAuth(() => {
      removeArticle(id);
    });
  };

  const columns: ColumnsType<TableDataType> = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color={TagBgColor[category.length - 1]} style={{ marginBottom: 5 }}>
          {category}
        </Tag>
      ),
    },
    {
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      render: (tags) => (
        <>
          {tags?.map((tag: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tag key={index} color={TagBgColor[tag.length - 1]} style={{ marginBottom: 5 }}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '发布状态',
      key: 'publishStatus',
      dataIndex: 'publishStatus',
      render: (text) => (
        <Space>
          <i
            style={{
              width: 10,
              height: 10,
              background: PublishIcon[text],
              display: 'block',
              borderRadius: '50%',
            }}
          />
          <span>{PublishText[text]}</span>
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editArticle(record.id)}>
            修改
          </Button>
          <Popconfirm
            title="确定要删除文章吗?"
            placement="topLeft"
            onConfirm={() => onConfirm(record.id)}
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

  return <Table columns={columns} dataSource={dataSource} bordered scroll={{ x: 1500 }} />;
};

export default React.memo(TableComp);

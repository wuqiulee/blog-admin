import request from '@/common/request';
import { PictureType, PublishArticleType } from '@/interface/api';

// 上传图片
export const uploadPicture = async (data: any) => {
  return request({
    url: '/upload/picture',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 获取图片
export const getPicture = async (params: PictureType) => {
  return request({
    url: '/upload/picture',
    params,
  });
};

// 发布文章
export const publishArticle = async (data: PublishArticleType) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data,
  });
};

// 获取文章列表
export const getArticleList = async () => {
  return request({
    url: '/article/list',
  });
};

// 更新文章
export const updateArticle = async (data: PublishArticleType) => {
  return request({
    url: '/article/update',
    method: 'POST',
    data,
  });
};

// 查询文章
export const queryArticle = async (params: any) => {
  return request({
    url: '/article/query',
    params,
  });
};

// 删除文章
export const deleteArticle = async (data: { id: number }) => {
  return request({
    url: '/article/delete',
    method: 'POST',
    data,
  });
};

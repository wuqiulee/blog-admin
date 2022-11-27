import { PUBLISH_STATUS } from '@/interface/article';

interface PublishTextType {
  [key: number]: string;
}

export const PublishText: PublishTextType = {
  [PUBLISH_STATUS.PUBLISHED]: '已发布',
  [PUBLISH_STATUS.RELEASED]: '待发布',
};

export const PublishIcon: PublishTextType = {
  [PUBLISH_STATUS.PUBLISHED]: 'red',
  [PUBLISH_STATUS.RELEASED]: '#c0c0c0',
};

// tag bgcolor  by tag length
export const TagBgColor = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

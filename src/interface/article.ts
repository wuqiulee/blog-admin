interface Option {
  value: string;
  label: string;
}

export interface ArticleOptionType {
  categoryOption: Option[];
  labelOption: Option[];
}

export interface TableDataType {
  id: number;
  title: string;
  tag: string;
  category: string;
  publishStataus: number;
  createTime: string;
  updateTime: string;
}

// eslint-disable-next-line no-shadow
export enum PUBLISH_STATUS {
  PUBLISHED = 0,
  RELEASED = 1,
}

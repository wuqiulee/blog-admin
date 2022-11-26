export interface LoginType {
  user: string;
  password: string;
}

export interface CategoryType {
  name: string;
}

export interface TagyType {
  name: string;
}
export interface PublishSayType {
  content: string;
}

export interface UpdateshSayType {
  content: string;
  id: number;
}

export interface PictureType {
  filename: string;
  mimetype: string;
}

export interface PublishArticleType {
  title: string;
  content: string;
  tag: string[];
  category: string[];
  publishStatus: number;
  id?: number;
}

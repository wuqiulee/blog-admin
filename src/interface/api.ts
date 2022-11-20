export interface LoginType {
  user: string;
  password: string;
}

export interface CategoryType {
  name: string;
}

export interface PublishSayType {
  content: string;
}

export interface GetSayType {
  pageNum: number;
  pageSize: number;
}

export interface UpdateshSayType {
  content: string;
  id: number;
}

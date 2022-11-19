interface ErrorCodeType {
  [key: number]: string;
}

const CREATE_CATEGORY_ERROR = 1001;

export const ErrorCode: ErrorCodeType = {
  [CREATE_CATEGORY_ERROR]: '创建分类失败~',
};

export interface IResponse<T> {
  code: number;
  data?: T;
  msg: string;
}

export interface IPagination<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IBase {
  ID: number;
  createdAt: number;
  updatedAt: number;
}

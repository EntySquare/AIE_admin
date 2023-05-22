import axios from 'axios';

export interface MaterialsParams {
  name: string;
  current: number;
  pageSize: number;
}

export interface MaterialsRes {
  attribute: string; // 材料属性
  created_at: string; // 创建时间
  id: number; // 材料id
  illustrate: string; // 材料说明
  img: string; // 材料图片
  issued_quantity: number; // 发行数量
  name: string; // 材料名字
}

export function fetchMaterialList(params: MaterialsParams) {
  return axios.post<any>('/admin/material/list', params);
}

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

/**
 * types.GiftOrDestroyMaterialReq
 */
export interface GiftOrDestroyMaterialParam {
  /**
   * 材料id
   */
  id: number;
  /**
   * 数量
   */
  quantity: number;
  /**
   * 用户ids
   */
  user_ids: number[];
}

export function fetchMaterialList(params: MaterialsParams) {
  return axios.post<any>('/admin/material/list', params);
}

//  根据用户IDs销毁材料
export function presentMaterialByUserIds(param: GiftOrDestroyMaterialParam) {
  return axios.post<string>('/admin/material/present', param);
}

//  根据用户IDs赠送材料
export function giftMaterialByUserIds(param: GiftOrDestroyMaterialParam) {
  return axios.post<string>('/admin/material/gift', param);
}

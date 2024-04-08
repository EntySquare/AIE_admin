import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/content-data');
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { type: string }) {
  return axios.get<TableData[]>('/api/popular/list', { params });
}

/**
 * types.UserPreview
 */
export interface ChurnUser {
  day_3?: number;
  day_30?: number;
  day_60?: number;
  day_7?: number;
}

/**
 * types.GetUserPreviewResp
 */
export interface UserPreview {
  /**
   * 流失用户数
   */
  churn_user: ChurnUser;
  /**
   * 新增用户数
   */
  growth_user: ChurnUser;
  /**
   * 有效用户数
   */
  vaild_user: ChurnUser;
}

// 用户数据预览
export function fetchUserPreview() {
  return axios.post<UserPreview>('/admin/user/preview');
}

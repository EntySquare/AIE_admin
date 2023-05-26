import axios from 'axios';

/**
 * types.CreateBulletinReq
 */
export interface BulletinReq {
  /**
   * 活动ID
   */
  activity_id?: number;
  /**
   * 内容
   */
  content: string;
  /**
   * 标签
   */
  tags: string[];
  /**
   * 标题
   */
  title: string;
}
/**
 * types.Bulletin
 */
export interface Bulletin {
  /**
   * 活动ID
   */
  activity_id: number;
  /**
   * 内容
   */
  content: string;
  /**
   * 创建时间
   */
  created_at: string;
  id: number;
  /**
   * 标签 以{}形式
   */
  tags: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 修改时间
   */
  updated_at: string;
}

/**
 * types.GetBulletinListResp
 */
export interface BulletinList {
  bulletin_list: Bulletin[];
  /**
   * 当前页
   */
  current_page: number;
  /**
   * 总数
   */
  total: number;
}

/**
 * types.GetBulletinListReq
 */
export interface BulletinParam {
  /**
   * 当前页码 默认1
   */
  pageNum?: number;
  /**
   * 每页数 默认10
   */
  pageSize?: number;
  /**
   * 标签
   */
  tag?: string;
  /**
   * 标题
   */
  title?: string;
}

// 查询公告列表
export function fetchBulletinList(data: BulletinParam) {
  return axios.post<BulletinList>('/admin/bulletin/list', data);
}

// 创建公告
export function createBulletin(data: BulletinReq) {
  return axios.post<string>('/admin/bulletin/create', data);
}

// 修改公告
export function updateBulletin() {
  return axios.post<any>('/admin/bulletin/update');
}

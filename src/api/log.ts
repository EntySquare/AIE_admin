import axios from 'axios';

/**
 * types.GetDropRecyclingLogListReq
 */
export interface DropRecyclingLogListParam {
  /**
   * 1=材料 2=专辑 3=兑换碎片
   */
  list_type?: number;
  /**
   * 当前页码 默认1
   */
  pageNum?: number;
  /**
   * 每页数 默认10
   */
  pageSize?: number;
}

/**
* types.UserNft
*/
export interface UserNft {
  /**
   * nft id
   */
  nft_id?: number;
  /**
   * 用户id
   */
  user_id?: number;
}
/**
* types.DropRecyclingLogList
*/
export interface DropRecyclingLog {
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * id 日志列表
   */
  id?: number;
  /**
   * 数据id 来源nft表 or 专辑表 or 材料表 or 盲盒表
   */
  id_data?: number;
  /**
   * 1=材料 2=专辑 3=兑换碎片
   */
  id_type?: number;
  /**
   * 图片
   */
  image?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 1=增加 2=减少
   */
  operation_type?: number;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 用户数量
   */
  user_count?: number;
  /**
   * 用户ids
   */
  user_ids?: number[];
  /**
   * 用户nft
   */
  user_nft?:UserNft[];
}



/**
 * types.GetDropRecyclingLogListResp
 */
export interface DropRecyclingLogList {
  /**
   * 当前页
   */
  current_page?: number;
  drop_recycling_log_list?: DropRecyclingLog[];
  /**
   * 总数
   */
  total?: number;
}

// 查询回收日志列表
export function fetchDropRecyclingLogList(params: DropRecyclingLogListParam) {
  return axios.post<DropRecyclingLogList>('/admin/log/dropRecyclingLogList', params);
} 
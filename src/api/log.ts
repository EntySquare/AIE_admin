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

/**
 * types.GetMaterialLogListReq
 */
export interface MaterialLogParam {
  /**
   * 材料id
   */
  material_id?: number;
  /**
   * 材料名字
   */
  name?: string;
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
* types.MaterialLog
*/
export interface MaterialLog {
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 材料id
   */
  id?: number;
  /**
   * 材料图片
   */
  image?: string;
  /**
   * 材料id
   */
  material_id?: number;
  /**
   * 材料名称
   */
  name?: string;
  /**
   * 操作类型 1:赠送（增加） 2:销毁（减少）
   */
  operation_type?: number;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 用户ids
   */
  user_ids?: number[];
}


/**
 * types.GetMaterialLogListResp
 */
export interface MaterialLogListResp {
  /**
   * 当前页
   */
  current_page?: number;
  material_log_list?: MaterialLog[];
  /**
   * 总数
   */
  total?: number;
}

/**
 * types.GetBlindBoxLogListReq
 */
export interface BlindBoxLogParam {
  /**
   * 盲盒id
   */
  blind_box_id?: number;
  /**
   * 盲盒名称
   */
  name?: string;
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
* types.BlindBoxLog
*/
export interface BlindBoxLog {
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 盲盒id
   */
  id?: number;
  /**
   * 盲盒图片
   */
  image?: string;
  /**
   * 盲盒名称
   */
  name?: string;
  /**
   * 操作类型 1:赠送（增加） 2:销毁（减少）
   */
  operation_type?: number;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 用户ids
   */
  user_ids?: number[];
}


/**
 * types.GetBlindBoxLogListResp
 */
export interface BlindBoxLogListResp {
  /**
   * 盲盒日志列表
   */
  blind_box_log_list?: BlindBoxLog[];
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
}

/**
 * types.GetAlbumLogListReq
 */
export interface AlbumLogParam {
  /**
   * 专辑id
   */
  album_id?: number;
  /**
   * 专辑名字
   */
  name?: string;
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
export interface TypesUserNft {
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
* types.AlbumLog
*/
export interface AlbumLog {
  album_id?: number;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 专辑id
   */
  id?: number;
  /**
   * 专辑图片
   */
  image?: string;
  /**
   * 专辑名称
   */
  name?: string;
  /**
   * 操作类型 1:赠送（增加） 2:销毁（减少）
   */
  operation_type?: number;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 用户ids
   */
  user_ids?: number[];
  /**
   * 用户nft
   */
  user_nft?: UserNft[];
}
/**
 * types.GetAlbumLogListResp
 */
export interface AlbumLogListResp {
  album_log_list?: AlbumLog[];
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
}

/**
 * types.GetPromotionBonusLogListReq
 */
export interface PromotionBonusLogParam {
  /**
   * 1、material=材料 2、nft=数藏nft， 3、blindBox=盲盒
   */
  id_types?: number;
  /**
   * 材料推广奖励名字
   */
  name?: string;
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
* types.PromotionBonusLog
*/
export interface PromotionBonusLog {
  /**
   * 奖励id
   */
  bonus_id?: number;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 奖励数量
   */
  gift_num?: number;
  /**
   * 推广奖励id
   */
  id?: number;
  /**
   * 数据id 来源nft表 or 专辑表 or 材料表 or 盲盒表
   */
  id_data?: number;
  /**
   * 1、material=材料 2、nft=数藏nft， 3、blindBox=盲盒
   */
  id_types?: number;
  /**
   * 图片
   */
  image?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 未领取原因
   */
  reason?: string;
  /**
   * 状态 0=未领取 1=已领取
   */
  status?: number;
  /**
   * 用户id
   */
  user_id?: number;
}


/**
 * types.GetPromotionBonusLogListResp
 */
export interface PromotionBonusLogListResp {
  /**
   * 当前页
   */
  current_page?: number;
  promotion_bonus_log_list?: PromotionBonusLog[];
  /**
   * 总数
   */
  total?: number;
}
/**
 * types.GetOperLogListReq
 */
export interface OperLogParam {
  /**
   * 主机地址
   */
  oper_ip?: string;
  /**
   * 操作人员
   */
  oper_name?: string;
  /**
   * 请求URL
   */
  oper_url?: string;
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
* types.NotifyOperLog
*/
export interface NotifyOperLog {
  /**
   * 错误消息
   */
  error_msg?: string;
  id?: number;
  /**
   * 请求方式
   */
  method?: string;
  /**
   * 主机地址
   */
  oper_ip?: string;
  /**
   * 操作地点
   */
  oper_location?: string;
  /**
   * 请求参数
   */
  oper_param?: string;
  /**
   * 操作时间
   */
  oper_time?: string;
  /**
   * 请求URL
   */
  oper_url?: string;
}

/**
 * types.GetNotifyOperLogListResp
 */
export interface NotifyOperLogListResp {
  /**
   * 当前页
   */
  current_page?: number;
  notify_oper_log_list?: NotifyOperLog[];
  /**
   * 总数
   */
  total?: number;
}

/**
* types.AdminOperLog
*/
export interface AdminOperLog {
  /**
   * 错误消息
   */
  error_msg?: string;
  id?: number;
  /**
   * 请求方式
   */
  method?: string;
  /**
   * 操作人员ID
   */
  open_user_id?: number;
  /**
   * 主机地址
   */
  oper_ip?: string;
  /**
   * 操作地点
   */
  oper_location?: string;
  /**
   * 操作人员
   */
  oper_name?: string;
  /**
   * 请求参数
   */
  oper_param?: string;
  /**
   * 操作时间
   */
  oper_time?: string;
  /**
   * 请求URL
   */
  oper_url?: string;
}
/**
 * types.GetAdminOperLogListResp
 */
export interface AdminOperLogListResp {
  admin_oper_log_list?: AdminOperLog[];
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
}



// 查询回收日志列表
export function fetchDropRecyclingLogList(params: DropRecyclingLogListParam) {
  return axios.post<DropRecyclingLogList>('/admin/log/dropRecyclingLogList', params);
} 

// 材料空投/回收（赠送/销毁）日志列表
export function fetchMaterialLogList(params: MaterialLogParam) {
  return axios.post<MaterialLogListResp>('/admin/log/materialList', params);
}

// 盲盒空投/回收（赠送/销毁）日志列表
export function fetchBlindBoxLogList(params: BlindBoxLogParam) {
  return axios.post<BlindBoxLogListResp>('/admin/log/blindBoxList', params);
}

// 专辑空投/回收（赠送/销毁）日志列表
export function fetchAlbumLogList(params: AlbumLogParam) {
  return axios.post<AlbumLogListResp>('/admin/log/albumList', params);
}


// 推广奖励日志列表
export function fetchPromotionBonusLogList(params: PromotionBonusLogParam) {
  return axios.post<PromotionBonusLogListResp>('/admin/log/promotionBonusList', params);
}

// 回调请求日志列表
export function fetchNotifyOperLogList(params: OperLogParam) {
  return axios.post<NotifyOperLogListResp>('/admin/log/notifyOperLogList', params);
}

// 管理后台操作请求日志列表
export function fetchAdminOperLogList(params: OperLogParam) {
  return axios.post<AdminOperLogListResp>('/admin/log/adminOperLogList', params);
}
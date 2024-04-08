import axios from 'axios';

/**
 * types.UpdatePromotionBonusReq
 */
export interface Promote {
  /**
   * 奖励数量
   */
  gift_num: number;
  /**
   * 人数
   */
  headcount: number;
  /**
   * 推广奖励id
   */
  id?: number;
  /**
   * 数据id 来源nft表 or 专辑表 or 材料表 or 盲盒表
   */
  id_data: number;
  /**
   * 1、MaterialIdType 材料
   * 2、AlbumIdType 专辑
   * 3、BlindBoxIDType 盲盒
   */
  id_types: number;
}

/**
 * types.GetPromotionBonusListReq
 */
export interface PromoteParam {
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
 * types.PromotionBonusList
 */
export interface PromoteRes {
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 奖励数量
   */
  gift_num?: number;
  /**
   * 人数
   */
  headcount?: number;
  id?: number;
  /**
   * 数据id 来源nft表 or 专辑表 or 材料表 or 盲盒表
   */
  id_data?: number;
  /**
   * 1、MaterialIdType 材料
   * 2、AlbumIdType 专辑
   * 3、BlindBoxIDType 盲盒
   */
  id_types?: number;
  /**
   * 图片
   */
  img?: string;
  /**
   * 名称
   */
  name?: string;
}



/**
 * types.GetPromotionBonusListResp
 */
export interface PromoteList {
  /**
   * 当前页
   */
  current_page: number;
  /**
   * 推广奖励列表
   */
  promotion_bonus_list: PromoteRes[];
  /**
   * 总数
   */
  total: number;
}

// 查询推广列表
export function fetchPromoteList(data: PromoteParam) {
  return axios.post<PromoteList>('/admin/promotionBonus/list', data);
}

// 创建推广
export function createPromote(data: Promote) {
  return axios.post<string>('/admin/promotionBonus/create', data);
}

// 修改推广设置
export function updatePromote(data: Promote) {
  return axios.post<string>('/admin/promotionBonus/update', data);
}

// 查询推广详情
export function fetchPromoteDetail(id: number) {
  return axios.post<Promote>('/admin/promotionBonus/detail', {
    id
  });
}

// 删除推广
export function deletePromote(id: number) {
  return axios.post<string>('/admin/promotionBonus/delete', {
    id
  });
}
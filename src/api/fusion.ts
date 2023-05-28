import axios from 'axios';

/**
 * types.SourceData
 */
export interface FusionDetail {
  /**
   * 输出场景使用
   */
  draw_probability?: number;
  /**
   * 数据id  专辑表 or 材料表 or 盲盒表
   */
  id: number;
  /**
   * ID类型 1=材料， 2=专辑 3=盲盒  是用来区分id的来源
   */
  id_types: number;
  /**
   * 传入场景使用
   */
  in_progress?: number;
  /**
   * 强制要求数量 如果没要求传0
   */
  num_compel?: number;
  /**
   * 碎片出货数量
   */
  out_num?: number;
  /**
   * 稀有度 0=普通 1=稀有 2=史诗 3=传说 4=神话 5=不朽
   */
  rarity?: number;
}

/**
 * types.CreateFusionReq
 */
export interface Fusion {
  /**
   * 是否隐藏
   */
  hide: boolean;
  /**
   * 说明图片
   */
  illustrate_img: string;
  /**
   * 说明文字
   */
  illustrate_text: string;
  /**
   * 坑位数据
   */
  in_data: FusionDetail[];
  /**
   * 融合名称
   */
  name: string;
  /**
   * 融合结果数据
   */
  out_data: FusionDetail[];
  /**
   * （冗余）进度条数值 部分融合类型 是进度条玩法 进度条冲满100%的时候 送OutData 的奖励
   */
  progress?: number;
  /**
   * 奖励图片
   */
  reward_img: string;
  /**
   * 排序 有些融合活动是阶梯式的 比如1+1容2 那么就会对应下一个融合活动就是2+2容4
   */
  sort: number;
}

/**
 * types.FusionList
 */
export interface FusionRes {
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 是否隐藏
   */
  hide?: boolean;
  /**
   * 融合id
   */
  id?: number;
  /**
   * 说明图片
   */
  illustrate_img?: string;
  /**
   * 说明文字
   */
  illustrate_text?: string;
  /**
   * 融合名称
   */
  name?: string;
  /**
   * （冗余）进度条数值 部分融合类型 是进度条玩法 进度条冲满100%的时候 送OutData 的奖励
   */
  progress?: number;
  /**
   * 奖励图片
   */
  reward_img?: string;
  /**
   * 排序 有些融合活动是阶梯式的 比如1+1容2 那么就会对应下一个融合活动就是2+2容4
   */
  sort?: number;
}

/**
 * types.GetFusionListResp
 */
export interface FusionResList {
  /**
   * 当前页
   */
  current_page: number;
  /**
   * 融合列表
   */
  fusion_list: FusionRes[];
  /**
   * 总数
   */
  total: number;
}

/**
 * types.GetFusionListReq
 */
export interface FusionParam {
  /**
   * 融合名称
   */
  name: string;
  /**
   * 当前页码 默认1
   */
  pageNum: number;
  /**
   * 每页数 默认10
   */
  pageSize: number;
}

// 创建融合规则
export function createFusion(data: Fusion) {
  return axios.post<string>('/admin/fusion/create', data);
}

// 查询融合所有列表
export function fetchFusionList(data: FusionParam) {
  return axios.post<FusionResList>('/admin/fusion/list',data);
}

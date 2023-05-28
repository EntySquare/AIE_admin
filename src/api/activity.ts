import axios from 'axios';

/**
 * types.CreateActivityReq
 */
export interface Activity {
  /**
   * 专辑ids
   */
  album_ids?: number[];
  /**
   * 活动结束时间
   */
  end_at?: string;
  /**
   * 融合ids
   */
  fusion_ids?: number[];
  /**
   * 是否隐藏 默认false
   */
  hide?: boolean;
  /**
   * 说明图片
   */
  illustrate_img?: string;
  /**
   * 说明文字
   */
  illustrate_text?: string;
  /**
   * 材料ids
   */
  material_ids?: number[];
  /**
   * 活动图片 小图
   */
  mini_img?: string;
  /**
   * 活动名字
   */
  name?: string;
  /**
   * 活动开始时间 如填了活动开始或结束时间则两个必须填 非必填 需要yyyy-mm-dd hh:mm:ss格式
   */
  start_at?: string;
}

/**
 * types.GetActivityListReq
 */
export interface ActivityParam {
  /**
   * 活动名字
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
 * types.GetActivityListResp
 */
export interface ActivityList {
  activity_list?: Activity[];
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
}

export interface ItemMap {
  label?: string;

  value?: number;
}

/**
 * types.ItemSelectorList
 */
export interface ItemSelectorList {
  album_list?: ItemMap[];

  fusion_list?: ItemMap[];

  material_list?: ItemMap[];
}

// 发布新活动
export function createActivity(data: Activity) {
  return axios.post<string>('/admin/activity/create', data);
}

// 获取活动列表
export function fetchActivityList(params: ActivityParam) {
  return axios.post<ActivityList>('/admin/activity/list', params);
}

// 物品选择器
export function fetchItemSelector() {
  return axios.post<ItemSelectorList>('/admin/tool/selectorData');
}

import axios, { AxiosResponse } from 'axios';

export interface BoxData {
  draw_probability: number; // 产出概率
  id: number; // 数据id 专辑表 or 材料表
  id_types: number; // ID类型 1=材料， 2=专辑 是用来区分id的来源
  in_progress: number; // 传入场景使用
  num_compel: number; // 强制要求数量 如果没要求传0
  out_num: number; // 碎片出货数量
  rarity: number; // 稀有度 0=普通 1=稀有 2=史诗 3=传说 4=神话 5=不朽
}
export interface Box {
  daily_pay_limit: number; // 每日试玩次数
  hide: boolean; // 是否隐藏
  id?: number; // 盲盒id
  illustrate_img: string; // 说明图片
  illustrate_text: string; // 说明文字
  name: string; // 盲盒名称
  out_data: BoxData[]; // 开奖数据
  price: number; // 价格(单位:分)
  sort: number; // 排序
  valid: boolean; // 是否有效
}

export interface BoxRes {
  daily_pay_limit: number; // 每日试玩次数
  created_at: string; // 创建时间
  // 是否隐藏
  hide: boolean;
  id?: number; // 盲盒id
  illustrate_img: string; // 说明图片
  illustrate_text: string; // 说明文字
  name: string; // 盲盒名称
  price: number; // 价格(单位:分)
  sort: number; // 排序
  valid: boolean; // 是否有效
}

export interface BoxResList {
  blindBox_list: BoxRes[];
}

export interface BoxParams {
  name: string;
  current: number;
  pageSize: number;
}

// 创建盲盒
export function createBox(data: Box) {
  return axios.post<string>('/admin/blindBox/create', data);
}

// 修改盲盒
export function updateBox(data: Box) {
  return axios.post<string>('/admin/blindBox/update', data);
}

// 查询盲盒所有列表
export function fetchBoxListAll() {
  return axios.post<BoxResList>('/admin/blindBox/all');
}

// 查询盲盒列表
export function fetchBoxList(params: BoxParams) {
  return axios.post<BoxResList>('/admin/blindBox/list', params);
}

// 盲盒详情
export function fetchBoxDetail(id: number) {
  return axios.post<Box>('/admin/blindBox/detail', { id });
}

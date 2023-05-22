import axios from 'axios';
import qs from 'query-string';

export interface Album {
  authority: string[]; // 官方专辑标签
  background_img: string; // 专辑背景图
  circulation: number; // 发行量
  face_img: string; // 专辑头像图片
  labels: string[]; // 类型标签
  name: string; // 专辑名字
  nft_category: string[]; // 分类标签
  nft_img: string; // nft图片
  nft_name: string; // nft名字
  price: number; //	发售价 浮点数 小数点二位数
  profile: string; // 专辑简介
  phone: string; //	发布者手机号
  status: number; // nft 状态 1:停售 2:发售 如果选发售 需要填写发售价
  user_price_limit: number; // 用户出售价格限制 元单位
}

export interface AlbumsRes {
  background_img: string; // 专辑背景图
  created_at: string; // 创建时间
  face_img: string; // 专辑头像图片
  holder_user_count: number; // 持有人数
  id: number;
  market_circulation_count: number; // 市场流通量
  name: string; // 专辑名字
  nft_num: number; // nft数量 作品总数
  profile: string; // 专辑简介
  remaining_quantity: number; // 剩余数量
}

export interface AlbumsParams {
  name: string;
  current: number;
  pageSize: number;
}

export interface AlbumsResList {
  current_page: number; // 当前页
  list: AlbumsRes[];
  total: number; // 总数
}

// 发布新专辑
export function createAlbum(data: Album) {
  return axios.post<any>('/admin/album/create', data);
}

// 获取专辑列表
export function fetchAlbumList(params: AlbumsParams) {
  return axios.post<any>('/admin/album/list', params);
}

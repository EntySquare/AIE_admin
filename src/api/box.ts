import axios from "axios";
import {Album} from "@/api/album";

export interface Box {
  daily_pay_limit: number; // 每日试玩次数
  hide: boolean; // 是否隐藏
  id: number; // 盲盒id
  illustrate_img: string; // 说明图片
  illustrate_text: string; // 说明文字
  name: string; // 盲盒名称
  out_data: string[]; // 分类标签
  nft_img: string; // nft图片
  nft_name: string; // nft名字
  price: number; //	发售价 浮点数 小数点二位数
  profile: string; // 专辑简介
  phone: string; //	发布者手机号
  status: number; // nft 状态 1:停售 2:发售 如果选发售 需要填写发售价
  user_price_limit: number; // 用户出售价格限制 元单位
}

export interface BoxData {
  draw_probability: number; // 产出概率
  id: number; // 数据id 专辑表 or 材料表
  id_types: number; // ID类型 1=材料， 2=专辑 是用来区分id的来源
  // in_progress: number; // 传入场景使用
  // num_compel: number; // 强制要求数量 如果没要求传0
  out_num: number; // 碎片出货数量
  rarity: number; // 稀有度 0=普通 1=稀有 2=史诗 3=传说 4=神话 5=不朽
}

// 创建盲盒
export function createBox(data: Album) {
    return axios.post<any>('/admin/blindBox/create', data);
}

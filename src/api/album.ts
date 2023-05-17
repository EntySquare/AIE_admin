import axios from 'axios';

export interface Album {
  authority: string[]; //	官方专辑标签
  backgroundImg: string; //	专辑背景图
  circulation: number; //	发行量
  faceImg: string[]; //	专辑头像图片
  labels: string[]; //	类型标签
  name: string; //	专辑名字
  nftCategory: string[]; // 分类标签
  nftImg: string; //	nft图片
  nftName: string; //	nft名字
  price: number; //	发售价 浮点数 小数点二位数
  profile: string; //	专辑简介
  publishUserId: string; //	发布者id 也就是作者id
  status: number; //		nft 状态 1:停售 2:发售 如果选发售 需要填写发售价
  user_price_limit: number; //		用户出售价格限制 元单位
}

// 发布新专辑
export function createAlbum(data: Album) {
  return axios.post<any>('/admin/album/create', data);
}

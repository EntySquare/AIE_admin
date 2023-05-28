import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { failResponseWrap } from '@/utils/setup-mock';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  userInfo: UserState; // 用户信息要改
}

export interface UserPhoneRes {
  avatar: string;
  id: number;
  nickname: string;
  phone: string;
}

export interface UserPhoneResList {
  user_list: UserPhoneRes[];
}

/**
 * types.UserList
 */
export interface User {
  /**
   * 创作的nft数量
   */
  author_nft_count?: number;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 余额
   */
  balance?: string;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * 持有的nft数量
   */
  holder_nft_count?: number;
  /**
   * id
   */
  id?: number;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 发布的专辑数量
   */
  publish_album_count?: number;
}

/**
 * types.GetUserListResp
 */
export interface UserList {
  /**
   * 当前页
   */
  current_page?: number;
  /**
   * 总数
   */
  total?: number;
  user_list?: User[];
}

// 登录
// export function login(data: LoginData) {
//   if (!data.username) {
//     return failResponseWrap(null, '用户名不能为空', 50000);
//   }
//
//   if (!data.password) {
//     return failResponseWrap(null, '密码不能为空', 50000);
//   }
//   return axios.post<LoginRes, any>('/login', data);
// }

export function login(data: LoginData) {
  // return axios.post<LoginRes>('/api/user/login', data);
  if (!data.username) {
    return failResponseWrap(null, '用户名不能为空', 50000);
  }

  if (!data.password) {
    return failResponseWrap(null, '密码不能为空', 50000);
  }
  return axios.post<LoginRes, any>('/admin/login', data);
}

export function getUser(phone: string) {
  return axios.post<UserPhoneResList>('/admin/user/all', { phone });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

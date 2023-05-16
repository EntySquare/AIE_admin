import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { failResponseWrap } from "@/utils/setup-mock";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  userInfo: UserState; // 用户信息要改
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

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

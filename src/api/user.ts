import axios from 'axios';
// @ts-ignore
import md5 from 'md5';

import { failResponseWrap } from '@/utils/setup-mock';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export function getMenuList() {
  // return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function logout() {
  // return axios.post<LoginRes>('/api/user/logout');
}

export function login(data: LoginData) {
  // return axios.post<LoginRes>('/api/user/login', data);
  if (!data.username) {
    return failResponseWrap(null, '用户名不能为空', 50000);
  }

  if (!data.password) {
    return failResponseWrap(null, '密码不能为空', 50000);
  }

  data.password = md5(data.password);
  return axios.post<LoginRes, any>('/admin/login', data);
}

// 查询用户信息
export function getUserInfoApi(data: any) {
  return axios.get<any>('/admin/getUserList', {data});
}

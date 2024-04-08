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
  current_page: number;
  /**
   * 总数
   */
  total: number;
  user_list: User[];
}

/**
 * types.GetUserListReq
 */
export interface UserParam {
  /**
   * 手机号、昵称
   */
  keyword?: string;
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
 * types.HolderNft
 */
export interface HolderNft {
  /**
   * 专辑id
   */
  album_id?: number;
  /**
   * 专辑名称
   */
  album_name?: string;
  /**
   * 创建时间
   */
  created_at?: string;
  /**
   * nft id
   */
  nft_id?: number;
  /**
   * nft图片url地址
   */
  nft_img?: string;
  /**
   * 价格 单位分 格式化成元
   */
  price?: string;
}

/**
 * types.NftTransactionLog
 */
export interface NftTransactionLog {
  /**
   * 发送方手机号
   */
  from_phone?: string;
  /**
   * NFT Id
   */
  nft_id?: number;
  /**
   * NFT图片
   */
  nft_img?: string;
  /**
   * NFT名称
   */
  nft_name?: string;
  /**
   * 交易金额
   */
  price?: string;
  /**
   * 交易时间
   */
  time?: string;
  /**
   * 接收方手机号
   */
  to_phone?: string;
}

/**
 * 用户详情 包括钱包余额
 *
 * types.UserDetail
 */
export interface UserDetail {
  /**
   * 账户余额
   */
  account_balance?: string;
  /**
   * 可用余额
   */
  available_balance?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 冻结余额
   */
  frozen_balance?: string;
  /**
   * 用户id
   */
  id?: number;
  /**
   * 身份证号
   */
  id_code?: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 手机号
   */
  phone?: string;
}

/**
 * types.WalletTransactionLog
 */
export interface WalletTransactionLog {
  /**
   * 交易时间
   */
  created_at?: number;
  /**
   * 信息json
   */
  info_json?: string;
  /**
   * 交易金额
   */
  price?: string;
  /**
   * 交易方式
   */
  trading_mode?: number;
  /**
   * 交易类型 充值、提现
   */
  trading_type?: number;
}

/**
 * types.GetUserDetailResp
 */
export interface UserDetailInfo {
  /**
   * 持有的NFT列表
   */
  holder_nft_list: HolderNft[];
  /**
   * NFT交易记录
   */
  nft_transaction_logs: NftTransactionLog[];
  /**
   * 用户详情 包括钱包余额
   */
  user_detail: UserDetail;
  /**
   * 钱包交易记录
   */
  wallet_transaction_logs: WalletTransactionLog[];
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

/**
 * types.GetUserByRecommendReq
 */
export interface RecommendParam {
  /**
   * 最大推荐人数
   */
  max: number;
  /**
   * 最小推荐人数
   */
  min: number;
}


/**
* types.UserRecommend
*/
export interface UserRecommend {
  /**
   * 推荐人数
   */
  count?: number;
  /**
   * 用户id
   */
  id: number;
  /**
   * 手机号
   */
  phone: string;
}


/**
 * types.GetUserByRecommendResp
 */
export interface UserRecommendList {
  /**
   * 用户id列表
   */
  user_ids?: number[];
  /**
   * 用户推荐人列表
   */
  user_recommend?: UserRecommend[];
}

/**
 * types.GetUserByMaterialIdReq
 */
export interface MaterialParam {
  /**
   * 材料id 必填
   */
  id: number;
  /**
   * 材料数量
   */
  quantity: number;
}

/**
* types.HolderUser
*/

export interface HolderUser {
  avatar?: string;
  id?: number;
  nickname?: string;
  phone?: string;
}
/**
 * types.GetHolderUserResp
 */
export interface HolderUserList {
  holder_user: HolderUser[];
  user_ids: number[];
}
export interface UserByIdsList {
  user_list: HolderUser[];
  user_ids: number[];
}


/**
 * types.CreateUserReq
 */
export interface CreateUser {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 背景图
   */
  background_img?: string;
  /**
   * 个人简介
   */
  introduction?: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 手机号
   */
  phone?: string;
}

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

// 用户列表
export function fetchUserList(params: UserParam) {
  return axios.post<UserList>('/admin/user/list', params);
}

// 用户详情
export function fetchUserDetail(id: number) {
  return axios.post<UserDetailInfo>('/admin/user/detail', { id });
}

export function logout() {
  // return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  // return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  // return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

// 根据推荐人的下级有min～max人的用户【然后过滤掉没有开通钱包（杉德）】搜索用户所有
export function getUserByRecommend(params: RecommendParam) {
  return axios.post<UserRecommendList>('/admin/user/userByRecommend', params);
}

// 根据指定材料ID+数量搜索用户所有
export function getUserByMaterialId(params: MaterialParam) {
  return axios.post<HolderUserList>('/admin/user/userByMaterialId', params);
}

// 根据指定专辑ID搜索用户所有
export function getUserByAlbumId(id: number) {
  return axios.post<HolderUserList>('/admin/user/userByAlbumId', { id });
}

// 根据用户IDs搜索用户所有
export function getUserByIds(ids: number[]) {
  return axios.post<UserByIdsList>('/admin/user/userByIds', { user_ids: ids });
}

// 创建用户
export function createUser(params: CreateUser) {
  return axios.post('/admin/user/create', params);
}
import axios from 'axios';

// The shared response interceptor returns the JSON envelope, not AxiosResponse.
interface PhoneResponse {
  code: number;
  data: any;
}

export function getPhoneControlApi() {
  return axios.post<any, PhoneResponse>('/admin/getDeviceList');
}

// 查询当前推特账号列表
export function getTwitterUserListApi() {
  return axios.post<any, PhoneResponse>('/admin/tweetsUserNameList');
}

// 关注用户
export function followUserApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/followTwitterUser', data);
}
// 指定账号 关注用户
export function followUserApi2(data: any) {
  return axios.post<any, PhoneResponse>('/admin/followTwitterUserByAccount', data);
}

// 评论推文
export function commentTweetApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/commentTwitter', data);
}
// 指定账号 评论推文
export function commentTweetApi2(data: any) {
  return axios.post<any, PhoneResponse>('/admin/commentTwitterByAccount', data);
}

// 转发+引用推文
export function forwardTweetApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/forwardAndQuoteTwitter', data);
}
// 指定账号 转发+引用推文
export function forwardTweetApi2(data: any) {
  return axios.post<any, PhoneResponse>('/admin/forwardAndQuoteTwitterByAccount', data);
}

// 发布推文
export function postTweetApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/sendTwitter', data);
}
// 指定账号 发布推文
export function postTweetApi2(data: any) {
  return axios.post<any, PhoneResponse>('/admin/sendTwitterByAccount', data);
}

// 修改备注
export function updateDeviceCommentApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/updateDeviceComment', data);
}

// 推特API发推
export function postTweetAp3(data: any) {
  return axios.post<any, PhoneResponse>('/admin/twitterStart', data);
}

// 获取转发回复统计列表
export function getDailyOperatesApi(params: any) {
  return axios.get<any, PhoneResponse>('/admin/getDailyOperates', { params });
}

// 修改系统配置 
export function getConfigByName(params: any) {
  return axios.get<any, PhoneResponse>('/admin/getConfigByName', { params });
}

// 发送私信给指定粉丝
export function chatWithFansApi(data: any) {
  return axios.post<any, PhoneResponse>('/admin/control/device/chatWithFans', data);
}
// 获取账号粉丝
export function getFansListApi(params: any) {
  return axios.get<any, PhoneResponse>('/admin/control/device/GetFansList', { params });
}

import axios from 'axios';

export function getPhoneControlApi() {
  return axios.post<any>('/admin/getDeviceList');
}

// 查询当前推特账号列表
export function getTwitterUserListApi() {
  return axios.post<any>('/admin/tweetsUserNameList');
}

// 关注用户
export function followUserApi(data: any) {
  return axios.post<any>('/admin/followTwitterUser', data);
}
// 指定账号 关注用户
export function followUserApi2(data: any) {
  return axios.post<any>('/admin/followTwitterUserByAccount', data);
}

// 评论推文
export function commentTweetApi(data: any) {
  return axios.post<any>('/admin/commentTwitter', data);
}
// 指定账号 评论推文
export function commentTweetApi2(data: any) {
  return axios.post<any>('/admin/commentTwitterByAccount', data);
}

// 转发+引用推文
export function forwardTweetApi(data: any) {
  return axios.post<any>('/admin/forwardAndQuoteTwitter', data);
}
// 指定账号 转发+引用推文
export function forwardTweetApi2(data: any) {
  return axios.post<any>('/admin/forwardAndQuoteTwitterByAccount', data);
}

// 发布推文
export function postTweetApi(data: any) {
  return axios.post<any>('/admin/sendTwitter', data);
}
// 指定账号 发布推文
export function postTweetApi2(data: any) {
  return axios.post<any>('/admin/sendTwitterByAccount', data);
}

// 修改备注
export function updateDeviceCommentApi(data: any) {
  return axios.post<any>('/admin/updateDeviceComment', data);
}

// 推特API发推
export function postTweetAp3(data: any) {
  return axios.post<any>('/admin/twitterStart', data);
}

// 获取转发回复统计列表
export function getDailyOperatesApi(params: any) {
  return axios.get<any>('/admin/getDailyOperates', { params });
}

// 修改系统配置 
export function getConfigByName(params: any) {
  return axios.get<any>('/admin/getConfigByName', { params });
}

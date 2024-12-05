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

// 评论推文
export function commentTweetApi(data: any) {
  return axios.post<any>('/admin/commentTwitter', data);
}

// 转发+引用推文
export function forwardTweetApi(data: any) {
  return axios.post<any>('/admin/forwardAndQuoteTwitter', data);
}

// 转发推文
export function retweetApi(data: any) {
  return axios.post<any>('/admin/forwardTwitter', data);
}

// 搜索推文
export function searchTweetApi(data: any) {
  return axios.post<any>('/admin/searchTwitter', data);
}

// 发布推文
export function postTweetApi(data: any) {
  return axios.post<any>('/admin/sendTwitter', data);
}

// 点赞推文
export function likeTweetApi(data: any) {
  return axios.post<any>('/admin/supportTwitter', data);
}

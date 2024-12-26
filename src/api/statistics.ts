import axios from 'axios';

export function statistics() {
  return axios.get<any>('/admin/statistics');
}

// 获取推特统计
export function getTwitterListApi(params: any) {
  return axios.get<any>('/admin/twitterStatistic', { params });
}

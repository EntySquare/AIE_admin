import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function getFeedsRecord(params: any) {
  return axios.get<any>('/admin/getRobotFeeds', { params });
}
// export function updateConfig(data: any) {
//     return axios.post<any>('/admin/updateConfig', data);
// }

import axios from 'axios';

export function getSysConfigList() {
  return axios.get<any>('/admin/getSysConfigList');
}
export function updateConfig(data: any) {
  return axios.post<any>('/admin/updateConfig', data);
}

import axios from 'axios';

export function getLotteryRecord(params: any) {
  return axios.get<any>('/admin/getLotteryRecord', { params });
}
export function getPhoneControlApi() {
  return axios.post<any>('/admin/getDeviceList');
}
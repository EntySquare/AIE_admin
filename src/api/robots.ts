import axios from 'axios';

export function getRobotList(params: any) {
  return axios.get<any>('/admin/getRobotList', { params });
}
export function updateRobot(data: any) {
  return axios.post<any>('/admin/updateRobot', data);
}

// 获取机器人绑定列表
export function getRobotBindList(params: any) {
  return axios.get<any>('/admin/getTwitterBinds', { params });
}

export const addCreateRobot = (data: any) => {
  return axios.post<any>('/admin/createRobot', data);
}
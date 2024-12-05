import axios from "axios";



export function getRobotList(params: any) {
    return axios.get<any>('/admin/getRobotList', { params });
}
export function updateRobot(data: any) {
    return axios.post<any>('/admin/updateRobot', data);
}

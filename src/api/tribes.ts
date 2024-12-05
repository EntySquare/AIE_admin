import axios from "axios";




export function getTribeList(params: any) {
    return axios.get<any>('/admin/getTribeList', { params });
}
export function updateTribe(data: any) {
    return axios.post<any>('/admin/updateTribe', data);
}

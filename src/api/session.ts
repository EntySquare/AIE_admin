import axios from "axios";

export interface Request {
    /**
     * 页码
     */
    pageIndex?: number;
    /**
     * 每页条数
     */
    pageSize?: number;
    robotId?: number;
    userId?: number;
    [property: string]: any;
}

export function getChatList(params: any) {
    return axios.get<any>('/admin/getChatList', { params });
}

import axios from 'axios';

// 用户列表
export function getPhoneControlApi() {
    return axios.post<any>('/admin/getDeviceList');
  }
  
  // 获取账号粉丝
  export function getFansListApi(params: any) {
    return axios.get<any>('/admin/control/device/GetFansList', { params });
  }
    //  获取历史聊天列表
    export function getChatListApi(data: any) {
        return axios.post<any>('/admin/control/message/list',  data );
      }
  //  /api/admin/control/message/latest  获取最新消息
  export function getLatestMessageApi(data: any) {
    return axios.post<any>('/admin/control/message/latest', data );
  }
  
  // 创建聊天
  export function createChatApi(data: any) {
    return axios.post<any>('/admin/control/message/createChat', data);
  }
  

  
  // 发送消息
  export function sendMessageApi(data: any) {
    return axios.post<any>('/admin/control/message/sendMessage', data);
  }
  
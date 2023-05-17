import {failResponseWrap} from "@/utils/setup-mock";
import axios from "axios";
import {LoginData} from "@/api/user";
import {UserState} from "@/store/modules/user/types";


export  interface uiData {
  uiPicture: string;
  title: string;
  content: string;
  publishTimer: string;
}

export interface tableListData {
  dataLen: number;
  data: uiData[];
}

export interface UploadData {
  name: string;
  file: File;
  fileType: number;
}

export interface LoginRes {
  token: string;
  userInfo: UserState; // 用户信息要改
}

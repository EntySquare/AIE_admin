import axios from 'axios';
import {RequestOption} from "@arco-design/web-vue";

export interface UploadData {
  file: File;
  fileType: number;
}
export function uploadFile(data: FormData) {
  return axios.post<any>('/admin/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function arcoUpload(option: RequestOption): Promise<string> {
  const { onError, onSuccess, fileItem, name = 'file' } = option;
  const formData = new FormData();
  formData.append(name as string, fileItem.file as Blob);
  try {
    const res = await uploadFile(formData);
    onSuccess(res);
    return res.data.url;
  } catch (error) {
    onError(error);
  }
  return '';
}

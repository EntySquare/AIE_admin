import axios from 'axios';

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

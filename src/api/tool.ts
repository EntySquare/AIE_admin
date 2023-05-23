import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function toolSelectorApi() {
  return axios.post<any>('/admin/tool/selector');
}

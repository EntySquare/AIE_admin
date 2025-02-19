import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
  json:T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    // const token = 'test_hash_token_user_id_1';
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      // config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = `${token}`;
      config.headers = { token };
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;

    // 如果返回的 code 是 -2，跳转到登录页
    if (res.code === -2) {
      Message.error({
        content: 'Session expired, please log in again.',
        duration: 5 * 1000,
      });
      // 跳转到登录页
      const userStore = useUserStore();
      userStore.logout();
      window.location.reload();
      return Promise.reject(new Error(res.msg || 'Error'));
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0 && res.code !== 20000) {
      Message.error({
        // @ts-ignore
        content: res.data.message || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const userStore = useUserStore();

            // await userStore.logout();
            window.location.reload();
          },
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

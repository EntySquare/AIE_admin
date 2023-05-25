import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MESSAGE: AppRouteRecordRaw = {
  path: '/message',
  name: 'message',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '公告',
    requiresAuth: true,
    icon: 'icon-list',
    order: 5,
  },
  children: [
    {
      path: 'messageList',
      name: 'messageList',
      component: () => import('@/views/message/index.vue'),
      meta: {
        locale: '公告列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default MESSAGE;

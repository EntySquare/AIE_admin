import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/statistics',
  name: 'statistics',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '统计数据',
    requiresAuth: true,
    icon: 'icon-user',
    order: 4,
  },
  children: [
    {
      path: 'statisticsInfo',
      name: 'statisticsInfo',
      component: () => import('@/views/statisticsList/index.vue'),
      meta: {
        locale: '统计列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;

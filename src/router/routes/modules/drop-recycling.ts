import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DEOP_RECYCLING: AppRouteRecordRaw = {
  path: '/drop-recycling',
  name: 'drop-recycling',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '空投/回收',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 7,
  },
  children: [
    {
      path: 'operation',
      name: 'operation',
      component: () => import('@/views/drop-recycling/operation.vue'),
      meta: {
        locale: '操作',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DEOP_RECYCLING;

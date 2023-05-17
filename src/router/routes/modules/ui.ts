import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const UI: AppRouteRecordRaw = {
  path: '/ui',
  name: 'ui',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'UI界面',
    requiresAuth: true,
    icon: 'icon-list',
    order: 1,
  },
  children: [
    {
      path: 'appUi',
      name: 'appUi',
      component: () => import('@/views/ui/uiApp.vue'),
      meta: {
        locale: 'App界面',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default UI;

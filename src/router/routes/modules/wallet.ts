import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WALLET: AppRouteRecordRaw = {
  path: '/wallet',
  name: 'wallet',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '钱包',
    requiresAuth: true,
    icon: 'icon-book',
    order: 6,
  },
  children: [
    // {
    //   path: 'walletList',
    //   name: 'walletList',
    //   component: () => import('@/views/wallet/walletList.vue'),
    //   meta: {
    //     locale: '钱包列表',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'withdrawList',
      name: 'withdrawList',
      component: () => import('@/views/wallet/withdrawList.vue'),
      meta: {
        locale: '提现列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'rechargeNote',
    //   name: 'rechargeNote',
    //   component: () => import('@/views/wallet/rechargeNote.vue'),
    //   meta: {
    //     locale: '充值记录',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default WALLET;

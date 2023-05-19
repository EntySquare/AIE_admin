import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const UI: AppRouteRecordRaw = {
  path: '/nft',
  name: 'nft',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'NFT',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    // {
    //   path: 'publishNFT',
    //   name: 'publishNFT',
    //   component: () => import('@/views/nft/publishNFT.vue'),
    //   meta: {
    //     locale: '发布NFT',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'publishAlbum',
      name: 'publishAlbum',
      component: () => import('@/views/nft/publishAlbum.vue'),
      meta: {
        locale: '发布专辑',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'nftList',
      name: 'nftList',
      component: () => import('@/views/nft/nftList.vue'),
      meta: {
        locale: '数字藏品列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'albumList',
      name: 'albumList',
      component: () => import('@/views/nft/albumList.vue'),
      meta: {
        locale: '专辑列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'albumList',
      name: 'albumList',
      component: () => import('@/views/nft/albumList.vue'),
      meta: {
        locale: '材料列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'batchReleaseNFT',
    //   name: 'batchReleaseNFT',
    //   component: () => import('@/views/nft/batchReleaseNFT.vue'),
    //   meta: {
    //     locale: '批量发布NFT',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default UI;

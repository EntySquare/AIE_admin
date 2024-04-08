<template>
  <a-spin :loading="loading" tip="加载中..." style="width: 100%; height: 88vh">
    <a-grid :cols="18" :row-gap="16" class="panel">
      <a-grid-item
        v-for="(item, index) in pDataList"
        :key="index"
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="avatar" :src="item.image" />
          </a-avatar>
          <a-statistic
            :title="item.title"
            :value="item.value"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              {{ item.unit }}
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item :span="24">
        <a-divider class="panel-border" />
      </a-grid-item>
    </a-grid>
  </a-spin>
</template>

<script lang="ts" setup>
  import { fetchUserPreview } from '@/api/dashboard';
  import { onMounted, reactive } from 'vue';
  import useLoading from '@/hooks/loading';

  interface PreviewData {
    image: string;
    title: string;
    value: number;
    unit?: string;
  }
  const pDataList = reactive<PreviewData[]>([]);
  // const loading = ref<boolean>(true);
  const { loading, setLoading } = useLoading(true);

  // 蓝
  const img1 =
    '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image';
  // 紫
  const img2 =
    '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image';
  // 橙
  const img3 =
    '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image';

  // 查询用户预览数据
  const queryUserPreviewData = async () => {
    try {
      const res = await fetchUserPreview();
      pDataList.push({
        image: img1,
        title: '新增用户数（3天）',
        value: res.data.growth_user.day_3 ?? 0,
      });
      pDataList.push({
        image: img2,
        title: '有效用户数（3天）',
        value: res.data.vaild_user.day_3 ?? 0,
      });
      pDataList.push({
        image: img3,
        title: '流失用户数（3天）',
        value: res.data.churn_user.day_3 ?? 0,
      });
      pDataList.push({
        image: img1,
        title: '新增用户数（7天）',
        value: res.data.growth_user.day_7 ?? 0,
      });
      pDataList.push({
        image: img2,
        title: '有效用户数（7天）',
        value: res.data.vaild_user.day_7 ?? 0,
      });
      pDataList.push({
        image: img3,
        title: '流失用户数（7天）',
        value: res.data.churn_user.day_7 ?? 0,
      });
      pDataList.push({
        image: img1,
        title: '新增用户数（30天）',
        value: res.data.growth_user.day_30 ?? 0,
      });
      pDataList.push({
        image: img2,
        title: '有效用户数（30天）',
        value: res.data.vaild_user.day_30 ?? 0,
      });
      pDataList.push({
        image: img3,
        title: '流失用户数（30天）',
        value: res.data.churn_user.day_30 ?? 0,
      });
      pDataList.push({
        image: img1,
        title: '新增用户数（60天）',
        value: res.data.growth_user.day_60 ?? 0,
      });
      pDataList.push({
        image: img2,
        title: '有效用户数（60天）',
        value: res.data.vaild_user.day_60 ?? 0,
      });
      pDataList.push({
        image: img3,
        title: '流失用户数（60天）',
        value: res.data.churn_user.day_60 ?? 0,
      });
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };

  onMounted(() => {
    queryUserPreviewData();
  });
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }
  .panel-col {
    padding-left: 43px;
    border-right: 1px solid rgb(var(--gray-2));
  }
  .col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }
  .up-icon {
    color: rgb(var(--red-6));
  }
  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
  }
  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }
</style>

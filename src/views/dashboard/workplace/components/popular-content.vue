<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
       热门专辑TOP
      </template>
      <template #extra>
        <a-link>查看更多</a-link>
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-table
          :data="renderList"
          :pagination="false"
          :bordered="false"
          :scroll="{ x: '100%', y: '264px' }"
        >
          <template #columns>
            <a-table-column title="排名" data-index="key"></a-table-column>
            <a-table-column title="专辑名称" data-index="title">
              <template #cell="{ record }">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                >
                  {{ record.title }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="交易总额" data-index="clickNumber" :sortable="{sortDirections:['ascend', 'descend']}">
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryPopularList } from '@/api/dashboard';
  import type { TableData } from '@arco-design/web-vue/es/table/interface';

  const type = ref('text');
  const { loading, setLoading } = useLoading();
  const renderList = ref<TableData[]>();
  const fetchData = async (contentType: string) => {
    try {
      setLoading(true);
      const { data } = await queryPopularList({ type: contentType });
      renderList.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  fetchData('text');
</script>

<style scoped lang="less">
  .general-card {
    min-height: 395px;
  }
  :deep(.arco-table-tr) {
    height: 44px;
    .arco-typography {
      margin-bottom: 0;
    }
  }
  .increases-cell {
    display: flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
</style>

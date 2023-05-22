<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 材料列表</a-typography-title>
      <a-divider />
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="condition" placeholder="输入材料名" />
        </a-col>
        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryMaterialListData()"
          >
            <icon-search :size="20" />
            查询
          </a-button>
          <a-button @click="queryMaterialListData()">
            <icon-loop :size="20" />
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-divider />
      <a-table
        :data="tableData"
        style="margin-top: 20px"
        :pagination="pagination"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="材料图片" data-index="img">
            <template #cell="{ record }">
              <a-image :src="record.img" height="80px" width="120px"> </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column title="材料名" data-index="name"></a-table-column>
          <a-table-column
            title="材料属性"
            data-index="attribute"
          ></a-table-column>
          <a-table-column
            title="材料说明"
            data-index="illustrate"
          ></a-table-column>
          <a-table-column
            title="发行数量"
            data-index="issued_quantity"
          ></a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import {
    fetchMaterialList,
    MaterialsParams,
    MaterialsRes,
  } from '@/api/material';

  const condition = ref<string>('');
  const { setLoading } = useLoading(true);
  const tableData = ref<MaterialsRes[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });

  // 查询材料列表
  const queryMaterialListData = async (
    params: MaterialsParams = {
      name: condition.value,
      current: 1,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchMaterialList(params);
      tableData.value = res.data.list;
      pagination.current = params.current;
      pagination.total = res.data.length;
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    queryMaterialListData({ name: condition.value, current, pageSize: 10 });
  };
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }

  .col-div div {
    margin-top: 5px;
  }
</style>

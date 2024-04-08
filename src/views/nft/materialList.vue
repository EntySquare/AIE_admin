<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 材料列表</a-typography-title>
      <a-button
        style="margin-bottom: 20px"
        type="primary"
        @click="updateVisible(1, -1)"
      >
        <template #icon>
          <icon-plus />
        </template>
        创建材料
      </a-button>
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
          <a-button @click="resetQuery()">
            <icon-loop :size="20" />
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-divider />
      <a-table :data="tableData" style="margin-top: 20px"  :pagination="false">
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
          <a-table-column title="操作">
            <template #cell="{ record }">
              <div style="display: flex">
                <a-button
                  type="outline"
                  style="margin-right: 10px"
                  @click="updateVisible(2, record.id)"
                  >编辑
                </a-button>
                </div>
                </template>
                </a-table-column>
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryMaterialListData()"
        />
      </a-row>
    </a-card>

    <MaterialForm
      :visible="modalVisible"
      :title="modalTitle"
      :rid="rid"
      @update-visible="updateVisible"
      @refresh="queryMaterialListData"
    ></MaterialForm>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import {
    fetchMaterialList,
    MaterialsParams,
    MaterialsRes,
  } from '@/api/material';
  import MaterialForm from '@/views/nft/components/materialForm.vue';

  const condition = ref<string>('');
  const { setLoading } = useLoading(true);
  const tableData = ref<MaterialsRes[]>([]);
    const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('');
  const rid = ref<number>(-1);

  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  // 查询材料列表
  const queryMaterialListData = async (
    params: MaterialsParams = {
      name: condition.value,
      current:pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchMaterialList(params);
      tableData.value = res.data.material_list;
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  // 重置查询
  const resetQuery = async () => {
    condition.value = '';
    await queryMaterialListData();
  };
  const updateVisible = (type: any, index: number) => {
    if (type === 1) {
      modalTitle.value = '创建';
      rid.value = 0;
    } else if (type === 2) {
      modalTitle.value = '修改';
      rid.value = index;
    }
    modalVisible.value = !modalVisible.value;

  };

  onMounted(() => {
    resetQuery();
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }

  .col-div div {
    margin-top: 5px;
  }
</style>

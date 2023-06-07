<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6"> 推广奖励设置 </a-typography-title>
      <a-button
        style="margin-top: 20px"
        type="primary"
        @click="updateVisible(1, -1)"
      >
        <template #icon>
          <icon-plus />
        </template>
        新建推广规则
      </a-button>
      <a-table style="margin-top: 20px" :data="tableData">
        <template #columns>
          <a-table-column title="名称" data-index="name"></a-table-column>
          <a-table-column title="图片" data-index="img">
            <template #cell="{ record }">
              <a-image :src="record.img" height="80px" width="120px"> </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="奖励数量"
            data-index="gift_num"
          ></a-table-column>
          <a-table-column title="人数" data-index="headcount"></a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column title="类型" data-index="id_data">
            <template #cell="{ record }">
              <p v-if="record.id_types === 1">材料</p>
              <p v-else-if="record.id_types === 2">专辑</p>
              <p v-else-if="record.id_types === 3">盲盒</p>
            </template>
          </a-table-column>
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
      <!-- <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" long>确认</a-button>
        </a-col>
      </a-row> -->
    </a-card>
    <PromoteModal
      :visible="modalVisible"
      :title="modalTitle"
      :rid="rid"
      @update-visible="updateVisible"
      @refresh="queryPromoteListData"
    ></PromoteModal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import selectData from '@/views/box/components/selectData.vue';
  import { fetchPromoteList, PromoteParam, PromoteRes } from '@/api/promote';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import PromoteModal from '@/views/promote/components/PromoteModal.vue';

  const count = ref<number>();
  const people = ref<number>();
  const idData = ref<number>(0);
  const idTypes = ref<number>(0);
  const { setLoading } = useLoading(true);

  const tableData = ref<PromoteRes[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('');
  const rid = ref<number>(-1);

  // 查询公告列表
  const queryPromoteListData = async (
    params: PromoteParam = { pageNum: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const res = await fetchPromoteList(params);
      tableData.value = res.data.promotion_bonus_list;
      pagination.current = res.data.current_page;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };
  const updateVisible = (type: any, index: number) => {
    modalVisible.value = !modalVisible.value;
    if (type === 1) {
      modalTitle.value = '新建';
    } else if (type === 2) {
      modalTitle.value = '修改';
      rid.value = index;
    }
  };

  onMounted(() => {
    queryPromoteListData();
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }

  .card-div div {
    margin-top: 5px;
  }

  .row-div div {
    margin: 10px 0 20px 0;
  }
</style>

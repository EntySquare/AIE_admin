<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6"> 盲盒列表</a-typography-title>
      <a-button
        style="margin-top: 20px"
        type="primary"
        @click="updateVisible(1, -1)"
      >
        <template #icon>
          <icon-plus />
        </template>
        创建盲盒
      </a-button>
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="condition" placeholder="输入盲盒名称" />
        </a-col>
        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryBoxListData()"
          >
            <icon-search :size="20" />
            查询
          </a-button>
          <a-button @click="queryBoxListData()">
            <icon-loop :size="20" />
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-divider />
      <a-table style="margin-top: 20px" :data="tableData">
        <template #columns>
          <a-table-column title="盲盒名称" data-index="name"></a-table-column>
          <a-table-column title="说明图片" data-index="illustrate_img">
            <template #cell="{ record }">
              <a-image :src="record.illustrate_img" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="说明文字"
            data-index="illustrate_text"
          ></a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column
            title="每日试玩次数"
            data-index="daily_pay_limit"
          ></a-table-column>
          <a-table-column title="是否隐藏" data-index="hide">
            <template #cell="{ record }">
              <p v-if="record.hide === true">是</p>
              <p v-else-if="record.hide === false">否</p>
            </template>
          </a-table-column>
          <a-table-column
            title="价格（分）"
            data-index="price"
          ></a-table-column>
          <a-table-column title="排序" data-index="sort"></a-table-column>
          <a-table-column title="是否有效" data-index="valid">
            <template #cell="{ record }">
              <p v-if="record.valid === true">是</p>
              <p v-else-if="record.valid === false">否</p>
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
                <a-popover position="left" trigger="click">
                  <a-button
                    type="outline"
                    @click="queryBoxDetailData(record.id)"
                    >详情</a-button
                  >
                  <template #content>
                    <a-descriptions
                      v-for="(forData, i) in detailData"
                      :key="i"
                      :data="forData"
                      :bordered="true"
                      style="margin-top: 20px"
                      :title="`开奖数据-${i + 1}`"
                      :column="3"
                    >
                      <a-descriptions-item
                        v-for="(item, j) in forData"
                        :key="j"
                        :label="outDataMap(j, item)"
                      >
                        {{ item }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </template>
                </a-popover>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
  <modal-form
    :visible="modalVisible"
    :title="modalTitle"
    :rid="rid"
    @update-visible="updateVisible"
    @refresh="queryBoxListData"
  ></modal-form>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { fetchBoxList, BoxRes, BoxParams, fetchBoxDetail } from '@/api/box';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import ModalForm from '@/views/box/components/modalForm.vue';

  const { setLoading } = useLoading(true);
  const tableData = ref<BoxRes[]>([]);
  const detailData = ref<any>();
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
  const condition = ref<string>('');

  // 查询盲盒列表
  const queryBoxListData = async (
    params: BoxParams = { name: condition.value, current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const res = await fetchBoxList(params);
      tableData.value = res.data.blindBox_list;
      pagination.current = params.current;
      pagination.total = res.data.blindBox_list.length;
    } finally {
      setLoading(false);
    }
  };

  // 查询盲盒详情
  const queryBoxDetailData = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetchBoxDetail(id);
      detailData.value = res.data.out_data;
    } finally {
      setLoading(false);
    }
  };
  const outDataMap = (key: string, value: any) => {
    const outMap: Map<string, string> = new Map();
    outMap.set('draw_probability', '权重');
    outMap.set('id', 'id');
    if (key === 'id_types' && value === 1) {
      outMap.set('id_types', '材料');
    }
    if (key === 'id_types' && value === 2) {
      outMap.set('id_types', '专辑');
    }
    outMap.set('in_progress', '传入进度');
    outMap.set('num_compel', '强制要求数量');
    outMap.set('out_num', '出货数量');
    outMap.set('rarity', '稀有度');
    return outMap.get(key);
  };

  const updateVisible = (type: any, index: number) => {
    modalVisible.value = !modalVisible.value;
    if (type === 1) {
      modalTitle.value = '创建';
    } else if (type === 2) {
      modalTitle.value = '修改';
      rid.value = index;
    }
  };

  onMounted(() => {
    queryBoxListData();
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

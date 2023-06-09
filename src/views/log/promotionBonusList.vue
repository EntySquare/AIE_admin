<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        推广奖励空投/回收日志列表</a-typography-title
      >
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="condition" placeholder="输入名称" />
        </a-col>

        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryPromotionBonusListData()"
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
      <a-table :data="tableData" style="margin-top: 20px" :pagination="false">
        <template #columns>
          <a-table-column title="类型" data-index="id_types">
            <template #cell="{ record }">
              {{ record.id_types == 1 ? '材料' : record.id_types == 2? '数藏nft':'盲盒' }}
            </template>
          </a-table-column>
          <a-table-column title="名称" data-index="name"></a-table-column>
          <a-table-column title="图片" data-index="image">
            <template #cell="{ record }">
              <a-image :src="record.image" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="用户昵称" data-index="user_name">      </a-table-column>
          <a-table-column title="用户手机号" data-index="user_phone">      </a-table-column>
    
          <a-table-column title="奖励数量" data-index="gift_num">
          </a-table-column>
          <a-table-column title="状态" data-index="status">

            <template #cell="{ record }">
              {{ record.status == 1 ? '已领取' :'未领取' }}
            </template>
          </a-table-column>
          <a-table-column title="未领取原因" data-index="reason"></a-table-column>

      
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryPromotionBonusListData()"
        />
      </a-row>
    </a-card>
  
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import {
    fetchPromotionBonusLogList,
    PromotionBonusLogParam,
    PromotionBonusLog,
  } from '@/api/log';
  import { fetchItemSelector, ItemMap } from '@/api/activity';
  import { getUserByIds } from '@/api/user';
  import { Notification, Message } from '@arco-design/web-vue';

  const condition = ref<string>('');
  const materialId = ref<number>(0);
  const { setLoading } = useLoading(true);
  const tableData = ref<PromotionBonusLog[]>([]);
  const selectorMaterial = ref<ItemMap[]>([]);
  const userStr = ref<string>('');

  // 物品选择器
  const queryItemSelector = async () => {
    setLoading(true);
    try {
      const res = await fetchItemSelector();
      selectorMaterial.value = res.data.material_list ?? [];
      // console.log(selectorData1.value);
    } finally {
      setLoading(false);
    }
  };

  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  // 查询材料列表
  const queryPromotionBonusListData = async (
    params: PromotionBonusLogParam = {
      id_types: materialId.value,
      name: condition.value,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchPromotionBonusLogList(params);
      tableData.value = res.data.promotion_bonus_log_list;
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };


  // 重置查询
  const resetQuery = async () => {
    condition.value = '';
    await queryPromotionBonusListData();
  };


  onMounted(() => {
    resetQuery();
    queryItemSelector();
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

<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        管理后台操作请求日志列表</a-typography-title
      >
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="param.oper_name" placeholder="操作人员" />
        </a-col>
        <a-col :span="5">
          <a-input v-model="param.oper_url" placeholder="请求URL" />
        </a-col>
        <a-col :span="5">
          <a-input v-model="param.oper_ip" placeholder="主机地址" />
        </a-col>

        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryAdminOperListData()"
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
          <a-table-column title="请求方式" data-index="method"></a-table-column>
          <a-table-column title="主机地址" data-index="oper_ip">
          </a-table-column>
          <a-table-column
            title="操作地点"
            data-index="oper_location"
          ></a-table-column>
          <a-table-column
            title="请求URL"
            data-index="oper_url"
          ></a-table-column>
          <a-table-column title="操作人员" data-index="oper_name">
          </a-table-column>
          <a-table-column title="请求参数">
            <template #cell="{ record }">
              <a-popover
                  v-if="record.oper_param"
                  position="bottom"
             
                  trigger="click"
                >
                <template #content>
                  <div class="popover-box">
                  <pre>{{ fmtBody(record.oper_param) }}</pre>
                </div>
                </template>
                  <icon-exclamation-circle />
                </a-popover>
                <span v-else>无</span>
                </template>
            
          </a-table-column>
          <a-table-column title="错误消息">
            <template #cell="{ record }">
              <a-popover
                  v-if="record.error_msg"
                  position="bottom"
             
                  trigger="click"
                >
                <template #content>
                  <div class="popover-box">
                  <pre>{{ fmtBody(record.error_msg) }}</pre>
                </div>
                </template>
                  <icon-exclamation-circle />
                </a-popover>
                <span v-else>无</span>
                </template>
            
          </a-table-column>

          <a-table-column
            title="操作时间"
            data-index="oper_time"
          ></a-table-column>
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryAdminOperListData()"
        />
      </a-row>
    </a-card>

 
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { fetchAdminOperLogList, OperLogParam, AdminOperLog } from '@/api/log';
  import { fetchItemSelector, ItemMap } from '@/api/activity';

  const param = ref<OperLogParam>({});
  const condition = ref<string>('');
  const { setLoading } = useLoading(true);
  const tableData = ref<AdminOperLog[]>([]);
  const selectorMaterial = ref<ItemMap[]>([]);

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
  const queryAdminOperListData = async (
    params: OperLogParam = {
      oper_ip: param.value.oper_ip,
      oper_name: param.value.oper_name,
      oper_url: param.value.oper_url,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchAdminOperLogList(params);
      tableData.value = res.data.admin_oper_log_list;
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  // 重置查询
  const resetQuery = async () => {
    condition.value = '';
    await queryAdminOperListData();
  };
  const fmtBody = (value: string) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
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

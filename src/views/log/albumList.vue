<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        专辑空投/回收日志列表</a-typography-title
      >
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="condition" placeholder="输入专辑名" />
        </a-col>

        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryAlbumListData()"
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
          <a-table-column title="专辑名" data-index="name"></a-table-column>
          <a-table-column title="专辑图片" data-index="image">
            <template #cell="{ record }">
              <a-image :src="record.image" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
                title="操作人数"
                data-index="quantity"
              ></a-table-column>
          <a-table-column title="操作类型" data-index="operation_type">
            <template #cell="{ record }">
              {{ record.operation_type == 1 ? '空投/赠送' : '回收/销毁' }}
            </template>
          </a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button
                type="outline"
                style="margin-right: 10px"
                @click="queryUserByIds(record.user_ids)"
                >查看用户
              </a-button>

              <!-- <a-button
                  style="margin-right: 10px"
                  @click="openModel(record.name, record.id)"
                  >删除</a-button
                > -->
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryAlbumListData()"
        />
      </a-row>
    </a-card>

    <a-modal
      v-model:visible="modalVisible"
      @ok="modalVisible = false"
      @cancel="modalVisible = false"
      :hide-cancel="true"
    >
      <template #title> {{ modalTitle }} </template>
      <div>
        <a-textarea
          v-model="userStr"
          placeholder=""
          allow-clear
          :disabled="true"
          :auto-size="{ minRows: 10 }"
      /></div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import {
    fetchAlbumLogList,
    AlbumLogParam,
    AlbumLog,
  } from '@/api/log';
  import { fetchItemSelector, ItemMap } from '@/api/activity';
  import { getUserByIds } from '@/api/user';
  import { Notification, Message } from '@arco-design/web-vue';

  const condition = ref<string>('');
  const albumId = ref<number>(0);
  const { setLoading } = useLoading(true);
  const tableData = ref<AlbumLog[]>([]);
  const modalVisible = ref<boolean>(false);
  const modalTitle = ref<string>('查看用户');
  const rid = ref<number>(-1);
  const selectorAlbum = ref<ItemMap[]>([]);
  const userStr = ref<string>('');

  // 物品选择器
  const queryItemSelector = async () => {
    setLoading(true);
    try {
      const res = await fetchItemSelector();
      selectorAlbum.value = res.data.album_list ?? [];
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
  const queryAlbumListData = async (
    params: AlbumLogParam = {
      album_id: albumId.value,
      name: condition.value,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchAlbumLogList(params);
      tableData.value = res.data.album_log_list;
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  const queryUserByIds = async (ids: number[]) => {
    setLoading(true);
    try {
      console.log('ids', ids, ids.length);
      if (ids.length === 0) {
        Notification.warning({
          title: '参数错误',
          content: '请选择用户Ids或选某个操作日志的查看功能!',
        });
        return;
      }
      const res = await getUserByIds(ids);
      const { code, data } = res;
      modalVisible.value = true;
      if (code === 0) {
        userStr.value = data.user_list.map((item) => item.phone);
      }
    } finally {
      setLoading(false);
    }
  };
  // 重置查询
  const resetQuery = async () => {
    condition.value = '';
    await queryAlbumListData();
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

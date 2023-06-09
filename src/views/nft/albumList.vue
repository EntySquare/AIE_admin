<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 专辑列表 </a-typography-title>
      <a-divider />
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="condition" placeholder="输入专辑名称" />
        </a-col>
        <a-col :span="4">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="queryAlbumsListData()"
          >
            <icon-search :size="20" />
            查询
          </a-button>
          <a-button @click="queryAlbumsListData()">
            <icon-loop :size="20" />
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-divider />
      <a-table :data="tableData" style="margin-top: 20px" :pagination="false">
        <template #columns>
          <a-table-column title="专辑背景图" data-index="background_img">
            <template #cell="{ record }">
              <a-image :src="record.background_img" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column title="专辑头像图片" data-index="face_img">
            <template #cell="{ record }">
              <a-image :src="record.background_img" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="持有人数"
            data-index="holder_user_count"
          ></a-table-column>
          <a-table-column
            title="市场流通量"
            data-index="market_circulation_count"
          ></a-table-column>
          <a-table-column title="专辑名" data-index="name"></a-table-column>
          <a-table-column
            title="作品总数"
            data-index="nft_num"
          ></a-table-column>
          <!--          <a-table-column title="简介" data-index="profile"></a-table-column>-->
          <a-table-column
            title="剩余数量"
            data-index="remaining_quantity"
          ></a-table-column>
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryAlbumsListData()"
        />
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { AlbumsParams, AlbumsRes, fetchAlbumList } from '@/api/album';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';

  const condition = ref<string>('');
  const { setLoading } = useLoading(true);
  const tableData = ref<AlbumsRes[]>([]);
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  // 查询专辑列表
  const queryAlbumsListData = async (
    params: AlbumsParams = {
      name: condition.value,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    window.console.log('start');
    setLoading(true);
    try {
      const res = await fetchAlbumList(params);
      tableData.value = res.data.album_list;
      pagination.current =  res.data.current_page;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  const testClick = () => {
    window.console.log('start');
  };

  const onPageChange = (current: number) => {
    queryAlbumsListData({ name: condition.value, current, pageSize: 10 });
  };

  onMounted(() => {
    queryAlbumsListData();
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

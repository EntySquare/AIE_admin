<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 用户详情 </a-typography-title>
      <a-divider />
      <a-typography-title :heading="6"> 头像 </a-typography-title>
      <a-row justify="space-between">
        <a-col :span="4">
          <a-image
            :src="tableData.user_detail.avatar"
            width="110px"
            height="110px"
          ></a-image>
        </a-col>
        <a-col :span="16">
          <a-descriptions :data="data" bordered style="margin-top: 20px" />
        </a-col>
      </a-row>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6"> 数字藏品交易 </a-typography-title>
          <a-table
            :data="tableData.nft_transaction_logs"
            style="margin-top: 20px"
          >
            <template #columns>
              <a-table-column
                title="发送方"
                data-index="from_phone"
              ></a-table-column>
              <a-table-column title="藏品图片" data-index="nft_img">
                <template #cell="{ record }">
                  <a-image :src="record.nft_img" height="50px" width="50px">
                  </a-image>
                </template>
              </a-table-column>
              <a-table-column
                title="藏品名字"
                data-index="nft_name"
              ></a-table-column>
              <a-table-column
                title="接收方"
                data-index="to_phone"
              ></a-table-column>
              <a-table-column
                title="交易金额"
                data-index="price"
              ></a-table-column>
              <a-table-column
                title="交易时间"
                data-index="time"
              ></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
        <!--        钱包交易记录-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6"> 钱包交易记录 </a-typography-title>
          <a-table
            :data="tableData.wallet_transaction_logs"
            style="margin-top: 20px"
          >
            <template #columns>
              <a-table-column
                title="类型"
                data-index="trading_type"
              ></a-table-column>
              <a-table-column title="金额" data-index="price"></a-table-column>
              <a-table-column
                title="交易方式"
                data-index="trading_mode"
              ></a-table-column>
              <a-table-column
                title="信息源"
                data-index="info_json"
              ></a-table-column>
              <a-table-column
                title="交易时间"
                data-index="created_at"
              ></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
        <!--        持有数字藏品-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6"> 持有数字藏品 </a-typography-title>
          <a-table :data="tableData.holder_nft_list" style="margin-top: 20px">
            <template #columns>
              <a-table-column title="藏品图片" data-index="nft_img">
                <template #cell="{ record }">
                  <a-image :src="record.nft_img" height="50px" width="50px">
                  </a-image>
                </template>
              </a-table-column>
              <a-table-column
                title="专辑名"
                data-index="album_name"
              ></a-table-column>
              <a-table-column
                title="专辑ID"
                data-index="album_id"
              ></a-table-column>
              <a-table-column
                title="藏品ID"
                data-index="nft_id"
              ></a-table-column>
              <a-table-column
                title="寄售价"
                data-index="price"
              ></a-table-column>
              <a-table-column
                title="创建时间"
                data-index="created_at"
              ></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchUserDetail, UserDetailInfo } from '@/api/user';
  import useLoading from '@/hooks/loading';

  const userId = ref();
  const { setLoading } = useLoading(true);
  const tableData = reactive<UserDetailInfo>({
    holder_nft_list: [],
    nft_transaction_logs: [],
    user_detail: {},
    wallet_transaction_logs: [],
  });
  const data = ref();

  // 查询用户列表
  const queryUserListData = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetchUserDetail(id);
      tableData.holder_nft_list = res.data.holder_nft_list;
      tableData.wallet_transaction_logs = res.data.wallet_transaction_logs;
      tableData.nft_transaction_logs = res.data.nft_transaction_logs;
      tableData.user_detail = res.data.user_detail;
      data.value = [
        {
          label: '昵称',
          value: tableData.user_detail.nickname ?? '-',
        },
        {
          label: '账户余额',
          value: tableData.user_detail.account_balance ?? 0,
        },

        {
          label: '可用余额',
          value: tableData.user_detail.available_balance ?? 0,
        },
        {
          label: '身份证',
          value: tableData.user_detail.id_code ?? '-',
        },
        {
          label: '手机号',
          value: tableData.user_detail.phone ?? '-',
        },
        {
          label: '冻结余额',
          value: tableData.user_detail.frozen_balance ?? 0,
        },
      ];
    } finally {
      setLoading(false);
    }
  };

  onMounted(async () => {
    userId.value = useRoute().query.id;
    await queryUserListData(userId.value);
    // await queryUserListData(1);
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
</style>

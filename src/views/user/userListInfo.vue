<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        用户详情
      </a-typography-title>
      <a-divider />
      <a-typography-title :heading="6">
        头像
      </a-typography-title>
      <a-row>
        <a-col :span="4" style="width: 200px">
          <a-image width="110px" height="110px"></a-image>
        </a-col>
        <a-col :span="16"  style="width: 200px">
          <a-descriptions :data="data" title="" bordered style="margin-top: 20px"/>
        </a-col>
      </a-row>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
<!--        NFF交易-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            NFT交易
          </a-typography-title>
          <a-table :data="data" style="margin-top: 20px">
            <template #columns>
              <a-table-column title="发送方" data-index="title"></a-table-column>
              <a-table-column title="NFT" data-index="picture">
                <template #cell="{ record }">
                  <a-image :src="record.uiPicture" height="50px" width="50px" >
                  </a-image>
                </template>
              </a-table-column>
              <a-table-column title="NFT名字" data-index="content"></a-table-column>
              <a-table-column title="接收方" data-index="publishTimer"></a-table-column>
              <a-table-column title="交易金额" data-index="title"></a-table-column>
              <a-table-column title="交易时间" data-index="content"></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
<!--        钱包交易记录-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            钱包交易记录
          </a-typography-title>
          <a-table :data="data" style="margin-top: 20px">
            <template #columns>
              <a-table-column title="类型" data-index="title"></a-table-column>
              <a-table-column title="金额" data-index="content"></a-table-column>
              <a-table-column title="交易方式" data-index="publishTimer"></a-table-column>
              <a-table-column title="信息源" data-index="title"></a-table-column>
              <a-table-column title="交易时间" data-index="content"></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
<!--        持有NFT-->
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <a-typography-title :heading="6">
            持有NFT
          </a-typography-title>
          <a-table :data="data" style="margin-top: 20px">
            <template #columns>
              <a-table-column title="NFT图" data-index="title">
                <template #cell="{ record }">
                  <a-image :src="record.uiPicture" height="50px" width="50px" >
                  </a-image>
                </template>
              </a-table-column>
              <a-table-column title="NFT名字" data-index="content"></a-table-column>
              <a-table-column title="所属专辑" data-index="publishTimer"></a-table-column>
              <a-table-column title="寄售价" data-index="title"></a-table-column>
              <a-table-column title="交易时间" data-index="content"></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
const data = [{
  label: '昵称',
  value: 'Socrates',
}, {
  label: '账户余额',
  value: '123-1234-1234',
}, {
  label: '身份证',
  value: 'Beijing'
}, {
  label: '可用余额',
  value: 'Beijing',
}, {
  label: '创建时间',
  value: 'Yingdu Building, Zhichun Road, Beijing'
},{
  label: '冻结余额',
  value: 'Yingdu Building, Zhichun Road, Beijing'
}];
</script>

<style scoped>
.container{
  padding: 16px 20px;
}

</style>

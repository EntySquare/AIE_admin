<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        NFT列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="5">
            <a-form-item field="value1" label="专辑筛选" label-col-flex="100px">
              <a-input v-model="form.value1" placeholder="选择需要查询的专辑NFT" style="width: 200px"/>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="value2" label="发布者" label-col-flex="80px">
              <a-input v-model="form.value2" placeholder="选择NFT的发布者" />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="value4" label="持有者" label-col-flex="100px">
              <a-input v-model="form.value4" placeholder="选择专辑持有者" />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="value5" label="模糊查询" label-col-flex="80px">
              <a-input v-model="form.value5" placeholder="nft编号,名字" />
            </a-form-item>
          </a-col>
          <a-col :span="4" >
              <a-button type="primary" style="margin-right: 10px">
                <icon-search :size="20"  />
                查询
              </a-button>
              <a-button>
                <icon-loop :size="20" />
                重置
              </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="NFT图片" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="所属专辑名" data-index="title"></a-table-column>
          <a-table-column title="持有者" data-index="content"></a-table-column>
          <a-table-column title="首发价" data-index="publishTimer"></a-table-column>
          <a-table-column title="最近成交价" data-index="title"></a-table-column>
          <a-table-column title="当前寄售价" data-index="content"></a-table-column>
          <a-table-column title="NFT创建时间" data-index="publishTimer"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">详细</a-button>
              <a-button @click="$modal.info({ title:'Name', content:record.name })">修改首发价</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
<!--    详情弹窗-->
    <a-modal width="auto" v-model:visible="openInfo" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        NFT详情
      </template>
      <a-row>
        <a-col :span="8" style="width: 200px">
          <a-image width="152px" height="134px"></a-image>
        </a-col>
        <a-col :span="8"  style="width: 200px" class="col-div">
          <div>NFT名字: 小天才</div>
          <div>所属专辑: 小天才</div>
          <div>持有者: 111111</div>
          <div>首发价格: 1111</div>
          <div>最近成交价:222</div>
        </a-col>
        <a-col :span="8"  style="width: 200px" class="col-div">
          <div>NFT创建时间: 2022</div>
          <div>作者: 小天才</div>
          <div>专辑发布者: 111111</div>
          <div>作者简介: 1111</div>
        </a-col>
      </a-row>
      <a-divider />
      <a-table :data="data" :style="{marginTop: '20px',width: '883px'}" >
        <template #columns>
          <a-table-column title="发售方" data-index="picture"></a-table-column>
          <a-table-column title="NFT" data-index="title">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="NFT名字" data-index="content"></a-table-column>
          <a-table-column title="接收方" data-index="publishTimer"></a-table-column>
          <a-table-column title="交易金额" data-index="title"></a-table-column>
          <a-table-column title="交易时间" data-index="content"></a-table-column>
        </template>
      </a-table>
    </a-modal>
<!--    修改价格弹窗-->
    <a-modal width="auto" v-model:visible="editPrice" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        修改首发价格
      </template>
      <a-space>
        <div>首发价格</div>
        <a-input :style="{width:'320px'}" placeholder="输入首发价格" allow-clear />
      </a-space>
      <div style="margin-top: 20px">1.专辑出售前,可操作修改首发价.</div>
    </a-modal>
  </div>

</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})
const openInfo = ref<boolean>(false);
const editPrice = ref<boolean>(false);
</script>

<style scoped>
.container{
  padding: 16px 20px;
}
.col-div div{
  margin-top: 5px;
}

</style>

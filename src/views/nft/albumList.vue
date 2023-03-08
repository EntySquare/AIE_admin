<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6">
        专辑列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="5">
            <a-form-item field="value5" label="模糊查询" label-col-flex="80px">
              <a-input v-model="form.value5" placeholder="nft编号,名字" />
            </a-form-item>
          </a-col>
          <a-col :span="4" >
            <a-space  :size="18" style="margin-left: 100px">
              <a-button type="primary" @click="getStoreList">
                查询
              </a-button>
              <a-button @click="reset"> 重置 </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="专辑图" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="专辑名" data-index="title"></a-table-column>
          <a-table-column title="发布者" data-index="content"></a-table-column>
          <a-table-column title="作品数量/持有人数" data-index="publishTimer"></a-table-column>
          <a-table-column title="已发布/未发布" data-index="title"></a-table-column>
          <a-table-column title="当前状态" data-index="content"></a-table-column>
          <a-table-column title="专辑创建时间" data-index="publishTimer"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">立刻发售</a-button>
              <a-button @click="$modal.info({ title:'Name', content:record.name })">定时发售</a-button>
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">停售</a-button>
              <a-button @click="$modal.info({ title:'Name', content:record.name })">批量上传NFT</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <!--    立即发售弹窗-->
    <a-modal width="auto" v-model:visible="nowSell" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        立即发售
      </template>
      <div style="margin-top: 20px">1.立即发售后无法撤回,一旦发售,用户可立即购买NFT产品.</div>
      <div style="margin-top: 20px">2.停售只能停止未出售的NFT产品</div>
    </a-modal>
  </div>
  <!--    定时发售弹窗-->
  <a-modal width="auto" v-model:visible="waitSell" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      定时发售
    </template>
    <a-space>
      <div>定时发售</div>

    </a-space>
    <div style="margin-top: 20px">1.定时发售,将纳入预售模块,用户可提前查看到等待秒杀.</div>
    <div style="margin-top: 20px">1.时间发出不可修改.</div>
  </a-modal>
  <!--    停售弹窗-->
  <a-modal width="auto" v-model:visible="stopSell" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      停售
    </template>
    <div style="margin-top: 20px">1.停售将未出售的所有NFT产品.</div>
    <div style="margin-top: 20px">2.已出售的NFT产品将继续在市场流通.</div>
  </a-modal>
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
const nowSell = ref<boolean>(false);
const waitSell = ref<boolean>(false);
const stopSell = ref<boolean>(false);
</script>

<style scoped>
.container{
  padding: 16px 20px;
}
.col-div div{
  margin-top: 5px;
}

</style>

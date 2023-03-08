<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6">
        活动列表
      </a-typography-title>
      <a-button style="margin-top: 20px" type="primary">
        <template #icon>
          <icon-plus />
        </template>
        发布活动
      </a-button>
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="封面图" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="内容图" data-index="title"></a-table-column>
          <a-table-column title="发布时间" data-index="content"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
  <!--    发布活动弹窗-->
  <a-modal v-model:visible="actSell" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      活动发布
    </template>
    <div>封面图片
      <a-upload
        list-type="picture-card"
        action="/"
        :default-file-list="fileList"
        image-preview
        style="margin-top: 20px"
      />
    </div>
    <div style="margin-top: 20px">内容
      <a-upload
        list-type="picture-card"
        action="/"
        :default-file-list="fileList"
        image-preview
        style="margin-top: 20px"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const actSell = ref<boolean>(false);
</script>

<style scoped>
.container{
  padding: 16px 20px;
}
.card-div div{
  margin-top: 5px;
}
.row-div div{
  margin: 10px 0 20px 0;
}
</style>

<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6">
        信息发布记录
      </a-typography-title>
      <a-button style="margin-top: 20px" type="primary">
        <template #icon>
          <icon-plus />
        </template>
        发布信息
      </a-button>
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="标题" data-index="picture">
          </a-table-column>
          <a-table-column title="内容" data-index="title"></a-table-column>
          <a-table-column title="发布时间" data-index="content"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">空暂无</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
<!--  发布信息-->
  <a-modal width="auto" v-model:visible="newsSell" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      信息发布
    </template>
    <a-space>
      <div>标题</div>
      <a-input :style="{width:'320px'}" placeholder="发布的标题..." allow-clear />
    </a-space>
    <div>
      <div>内容</div>
      <a-textarea placeholder="Please enter something" allow-clear :auto-size="{minRows: 10}"/>
    </div>

  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";


const newsSell = ref<boolean>(true);
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


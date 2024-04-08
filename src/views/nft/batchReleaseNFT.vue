<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6">
        批量上传NFT
      </a-typography-title>
      <div>1.选择需要上传NFT的专辑[切换专辑]</div>
      <div>2.根据案例表格填写需发布的NFT数据[上传数据表格]</div>
      <div>3.上传数据表格</div>
      <div>4.检查没问题后可点击[确认并提交]</div>
      <a-button style="margin-top: 20px" type="primary">
        <template #icon>
          <icon-search />
        </template>
        下载案例表格
      </a-button>
      <a-card :style="{ width: '1426px'}" :header-style="{background: '#F2F3F5'}" title="NFT所属专辑">
        <template #extra>
          <a-button  type="primary">切换专辑</a-button>
        </template>
        <a-row class="row-div">
          <a-col :span="8">
            <div>专辑名字:小天才</div>
            <div>专辑ID: 12</div>
            <div>已上传NFT数量:300</div>
          </a-col>
          <a-col :span="8">
            <div>专辑(所属用户): 1222222222</div>
            <div>最近上传NFT时间: 2022</div>
          </a-col>
        </a-row>
      </a-card>
      <a-typography-title :heading="6">
        文件原数据
      </a-typography-title>
      <a-button style="margin-top: 20px" type="primary">
        <template #icon>
          <icon-search />
        </template>
        上传数据表格
      </a-button>
      <a-table style="margin-top: 20px">
        <template #columns>
          <a-table-column title="NFT图片" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="所属专辑名字" data-index="title"></a-table-column>
          <a-table-column title="所属专辑id" data-index="content"></a-table-column>
          <a-table-column title="NFT作者" data-index="publishTimer"></a-table-column>
          <a-table-column title="作者简介" data-index="title"></a-table-column>
          <a-table-column title="标签" data-index="content"></a-table-column>
          <a-table-column title="起售价" data-index="publishTimer"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">上传图片</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-row>
        <a-col :spam="8" :offset="20">
          <a-button style="width: 200px" type="primary">确认并提交</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

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

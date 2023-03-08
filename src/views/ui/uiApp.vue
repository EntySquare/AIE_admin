<template>
  <div class="container">
<!--    首页轮播图-->
    <a-card>
      <a-typography>
        <a-typography-title :heading="6">
          首页轮播图
        </a-typography-title>
      </a-typography>
      <a-button type="primary" style="margin-top: 10px" :loading="loading" @click="addHomePageChart">
        <template #icon>
          <icon-plus />
        </template>
        增加
      </a-button>
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="图片" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="标题" data-index="title"></a-table-column>
          <a-table-column title="内容" data-index="content"></a-table-column>
          <a-table-column title="发布日期" data-index="publishTimer"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">编辑</a-button>
              <a-button @click="$modal.info({ title:'Name', content:record.name })">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

<!--    市场页头轮播图-->
    <a-card style="margin-top: 20px">
      <a-typography>
        <a-typography-title :heading="6">
          市场页头轮播图
        </a-typography-title>
      </a-typography>
      <a-button type="primary" style="margin-top: 10px" :loading="loading" @click="addMarketChart">
        <template #icon>
          <icon-plus />
        </template>
        增加
      </a-button>
      <a-table :data="data" style="margin-top: 20px">
        <template #columns>
          <a-table-column title="图片">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px" >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="发布日期"
            data-index="publishTimer"
          ></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="$modal.info({ title:'Name', content:record.name })">编辑</a-button>
              <a-button @click="$modal.info({ title:'Name', content:record.name })">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
  <!--  增加首页轮播图弹窗-->
  <a-modal v-model:visible="visible" title="新增首页轮播图">
    <a-form :model="form">
      <a-form-item field="name" label="图片">
          <a-upload action="/" :default-file-list="fileList" />
      </a-form-item>
      <a-form-item field="post" label="标题">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="post" label="内容">
        <a-input v-model="form.content" />
      </a-form-item>
    </a-form>
  </a-modal>
  <!--  增加市场页头轮播图弹窗-->
  <a-modal v-model:visible="visibleTwo" title="新增市场页头轮播图">
    <a-form :model="form">
      <a-form-item field="name" label="图片">
        <a-upload action="/" :default-file-list="fileList" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import useLoading from '@/hooks/loading';
import { tableListData, uiData } from "@/api/ui";

// const { loading, setLoading } = useLoading(true);
// const tableListData = ref({} as tableListData);
const  data = [{
  uiPicture:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2Febcef4f8-ef7e-49e2-80c4-0a2897e6c3c4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680686871&t=191f79a7c818a5d55ed840ab0e87528a',
  title: '周杰伦',
  publishTimer: '2022',
  content: '周杰伦演唱会'
}];

const visible = ref<boolean>(false);
const visibleTwo = ref<boolean>(false);
const addHomePageChart = () => {
  visible.value = true;
};
const addMarketChart = () => {
  visibleTwo.value = true;
};


const form = reactive({
  name: '',
  picture: '',
  content: '',
});



</script>

<style scoped>
.container{
  padding: 16px 20px;
}
</style>

<template>
  <div class="container">
    <!--    首页轮播图-->
    <a-card>
      <a-typography>
        <a-typography-title :heading="6"> 首页轮播图</a-typography-title>
      </a-typography>
      <a-button
        type="primary"
        style="margin-top: 10px"
        :loading="loading"
        @click="showModal(-1)"
      >
        <template #icon>
          <icon-plus />
        </template>
        新增
      </a-button>
      <a-table
        :data="tableData1"
        style="margin-top: 20px"
        :pagination="false"
        row-selection=""
      >
        <template #columns>
          <a-table-column title="图片">
            <template #cell="{ record }">
              <a-image :src="record.url" height="80px" width="120px" />
            </template>
          </a-table-column>
          <a-table-column title="标题" data-index="title"></a-table-column>
          <a-table-column title="内容" data-index="content"></a-table-column>
          <a-table-column title="内容图片">
            <template #cell="{ record }">
              <a-image
                :src="record.content_img_url"
                height="80px"
                width="120px"
              >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ rowIndex }">
              <a-button style="margin-right: 10px" @click="showModal(rowIndex)"
                >编辑
              </a-button>
              <a-popconfirm content="确定删除吗?" @ok="handleDelete(rowIndex)">
                <a-button>删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <!--    市场页头轮播图-->
    <a-card style="margin-top: 20px">
      <a-typography>
        <a-typography-title :heading="6"> 市场页头轮播图</a-typography-title>
      </a-typography>
      <a-button
        type="primary"
        style="margin-top: 10px"
        :loading="loading"
        @click="showMarketModal(-1)"
      >
        <template #icon>
          <icon-plus />
        </template>
        新增
      </a-button>
      <a-table :data="tableData2" style="margin-top: 20px" :pagination="false">
        <template #columns>
          <a-table-column title="图片">
            <template #cell="{ record }">
              <a-image :src="record.url" height="80px" width="120px"></a-image>
            </template>
          </a-table-column>
          <a-table-column title="标题" data-index="title"></a-table-column>
          <a-table-column title="内容" data-index="content"></a-table-column>
          <a-table-column title="内容图片">
            <template #cell="{ record }">
              <a-image
                :src="record.content_img_url"
                height="80px"
                width="120px"
              >
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ rowIndex }">
              <a-button
                style="margin-right: 10px"
                @click="showMarketModal(rowIndex)"
                >编辑
              </a-button>
              <a-popconfirm content="确定删除吗?" @ok="handleDelete2(rowIndex)">
                <a-button>删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <!--  增加首页轮播图弹窗-->
    <a-modal v-model:visible="visible" title="新增首页轮播图" @ok="handleOk">
      <a-form :model="carousel">
        <a-form-item label="图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="内容图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadContentImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-model="carousel.title" />
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model="carousel.content" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!--  增加市场页头轮播图弹窗-->
    <a-modal
      v-model:visible="visibleTwo"
      title="市场页头轮播图"
      @ok="handleOk2"
    >
      <a-form :model="carousel">
        <a-form-item label="图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="内容图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadContentImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-model="carousel.title" />
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model="carousel.content" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="upvisible"
      title="修改首页轮播图"
      @ok="handleOkUpdate"
    >
      <a-form :model="carousel">
        <a-form-item label="图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="内容图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadContentImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-model="carousel.title" />
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model="carousel.content" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!--  修改市场页头轮播图弹窗-->
    <a-modal
      v-model:visible="upvisibleTwo"
      title="修改市场页头轮播图"
      @ok="handleOkUpdate2"
    >
      <a-form :model="carousel">
        <a-form-item label="图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="内容图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadContentImg"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-model="carousel.title" />
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model="carousel.content" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Carousel, fetchCarouselList, updateCarouselList } from '@/api/ui';
  import { arcoUpload } from '@/api/upload';
  import { Message, RequestOption } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading();
  const tableData1 = ref<Carousel[]>([]);
  const tableData2 = ref<Carousel[]>([]);

  const visible = ref<boolean>(false);
  const upvisible = ref<boolean>(false);
  const visibleTwo = ref<boolean>(false);
  const upvisibleTwo = ref<boolean>(false);
  const imgPath = ref<string>('');
  const imgContentPath = ref<string>('');
  const updateIndex = ref<number>(0);
  // 添加首页轮播图
  const showModal = (index: number) => {
    if (index === -1) {
      visible.value = true;
    } else {
      upvisible.value = true;
      updateIndex.value = index;
    }
  };
  const showMarketModal = (index: number) => {
    if (index === -1) {
      visibleTwo.value = true;
    } else {
      upvisibleTwo.value = true;
      updateIndex.value = index;
    }
  };

  const carousel = reactive({
    title: '',
    url: '',
    content: '',
    content_img_url: '',
  });

  const handleOk = async () => {
    visible.value = false;
    tableData1.value.push({
      content: carousel.content,
      content_img_url: imgContentPath.value,
      title: carousel.title,
      url: imgPath.value,
    });

    const res = await updateCarouselList(tableData1.value, 'home_house_head');
    if (res.data === 'success') {
      Message.success('操作成功');
    }
  };

  const handleOkUpdate = async () => {
    visible.value = false;
    tableData1.value.splice(updateIndex.value, 1, {
      content: carousel.content,
      content_img_url: imgContentPath.value,
      title: carousel.title,
      url: imgPath.value,
    });
    const res = await updateCarouselList(tableData1.value, 'home_house_head');
    if (res.data === 'success') {
      Message.success('操作成功');
    }
  };

  const handleOk2 = async () => {
    visible.value = false;
    tableData2.value.push({
      content: carousel.content,
      content_img_url: imgContentPath.value,
      title: carousel.title,
      url: imgPath.value,
    });
    const res = await updateCarouselList(tableData2.value, 'market_house_head');
    if (res.data === 'success') {
      Message.success('操作成功');
    }
  };

  const handleOkUpdate2 = async () => {
    visible.value = false;
    tableData2.value.splice(updateIndex.value, 1, {
      content: carousel.content,
      content_img_url: imgContentPath.value,
      title: carousel.title,
      url: imgPath.value,
    });
    const res = await updateCarouselList(tableData2.value, 'market_house_head');
    if (res.data === 'success') {
      Message.success('操作成功');
    }
  };

  const handleDelete = async (index: number) => {
    tableData1.value.splice(index, 1);
    const res = await updateCarouselList(tableData1.value, 'home_house_head');
    if (res.data === 'success') {
      Message.success('删除成功');
    }
  };

  const handleDelete2 = async (index: number) => {
    tableData2.value.splice(index, 1);
    const res = await updateCarouselList(tableData2.value, 'market_house_head');
    if (res.data === 'success') {
      Message.success('删除成功');
    }
  };

  // 查询专辑列表
  const queryCarouselData = async (place: string) => {
    setLoading(true);
    try {
      const res = await fetchCarouselList(place);
      window.console.log(res);
      if (place === 'home_house_head') {
        tableData1.value = res.data.carousel_list;
      } else if (place === 'market_house_head') {
        tableData2.value = res.data.carousel_list;
      }
    } finally {
      setLoading(false);
    }
  };

  // 上传图片
  async function uploadImg(option: RequestOption) {
    imgPath.value = await arcoUpload(option);
  }

  // 上传内容图片
  async function uploadContentImg(option: RequestOption) {
    imgContentPath.value = await arcoUpload(option);
  }

  onMounted(() => {
    // hone_house_head=首页头部轮播图数据 market_house_head=市场页面头部轮播图数据
    queryCarouselData('home_house_head');
    queryCarouselData('market_house_head');
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
</style>

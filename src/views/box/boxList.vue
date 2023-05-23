<template>
  <div class="container">
    <a-card class="card-div">
      <a-typography-title :heading="6"> 盲盒列表</a-typography-title>
      <a-button style="margin-top: 20px" type="primary" @click="showModal">
        <template #icon>
          <icon-plus />
        </template>
        创建盲盒
      </a-button>
      <a-table style="margin-top: 20px">
        <template #columns>
          <a-table-column title="封面图" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.uiPicture" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column title="内容图" data-index="title"></a-table-column>
          <a-table-column
            title="发布时间"
            data-index="content"
          ></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button
                style="margin-right: 10px"
                @click="$modal.info({ title: 'Name', content: record.name })"
                >删除
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-modal
        v-model:visible="visible"
        title="创建盲盒"
        width="40vw"
        @ok="handleModalOk"
      >
        <a-form :model="form">
          <a-form-item label="每日试玩次数">
            <a-input-number v-model="form.dailyLimit" mode="button" />
          </a-form-item>
          <a-form-item label="是否隐藏">
            <a-switch
              v-model="form.hide"
              :checked-value="true"
              :unchecked-value="false"
            />
          </a-form-item>
          <a-form-item label="说明图片">
            <a-upload
              draggable
              image-preview
              :custom-request="uploadImg"
              :limit="1"
            />
          </a-form-item>
          <a-form-item label="说明文字">
            <a-textarea
              v-model="form.illText"
              placeholder="请输入说明"
              allow-clear
            />
          </a-form-item>
          <a-form-item label="盲盒名称">
            <a-input v-model="form.name" />
          </a-form-item>
          <a-form-item
            v-for="(out, index) of form.outData"
            :key="index"
            :label="`开奖数据-${index + 1}`"
          >
            <a-row justify="space-between">
              <a-input-group>
                <selectData
                  v-model:id="form.outData[index].id"
                  v-model:typeId="form.outData[index].id_types"
                  width="12vw"
                />
                <a-input :style="{ width: '5vw' }" placeholder="权重" />
                <a-input :style="{ width: '5vw' }" placeholder="出货数量" />
                <a-select
                  v-model="out.rarity"
                  :style="{ width: '5vw' }"
                  placeholder="稀有度"
                  @change="testClick"
                >
                  <a-option
                    v-for="item of rarityData"
                    :key="item"
                    :value="item.rarity"
                    :label="item.label"
                  />
                </a-select>
              </a-input-group>
              <a-button
                :style="{ marginLeft: '10px' }"
                @click="handleDelete(index)"
                ><template #icon> <icon-minus /> </template
              ></a-button>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-button @click="handleAdd"
              ><template #icon> <icon-plus /> </template
            ></a-button>
          </a-form-item>
          <a-form-item label="价格（分）">
            <a-input-number v-model="form.price" placeholder="请输入价格" />
          </a-form-item>
          <a-form-item label="排序">
            <a-input-number v-model="form.sort" placeholder="排序" />
          </a-form-item>
          <a-form-item label="是否有效">
            <a-switch
              v-model="form.valid"
              :checked-value="true"
              :unchecked-value="false"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
  <!--    发布活动弹窗-->
  <a-modal v-model:visible="actSell">
    <template #title> 活动发布</template>
    <div
      >封面图片
      <a-upload
        list-type="picture-card"
        action="/"
        image-preview
        style="margin-top: 20px"
      />
    </div>
    <div style="margin-top: 20px"
      >内容
      <a-upload
        list-type="picture-card"
        action="/"
        image-preview
        style="margin-top: 20px"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { arcoUpload } from '@/api/upload';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import selectData from '@/views/common/selectData.vue';
  import { createBox, Box } from '@/api/box';

  const actSell = ref<boolean>(false);
  const visible = ref<boolean>(false);
  const imgPath = ref<string>('');
  // const typeValue = ref();
  // const rarityValue = ref();

  const showModal = () => {
    visible.value = true;
  };

  const rarityData = [
    {
      rarity: 0,
      label: '普通',
    },
    {
      rarity: 1,
      label: '稀有',
    },
    {
      rarity: 2,
      label: '史诗',
    },
    {
      rarity: 3,
      label: '传说',
    },
    {
      rarity: 4,
      label: '神话',
    },
    {
      rarity: 5,
      label: '不朽',
    },
  ];
  const form = reactive({
    dailyLimit: 0,
    hide: false,
    illImg: '',
    illText: '',
    name: '',
    outData: [
      { draw_probability: 0, id: 0, id_types: 1, out_num: 0, rarity: 0 },
    ],
    price: 0,
    sort: null,
    valid: false,
  });
  const handleAdd = () => {
    form.outData.push({
      draw_probability: 0,
      id: 0,
      id_types: 1,
      out_num: 0,
      rarity: 0,
    });
  };

  const handleDelete = (index: number) => {
    if (form.outData.length > 1) {
      form.outData.splice(index, 1);
    }
  };

  const handleModalOk = async () => {
    const boxData: Box = {
      daily_pay_limit: form.dailyLimit,
      hide: form.hide,
      illustrate_img: imgPath.value,
      illustrate_text: form.illText,
      name: form.name,
      out_data: form.outData,
      price: form.price ?? 0,
      sort: form.sort ?? 0,
      valid: form.valid,
    };
    const res = await createBox(boxData);
    if (res.data === 'success') {
      Message.success('创建成功');
    }
  };

  function testClick() {
    // window.console.log(typeValue.value);
    window.console.log(form.outData);
  }

  // 上传图片
  async function uploadImg(option: RequestOption) {
    imgPath.value = await arcoUpload(option);
  }
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }

  .card-div div {
    margin-top: 5px;
  }

  .row-div div {
    margin: 10px 0 20px 0;
  }
</style>

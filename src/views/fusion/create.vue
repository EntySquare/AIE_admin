<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6"
          >{{ isEdit ? '编辑' : '创建' }}融合</a-typography-title
        >
      </a-typography>
      <a-divider />
      <a-form :model="form" :auto-label-width="true">
        <a-form-item label="名称">
          <a-input v-model="form.name" />
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
            v-model="form.illustrate_text"
            placeholder="请输入说明"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          v-for="(inItem, i) of form.in_data"
          :key="i"
          :label="`融合数据-第${i + 1}种`"
        >
          <div></div>
          <a-input-group>
            <selectData
              v-model:id="inItem.id"
              v-model:typeId="inItem.id_types"
              width="12vw"
            />
            <a-input-number
              v-model="inItem.in_progress"
              :style="{ width: '5vw' }"
              placeholder="进度值"
            />
            <a-input-number
              v-model="inItem.num_compel"
              :style="{ width: '10vw' }"
              placeholder="强制要求数量"
            />
          </a-input-group>
          <a-button :style="{ marginLeft: '10px' }" @click="handleDeleteCell(i)"
            ><template #icon> <icon-minus /> </template
          ></a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="handleAddIn"
            ><template #icon> <icon-plus /> </template
          ></a-button>
        </a-form-item>
        <a-form-item
          v-for="(outItem, index) of form.out_data"
          :key="index"
          :label="`开奖数据-${index + 1}`"
        >
          <a-row justify="space-between">
            <a-input-group>
              <selectData
                v-model:id="outItem.id"
                v-model:typeId="outItem.id_types"
                width="12vw"
              />
              <a-input-number
              v-model="outItem.in_progress"
              :style="{ width: '7vw' }"
              placeholder="进度条充能数值"
            />
            <a-input-number
              v-model="outItem.num_compel"
              :style="{ width: '7vw' }"
              placeholder="强制要求数量"
            />

              <a-input-number
                v-model="outItem.draw_probability"
                :style="{ width: '5vw' }"
                placeholder="权重"
              />
              <a-input-number
                v-model="outItem.out_num"
                :style="{ width: '5vw' }"
                placeholder="出货数量"
              />
              <a-select
                v-model="outItem.rarity"
                :style="{ width: '5vw' }"
                placeholder="稀有度"
              >
                <a-option
                  v-for="item of rarityData"
                  :key="item.rarity"
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
          <a-button @click="handleAddOut"
            ><template #icon> <icon-plus /> </template
          ></a-button>
        </a-form-item>
        <a-form-item label="奖励图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg2"
            :limit="1"
          />
        </a-form-item>
        <a-form-item label="进度">
          <a-input-number v-model="form.progress" placeholder="请输入价格" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sort" placeholder="排序" />
        </a-form-item>
      </a-form>
      <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" long @click="handleCreate"
            >完成并上传</a-button
          >
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import selectData from '@/views/box/components/selectData.vue';
  import {
    createFusion,
    Fusion,
    fetchFusionDetail,
    updateFusion,
  } from '@/api/fusion';

  const fusionId = ref(0);
  const isEdit = ref(false);
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

  const form = reactive<Fusion>({
    hide: false,
    illustrate_img: '',
    illustrate_text: '',
    in_data: [{ id: 0, id_types: 0 }],
    name: '',
    out_data: [{ id: 0, id_types: 1 }],
    progress: 0,
    reward_img: '',
    sort: 0,
  });
  const handleAddIn = () => {
    form.in_data.push({
      id: 0,
      id_types: 1,
      in_progress: 0,
      num_compel: 0,
    });
  };

  const handleDeleteCell = (index: number) => {
    if (form.in_data.length > 1) {
      form.in_data.splice(index, 1);
    }
  };

  const handleAddOut = () => {
    form.out_data.push({
      draw_probability: 0, // 对应id的出奖概率 50=50% 权重
      id: 0,
      id_types: 1,
      out_num: 0, // 碎片出货数量
      rarity: 0, // 稀有度
      in_progress:0, // 单个 进度条充能数值
      num_compel: 0, // 强制要求数量 如果没要求传0 
    });
  };

  const handleDelete = (index: number) => {
    if (form.out_data.length > 1) {
      form.out_data.splice(index, 1);
    }
  };

  const handleCreate = async () => {
    const fusionData: Fusion = {
      hide: form.hide,
      illustrate_img: form.illustrate_img,
      illustrate_text: form.illustrate_text,
      in_data: form.in_data,
      name: form.name,
      out_data: form.out_data,
      reward_img: form.reward_img,
      sort: form.sort,
    };
    if (fusionId.value === 0) {
      const res = await createFusion(fusionData);
      if (res.data === 'success') {
        Message.success('创建成功');
      }
    } else {
      const res = await updateFusion(fusionId.value, fusionData);
      if (res.data === 'success') {
        Message.success('修改成功');
      }
    }
  };

  async function uploadImg(option: RequestOption) {
    form.illustrate_img = await arcoUpload(option);
  }

  async function uploadImg2(option: RequestOption) {
    form.reward_img = await arcoUpload(option);
  }

  const queryFusionDetail = async (id: number) => {
    const res = await fetchFusionDetail(id);
    // form.hide = res.data.hide;
    // form.illustrate_img = res.data.illustrate_img;
    // form.illustrate_text = res.data.illustrate_text;
    // form.in_data = res.data.in_data;
    // form.name = res.data.name;
    // form.out_data = res.data.out_data;
    // form.progress = res.data.progress;
    // form.reward_img = res.data.reward_img;
    // form.sort = res.data.sort;
    Object.assign(form, res.data);
  };

  onMounted(async () => {
    const value = useRoute().query.id;
    if (value !== undefined) {
      isEdit.value = true;
      fusionId.value = value;
      await queryFusionDetail(value);
    }

    // await queryUserListData(1);
  });
</script>

<style scoped></style>

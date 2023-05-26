<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6">创建融合</a-typography-title>
      </a-typography>
      <a-divider />
      <a-form :model="form">
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
          v-for="(cellItem, i) of form.in_data"
          :key="i"
          :label="`融合数据-第${i + 1}格`"
        >
          <a-row
            v-for="(inItem, j) of cellItem"
            :key="j"
            justify="space-between"
          >
            <div></div>
            <a-input-group>
              <selectData
                v-model:id="form.in_data[i][j].id"
                v-model:typeId="form.in_data[i][j].id_types"
                width="12vw"
              />
              <a-input
                v-model="inItem.in_progress"
                :style="{ width: '5vw' }"
                placeholder="进度值"
              />
              <a-input
                v-model="inItem.num_compel"
                :style="{ width: '5vw' }"
                placeholder="强制要求数量"
              />
            </a-input-group>
            <a-button
              :style="{ marginLeft: '10px' }"
              @click="handleDeleteCell(i)"
              ><template #icon> <icon-minus /> </template
            ></a-button>
            <a-button
              :style="{ marginLeft: '10px' }"
              @click="handleAddCellDetail(i)"
              ><template #icon> <icon-plus /> </template
            ></a-button>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button @click="handleAddCell"
            ><template #icon> <icon-plus /> </template
          ></a-button>
        </a-form-item>
        <a-form-item
          v-for="(out, index) of form.out_data"
          :key="index"
          :label="`开奖数据-${index + 1}`"
        >
          <a-row justify="space-between">
            <a-input-group>
              <selectData
                v-model:id="form.out_data[index].id"
                v-model:typeId="form.out_data[index].id_types"
                width="12vw"
              />
              <a-input :style="{ width: '5vw' }" placeholder="权重" />
              <a-input :style="{ width: '5vw' }" placeholder="出货数量" />
              <a-select
                v-model="out.rarity"
                :style="{ width: '5vw' }"
                placeholder="稀有度"
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
        <a-form-item label="奖励图片">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
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
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import selectData from '@/views/box/components/selectData.vue';
  import { Fusion } from '@/api/fusion';

  const imgPath = ref<string>('');
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
    in_data: [[{ id: 0, id_types: 1, in_progress: 0, num_compel: 0 }]],
    name: '',
    out_data: [
      { draw_probability: 0, id: 0, id_types: 1, out_num: 0, rarity: 0 },
    ],
    progress: 0,
    reward_img: '',
    sort: 0,
  });
  const handleAddCell = () => {
    form.in_data.push([
      {
        id: 0,
        id_types: 1,
        in_progress: 0,
        num_compel: 0,
      },
    ]);
  };

  const handleDeleteCell = (index: number) => {
    if (form.in_data.length > 1) {
      form.in_data.splice(index, 1);
    }
  };

  const handleAddCellDetail = (index: number) => {
    form.in_data[index].push({
      id: 0,
      id_types: 1,
      in_progress: 0,
      num_compel: 0,
    });
  };

  const handleAdd = () => {
    form.out_data.push({
      draw_probability: 0,
      id: 0,
      id_types: 1,
      out_num: 0,
      rarity: 0,
    });
  };

  const handleDelete = (index: number) => {
    if (form.out_data.length > 1) {
      form.out_data.splice(index, 1);
    }
  };

  async function uploadImg(option: RequestOption) {
    imgPath.value = await arcoUpload(option);
  }
</script>

<style scoped></style>

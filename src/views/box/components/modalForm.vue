<template>
  <a-modal
    :visible="visible"
    :title="title"
    width="40vw"
    @ok="handleModalOk"
    @update:visible="handleModalUpdate"
  >
    <a-form :model="form">
      <a-form-item label="每日试玩次数">
        <a-input-number v-model="form.daily_pay_limit" mode="button" />
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
      <a-form-item label="盲盒名称">
        <a-input v-model="form.name" />
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
          <a-button :style="{ marginLeft: '10px' }" @click="handleDelete(index)"
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
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Box, createBox, updateBox } from '@/api/box';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';
  import selectData from '@/views/box/components/selectData.vue';

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

  const form = reactive<Box>({
    daily_pay_limit: 0,
    hide: false,
    illustrate_img: '',
    illustrate_text: '',
    name: '',
    out_data: [
      { draw_probability: 0, id: 0, id_types: 1, out_num: 0, rarity: 0 },
    ],
    price: 0,
    sort: 0,
    valid: false,
  });
  const emit = defineEmits(['confirm', 'updateVisible', 'refresh']);
  const handleCreate = async () => {
    const boxData: Box = {
      daily_pay_limit: form.daily_pay_limit,
      hide: form.hide,
      illustrate_img: imgPath.value,
      illustrate_text: form.illustrate_text,
      name: form.name,
      out_data: form.out_data,
      price: form.price ?? 0,
      sort: form.sort ?? 0,
      valid: form.valid,
    };
    const res = await createBox(boxData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('创建成功');
    }
  };

  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rid: {
      type: Number,
    },
  });

  const handleUpdate = async () => {
    const boxData: Box = {
      id: props.rid,
      daily_pay_limit: form.daily_pay_limit,
      hide: form.hide,
      illustrate_img: imgPath.value,
      illustrate_text: form.illustrate_text,
      name: form.name,
      out_data: form.out_data,
      price: form.price ?? 0,
      sort: form.sort ?? 0,
      valid: form.valid,
    };
    const res = await updateBox(boxData);
    if (res.data === 'success') {
      emit('refresh');
      Message.success('修改成功');
    }
  };

  const handleModalOk = () => {
    // emit(父组件中的自定义方法,参数一,参数二,...)
    if (props.title === '创建') {
      handleCreate();
    } else if (props.title === '修改') {
      handleUpdate();
    }
  };
  const handleModalUpdate = () => {
    emit('updateVisible');
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

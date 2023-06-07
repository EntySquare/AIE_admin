<template>
  <div>
    <!--    类型-->
    <input
      v-model="idValue1"
      style="visibility: hidden; position: absolute; top: -9999px"
      type="text"
    />
    <!--    id-->
    <input
      v-model="typeIdValue1"
      style="visibility: hidden; position: absolute; top: -9999px"
      type="text"
    />
    <a-cascader
      v-model="selectName"
      :options="options"
      :field-names="{ value: 'label', label: 'label' }"
      :style="{ width: width }"
      placeholder="选择类型"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { toolSelectorApi } from '@/api/tool';

  export default defineComponent({
    props: {
      id: {
        type: Number,
        required: true,
      },
      typeId: {
        type: Number,
        required: true,
      },
      width: {
        type: String,
        required: true,
      },
    },
    emits: ['update:id', 'update:typeId'],
    setup(props) {
      // 其他逻辑和数据
      const idValue1 = ref(props.id);
      const typeIdValue1 = ref(props.typeId);
      const selectName = ref('');
      const options = ref([]);
      const selectOptions = (id: number, idType: number) => {
        console.log("selectOptions", id,idType)
        // const selectName = '';
        options.value.forEach((item: any) => {
          if (item.children) {
            item.children.forEach((item2: any) => {
              // console.log(
              //   item2.value,
              //   item2.value.id === id && item2.value.id_types === idType
              // );
              // console.log(item2.value.id, id, item2.value.id_types, idType);
              if (item2.value.id === id && item2.value.id_types === idType) {
                selectName.value = item2.label; // 名字匹配 则代表选中
              }
            });
          }
        });
        console.log(selectName);
      };

      const change = (name: string) => {
        options.value.forEach((item: any) => {
          if (item.children) {
            item.children.forEach((item2: any) => {
              // 数据类型匹配
              // console.log(item2.name)
              if (item2.label === name) {
                selectName.value = item2.label; // 名字匹配 则代表选中
                idValue1.value = item2.value.id;
                typeIdValue1.value = item2.value.id_types;
                // console.log(item2.label, item2.value.id, item2.value.id_types);
              }
            });
          }
        });
      };

      onMounted(async () => {
        console.log(props.id);
        // 在页面加载完成后执行的代码
        // 可以在这里发起 API 请求、执行其他异步操作或初始化数据
        const res = await toolSelectorApi();
        // this.options = res.data;
        // this.options= res.data
        // console.log(res.data);
        options.value = res.data.list;

        selectOptions(idValue1.value, typeIdValue1.value);
        console.log('页面加载完成');
        // 执行其他操作...
      });
      // 返回组件选项

      return {
        idValue1,
        typeIdValue1,
        options,
        selectName,
        selectOptions,
        change,
      };
    },
    watch: {
      idValue1(newValue) {
        this.$emit('update:id', newValue);
      },
      typeIdValue1(newValue) {
        this.$emit('update:typeId', newValue);
      },
      id(newValue,oldVal) {
        console.log('id===', newValue,oldVal);
        this.idValue1 = newValue;
      },
      typeId(newValue) {
        this.typeIdValue1 = newValue;
        this.selectOptions(newValue, this.typeIdValue1 );
      },
      options(newValue) {
        this.options = newValue;
      },
    },
  });
</script>

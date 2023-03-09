<template>
  <div style="padding: 20px">
    <a-card>
      <a-typography-title :heading="6">
        提现记录列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="value1" label="充值类型" label-col-flex="100px">
              <a-space direction="vertical" size="large">
                <a-select v-model="value"  :style="{width:'320px'}" placeholder="申请中,完成,拒绝">
                  <a-option v-for="item of choice" :value="item" :label="item.label" :key="item"></a-option>
                </a-select>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-input v-model="form.value2" placeholder="手机号,昵称" />
          </a-col>
          <a-col :span="8" >
            <a-button type="primary" style="margin-right: 10px">
              <icon-search :size="20"  />
              查询
            </a-button>
            <a-button>
              <icon-loop :size="20" />
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table :data="data" style="margin-top: 10px">
        <template #columns>
          <a-table-column title="提现用户" data-index="key"></a-table-column>
          <a-table-column title="提现金额" data-index=""></a-table-column>
          <a-table-column title="银行卡" data-index="name"></a-table-column>
          <a-table-column title="开户银行" data-index="surplus"></a-table-column>
          <a-table-column title="状态" data-index="name"></a-table-column>
          <a-table-column title="姓名" data-index="surplus"></a-table-column>
          <a-table-column title="源数据" data-index="name"></a-table-column>
          <a-table-column title="申请时间" data-index="surplus"></a-table-column>
          <a-table-column title="数据修改时间" data-index="surplus"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-popconfirm :content="'确定通过' + record.user" type="success" @ok="passOk" @cancel="passCancel">
                <a-button type="primary" @click="passClick" style="margin-right: 10px">通过</a-button>
              </a-popconfirm>
              <a-popconfirm :content="'确定拒绝' + record.user" type="error" @ok="refuseOk" @cancel="refuseCancel" >
                <a-button @click="refuseClick">拒绝</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref } from "vue";

    const pass = ref(false);
    const refuse = ref(false);
    const passClick = () => {
      pass.value = true;
    };
    const passOk = () => {
      pass.value = false;
    };
    const passCancel = () => {
      pass.value = false;
    };
    const refuseClick = () => {
      refuse.value = true;
    };
    const refuseOk = () => {
      refuse.value = false;
    };
    const refuseCancel = () => {
      refuse.value = false;
    };
    const choice = [
      {
        value: "申请中",
        label: "申请中",
        other: "extra"
      },
      {
        value: "完成",
        label: "完成",
        other: "extra"
      },
      {
        value: "拒绝",
        label: "拒绝",
        other: "extra"
      }
    ];
    const data = [
      {
        key: "1",
        user: "Jane Doe",
        first: "Jane",
        last: "Doe",
        money: 23000,
        cardNo: "32 Park Road, London",
        bank: "jane.doe@example.com"
      },
      {
        key: "2",
        user: "Alisa Ross",
        first: "Alisa",
        last: "Ross",
        money: 25000,
        cardNo: "35 Park Road, London",
        bank: "alisa.ross@example.com"
      },
      {
        key: "3",
        user: "Kevin Sandra",
        first: "Kevin",
        last: "Sandra",
        money: 22000,
        cardNo: "31 Park Road, London",
        bank: "kevin.sandra@example.com"
      },
      {
        key: "4",
        user: "Ed Hellen",
        first: "Ed",
        last: "Hellen",
        money: 17000,
        cardNo: "42 Park Road, London",
        bank: "ed.hellen@example.com"
      },
      {
        key: "5",
        user: "William Smith",
        first: "William",
        last: "Smith",
        money: 27000,
        cardNo: "62 Park Road, London",
        bank: "william.smith@example.com"
      }
    ];

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})
</script>

<style scoped>

</style>

<template>
  <div style="padding: 20px">
    <div class="whole">
      <div class="title">充值记录</div>
      <a-divider />
      <div class="arrange">
        <div class="nearLeft">
          <text style="margin-right: 30px">充值类型</text>
          <a-space direction="vertical" size="large">
            <a-select v-model="value"  :style="{width:'320px'}" placeholder="微信,银行卡">
              <a-option v-for="item of choice" :value="item" :label="item.label" :key="item"></a-option>
            </a-select>
          </a-space>
        </div>

        <div class="nearRight">
          <a-input style="width: 350px;" placeholder="手机号,昵称"></a-input>
          <a-button class="search" type="primary">
            <icon-search :size="20" style="margin-right: 8px" />
            搜索
          </a-button>
          <a-button class="resetting">
            <icon-loop :size="20" style="margin-right: 8px" />
            重置
          </a-button>
        </div>
      </div>
      <a-table :columns="columns" :data="data" :scroll="scroll" :scrollbar="scrollbar">
      </a-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "RechargeNote",
  setup() {
    const show = ref(true);
    const value = ref();
    const scrollbar = ref(true);
    const scroll = {
      x: 1200,
      y: 500
    };
    const choice = [{
      value: '微信',
      label: '微信',
      other: 'extra'
    }, {
      value: '银行卡',
      label: '银行卡',
      other: 'extra'
    }]

    const columns = [{
      title: "充值用户",
      dataIndex: "name"
    }, {
      title: "充值金额",
      dataIndex: "money"
    }, {
      title: "充值类型",
      dataIndex: "type"
    }, {
      title: "原数据",
      dataIndex: "original"
    }, {
      title: "状态",
      dataIndex: "status"
    }, {
      title: "充值时间",
      dataIndex: "status"
    }];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      money: 23000,
      type: '32 Park Road, London',
      original: 'jane.doe@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '2',
      name: 'Alisa Ross',
      money: 25000,
      type: '35 Park Road, London',
      original: 'alisa.ross@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '3',
      name: 'Kevin Sandra',
      money: 22000,
      type: '31 Park Road, London',
      original: 'kevin.sandra@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '4',
      name: 'Ed Hellen',
      money: 17000,
      type: '42 Park Road, London',
      original: 'ed.hellen@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '5',
      name: 'William Smith',
      money: 27000,
      type: '62 Park Road, London',
      original: 'william.smith@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }]);

    return {
      columns,
      data,
      show,
      value,
      choice,
      scroll,
      scrollbar
    };
  }

};
</script>

<style scoped>

.whole {
  background: white;
  padding: 15px;

}

.title {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}


.arrange {
  display: flex;
  margin-bottom: 30px;
}

.nearLeft {
  display: flex;
  align-items: center;
}

.nearRight {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.search {
  margin-left: 40px;
  border-radius: 4px;
}

.resetting {
  margin-left: 40px;
  border-radius: 4px;

}

</style>

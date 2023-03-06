<template>
  <div style="padding: 20px">
    <div class="whole">
      <div class="title">提现记录列表</div>
      <a-divider />
      <div class="arrange">
        <div class="nearLeft">
          <text style="margin-right: 30px">充值类型</text>
          <a-space direction="vertical" size="large">
            <a-select
              v-model="value"
              :style="{ width: '240px' }"
              placeholder="申请中,完成,拒绝"
            >
              <a-option
                v-for="item of choice"
                :key="item"
                :value="item"
                :label="item.label"
              ></a-option>
            </a-select>
          </a-space>
        </div>
        <div class="nearRight">
          <a-input style="width: 350px" placeholder="手机号,昵称"></a-input>
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
        <template #operate="{ record }">
          <a-popconfirm :content="'确定通过' + record.user" type="success" @ok="passOk" @cancel="passCancel">
            <a-button class="pass" @click="passClick">通过</a-button>
          </a-popconfirm>
          <a-popconfirm :content="'确定拒绝' + record.user" type="error" @ok="refuseOk" @cancel="refuseCancel">
            <a-button class="refuse" @click="refuseClick">拒绝</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Modal } from "@arco-design/web-vue";

export default {
  name: "CashNote",
  setup() {
    const show = ref(true);
    const scrollbar = ref(true);
    const pass = ref(false);
    const refuse = ref(false);
    const scroll = {
      x: 1200,
      y: 500
    };
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

    const columns = [
      {
        title: "提现用户",
        dataIndex: "user"
      },
      {
        title: "提现金额",
        dataIndex: "money"
      },
      {
        title: "银行卡号",
        dataIndex: "cardNo"
      },
      {
        title: "开户银行",
        dataIndex: "bank"
      },
      {
        title: "状态",
        dataIndex: "state"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "源数据",
        dataIndex: "original"
      },
      {
        title: "申请时间",
        dataIndex: "applicationTime"
      },
      {
        title: "数据修改时间",
        dataIndex: "reviseTime"
      },
      {
        title: "操作",
        slotName: "operate",
        fixed: "right",
        width: 175
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

    return {
      show,
      columns,
      data,
      choice,
      scroll,
      scrollbar,
      pass,
      passClick,
      passOk,
      passCancel,
      refuse,
      refuseClick,
      refuseOk,
      refuseCancel
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

.pass {
  background: green;
  color: white;
}

.refuse {
  background: #f53f3f;
  color: white;
  margin-left: 20px;
}
</style>

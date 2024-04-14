<template>
  <div>

    <div>
      <a-card>
        <a-typography-title :heading="6"> 用户信息</a-typography-title>
        <a-divider />
        <a-form>
          <a-row :gutter="16">
            <a-col :span="14">
              <a-form-item
                field="productName"
                label="地址搜索:"
                :model="inputAddress"

              >
                <a-input
                  v-model="inputAddress.address"
                  placeholder="请输入查询的地址"
                  style="width: 300px"
                />
              </a-form-item>
            </a-col>
            <a-col :span="2" :offset="2">
              <a-space :size="18">
                <a-button type="primary" @click="getUserInfo">
                  <icon-search :size="20" />
                  查询
                </a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>

        <a-table :data="userInfo" style="margin-top: 20px;" :scroll="scrollPercent" :scrollbar="scrollbar">
          <template #columns>
            <a-table-column title="用户地址" data-index="user_address" width="150"></a-table-column>
            <a-table-column title="上级地址" data-index="superior_address" width="150"></a-table-column>
            <a-table-column title="业绩" data-index="achievement" width="100">
              <template #cell="{ record }">
                {{ formatBalance18(record.achievement, 2) }}
              </template>
            </a-table-column>
            <a-table-column title="消费金额U" data-index="my_amount"
                            width="100">
              <template #cell="{ record }">
                {{ formatBalance18(record.my_amount, 2) }}
              </template>
            </a-table-column>
            <a-table-column title="等级" data-index="level" width="120">
              <template #cell="{ record }">
                <a-space>
                  <a-tag v-if="record.level === 0" color="gray">普通用户</a-tag>
                  <a-tag v-if="record.level === 1" color="green">专员</a-tag>
                  <a-tag v-if="record.level === 2" color="blue">主管</a-tag>
                  <a-tag v-if="record.level === 3" color="orange">经理</a-tag>
                  <a-tag v-if="record.level === 4" color="black">总监</a-tag>
                  <a-tag v-if="record.level === 5" color="red">市场总监</a-tag>
                </a-space>
                <a-button type="primary" @click="updateLevelOpen(record)" size="small">修改级别</a-button>
              </template>
            </a-table-column>

            <a-table-column title="创始人" data-index="founder" width="100">
              <template #cell="{ record }">
                <a-space>
                  <a-tag v-if="record.founder === 1" color="green">创始人</a-tag>
                  <a-tag v-if="record.founder === 0" color="blue">否</a-tag>
                </a-space>
              </template>
            </a-table-column>
            <a-table-column title="权重" data-index="weight" width="100"></a-table-column>

            <a-table-column title="操作" width="120">
              <template #cell="{ record }">
                <a-button type="primary" @click="updateFoundOpen(record)">修改创始人</a-button>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>

    </div>
    <a-modal v-model:visible="updateFound" @ok="updateFoundSubmit" width="300px">
      <template #title>
        修改创始人
      </template>
      <div style="color: red">1000 = 1份</div>

      <div>
        <a-form :model.="updateFoundInfo">
          <a-form-item field="name" label="权重">
            <a-input-number v-model="updateFoundInfo.weight" />
          </a-form-item>
          <a-form-item field="name" label="设为创始人">
            <a-switch v-model="isFounder" @change="updateFounder" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal v-model:visible="updateLevel" @ok="updateLevelSubmit" width="300px">
      <template #title>
        修改用户级别
      </template>
<!--      <div style="color: red">1000 = 1份</div>-->

      <div>
        <a-form :model.="updateLevelInfo">
          <a-form-item field="name" label="修改级别">
            <a-select
              v-model="updateLevelInfo.level"
              :style="{ width: '320px' }"
              placeholder="请选择类型"
              :options="typeOptions"
            />
          </a-form-item>

        </a-form>
      </div>
    </a-modal>
    <!--    <a-model v-model:visible="updateFound"-->
    <!--             title="修改创始人"-->
    <!--             width="100px"-->

    <!--             @ok="updateFoundSubmit">-->

    <!--    </a-model>-->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { updateFoundApi, updateLevelApi, userInfoListApi } from "@/api/user";
import Web3 from "web3";
import { SelectOptionData } from '@arco-design/web-vue';


const userInfo = ref([] as any);
const scrollbar = ref(true);
const scroll = {
  x: 2000,
  y: 200
};
const scrollPercent = {
  x: "120%",
  y: "100%"
};
const inputAddress = reactive({
  address: ""
});
const getUserInfo = async () => {
  const res = await userInfoListApi(
    inputAddress.address
  );
  userInfo.value = res.json;
};

const updateFound = ref(false);

const updateFoundInfo = reactive({
  user_address: "",
  founder: 0,
  weight: 0
});

const updateFoundOpen = (item: any) => {
  console.log(item);
  updateFound.value = true;
  updateFoundInfo.user_address = item.user_address;
  updateFoundInfo.founder = item.founder;
  updateFoundInfo.weight = item.weight;
  console.log(updateFoundInfo);
};

const updateLevel = ref(false);

const updateLevelInfo = reactive({
  user_address: "",
  level: 0
});

const updateLevelOpen = (item: any) => {
  updateLevel.value = true;
  updateLevelInfo.user_address = item.user_address;
  updateLevelInfo.level = item.level;
};

// 使用条件语句将 number 类型转换为布尔类型
const isFounder = ref<boolean>(!!updateFoundInfo.founder);

// 开关状态改变时更新 founder 的值
const updateFounder = () => {
  updateFoundInfo.founder = isFounder.value ? 1 : 0; // 如果开关打开，founder 为 1；如果开关关闭，founder 为 0
};

const updateFoundSubmit = async () => {
  const res = await updateFoundApi({
    user_address: updateFoundInfo.user_address,
    found: updateFoundInfo.founder,
    weight: updateFoundInfo.weight
  });
  // if (res !== undefined) {
  updateFound.value = false;
  await getUserInfo();
  // } else {
  // }
  console.log(res);
};

const updateLevelSubmit = async () => {
  const res = await updateLevelApi({
    user_address: updateLevelInfo.user_address,
    level: updateLevelInfo.level,
  })
}

const formatBalance18 = (balance: string | number | null, decimal: string | number): number => {
  if (balance == null || balance.toString() == null) {
    return 0;
  }
  const parsedBalance = typeof balance === "string" ? balance : balance.toString();
  const etherValue = Web3.utils.fromWei(parsedBalance, "ether");
  const decimalNumber = typeof decimal === "string" ? parseInt(decimal, 10) : decimal as number;
  return parseFloat(etherValue).toFixed(decimalNumber);
};

const typeOptions = computed<SelectOptionData[]>(() => [
  {
    label: '普通用户', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 0,
  },
  {
    label: '专员', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 1,
  },
  {
    label: '主管', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 2,
  },
  {
    label: '经理', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 3,
  },
  {
    label: '总监', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 4,
  },
  {
    label: '总裁', // goods=平台商品 integral=积分藏品 hypermarket = 商城商品
    value: 5,
  },
]);


onMounted(() => {
  getUserInfo();
});

</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 280px;
  margin-left: 16px;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>

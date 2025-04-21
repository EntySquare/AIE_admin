<template>
  <div class="container">
    <!-- <a-table :dataSource="dataSource" :columns="columnss" /> -->
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 机器人列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="机器人id" label-col-flex="">
                <a-input
                  v-model.trim="form.id"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="字名" label-col-flex="">
                <a-input
                  v-model.trim="form.name"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="部落" label-col-flex="">
                <a-input
                  v-model.trim="form.tribeName"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-space>
                <a-button type="primary" @click="getlList">查询</a-button>
                <a-button type="primary" @click="resetForm">重置筛选</a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>
        <a-space>
          <a-button type="primary" @click="createRobot">创建机器人</a-button>
        </a-space>
        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table :data="List" style="margin-top: 20px"  :bordered="{cell:true}" :pagination="false">
              <template #columns>
                <a-table-column
                  title="机器人id"
                  data-index="id"
                  :width=90
                  :minWidth='100'
                ></a-table-column>
                <a-table-column
                  title="创建者钱包地址"
                  data-index="created_address"
                   :width=380
                ></a-table-column>
                <a-table-column title="头像" data-index="avatar" >
                  <template #cell="{ record }">
                    <img
                      style="width: 30px; height: 30px; border-radius: 50%"
                      :src="record.avatar"
                      alt=""
                    />
                  </template>
                </a-table-column>
                <a-table-column title="机器人名字" data-index="name"  minwidth=350>
                  <template #cell="{ record }">
                    <a-button type="text" @click="handleEdit1(record)">{{
                      record.name
                    }}</a-button></template
                  >
                </a-table-column>
                <!-- <a-table-column
                  title="所在部落"
                  data-index="tribe"
                  :width=250
                ></a-table-column>
                <a-table-column
                  title="受欢迎度"
                  data-index="likes"
                ></a-table-column>
                <a-table-column
                  title="使用人数"
                  data-index="use_count"
                ></a-table-column> -->

                <a-table-column
                  title="已绑定推特账号"
                  data-index="twitterAccount"
                   :width=150
                ></a-table-column>
                <!-- <a-table-column
                  title="聊天收益"
                  data-index="reward"
                ></a-table-column> -->
                <!-- <a-table-column title="状态" data-index="status"  :width=130>
                  <template #cell="{ record }">
                    {{
                      record.isRecommend === 1 ? '推荐到首页' : '取消推荐'
                    }}</template
                  ></a-table-column
                >
                <a-table-column title="抽奖状态" data-index="lottery_status"   :width=130>
                  <template #cell="{ record }">
                    {{
                      record.lottery_status === 0 ? '关闭' : '开启'
                    }}</template
                  ></a-table-column
                >
                <a-table-column
                  title="抽奖比例"
                  data-index="lottery_rate"
                ></a-table-column>
                <a-table-column title="隐身状态" data-index="lottery_status"  >
                  <template #cell="{ record }">
                    {{
                      record.isSearch === 0 ? '开启' : '关闭'
                    }}</template
                  ></a-table-column
                > -->
                <a-table-column
                  title="自动发推目的"
                  data-index="sendTarget"
                   :width=450
                >
                  <template #cell="{ record }">
                   {{ record.sendTarget.length > 150 ? record.sendTarget.substring(0, 150) + '...' : record.sendTarget }}
                    </template>
                </a-table-column>
                <a-table-column
                  title="关注广场采集回复目的"
                  data-index="attentionTarget"
                  :width=450
                >
                <template #cell="{ record }">
                   {{ record.attentionTarget.length > 150 ? record.attentionTarget.substring(0, 150) + '...' : record.attentionTarget }}
                    </template>
              </a-table-column>
                <a-table-column
                  title="每日关注广场采集回复目的"
                  data-index="dailyAttentionTarget"
                 :width=450
                >
                <template #cell="{ record }">
                   {{ record.dailyAttentionTarget.length > 150 ? record.dailyAttentionTarget.substring(0, 150) + '...' : record.dailyAttentionTarget }}
                    </template>
              </a-table-column>
                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <a-space>
                      <a-button type="primary" @click="openModal(record)"
                        >绑定推特账号</a-button
                      >
                      <a-button type="primary" @click="OperRobotModal(record)"
                        >修改信息</a-button
                      >
                      <!-- <a-button v-if="record.isRecommend === 0" type="primary" @click="Operation(1, record)"
                        >推荐到首页</a-button
                      >
                      <a-button v-if="record.isRecommend === 1" type="primary" @click="Operation(0, record)"
                        >取消推荐</a-button
                      >
                      <a-button v-if="record.lottery_status === 0" type="primary" @click="Operation1(1, record)"
                      >开启抽奖</a-button
                      >
                      <a-button v-if="record.lottery_status === 1"  type="primary" @click="Operation1(0, record)"
                      >关闭抽奖</a-button
                      >
                      <a-button v-if="record.isSearch === 1" type="primary" @click="SearchOperation(0, record)"
                      >开启隐身</a-button
                      >
                      <a-button v-if="record.isSearch === 0"  type="primary" @click="SearchOperation(1, record)"
                      >关闭隐身</a-button
                      > -->
                      <a-button v-if="record.lottery_status === 1"  type="primary" @click="openModal1(record)"
                      >修改抽奖比例</a-button
                      >
                      <a-button type="primary" @click="targetModel(record)"
                      >修改目的</a-button
                      >
                    </a-space>
                  </template>
                </a-table-column>
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfos"
                :current="form.pageIndex + 1"
                :page-size="10"
                show-total
                @change="
                  (current) => {
                    handlePageChange(current);
                  }
                "
              ></a-pagination>
            </div>
          </a-grid-item>
        </a-grid>
        <a-modal
          :visible="visible"
          :mask-closable="false"
          @ok="handleEdit"
          @cancel="visible = false"
        >
          {{ text }}
        </a-modal>
        <a-modal
          :visible="visible2"
          :mask-closable="false"
          @ok="visible2 = false"
          @cancel="visible2 = false"
        >
          <p>记录时间</p>
          <a-divider />
          <p>内容</p>
        </a-modal>
        <a-modal
          :visible="visible1"
          :mask-closable="false"
          @ok="visible1 = false"
          @cancel="visible1 = false"
        >
          <p>头像： {{ nameList.avatar }}</p>
          <a-divider />
          <p>机器人名字： {{ nameList.name }}</p>
          <a-divider />
          <p v-if="nameList.sex === 1">机器人性别： 男</p>
          <p v-else-if="nameList.sex === 2">机器人性别： 女</p>
          <p v-else>机器人性别： 其它</p>
          <a-divider />
          <p>一句话介绍： {{ nameList.characterIntroduction }}</p>
          <a-divider />
          <p>标签： {{ nameList.tag }}</p>
          <a-divider />

          <p>机器人性格： {{ nameList.personalityTraits }}</p>
          <a-divider />
          <p>机器人配置： {{ nameList.configurationTips }}</p>
          <a-divider />

          <p
            ><a-button type="text" style="padding: 0" @click="FeedingRecord"
              >喂养记录： {{ nameList.feedCount }}
            </a-button></p
          >
        </a-modal>
      </a-card>
    </a-spin>
    <a-modal 
          :visible="robotModal"
          :mask-closable="false"
          @ok="okRobotModal"
          @cancel="robotModal = false"
          width="1000px"
    >
      <template #title> 信息修改   </template>
      <div>
        <a-form ref="formRef"  :model="updateRobotVlaue1"  >
          <a-form-item  label="介绍" validate-trigger="blur">
            <a-input v-model="updateRobotVlaue1.characterIntroduction" />
          </a-form-item>
          <a-form-item field="password0" label="标签" validate-trigger="blur">
            <a-textarea  v-model="updateRobotVlaue1.tag" auto-size />
          </a-form-item>
          <a-form-item field="password1" label="机器人性格" validate-trigger="blur">
            <a-textarea  v-model="updateRobotVlaue1.personalityTraits" auto-size />
          </a-form-item>
          <a-form-item field="password2" label="机器人配置" validate-trigger="blur">
            <a-textarea  v-model="updateRobotVlaue1.configurationTips" auto-size />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal 
          :visible="addRobotModal"
          :mask-closable="false"
          @ok="uploadAddRobotModal"
          @cancel="canceladdRobotModal"
          width="1000px"
    >
      <template #title> 创建机器人   </template>
      <div>
        <a-form ref="formRef"  :model="robotInfo"  >
          <a-form-item  label="名字" validate-trigger="blur">
            <a-input v-model="robotInfo.name" />
          </a-form-item>
          <a-form-item  label="介绍" validate-trigger="blur">
            <a-input v-model="robotInfo.characterIntroduction" />
          </a-form-item>
          <a-form-item field="password0" label="标签" validate-trigger="blur">
            <a-textarea  v-model="robotInfo.tag" auto-size />
          </a-form-item>
          <a-form-item field="password1" label="机器人性格" validate-trigger="blur">
            <a-textarea  v-model="robotInfo.personalityTraits" auto-size />
          </a-form-item>
          <a-form-item field="password2" label="机器人配置" validate-trigger="blur">
            <a-textarea  v-model="robotInfo.configurationTips" auto-size />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal v-model:visible="bindVisible" @ok="okBind">
      <template #title> 绑定推特账号 </template>
      <div>
        <a-form :model="bindForm" auto-label-width>
          <a-form-item field="img_url" label="推特账号">
            <a-input
              v-model="bindForm.account"
              placeholder="请输入需要绑定的推特账号"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal v-model:visible="bindVisible1" @ok="okBind1">
      <template #title> 修改抽奖比例 </template>
      <div>
        <a-form :model="bindForm1" auto-label-width>
          <a-form-item field="img_url" label="抽奖比例">
            <a-input
              v-model="bindForm1.rate"
              placeholder="请输入抽奖比例"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal v-model:visible="targetVisible" @ok="okBind2">
      <template #title> 修改目的 </template>
      <div>
        <a-form :model="targetform" auto-label-width>
          <a-form-item field="img_url" label="自动发推目的">
            <a-input
              v-model="targetform.sendTarget"
              placeholder="请输入自动发推目的"
              allow-clear
            />
          </a-form-item>
        </a-form>
        <a-form :model="targetform" auto-label-width>
          <a-form-item field="img_url" label="关注广场采集回复目的">
            <a-input
              v-model="targetform.attentionTarget"
              placeholder="请输入关注广场采集回复目的"
              allow-clear
            />
          </a-form-item>
        </a-form>
        <a-form :model="targetform" auto-label-width>
          <a-form-item field="img_url" label="每日关注广场采集回复目的">
            <a-input
              v-model="targetform.dailyAttentionTarget"
              placeholder="请输入每日关注广场采集回复目的"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { getRobotList, updateRobot ,addCreateRobot} from '@/api/robots';
  import { Message } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';

  const List = ref([]);
  const loading = ref(false);
  const bindVisible = ref(false);
  const bindVisible1 = ref(false);
  const targetVisible = ref(false);
  const bindForm = reactive({
    account: '',
  });
  const bindForm1 = reactive({
    rate: '',
  });
  const targetform = reactive({
    sendTarget: '',
    attentionTarget: '',
    dailyAttentionTarget: '',
  });

  const form = ref({
    pageIndex: 0,
    pageSize: 10,
    id: '',
    name: '',
    tribeName: '',
  });

  const updateRobotVlaue = ref();
  const totalUserInfos = ref(0);
  const getlList = async () => {
    try {
      loading.value = true;
      const res = await getRobotList({
        pageIndex: form.value.pageIndex + 1,
        pageSize: form.value.pageSize,
        name: form.value.name,
        tribeName: form.value.tribeName,
        id: form.value.id,
      });
      if (res.code === 0) {
        List.value = res.data.data;
        totalUserInfos.value = res.data.total;
      }
    } catch (err) {
      // 1
    } finally {
      loading.value = false;
    }
  };

  const openModal = (record: any) => {
    bindVisible.value = true;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    bindForm.account = updateRobotVlaue.value.twitterAccount;
  };
  const openModal1 = (record: any) => {
    bindVisible1.value = true;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    bindForm1.rate = updateRobotVlaue.value.lottery_rate;
  };
  const targetModel = (record: any) => {
    targetVisible.value = true;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    targetform.sendTarget = updateRobotVlaue.value.sendTarget;
    targetform.attentionTarget = updateRobotVlaue.value.attentionTarget;
    targetform.dailyAttentionTarget = updateRobotVlaue.value.dailyAttentionTarget;
    // updateRobotVlaue.value.sendTarget = targetform.sendTarget;
    // updateRobotVlaue.value.attentionTarget = targetform.attentionTarget;
    // updateRobotVlaue.value.dailyAttentionTarget = targetform.dailyAttentionTarget;
  }
  const okBind = async () => {
    try {
      const dataList = ref({
        avatarUrl: updateRobotVlaue.value.avatar,
        characterIntroduction: updateRobotVlaue.value.characterIntroduction,
        configurationTips: updateRobotVlaue.value.configurationTips,
        id: Number(updateRobotVlaue.value.id),
        isRecommend: updateRobotVlaue.value.isRecommend,
        name: updateRobotVlaue.value.name,
        sex: updateRobotVlaue.value.sex,
        tag: updateRobotVlaue.value.tag,
        twitterAccount: bindForm.account,
        lottery_status: updateRobotVlaue.value.lottery_status,
        isSearch: updateRobotVlaue.value.isSearch,
        lottery_rate: updateRobotVlaue.value.lottery_rate.toString(),
        sendTarget: updateRobotVlaue.value.sendTarget,
        attentionTarget: updateRobotVlaue.value.attentionTarget,
        dailyAttentionTarget: updateRobotVlaue.value.dailyAttentionTarget,
      });

      const res = await updateRobot(dataList.value);
      if (res.code === 0) {
        bindVisible.value = false;
        bindForm.account = ''
        bindForm1.rate = '';
        targetform.sendTarget = '';
        targetform.attentionTarget = '';
        targetform.dailyAttentionTarget = '';
        Message.success('绑定成功');
      }
      getlList();
    } catch (err) {
      console.log(err);
      Message.error('绑定失败');
    }
  };
  const okBind1 = async () => {
    try {
      const dataList = ref({
        avatarUrl: updateRobotVlaue.value.avatar,
        characterIntroduction: updateRobotVlaue.value.characterIntroduction,
        configurationTips: updateRobotVlaue.value.configurationTips,
        id: Number(updateRobotVlaue.value.id),
        isRecommend: updateRobotVlaue.value.isRecommend,
        name: updateRobotVlaue.value.name,
        sex: updateRobotVlaue.value.sex,
        tag: updateRobotVlaue.value.tag,
        twitterAccount: updateRobotVlaue.value.twitterAccount,
        lottery_status: updateRobotVlaue.value.lottery_status,
        isSearch: updateRobotVlaue.value.is_search,
        lottery_rate: bindForm1.rate,
        sendTarget: updateRobotVlaue.value.sendTarget,
        attentionTarget: updateRobotVlaue.value.attentionTarget,
        dailyAttentionTarget: updateRobotVlaue.value.dailyAttentionTarget,
      });

      const res = await updateRobot(dataList.value);
      if (res.code === 0) {
        bindVisible.value = false;
        bindForm.account = ''
        bindForm1.rate = '';
        targetform.sendTarget = '';
        targetform.attentionTarget = '';
        targetform.dailyAttentionTarget = '';
        Message.success('绑定成功');
      }
      getlList();
    } catch (err) {
      console.log(err);
      Message.error('绑定失败');
    }
  };

  const okBind2 = async () => {
    try {
      const dataList = ref({
        avatarUrl: updateRobotVlaue.value.avatar,
        characterIntroduction: updateRobotVlaue.value.characterIntroduction,
        configurationTips: updateRobotVlaue.value.configurationTips,
        id: Number(updateRobotVlaue.value.id),
        isRecommend: updateRobotVlaue.value.isRecommend,
        name: updateRobotVlaue.value.name,
        sex: updateRobotVlaue.value.sex,
        tag: updateRobotVlaue.value.tag,
        twitterAccount: updateRobotVlaue.value.twitterAccount,
        lottery_status: updateRobotVlaue.value.lottery_status,
        isSearch: updateRobotVlaue.value.isSearch,
        lottery_rate: updateRobotVlaue.value.lottery_rate.toString(),
        sendTarget: targetform.sendTarget,
        attentionTarget: targetform.attentionTarget,
        dailyAttentionTarget: targetform.dailyAttentionTarget,
      });

      const res = await updateRobot(dataList.value);
      if (res.code === 0) {
        bindVisible.value = false;
        bindForm.account = ''
        bindForm1.rate = '';
        targetform.sendTarget = '';
        targetform.attentionTarget = '';
        targetform.dailyAttentionTarget = '';
        Message.success('绑定成功');
      }
      getlList();
    } catch (err) {
      console.log(err);
      Message.error('绑定失败');
    }
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.value.pageIndex) {
      form.value.pageIndex = current - 1;
      getlList();
    }
  };
  const resetForm = () => {
    form.value = {
      pageIndex: 0,
      pageSize: 10,
      id: '',
      name: '',
      tribeName: '',
    };
    getlList();
  };
  const visible = ref(false);
  const visible2 = ref(false);
  const status = ref(1);
  const status1 = ref(1);
  const searchStatus = ref(1);
  const text = ref('');
  const handleEdit = async () => {
    const dataList = ref({
      avatarUrl: updateRobotVlaue.value.avatar,
      characterIntroduction: updateRobotVlaue.value.characterIntroduction,
      configurationTips: updateRobotVlaue.value.configurationTips,
      id: Number(updateRobotVlaue.value.id),
      isRecommend: updateRobotVlaue.value.isRecommend,
      name: updateRobotVlaue.value.name,
      sex: updateRobotVlaue.value.sex,
      tag: updateRobotVlaue.value.tag,
      lottery_status: updateRobotVlaue.value.lottery_status,
      isSearch: updateRobotVlaue.value.isSearch,
      sendTarget: updateRobotVlaue.value.sendTarget,
      attentionTarget: updateRobotVlaue.value.attentionTarget,
      dailyAttentionTarget: updateRobotVlaue.value.dailyAttentionTarget,
      twitterAccount: updateRobotVlaue.value.twitterAccount,
      lottery_rate: updateRobotVlaue.value.lottery_rate.toString(),
    });
  console.log(dataList.value);
    const res = await updateRobot(dataList.value);
    if (res.code === 0) {
      console.log(res);
      Message.success('操作成功');
      visible.value = false;
      getlList();
    }
  };
  const Operation = (type: number, record: any) => {
    visible.value = true;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    updateRobotVlaue.value.isRecommend = type;
    if (type === 1) {
      // 推荐到首页
      text.value = '确认推荐到首页？';
    } else {
      // 屏蔽
      text.value = '确认取消推荐';
    }
  };
  const Operation1 = (type: number, record: any) => {
    visible.value = true;
    searchStatus.value = record.isSearch;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    updateRobotVlaue.value.lottery_status = type;
    if (type === 1) {
      // 推荐到首页
      text.value = '确认开启抽奖？';
    } else {
      // 屏蔽
      text.value = '确认关闭抽奖？';
    }
  };
  const SearchOperation = (type: number, record: any) => {
    visible.value = true;
    updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
    updateRobotVlaue.value.isSearch = type;
    if (type === 1) {
      // 可搜索
      text.value = '确认开启机器人隐身？';
    } else {
      // 屏蔽
      text.value = '确认关闭机器人隐身？';
    }
  };

  const visible1 = ref(false);
  const nameList = ref<any>({});
  const handleEdit1 = async (record: any) => {
    nameList.value = record;
    console.log('11111');

    if (nameList.value) {
      visible1.value = true;
      console.log('22222222');
    }
  };

  const FeedingRecord = () => {
    visible2.value = true;
  };
  onMounted(async () => {
    getlList();
  });

const robotModal = ref(false)
const formRef = ref(null);
const updateRobotVlaue1 = ref({
  characterIntroduction: '',
  tag: '',
  personalityTraits: '',
  configurationTips: '',
})
const OperRobotModal =(record:any)=>{
  console.log(record);
  robotModal.value = true
  updateRobotVlaue.value = JSON.parse(JSON.stringify(record));
  updateRobotVlaue1.value.characterIntroduction  = record.characterIntroduction
  updateRobotVlaue1.value.tag  = record.tag
  updateRobotVlaue1.value.personalityTraits  = record.personalityTraits
  updateRobotVlaue1.value.configurationTips  = record.configurationTips
}

const okRobotModal = async () => {
  updateRobotVlaue.value.characterIntroduction = updateRobotVlaue1.value.characterIntroduction
  updateRobotVlaue.value.tag = updateRobotVlaue1.value.tag
  updateRobotVlaue.value.personalityTraits = updateRobotVlaue1.value.personalityTraits
  updateRobotVlaue.value.configurationTips = updateRobotVlaue1.value.configurationTips
  updateRobotVlaue.value.id = Number(updateRobotVlaue.value.id)
  updateRobotVlaue.value.lottery_rate = updateRobotVlaue.value.lottery_rate.toString()
  updateRobotVlaue.value.avatarUrl = updateRobotVlaue.value.avatar

  const res = await updateRobot(updateRobotVlaue.value);
  if (res.code === 0) {
    robotModal.value = false
    Message.success('修改成功');
    updateRobotVlaue.value.characterIntroduction=''
    updateRobotVlaue.value.tag=''
    updateRobotVlaue.value.personalityTraits=''
    updateRobotVlaue.value.configurationTips=''
    getlList();
  }
}
const addRobotModal = ref(false)
const createRobot = ()=>{
  addRobotModal.value = true
}
const robotInfo = ref({
  name:"",
  characterIntroduction: '',
  tag: '',
  personalityTraits: '',
  configurationTips:""
})
const canceladdRobotModal = ()=>{
  addRobotModal.value = false
  robotInfo.value.name=""
  robotInfo.value.characterIntroduction = ''
  robotInfo.value.tag = ''
  robotInfo.value.personalityTraits = ''
  robotInfo.value.configurationTips=""
}
const uploadAddRobotModal = async () => {
  const res = await addCreateRobot(robotInfo.value);
  if (res.code === 0) {
    Message.success('修改成功');
    canceladdRobotModal()
    getlList();
  }
}
</script>

<style scoped></style>

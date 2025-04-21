<template>
  <div class="container">
    <a-card>
      <h2>手动群控</h2>

      <!-- 按钮操作区域 -->
      <div class="actions">
        <a-button type="primary" @click="followUserVisible = true"
          >关注用户</a-button
        >
        <!--        <a-button type="primary">点赞</a-button>-->
        <a-button type="primary" @click="forwardTweetVisible = true"
          >转发+引用推文</a-button
        >
        <a-button type="primary" @click="commentVisible = true"
          >评论推文</a-button
        >
        <!--        <a-button type="primary">AI评论</a-button>-->
        <a-button type="primary" @click="postTweetVisible = true"
          >发布推文</a-button
        >

        <a-button type="primary" @click="followUserVisible2 = true"
          >指定账号关注用户</a-button
        >

        <a-button type="primary" @click="forwardTweetVisible2 = true"
          >指定账号转发+引用推文</a-button
        >

        <a-button type="primary" @click="commentVisible2 = true"
          >指定账号评论推文</a-button
        >

        <a-button type="primary" @click="postTweetVisible2 = true"
          >指定账号发布推文</a-button
        >

        <a-button type="primary" @click="twitterTweetVisible = true"
          >Twitter API发推</a-button
        >
        <!-- <a-button type="primary" @click="sendPrivateMessageShow = true"
          >发送私信</a-button
        > -->
      </div>
    </a-card>

    <a-grid :cols="24" :col-gap="16" :row-gap="16">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
        <a-table :data="tableList" :pagination="false">
          <template #columns>
            <a-table-column
              title="设备ID"
              data-index="device_id"
            ></a-table-column>

            <a-table-column title="时间" data-index="ping_time">
              <template #cell="{ record }">
                {{ formatDate(record.ping_time) }}
              </template>
            </a-table-column>

            <a-table-column title="设备是否闲置" data-index="status_ready">
              <template #cell="{ record }">
                {{ record.status_ready === true ? '闲置' : '使用中' }}
              </template>
            </a-table-column>

            <a-table-column title="备注" data-index="comment">
              <template #cell="{ record }">
                {{ record.comment }}
              </template>
            </a-table-column>

            <a-table-column title="控制记录" data-index="">
              <template #cell="{ record }">
                <div
                  v-for="(item, index) in record.tweet_account_list"
                  :key="index"
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-top: 10px;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-right: 5px;
                    "
                  >
                    <p style="margin-right: 5px">{{ item.tweet_account }}</p>
                    <p style="margin-right: 5px">{{
                      item.control_cmd === '1'
                        ? '转发'
                        : item.control_cmd === '2'
                        ? '转发评论'
                        : item.control_cmd === '3'
                        ? '评论'
                        : item.control_cmd === '4'
                        ? '点赞'
                        : item.control_cmd === '5'
                        ? '发布'
                        : item.control_cmd === '6'
                        ? '关注用户'
                        : item.control_cmd === '7'
                        ? '取消关注'
                        : ''
                    }}</p>
                    <p
                      style="margin-right: 5px"
                      :class="statusStyle(item.control_status)"
                      >{{
                        item.control_status === 0
                          ? '初始化'
                          : item.control_status === 1
                          ? '已下达'
                          : item.control_status === 2
                          ? '完成'
                          : item.control_status === -1
                          ? '执行失败'
                          : ''
                      }}</p
                    >
                  </div>
                </div>
              </template>
            </a-table-column>
            <!--            <a-table-column title="查看详情">-->
            <!--              <template #cell>-->
            <!--                <div>-->
            <!--                  <a-button type="primary">控制记录</a-button>-->
            <!--                  <a-button type="primary">用户链接</a-button>-->
            <!--                  <a-button type="primary">粉丝/关注</a-button>-->
            <!--                </div>-->
            <!--              </template>-->
            <!--            </a-table-column>-->

            <a-table-column
              title="硬件配置(推特,ins,TruthSocial)"
               data-index="platform"
            >
              <template #cell="{ record }">
                <a-select
                  v-model="record.platform"
                  style="width: 120px"
                  :options="platform"
                  @change="handleChangeplatform(record)"
                ></a-select>
              </template>
            </a-table-column>
            <a-table-column title="操作">
              <template #cell="{ record }">
                <a-space>
                  <a-button type="primary" @click="openModal(record)"
                    >修改备注</a-button
                  >
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-grid-item>
    </a-grid>

    <a-modal v-model:visible="followUserVisible" @ok="followUser">
      <template #title> 关注用户 </template>
      <div>
        <a-form :model="followUserForm" auto-label-width>
          <a-form-item field="tweets_user_name" label="需要关注的用户url">
            <a-input
              v-model.trim="followUserForm.tweets_user_name"
              placeholder="请输入需要关注的用户url"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="followUserVisible2" @ok="followUser2">
      <template #title> 指定账号关注用户 </template>
      <div>
        <a-form :model="followUserForm2" auto-label-width>
          <a-form-item field="" label="需要关注的用户url">
            <a-input
              v-model.trim="followUserForm2.tweets_user_name"
              placeholder="请输入需要关注的用户url"
            />
          </a-form-item>
          <div style="margin-bottom: 10px">
            <div style="margin-bottom: 10px">指定账号</div>
            <a-button
              type="primary"
              style="margin-bottom: 10px"
              @click="addAccount(followUserForm2)"
              >+</a-button
            >

            <div
              v-for="(account, index) in followUserForm2.tweets_user_name_list"
              :key="index"
              style="display: flex; align-items: center; margin-bottom: 10px"
            >
              <a-input
                v-model.trim="followUserForm2.tweets_user_name_list[index]"
                style="width: 250px"
                placeholder="请输入指定账号"
              />
              <a-button
                type="primary"
                danger
                style="margin: 0 10px"
                @click="removeAccount(followUserForm2, index)"
                >-</a-button
              >
            </div>
          </div>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="forwardTweetVisible" @ok="forwardTweet">
      <template #title> 转发和引用推文 </template>
      <div>
        <a-form :model="forwardTweetForm" auto-label-width>
          <a-form-item field="twitter_url" label="当前推文链接">
            <a-input
              v-model.trim="forwardTweetForm.twitter_url"
              placeholder="请输入当前推文链接"
            />
          </a-form-item>
          <a-form-item field="username" label="推文用户名">
            <a-input
              v-model.trim="forwardTweetForm.username"
              placeholder="请输入推文用户名"
            />
          </a-form-item>
          <a-form-item field="twitterQuote" label="当前推文引用正文">
            <a-input
              v-model.trim="forwardTweetForm.twitterQuote"
              placeholder="请输入当前推文引用正文"
            />
          </a-form-item>
          <a-form-item field="target" label="目的">
            <a-textarea
              v-model="forwardTweetForm.target"
              placeholder="请输入目的"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="content" label="当前推文正文">
            <a-textarea
              v-model="forwardTweetForm.content"
              placeholder="请输入当前推文正文"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入转发推特数">
            <a-input-number
              v-model.trim="forwardTweetForm.count"
              placeholder="请输入数量"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="forwardTweetVisible2" @ok="forwardTweet2">
      <template #title> 指定账号 转发和引用推文 </template>
      <div>
        <a-form :model="forwardTweetForm2" auto-label-width>
          <div style="margin-bottom: 10px">
            <div style="margin-bottom: 10px">指定账号</div>
            <a-button
              type="primary"
              style="margin-bottom: 10px"
              @click="addAccount(forwardTweetForm2)"
              >+</a-button
            >

            <div
              v-for="(
                account, index
              ) in forwardTweetForm2.tweets_user_name_list"
              :key="index"
              style="display: flex; align-items: center; margin-bottom: 10px"
            >
              <a-input
                v-model.trim="forwardTweetForm2.tweets_user_name_list[index]"
                style="width: 250px"
                placeholder="请输入指定账号"
              />
              <a-button
                type="primary"
                danger
                style="margin: 0 10px"
                @click="removeAccount(forwardTweetForm2, index)"
                >-</a-button
              >
            </div>
          </div>
          <a-form-item field="twitter_url" label="当前推文链接">
            <a-input
              v-model.trim="forwardTweetForm2.twitter_url"
              placeholder="请输入当前推文链接"
            />
          </a-form-item>
          <a-form-item field="username" label="推文用户名">
            <a-input
              v-model.trim="forwardTweetForm2.username"
              placeholder="请输入推文用户名"
            />
          </a-form-item>
          <a-form-item field="twitterQuote" label="当前推文引用正文">
            <a-input
              v-model.trim="forwardTweetForm2.twitterQuote"
              placeholder="请输入当前推文引用正文"
            />
          </a-form-item>
          <a-form-item field="target" label="目的">
            <a-textarea
              v-model="forwardTweetForm2.target"
              placeholder="请输入目的"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="content" label="当前推文正文">
            <a-textarea
              v-model="forwardTweetForm2.content"
              placeholder="请输入当前推文正文"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="commentVisible" @ok="commentTweet">
      <template #title> 评论推文 </template>
      <div>
        <a-form :model="commentForm" auto-label-width>
          <a-form-item field="tweets_user_name" label="点赞的推文链接">
            <a-input
              v-model.trim="commentForm.twitter_url"
              placeholder="请输入点赞的推文链接"
            />
          </a-form-item>
          <a-form-item field="content" label="评价内容">
            <a-textarea
              v-model="commentForm.content"
              placeholder="请输入评价内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入需要推送的推特数">
            <a-input-number
              v-model.trim="commentForm.count"
              placeholder="请输入数量"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="commentVisible2" @ok="commentTweet2">
      <template #title>指定账号 评论推文 </template>
      <div>
        <a-form :model="commentForm2" auto-label-width>
          <div style="margin-bottom: 10px">
            <div style="margin-bottom: 10px">指定账号</div>
            <a-button
              type="primary"
              style="margin-bottom: 10px"
              @click="addAccount(commentForm2)"
              >+</a-button
            >

            <div
              v-for="(account, index) in commentForm2.tweets_user_name_list"
              :key="index"
              style="display: flex; align-items: center; margin-bottom: 10px"
            >
              <a-input
                v-model.trim="commentForm2.tweets_user_name_list[index]"
                style="width: 250px"
                placeholder="请输入指定账号"
              />
              <a-button
                type="primary"
                danger
                style="margin: 0 10px"
                @click="removeAccount(commentForm2, index)"
                >-</a-button
              >
            </div>
          </div>
          <a-form-item field="tweets_user_name" label="当前推文链接">
            <a-input
              v-model.trim="commentForm2.twitter_url"
              placeholder="请输入当前推文链接"
            />
          </a-form-item>
          <a-form-item field="content" label="评价内容">
            <a-textarea
              v-model="commentForm2.content"
              placeholder="请输入评价内容"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="postTweetVisible" @ok="postTweet">
      <template #title> 发布推文 </template>
      <div>
        <a-form :model="postTweetForm" auto-label-width>
          <a-form-item field="content" label="内容">
            <a-textarea
              v-model="postTweetForm.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="img_url" label="发布推文图片">
            <a-input
              v-model.trim="postTweetForm.img_url"
              placeholder="请输入发布推文图片url"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入需要推送的推特数">
            <a-input-number
              v-model.trim="postTweetForm.count"
              placeholder="请输入数量"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="postTweetVisible2" @ok="postTweet2">
      <template #title>指定账号 发布推文 </template>
      <div>
        <a-form :model="postTweetForm2" auto-label-width>
          <div style="margin-bottom: 10px">
            <div style="margin-bottom: 10px">指定账号</div>
            <a-button
              type="primary"
              style="margin-bottom: 10px"
              @click="addAccount(postTweetForm2)"
              >+</a-button
            >

            <div
              v-for="(account, index) in postTweetForm2.tweets_user_name_list"
              :key="index"
              style="display: flex; align-items: center; margin-bottom: 10px"
            >
              <a-input
                v-model.trim="postTweetForm2.tweets_user_name_list[index]"
                style="width: 250px"
                placeholder="请输入指定账号"
              />
              <a-button
                type="primary"
                danger
                style="margin: 0 10px"
                @click="removeAccount(postTweetForm2, index)"
                >-</a-button
              >
            </div>
          </div>
          <a-form-item field="content" label="内容">
            <a-textarea
              v-model="postTweetForm2.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="img_url" label="发布推文图片">
            <a-input
              v-model.trim="postTweetForm2.img_url"
              placeholder="请输入推文图片url"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="twitterTweetVisible" @ok="postTweet3">
      <template #title> twitter API 发布推文 </template>
      <div>
        <a-form :model="postTwitterTweetForm" auto-label-width>
          <a-form-item field="content" label="内容">
            <a-textarea
              v-model="postTwitterTweetForm.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="img_url" label="发布推文图片">
            <a-input
              v-model.trim="postTwitterTweetForm.imageUrl"
              placeholder="请输入推文图片url"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="机器人名称">
            <a-input
              v-model.trim="postTwitterTweetForm.robotName"
              placeholder="请输入机器人名称"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="updateComment" @ok="getUpdateComment">
      <template #title> 修改备注 </template>
      <div>
        <a-form :model="updateCommentForm" auto-label-width>
          <a-form-item field="tweets_user_name" label="备注">
            <a-input
              v-model.trim="updateCommentForm.comment"
              placeholder="请输入备注内容"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>

  <a-modal v-model:visible="sendPrivateMessageShow" @ok="handleSendPrivateMessage" @cancel="handleCancelsendPrivateMessage">
    <template #title>
      Title
    </template>
    <div>
      <a-form :model="fanDateForm">
        <a-form-item field="userAccount" label="用户">
          <a-input v-model.trim="fanDateForm.userAccount" allow-clear/>
        </a-form-item>
        <a-form-item field="fanAccount" label="粉丝账户">
          <a-input v-model.trim="fanDateForm.fanAccount" allow-clear />
        </a-form-item>
        <a-form-item field="message" label="发送内容">
          <a-input v-model.trim="fanDateForm.message" allow-clear />
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="headlGetfanList">
          获取粉丝列表</a-button
        >
       
      <a-modal
        v-model:visible="fanTableShow"
        title="内层 Modal"
        @ok="handlfanTable"
        :mask-closable="false"
        :closable="true"
      >
      <a-table row-key="name" :columns="fanColumns" :data="fansList"  v-model:selectedKeys="fansSelectedKeys" :row-selection="rowSelection" :pagination="pagination" />
      </a-modal>
    </div>
  </a-modal>


</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { Message ,SelectProps} from '@arco-design/web-vue';
import {
  commentTweetApi,
  commentTweetApi2,
  followUserApi,
  followUserApi2,
  forwardTweetApi,
  forwardTweetApi2,
  getPhoneControlApi,
  getTwitterUserListApi,
  postTweetAp3,
  postTweetApi,
  postTweetApi2,
  updateDeviceCommentApi,
  getConfigByName,
  chatWithFansApi,
  getFansListApi
} from '@/api/phone';

const tableList = ref([]);
const followUserVisible = ref(false); // 关注用户弹窗
const commentVisible = ref(false); // 评论弹窗
const postTweetVisible = ref(false); // 发布弹窗
const forwardTweetVisible = ref(false); // 转发弹窗

const followUserVisible2 = ref(false); // 指定账号关注用户弹窗
const commentVisible2 = ref(false); // 指定账号评论弹窗
const postTweetVisible2 = ref(false); // 指定账号发布弹窗
const forwardTweetVisible2 = ref(false); // 指定账号转发弹窗
const twitterTweetVisible = ref(false); // twitterTweetVisible

const updateComment = ref(false); // 修改备注弹窗

// 关注用户表单
const followUserForm = reactive({
  tweets_user_name: '',
  tweets_user_name_list: [],
});
// 评论表单
const commentForm = reactive({
  count: 0,
  content: '',
  twitter_url: '',
  tweets_user_name_list: [],
});
// 发布表单
const postTweetForm = reactive({
  content: '',
  img_url: '',
  count: 0,
  tweets_user_name_list: [],
});
// 转发表单
const forwardTweetForm = reactive({
  twitter_url: '',
  count: 0,
  tweets_user_name_list: [],
  content: '',
  username: '',
  twitterQuote: '',
  target: '',
});

// 关注用户表单
const followUserForm2 = reactive({
  tweets_user_name: '',
  tweets_user_name_list: [] as any,
});
// 评论表单
const commentForm2 = reactive({
  content: '',
  twitter_url: '',
  tweets_user_name_list: [] as any,
});
// 发布表单
const postTweetForm2 = reactive({
  content: '',
  img_url: '',
  tweets_user_name_list: [] as any,
});
// 转发表单
const forwardTweetForm2 = reactive({
  twitter_url: '',
  tweets_user_name_list: [] as any,
  content: '',
  username: '',
  twitterQuote: '',
  target: '',
});
// 修改备注表单
const updateCommentForm = reactive({
  comment: '',
  deviceId: '',
  platform:0
});
// Twitter发布表单
const postTwitterTweetForm = reactive({
  content: '',
  imageUrl: '',
  robotName: '',
});

// 时间格式化
const formatDate = (timestamp: any) => {
  if (timestamp === '0001-01-01T00:00:00Z') {
    return '';
  }
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
// 状态样式
const statusStyle = (status: any) => {
  switch (status) {
    case 0:
      return 'status-gray'; // 初始化
    case 1:
      return 'status-blue'; // 已下达
    case 2:
      return 'status-green'; // 完成
    case -1:
      return 'status-red'; // 执行失败
    default:
      return 'status-black'; // 未知状态
  }
};

const addAccount = (form: any) => {
  // 点击 + 号时添加一行
  form.tweets_user_name_list.push('');
};
const removeAccount = (form: any, index: any) => {
  // 点击 - 号时移除对应的输入框
  form.tweets_user_name_list.splice(index, 1);
};

// 查询列表
const queryListData = async () => {
  try {
    const res = await getPhoneControlApi();
    if (res.code === 0) {
      tableList.value = res.data.device_list;
    }
    console.log('手机控制列表数据：', res);
  } catch (err) {
    // you can report use errorHandler or other
  }
};

// 查询当前推特账号列表
const queryTweetList = async () => {
  try {
    const res = await getTwitterUserListApi();
    // if (res.code === 0) {
    //   userList.value = res.data.list;
    // }
    console.log('Tweet列表数据：', res);
  } catch (err) {
    console.log(err);
  }
};

// 打开修改备注弹窗
const openModal = (record: any) => {
  updateCommentForm.comment = record.comment;
  updateCommentForm.deviceId = record.device_id;
  updateComment.value = true;
};

// 关注用户
const followUser = async () => {
  try {
    const res = await followUserApi(followUserForm);
    if (res.code === 0) {
      followUserVisible.value = false;
      followUserForm.tweets_user_name = '';
      Message.success('关注成功');
    }
    queryListData();
  } catch (err) {
    Message.error('关注失败');
    console.log(err);
  }
};

// 指定账号关注用户
const followUser2 = async () => {
  try {
    const res = await followUserApi2(followUserForm2);
    if (res.code === 0) {
      followUserVisible2.value = false;
      followUserForm2.tweets_user_name = '';
      followUserForm2.tweets_user_name_list = [];
      Message.success('关注成功');
    }
    queryListData();
  } catch (err) {
    Message.error('关注失败');
    console.log(err);
  }
};

// 转发引用推文
const forwardTweet = async () => {
  try {
    const res = await forwardTweetApi(forwardTweetForm);
    if (res.code === 0) {
      forwardTweetVisible.value = false;
      forwardTweetForm.count = 0;
      forwardTweetForm.content = '';
      forwardTweetForm.twitter_url = '';
      forwardTweetForm.username = '';
      forwardTweetForm.target = '';
      forwardTweetForm.twitterQuote = '';
      Message.success('转发成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('转发失败');
  }
};
// 指定账号转发引用推文
const forwardTweet2 = async () => {
  try {
    const res = await forwardTweetApi2(forwardTweetForm2);
    if (res.code === 0) {
      forwardTweetVisible2.value = false;
      forwardTweetForm2.tweets_user_name_list = [];
      forwardTweetForm2.content = '';
      forwardTweetForm2.twitter_url = '';
      forwardTweetForm2.username = '';
      forwardTweetForm2.target = '';
      forwardTweetForm2.twitterQuote = '';
      Message.success('转发成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('转发失败');
  }
};

// 评论推文
const commentTweet = async () => {
  try {
    const res = await commentTweetApi(commentForm);
    if (res.code === 0) {
      commentVisible.value = false;
      commentForm.content = '';
      commentForm.count = 0;
      commentForm.twitter_url = '';
      Message.success('评论成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('评论失败');
  }
};
// 指定账号评论推文
const commentTweet2 = async () => {
  try {
    const res = await commentTweetApi2(commentForm2);
    if (res.code === 0) {
      commentVisible2.value = false;
      commentForm2.content = '';
      commentForm2.tweets_user_name_list = [];
      commentForm2.twitter_url = '';
      Message.success('评论成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('评论失败');
  }
};

// 发布推文
const postTweet = async () => {
  try {
    const res = await postTweetApi(postTweetForm);
    if (res.code === 0) {
      postTweetVisible.value = false;
      postTweetForm.content = '';
      postTweetForm.img_url = '';
      postTweetForm.count = 0;
      Message.success('发布成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('发布失败');
  }
};
// 指定账号发布推文
const postTweet2 = async () => {
  try {
    const res = await postTweetApi2(postTweetForm2);
    if (res.code === 0) {
      postTweetVisible2.value = false;
      postTweetForm2.content = '';
      postTweetForm2.img_url = '';
      postTweetForm2.tweets_user_name_list = [];
      Message.success('发布成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('发布失败');
  }
};

// twitterAPI发推
const postTweet3 = async () => {
  try {
    const res = await postTweetAp3(postTwitterTweetForm);
    if (res.code === 0) {
      twitterTweetVisible.value = false;
      postTwitterTweetForm.content = '';
      postTwitterTweetForm.imageUrl = '';
      postTwitterTweetForm.robotName = '';
      Message.success('发布成功');
    }
    queryListData();
  } catch (err) {
    console.log(err);
    Message.error('发布失败');
  }
};

// 修改备注
const getUpdateComment = async () => {
  try {
    const res = await updateDeviceCommentApi(updateCommentForm);
    if (res.code === 0) {
      Message.success('修改成功');
      updateComment.value = false;
    }
    queryListData();
  } catch (err) {
    Message.error('修改失败');
  }
};
const platform = ref([],);
// const abc = ref(0)
const getdisposition = async () => {
  try {
    const res = await getConfigByName({ name: 'platform_config' });
    if (res.code === 0) {
      // platform.value = res.data.data;
      const a = Object.entries(res.data).map(([key, value]) => ({
        label: key,
        value:Number(value),
      }));
      console.log(a);
      
      platform.value = a;
    }
  } catch (err) {
    console.log(err);

    Message.error('获取失败');
  }
};
const handleChangeplatform = async (record:any) => {
  updateCommentForm.comment = record.comment;
  updateCommentForm.deviceId = record.device_id;

  updateCommentForm.platform = record.platform;
  try {
    const res = await updateDeviceCommentApi(updateCommentForm);
    if (res.code === 0) {
      Message.success('修改成功');
      updateComment.value = false;
    }
    queryListData();
  } catch (err) {
    Message.error('修改失败');
  }
  
};
const num = ref('1')
onMounted(async () => {
  await getdisposition();
  await queryListData();
  // 每10秒查询一次列表数据
  setInterval(() => {
    // queryListData();
  }, 100000);
  // queryTweetList();
});

const sendPrivateMessageShow = ref(false); // 发送私信弹窗
const fanDateForm = reactive({
  userAccount: '',
  fanAccount: [] as string[],
  message: '',
});


const fanTableShow = ref(false);

const fanColumns = [
    {
       title: 'Name',
       dataIndex: 'name',
    },
]
const fansList = ref([]);
const fansSelectedKeys=ref([]);
const handlfanTable = () => {
  // fanTableShow.value = false;
  fanDateForm.fanAccount = []
  fanDateForm.fanAccount.push(...fansSelectedKeys.value);
  // console.log(fanDateForm.fanAccount);
};
const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  });
const pagination = reactive({
  current: 1,
  pageSize: 10,
    total: 0,
    showTotal: true,
  })
const headlGetfanList = ()=> {
  const data = {
    userAccount: fanDateForm.userAccount,
    pageIndex:pagination.current,
    pageSize: pagination.pageSize,
  }
  console.log(data);
  
  getFansListApi(data).then((res) => {
    console.log(res.data);
    if (res.code === 0) {
      pagination.total = res.data.total;
      fanTableShow.value = true;
       const newData = res.data.fans.map((item: any) => ({
        name: item,
        }));
        fansList.value = newData;
    }
  });
};
pagination.onChange = (page: number) => {
  pagination.current = page;
  headlGetfanList();
};


const handleSendPrivateMessage = async () => {
  try {
    const res = await chatWithFansApi(fanDateForm);
    // console.log(res);
    fanDateForm.userAccount = '';
    fanDateForm.message = '';
    fanDateForm.fanAccount = [];
    fansSelectedKeys.value = [];
    pagination.current = 1;
    Message.success('发送成功');
  } catch (err) {
    Message.error('发送失败');
  }
};
const handleCancelsendPrivateMessage = () => {
  sendPrivateMessageShow.value = false;
  fanDateForm.userAccount = '';
  fanDateForm.message = '';
  fanDateForm.fanAccount = [];
  fansSelectedKeys.value = [];
  pagination.current = 1;
};

</script>

<style scoped>
.actions {
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
}
.status-gray {
  color: gray;
}
.status-blue {
  color: blue;
}
.status-green {
  color: green;
}
.status-red {
  color: red;
}
.status-black {
  color: black;
}
</style>

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
          >转发</a-button
        >
        <a-button type="primary" @click="commentVisible = true"
          >编辑评论</a-button
        >
        <!--        <a-button type="primary">AI评论</a-button>-->
        <a-button type="primary" @click="postTweetVisible = true"
          >编辑发布</a-button
        >
        <!--        <a-button type="primary">AI发布</a-button>-->
      </div>
    </a-card>

    <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
        <a-table :data="tableList" style="margin-top: 20px">
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
                  <div style="display: flex; align-items: center">
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
                    <p>{{ item.tweet_account }}</p>
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
          </template>
        </a-table>
      </a-grid-item>
    </a-grid>

    <a-modal v-model:visible="followUserVisible" @ok="followUser">
      <template #title> 关注用户 </template>
      <div>
        <a-form :model="followUserForm" auto-label-width>
          <a-form-item field="tweets_user_name" label="需要关注的用户">
            <a-input
              v-model="followUserForm.tweets_user_name"
              placeholder="请输入需要关注的用户"
            />
          </a-form-item>
          <a-form-item field="count" label="输入需要推送的推特数">
            <a-input-number
              v-model="followUserForm.count"
              placeholder="请输入数量"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="forwardTweetVisible" @ok="forwardTweet">
      <template #title> 转发推文 </template>
      <div>
        <a-form :model="forwardTweetForm" auto-label-width>
          <a-form-item field="tweets_user_name" label="需要转发的推文链接">
            <a-input
              v-model="forwardTweetForm.twitter_url"
              placeholder="请输入需要转发的推文链接"
            />
          </a-form-item>
          <a-form-item field="content" label="引用评论内容">
            <a-textarea
              v-model="forwardTweetForm.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入转发推特数">
            <a-input-number
              v-model="forwardTweetForm.count"
              placeholder="请输入数量"
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
          <a-form-item field="tweets_user_name" label="需要评论的推文url">
            <a-input
              v-model="commentForm.twitter_url"
              placeholder="请输入需要评论的推文url"
            />
          </a-form-item>
          <a-form-item field="content" label="内容">
            <a-textarea
              v-model="commentForm.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入需要推送的推特数">
            <a-input-number
              v-model="commentForm.count"
              placeholder="请输入数量"
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
              v-model="postTweetForm.img_url"
              placeholder="请输入推文图片url"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="count" label="输入需要推送的推特数">
            <a-input-number
              v-model="postTweetForm.count"
              placeholder="请输入数量"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import {
    commentTweetApi,
    followUserApi,
    forwardTweetApi,
    getPhoneControlApi,
    getTwitterUserListApi,
    postTweetApi,
  } from '@/api/phone';

  const tableList = ref([]);
  const followUserVisible = ref(false); // 关注用户弹窗
  const commentVisible = ref(false); // 评论弹窗
  const postTweetVisible = ref(false); // 发布弹窗
  const forwardTweetVisible = ref(false); // 转发弹窗
  // 关注用户表单
  const followUserForm = reactive({
    tweets_user_name: '',
    count: 0,
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
  });

  // 时间格式化
  const formatDate = (timestamp: any) => {
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

  // 关注用户
  const followUser = async () => {
    try {
      const res = await followUserApi(followUserForm);
      if (res.code === 0) {
        followUserVisible.value = false;
        followUserForm.tweets_user_name = '';
        followUserForm.count = '';
      }
      queryListData();
    } catch (err) {
      console.log(err);
    }
  };

  // 转发推文
  const forwardTweet = async () => {
    try {
      const res = await forwardTweetApi(forwardTweetForm);
      if (res.code === 0) {
        forwardTweetVisible.value = false;
        forwardTweetForm.count = '';
        forwardTweetForm.content = '';
        forwardTweetForm.twitter_url = '';
      }
      queryListData();
    } catch (err) {
      console.log(err);
    }
  };

  // 评论推文
  const commentTweet = async () => {
    try {
      const res = await commentTweetApi(commentForm);
      if (res.code === 0) {
        commentVisible.value = false;
        commentForm.content = '';
        commentForm.count = '';
        commentForm.twitter_url = '';
      }
      queryListData();
    } catch (err) {
      console.log(err);
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
        postTweetForm.count = '';
      }
      queryListData();
    } catch (err) {
      console.log(err);
    }
  };

  onMounted(async () => {
    queryListData();
    // queryTweetList();
  });
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

<template>
  <div class="chat-container">
    <!-- 用户列表部分 -->
    <div class="user-list-section scrollable">
      <div>
        <h2 class="section-title">最近联系</h2>
        <div class="user-list">
          <!-- <div class="user-item"
            @click="recentOpenChat({ user_account: '@JCunegatti', chain_id: '-8028072419120791264', fan_account: '@blau_jack72635', unread: 0 })">
            <img :src="getAvatar('abc')" alt="avatar" class="avatar" />
            <span class="user-name">@JCunegatti</span>
          </div> -->
          <div v-for="(user, i) in recentChats" :key="i" class="recent_item">
            <div class="user-item" @click="recentOpenChat(user)">
              <img :src="getAvatar(user.fan_account)" alt="avatar" class="avatar" />
              <span class="user-name">{{ user.fan_account }}</span>
            </div>
            <div class="read" v-if="user.unread > 0"></div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="section-title">用户列表</h2>
        <div class="user-list">
          <div class="user-item" @click="selectUser('@JCunegatti')">
            <img :src="getAvatar('abc')" alt="avatar" class="avatar" />
            <span class="user-name">@JCunegatti</span>
          </div>
          <div v-for="(user, i) in users" :key="i">
            <div v-if="user.tweet_account_list.length > 0" class="user-item"
              @click="selectUser(user.tweet_account_list[0].tweet_account)">
              <img :src="getAvatar(user.tweet_account_list[0].tweet_account)" alt="avatar" class="avatar" />
              <span class="user-name">{{ user.tweet_account_list[0].tweet_account }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 粉丝列表部分 -->
    <div v-if="fansListShow" class="fan-list-section scrollable">
      <h2 class="section-title">{{ chatInfo.userAccount }} 的粉丝</h2>
      <div class="fan-list">
        <div v-for="fan in fans" :key="fan.account" class="fan-item" @click="openChat(fan)">
          <div class="fan-info-left">
            <img :src="getAvatar(fan.account)" alt="avatar" class="avatar" />
            <span class="fan-name">{{ fan.account }}</span>
          </div>
          <div class="read" v-if="fan.read"></div>
        </div>
      </div>
    </div>

    <!-- 聊天窗口部分 -->
    <div v-if="chatWindowShow" class="chat-window scrollable">
      <div class="chat-header">
        <img :src="getAvatar(chatInfo.fanAccount)" alt="avatar" class="avatar-small" />
        <span>与 {{ chatInfo.fanAccount }} 聊天</span>
        <button @click="closeChat">×</button>
      </div>
      <div class="chat-content" ref="chatContentRef">
        <div v-for="(msg, index) in chatMessages" :key="index" :class="['message', msg.Sender === 0 ? 'me' : 'other']">
          <img :src="msg.Sender === 0 ? getAvatar('me') : getAvatar(chatInfo.fanAccount)" alt="avatar"
            class="avatar-message" />
          <div class="message-content">
            {{ msg.Message }}
          </div>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="chatInfo.message" @keyup.enter="sendMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted, nextTick } from 'vue';

import {
  getPhoneControlApi,
  getFansListApi,
  createChatApi,
  getChatListApi,
  getLatestMessageApi,
  sendMessageApi,
  getRecentChatsApi
} from '@/api/fans'

interface TweetAccount {
  tweet_account: string;
}

interface User {
  id: number;
  tweet_account_list: TweetAccount[];
}

interface Message {
  Sender: number;
  Message: string;
}
interface FansList {
  account: string;
  chain_id: string;
  read: number;
}
interface RecentChats {
  user_account: string;
  chain_id: string;
  fan_account: string;
  unread: number;
}
// 定义响应式数据
const users = ref<User[]>([]);
const fans = ref<FansList[]>([]);
const selectedUser = ref<User | null>(null);
const activeChat = ref<User | null>(null);
const chatMessages = ref<Message[]>([]);
const fansListShow = ref(false);
const chatWindowShow = ref(false);
const fansId = ref<string>('');
const chatInfo = reactive({
  chat_id: "",
  userAccount: "",
  fanAccount: "",
  message: "",
})
const chatContentRef = ref<HTMLElement | null>(null);

const timer = ref<ReturnType<typeof setInterval> | null>(null)
const fansTimer = ref<ReturnType<typeof setInterval> | null>(null)
const fetchChatHistory = async () => {
  try {
    const data = {
      chain_id: fansId.value,
      chat_id: chatInfo.chat_id,
      user_account: chatInfo.userAccount,
      fan_account: chatInfo.fanAccount,
      index: 99999,
    }
    const res = await getChatListApi(data);
    if (res.code === 0) {
      chatMessages.value = res.data.message_list.reverse();
      console.log('获取消息历史消息', res.data);
      nextTick(() => {
        if (chatContentRef.value) {
          chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight;
        }
      });
      chatWindowShow.value = true;
    }
  } catch (error) {
    console.error('获取消息历史消息:', error);
  }
};
const refreshFans = () => {
  fansTimer.value = setInterval(async () => {
    try {
      const data = {
        userAccount: chatInfo.userAccount,
        pageIndex: 1,
        pageSize: 9999,
      }
      const res = await getFansListApi(data);
      if (res.code === 0) {
        const arr = ref([])
        res.data.fans.forEach((item: any) => {
          const info = ref({
            account: '',
            read: 0,
            chain_id: '',
          });
          item.account.split(',').forEach((it: any) => {
            const [key, value] = it.split(':');
            if (key === 'account') {
              const a = value;
              info.value.account = a;
            } else if (key === 'read') {
              const r = Number(value);
              info.value.read = r;
            }
          })
          info.value.chain_id = item.chain_id;
          arr.value.push(info.value);
        })
        fans.value = arr.value;
      }
    }
    catch (error) {
      console.error('获取粉丝列表失败:', error);
      clearInterval(fansTimer.value);
    }
  }, 20000)

}
// 获取用户列表的接口调用
const fetchUsers = async () => {
  try {
    // 模拟接口返回数据
    const res = await getPhoneControlApi();
    if (res.code === 0) {
      users.value = res.data.device_list;
      console.log('手机控制列表数据：', res.data.device_list);
    }
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
};

// 模拟获取粉丝列表的接口调用
const fetchFans = async () => {
  try {
    const data = {
      userAccount: chatInfo.userAccount,
      pageIndex: 1,
      pageSize: 9999,
    }
    const res = await getFansListApi(data);
    if (res.code === 0) {
      const arr = ref([])
      res.data.fans.forEach((item: any) => {
        const info = ref({
          account: '',
          read: 0,
          chain_id: '',
        });
        item.account.split(',').forEach((it: any) => {
          const [key, value] = it.split(':');
          if (key === 'account') {
            const a = value;
            info.value.account = a;
          } else if (key === 'read') {
            const r = Number(value);
            info.value.read = r;
          }
        })
        info.value.chain_id = item.chain_id;
        arr.value.push(info.value);
      })
      fans.value = arr.value;
      fansListShow.value = true;
      refreshFans();
    }
  } catch (error) {
    console.error('获取粉丝列表失败:', error);
  }
}
// 选择用户并获取粉丝列表
const selectUser = (user: any) => {
  fansId.value = '';
  fans.value = [];
  chatInfo.chat_id = '';
  chatInfo.userAccount = '';
  chatInfo.fanAccount = '';
  chatInfo.message = '';
  chatMessages.value = [];
  chatInfo.userAccount = user;
  chatWindowShow.value = false;
  clearInterval(timer.value);
  clearInterval(fansTimer.value);
  fetchFans();
};

const timerQuertHistory = async () => {
  // 判断索引在不在列表里面 如果不在就不管，就添加进去
  try {
    const data = {
      chain_id: fansId.value,
      chat_id: chatInfo.chat_id,
      index: 99999,
      user_account: chatInfo.userAccount,
      fan_account: chatInfo.fanAccount,
    }
    const res = await getChatListApi(data);
    if (res.code === 0) {
      chatMessages.value = res.data.message_list.reverse();
    }
  } catch (error) {
    clearInterval(timer.value);
  }

}

// 创建聊天窗口
const openChat = async (fan: FansList) => {
  if (fan.chain_id === fansId.value) {
    return;
  }
  clearInterval(timer.value);
  clearInterval(fansTimer.value);
  chatMessages.value = []; // 清空聊天记录
  chatInfo.fanAccount = fan.account;
  fansId.value = fan.chain_id;

  // 刷新粉丝列表
  fetchFans();
  const data = {
    chain_id: fan.chain_id,
    account: chatInfo.userAccount,
    fans_account: chatInfo.fanAccount,
  }
  try {
    const res = await createChatApi(data);
    if (res.code === 0) {
      chatInfo.chat_id = res.data.chat_id;
      fetchChatHistory();
      timer.value = setInterval(async () => {
        timerQuertHistory()
      }, 20000)

    }
  } catch (error) {
    console.error('获取聊天记录失败:', error);
  }
  // activeChat.value = fan;
};

// 关闭聊天窗口
const closeChat = () => {
  // activeChat.value = null;
  chatWindowShow.value = false;
  clearInterval(timer.value);
  clearInterval(fansTimer.value);
};



const recentOpenChat = async (user: RecentChats) => {
  fansListShow.value = false;
  if (user.chain_id === fansId.value) {
    return;
  }
  clearInterval(timer.value);
  clearInterval(fansTimer.value);
  chatInfo.userAccount = user.user_account;
  chatInfo.fanAccount = user.fan_account;
  fansId.value = user.chain_id;

  const data = {
    chain_id: user.chain_id,
    account: chatInfo.userAccount,
    fans_account: chatInfo.fanAccount,
  }
  try {
    const res = await createChatApi(data);
    if (res.code === 0) {
      chatInfo.chat_id = res.data.chat_id;
      fetchChatHistory();
      timer.value = setInterval(async () => {
        timerQuertHistory()
      }, 20000)
    }
  } catch (error) {
    console.error('获取聊天记录失败:', error);
    chatInfo.userAccount = '';
    chatInfo.fanAccount = '';
    fansId.value = '';
  }

};
// 发送消息
const sendMessage = async () => {
  if (chatInfo.message.trim()) {
    console.log(chatInfo);
    try {
      const res = await sendMessageApi(chatInfo);
      console.log(res);
      if (res.code === 0) {
        chatMessages.value.push(res.data.message)
        console.log(chatMessages.value);
        chatInfo.message = ''
        // if (chatContentRef.value) {
        //   chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight;
        // }
        nextTick(() => {
          if (chatContentRef.value) {
            chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight;
          }
        });
      }
    } catch (error) {
      console.error('发送失败', error);
    }
  }
};

const recentChats = ref<RecentChats[]>([]);
const fetchRecentChats = async () => {
  // 判断索引在不在列表里面 如果不在就不管，就添加进去
  try {
    const data = {
      pageNum: 1,
      pageSize: 10,
    }
    const res = await getRecentChatsApi(data);
    if (res.code === 0) {
      recentChats.value = res.data.recent_chats;
    }
  } catch (error) {
    clearInterval(timer.value);
  }

}
const recentTimer = ref<ReturnType<typeof setInterval> | null>(null)
const pollingRecentRecord = async () => {
  recentTimer.value = setInterval(() => {
    fetchRecentChats();
  }, 5000);
};
// 获取头像
const getAvatar = (id: number | string) => {
  // 这里可以根据 id 返回不同的头像，目前用占位图
  return `https://ui-avatars.com/api/?name=${typeof id === 'string' ? id : 'User'}&background=random`;
};
onUnmounted(() => {
  // 组件销毁时清除定时器
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null; // 确保重置为 null
  }
  if (fansTimer.value) {
    clearInterval(fansTimer.value);
    fansTimer.value = null; // 确保重置为 null
  }
  if (recentTimer.value) {
    clearInterval(recentTimer.value);
    recentTimer.value = null; // 确保重置为 null
  }
});



onMounted(() => {
  fetchUsers();
  fetchRecentChats();
  pollingRecentRecord();
});
</script>

<!-- ... existing code ... -->
<!-- ... existing code ... -->
<style scoped>
.scrollable {
  height: 100%;
  overflow-y: auto;
}

.chat-container {
  display: flex;
  height: calc(100vh - 64px - 40px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-list-section,
.fan-list-section {
  flex: 1;
  border-right: 1px solid #e6e6e6;
  padding: 24px;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.chat-window {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
}

.user-list,
.fan-list {
  list-style: none;
  padding: 0;
}

.user-item {
  padding: 16px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;

}

.user-item span {
  margin-left: 15px;
}

.fan-item {
  padding: 16px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.recent_item {
  width: 100%;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}


.fan-info-left {
  display: flex;
  align-items: center;
}

.fan-info-left span {
  margin-left: 15px;
}

.read {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}

.user-item:hover,
.fan-item:hover {
  background-color: #e0e0e0;
}


.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.avatar-message {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-name,
.fan-name {
  font-size: 1.1rem;
  color: #333;
}

.chat-header {
  padding: 16px 24px;
  background-color: #fff;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #e6e6e6;
  /* 确保头部不被压缩 */
  flex-shrink: 0;
}

.chat-header button {
  background-color: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s;
}

.chat-header button:hover {
  color: #333;
}

.chat-content {
  /* 让聊天内容区域占据除头部和输入框外的所有剩余空间 */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding: 24px;
  overflow-y: auto;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  max-width: 80%;
}

.message.me {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message.me .avatar-message {
  margin-left: 8px;
  margin-right: 0;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 1rem;
  line-height: 1.4;
}

.message.me .message-content {
  background-color: #0084ff;
  color: white;
}

.message.other .message-content {
  background-color: #fff;
  color: #333;
}

.chat-input {
  display: flex;
  padding: 16px 24px;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  /* 确保输入框不会被挤压 */
  flex-shrink: 0;
}

.chat-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 24px;
  margin-right: 12px;
  font-size: 1rem;
}

.chat-input input:focus {
  outline: none;
  border-color: #0084ff;
}

.chat-input button {
  padding: 12px 24px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #0069d9;
}
</style>
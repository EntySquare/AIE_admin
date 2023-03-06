<template>
  <div style="padding: 20px">
    <div class="whole">
      <div class="title">账户列表</div>
      <a-divider/>
      <div class="arrange">
        <div ></div>
        <a-input style="width: 350px;" placeholder="手机号,昵称"></a-input>
        <a-button class="search" type="primary"><icon-search :size="20" style="margin-right: 8px"/>搜索</a-button>
        <a-button class="resetting"><icon-loop :size="20" style="margin-right: 8px"/>重置</a-button>
      </div>
      <a-table :columns="columns" :data="data">
        <template #optional="{ record }">
          <a-button @click="$modal.info({ title:'Name', content:record.name })">详细</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";

  export default {
    name: 'Index',
    setup() {
      const show = ref(true)
      const columns = [{
        title: '所属用户',
        dataIndex: 'name',
      }, {
        title: '余额',
        dataIndex: 'salary',
      }, {
        title: '可用余额',
        dataIndex: 'address',
      }, {
        title: '冻结金额',
        dataIndex: 'email',
      }, {
        title: '操作',
        slotName: 'optional'
      }];
      const data = [{
        key: '1',
        name: 'Jane Doe',
        first: 'Jane',
        last: 'Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com'
      }, {
        key: '2',
        name: 'Alisa Ross',
        first: 'Alisa',
        last: 'Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com'
      }, {
        key: '3',
        name: 'Kevin Sandra',
        first: 'Kevin',
        last: 'Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com'
      }, {
        key: '4',
        name: 'Ed Hellen',
        first: 'Ed',
        last: 'Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com'
      }, {
        key: '5',
        name: 'William Smith',
        first: 'William',
        last: 'Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
      }];

      return {
        columns,
        data,
        show
      }
    },
  };
</script>

<style scoped>

.whole {
  background: white;
  padding: 15px;

}

.title{
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}



.arrange{
  display: flex;
  margin-bottom: 30px;
}

.search{
  margin-left: 40px;
  border-radius: 4px;
}

.resetting{
  margin-left: 40px;
  border-radius: 4px;

}

</style>

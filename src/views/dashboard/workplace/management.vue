<template>
  <div class="container">
    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        等级提点
<!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          1级节点奖励: {{ (mapInfo['1Commission'] / 10000) * 100}}%

        </div>

<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['1Commission']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('1Commission',mapInfo['1Commission'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          2级节点奖励: {{ (mapInfo['2Commission'] / 10000) * 100}}%
        </div>

<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['2Commission']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('2Commission',mapInfo['2Commission'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          3级节点奖励: {{ (mapInfo['3Commission'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['3Commission']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('3Commission',mapInfo['3Commission'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          4级节点奖励: {{ (mapInfo['4Commission'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['4Commission']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('4Commission',mapInfo['4Commission'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          5级节点奖励: {{ (mapInfo['5Commission'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['5Commission']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('5Commission',mapInfo['5Commission'])">保存</a-button>-->
      </div>

    </div>
    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        平级提点
<!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          1级平级奖励: {{ (mapInfo['1EqualLevel'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['1EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('1EqualLevel',mapInfo['1EqualLevel'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          2级平级奖励: {{ (mapInfo['2EqualLevel'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['2EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('2EqualLevel',mapInfo['2EqualLevel'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          3级平级奖励: {{ (mapInfo['3EqualLevel'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['3EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('3EqualLevel',mapInfo['3EqualLevel'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          4级平级奖励: {{ (mapInfo['4EqualLevel'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['4EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('4EqualLevel',mapInfo['4EqualLevel'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          4级平级奖励: {{ (mapInfo['4EqualLevel'] / 10000) * 100}}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['5EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('5EqualLevel',mapInfo['5EqualLevel'])">保存</a-button>-->
      </div>

    </div>

    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        升级要求 USDT
<!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        1级:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['1LevelUp']" :style="{width:'100px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('1LevelUp',mapInfo['1LevelUp'])">保存</a-button>
      </div>

      <div class="container-padding">
        2级:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['2LevelUp']" :style="{width:'100px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('2LevelUp',mapInfo['2LevelUp'])">保存</a-button>
      </div>

      <div class="container-padding">
        3级:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['3LevelUp']" :style="{width:'100px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('3LevelUp',mapInfo['3LevelUp'])">保存</a-button>
      </div>

      <div class="container-padding">
        4级:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['4LevelUp']" :style="{width:'100px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('4LevelUp',mapInfo['4LevelUp'])">保存</a-button>
      </div>

      <div class="container-padding">
        5级:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['5LevelUp']" :style="{width:'100px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('5LevelUp',mapInfo['5LevelUp'])">保存</a-button>
      </div>

    </div>

    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        整机数据
        <text>总算力会整除10000</text>
      </div>

      <div class="container-padding">
        <div class="container-padding">
          算力: {{ (mapInfo['type2'] / 10000) }}
        </div>
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type2']" :style="{width:'150px'}" placeholder="Please Enter"
                          class="input-demo" :min="0" />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type2',mapInfo['type2'])">保存</a-button>
      </div>

      <div class="container-padding">
        价格U:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type2Usdt']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0" :max="10000" />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type2Usdt',mapInfo['type2Usdt'])">保存</a-button>
      </div>

      <div class="container-padding">
        天数:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type2day']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0" :max="10000" />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type2day',mapInfo['type2day'])">保存</a-button>
      </div>

<!--      <div class="container-padding">-->
<!--        4级平级奖励:-->
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['4EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('4EqualLevel',mapInfo['4EqualLevel'])">保存</a-button>-->
<!--      </div>-->

<!--      <div class="container-padding">-->
<!--        5级平级奖励:-->
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['5EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('5EqualLevel',mapInfo['5EqualLevel'])">保存</a-button>-->
<!--      </div>-->

    </div>

    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        社区合伙人
        <!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        赠送算力:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type3Power']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type3Power',mapInfo['type3Power'])">保存</a-button>
      </div>

      <div class="container-padding">
        购买价格U:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type3Usdt']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type3Usdt',mapInfo['type3Usdt'])">保存</a-button>
      </div>

      <div class="container-padding">
        赠送级别:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type3Level']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type3Level',mapInfo['type3Level'])">保存</a-button>
      </div>

      <div class="container-padding">
        赠送权重:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type3Weight']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type3Weight',mapInfo['type3Weight'])">保存</a-button>
      </div>


    </div>

    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        联合创始人
        <!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        赠送算力:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type4Power']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type4Power',mapInfo['type4Power'])">保存</a-button>
      </div>

      <div class="container-padding">
        购买价格U:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type4Usdt']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type4Usdt',mapInfo['type4Usdt'])">保存</a-button>
      </div>

      <div class="container-padding">
        赠送级别:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type4Level']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type4Level',mapInfo['type4Level'])">保存</a-button>
      </div>

      <div class="container-padding">
        赠送权重:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type4Weight']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0"  />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type4Weight',mapInfo['type4Weight'])">保存</a-button>
      </div>


    </div>

    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        云算力数据
<!--        <text>总算力会整除10000</text>-->
      </div>

      <div class="container-padding">
<!--        300～500U:-->
        <div v-for="(item, index) in type1Info" :key="index">
          价格U：
          <a-space direction="vertical" size="large">
            <a-input-number v-model="item.num" :style="{width:'70px'}" placeholder="Please Enter"
                            class="input-demo" :min="0" />
          </a-space>
          算力：
          <a-space direction="vertical" size="large">
            <a-input-number v-model="item.price" :style="{width:'70px'}" placeholder="Please Enter"
                            class="input-demo" :min="0" />
          </a-space>
        </div>
        <div class="container-padding">
        </div>
        <a-button type="primary" @click="updateType1Info(type1Info)">保存云算力数据</a-button>

<!--        <a-button type="primary" @click="updateMapInfo('type2',mapInfo['type2'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        天数:
        <a-space direction="vertical" size="large">
          <a-input-number v-model="mapInfo['type1day']" :style="{width:'80px'}" placeholder="Please Enter"
                          class="input-demo" :min="0" :max="10000" />
        </a-space>
        <a-button type="primary" @click="updateMapInfo('type1day',mapInfo['type1day'])">保存</a-button>
      </div>

      <!--      <div class="container-padding">-->
      <!--        4级平级奖励:-->
      <!--        <a-space direction="vertical" size="large">-->
      <!--          <a-input-number v-model="mapInfo['4EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
      <!--                          class="input-demo" :min="0" :max="10000" />-->
      <!--        </a-space>-->
      <!--        <a-button type="primary" @click="updateMapInfo('4EqualLevel',mapInfo['4EqualLevel'])">保存</a-button>-->
      <!--      </div>-->

      <!--      <div class="container-padding">-->
      <!--        5级平级奖励:-->
      <!--        <a-space direction="vertical" size="large">-->
      <!--          <a-input-number v-model="mapInfo['5EqualLevel']" :style="{width:'80px'}" placeholder="Please Enter"-->
      <!--                          class="input-demo" :min="0" :max="10000" />-->
      <!--        </a-space>-->
      <!--        <a-button type="primary" @click="updateMapInfo('5EqualLevel',mapInfo['5EqualLevel'])">保存</a-button>-->
      <!--      </div>-->

    </div>


    <div class="block">
      <div class="centered-text">
        <!-- 这里是您需要居中渲染的文本 -->
        直推间推提点
<!--        <text>会整除10000</text>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          直推: {{ (mapInfo['pushPower'] / 10000) * 100 }}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['pushPower']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('pushPower',mapInfo['pushPower'])">保存</a-button>-->
      </div>

      <div class="container-padding">
        <div class="container-padding">
          间推: {{ (mapInfo['indirectPower'] / 10000) * 100 }}%
        </div>
<!--        <a-space direction="vertical" size="large">-->
<!--          <a-input-number v-model="mapInfo['indirectPower']" :style="{width:'80px'}" placeholder="Please Enter"-->
<!--                          class="input-demo" :min="0" :max="10000" />-->
<!--        </a-space>-->
<!--        <a-button type="primary" @click="updateMapInfo('indirectPower',mapInfo['indirectPower'])">保存</a-button>-->
      </div>


    </div>



  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getKeyValueMap, updateKeyValueMap, getType1InfoApi, updateType1InfoApi } from "@/api/user";

const mapInfo = ref([] as any);
const type1Info = ref([] as any);

const getMapInfo = async () => {
  const res = await getKeyValueMap();
  mapInfo.value = res.json;

};

const getType1List = async () => {
  const res = await getType1InfoApi();
  type1Info.value = res.json;
}

const updateMapInfo = async (keys:string, values:number)  => {
  const res = await updateKeyValueMap(keys,values);

}

const updateType1Info = async (data: any) => {
  const res = await updateType1InfoApi(data);
}

onMounted(() => {
  getMapInfo();
  getType1List();
});
</script>

<style lang="less" scoped>
.container {
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.block {
  flex: 1 1 200px; /* 初始宽度为200px，自动填充 */
  min-width: 250px; /* 最小宽度 */
  min-height: 100px; /* 最小高度 */
  background-color: lightblue;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 20px;
}

.centered-text {
  text-align: center;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
  color: red;
}

.container-padding {
  padding-bottom: 10px;
}

@media (max-width: 600px) {
  /* 在小于600px的分辨率下，每行只放置一个区域 */
  .block {
    flex-basis: 100%;
  }
}

@media (max-width: 330px) {
  /* 在小于600px的分辨率下，每行只放置一个区域 */
  .block {
    flex-basis: 100%;
    padding: 10px;
  }
}
</style>
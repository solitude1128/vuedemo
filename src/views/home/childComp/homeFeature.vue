<template>
  <!-- 用于关联feature组件 -->
  <feature :iscopy="false" :feature="cFea">
    <feature-item v-for="(item,index) in cFea" :key="index">
      <li v-for="(i,j) in item" :key="j">
        <a :href="i.imgHref">
          <img :src="$store.state.path+'/feature/'+i.imgsrc" width="50%" />
          <p>{{i.Title}}</p>
        </a>
      </li>
      <li v-if="index == cFea.length-1" @click="jumpPage('/af')">
        <img :src="$store.state.path+'/feature/'+'20.png'" width="50%" />
        <p>全部</p>
      </li>
    </feature-item>
  </feature>
</template>

<script>
import { Feature, FeatureItem } from "components/common/feature";
export default {
  name: "homeFeature",
  components: {
    Feature,
    FeatureItem,
  },
  props: {
    cFea: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
#featureBox {
  margin: 3% 0;
  li {
    width: 20%;
    font-size: 12px;
  }
}
</style>

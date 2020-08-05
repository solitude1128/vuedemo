<template>
  <!-- 用于关联feature组件 -->
  <feature :iscopy="false">
    <feature-item v-for="(img,index) in cFea" :key="index">
      <img :src="path+img" width="100%" />
    </feature-item>
  </feature>
</template>

<script>
// 当前页面使用feature功能组件
import { Feature, FeatureItem } from "components/common/feature";
export default {
  name: "dFeature",
  components: {
    Feature,
    FeatureItem,
  },
  props: {
    cFea: Array,
  },
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/goods/",
    };
  },
};
</script>

<style lang="less">
#featureBox {
  margin: 0;
  ul {
    margin: 0;
  }
  li {
    width: 20%;
    font-size: 12px;
  }
}
</style>

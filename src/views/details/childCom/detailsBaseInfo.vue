<template>
  <div class="detailsBaseInfo" v-if="Object.keys(goodsInfo).length !== 0">
    <div>原价:{{goodsInfo.oldPrice}}</div>
    <div>现价:{{goodsInfo.newPrice}}</div>
    <div>
      阿巴阿巴:
      <span v-for="(item,index) in goodsInfo.imgList" :key="index">{{item}}</span>
    </div>
    <div>名字:{{goodsInfo.title}}</div>
  </div>
</template>

<script>
export default {
  name: "detailsBaseInfo",
  created() {},
  data() {
    return {
      goodsInfo: {
        oldPrice: "200",
        newPrice: "",
        imgList: [1, 2, 3, 4, 5],
        title: "这是一件衣服这是一件衣服这是一件衣服这是一件衣服这是一件衣服 ",
      },
    };
  },
  components: {},
  methods: {},
  computed: {},
  mounted() {},
  activated() {},
  deactivated() {},
};
</script>
<style lang='less' scoped>
.detailsBaseInfo {
  div {
    height: 200px;
    border-bottom: 5px solid red;
    margin-bottom: 10px;
  }
}
</style>

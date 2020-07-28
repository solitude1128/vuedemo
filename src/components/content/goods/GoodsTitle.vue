<template>
  <div class="goodsTitle">
    <div class="title" v-for="(i,key) in goodsT" :key="key" @click="changeItem(key)">
      <img v-if="i.img" :src="i.img" />
      <h2 v-else :class="{active:key==item}">{{key}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsTitle",
  props: {
    goodsT: {
      type: Object,
      default() {
        return {};
      },
    },
    isActive: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      item: this.isActive,
    };
  },
  methods: {
    changeItem(a) {
      this.item = a;
    },
  },
  mounted() {
    console.log(this.isgtFixed);
  },
};
</script>
<style lang='less' scoped>
.goodsTitle {
  display: flex;
  width: 98%;
  margin: 0 auto;
  .title {
    width: 50%;
    img {
      width: 200%;
    }
    h2 {
      line-height: 60px;
      margin: 0;
    }
    .active {
      color: red;
    }
  }
}
</style>

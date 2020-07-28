<template>
  <div id="tabControl">
    <div :class="{crosswise:isDirection,lengthways:!isDirection}">
      <slot></slot>
    </div>
    <div
      v-for="i in titleArr"
      :key="i.c1_id"
      @click="itemClick(i.c1_id)"
      :class="{crosswise:isDirection,lengthways:!isDirection,active:itemIndex == i.c1_id}"
    >
      <span>{{i.c1_name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titleArr: {
      type: Array,
      default() {
        return [];
      },
    },
    isDirection: {
      type: Boolean, //true 代表独占一行 false 代表不独占一行
      default: false,
    },
  },
  data() {
    return {
      itemIndex: 0,
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(index) {
      //  在子组件中如果想使用父组件传递过来的事件,需要通过使用$emit
      //   这里要是使用$emit写,使用的组件上需要写@tabClick="函数名"
      this.$emit("tabClick", index);
      // $parent 直接使用父组件的事件(只能找到上一个父元素)
      // this.$parent.tcClick(index);
      this.itemIndex = index;
    },
  },
};
</script>
<style lang='less' scoped>
#tabControl {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  line-height: 40px;
  .crosswise {
    width: 25%;
  }
  .lengthways {
    width: 96%;
    margin: 0 auto;
  }
  .active {
    background-color: #fff;
    color: #c82519;
  }
}
</style>

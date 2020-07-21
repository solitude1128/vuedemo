<template>
  <div :id="controlId" class="tabControl">
    <div>
      <slot></slot>
    </div>
    <div
      v-for="i in titleArr"
      :key="i.c1_id"
      @click="itemClick(i.c1_id)"
      :class="{active:itemIndex == i.c1_id}"
    >
      <span>{{i.c1_name}}</span>
      <slot name="subName"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    controlId: {
      type: String,
      default: "tabControl"
    },
    titleArr: {
      type: Array,
      default() {
        return [];
      }
    }
    // direction: {
    //   type: "String",
    //   default: "lengthways" //lengthways --- 纵向 crosswise --- 横向
    // }
  },
  data() {
    return {
      itemIndex: 0
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
    }
  }
};
</script>
<style lang='less' scoped>
.tabControl {
  width: 100%;
  font-size: 12px;
  line-height: 40px;
  .active {
    background-color: #fff;
    color: #c82519;
  }
}
</style>

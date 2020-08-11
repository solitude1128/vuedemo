<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon">用来插入图片</slot>
    </div>
    <div v-else>
      <slot name="item-icon-active">用来插入选中图片</slot>
    </div>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    //接收父组件传递
    path: {
      type: String,
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  methods: {
    itemClick() {
      if (this.path == this.$store.state.redundancy) return;
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="less" scoped>
#tab-bar .tab-bar-item {
  flex: 1;
  img {
    width: 80%;
    vertical-align: middle;
  }
}
</style>
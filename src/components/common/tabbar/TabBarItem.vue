<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon">用来插入图片</slot>
    </div>
    <div v-else>
      <slot name="item-icon-active">用来插入选中图片</slot>
    </div>
    <div :class="{active:isActive}">
      <slot name="item-text">用来插入名字</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    //接收父组件传递
    path: {
      type: String
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>
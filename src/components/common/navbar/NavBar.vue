<template>
  <div class="navbar">
    <div class="left">
      <slot name="left">1</slot>
    </div>
    <div class="center">
      <slot name="center">2</slot>
    </div>
    <div class="right">
      <slot name="right">3</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  line-height: 54px;
  text-align: center;
  .left,
  .right {
    width: 50px;
  }
  .center {
    flex: 1;
  }
}
</style>
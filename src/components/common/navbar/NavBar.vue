<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
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
  width: 100vw;
  position: fixed;
  top: 0;
  z-index:10;
  display: flex;
  line-height: 50px;
  background-color: #fff;
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
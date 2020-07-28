<template>
  <div id="tab-bar">
    <slot>用来插入tab-bar-item</slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style lang="less" scoped>
#tab-bar {
  display: flex;
  width: 100%;
  // height: 50px;
  line-height: 30px;
  padding: 1% 0;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid rgb(200, 200, 200);
}
</style>
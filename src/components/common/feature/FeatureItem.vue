<template>
  <ul class="item">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "featureItem"
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
}
</style>

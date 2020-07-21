<template>
  <div id="tabContent">
    <div class="tabTitle">
      <slot name="tabTitle"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabContent",
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
#tabContent {
  width: 100%;
  justify-content: center;
  .tabTitle {
    display: flex;
  }
}
</style>

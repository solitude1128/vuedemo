<template>
  <div id="orderShop">
    {{shop}}
    <div class="header"></div>
    <div class="contentBox">
      <div class="imgBox">
        <slot name="imgBox"></slot>
      </div>
      <div class="shopBox">
        <slot name="shopBox"></slot>
      </div>
    </div>
    <div class="otherBox">
      <slot name="otherBox"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderShop",
  props: {
    shop: null,
  },
  created() {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {},
  mounted() {},
  activated() {},
  deactivated() {},
};
</script>
<style lang='less' scoped>
#orderShop {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  > div:not(:last-child) {
    padding: 0 10px;
    border-bottom: 1px solid #eee;
  }
  .header {
    text-align: left;
    line-height: 40px;
    font-size: 16px;
  }
  .contentBox {
    display: flex;
    padding-top: 20px !important;
    .imgBox {
      flex: 2;
    }
    .shopBox {
      text-align: left;
      flex: 6;
    }
  }
}
</style>

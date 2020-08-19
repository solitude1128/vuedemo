<template>
  <div id="pok">
    <h1>支付成功</h1>
    <p>
      <router-link to="/home">返回首页</router-link>
      <router-link to="/allOrder">我的订单</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Pok",
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
a {
  margin: 20px;
  font-size: 20px;
}
</style>

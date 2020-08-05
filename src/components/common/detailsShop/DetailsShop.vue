<template>
  <div class="detailsShop">
    <dl>
      <dt>
        <slot name="shopDT"></slot>
      </dt>
      <dd>
        <slot></slot>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "detailsShop",
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
.detailsShop {
  padding: 15px;
  background-color: #fff;
  color: black;
  border-radius: 10px;
  overflow: hidden;
  margin: 15px 0;
  dl {
    display: flex;
    margin: 0;
    dt {
      flex: 1;
      font-weight: bold;
    }
    dd {
      flex: 10;
      font-size: 12px;
      margin-left: 15px;
      overflow: hidden;
      text-align: left;
      p {
        margin: 0;
        padding-top: 1%;
        padding-bottom: 4%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .activeBox {
          border: 1px solid red;
          color: red;
          padding: 0 1%;
          margin-right: 1%;
        }
      }
    }
  }
}
</style>

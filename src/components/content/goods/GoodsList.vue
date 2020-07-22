<template>
  <div class="goodsList">
    <a
      href="JavaScript:;"
      :class="{transverse:isDirection,portrait:!isDirection}"
      v-for="(i,key) in cgoods"
      :key="key"
    >
      <img :src="path+i.c3_img" alt width="80%" />
      <p>{{i.c3_name}}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  data() {
    return {};
  },
  props: {
    cgoods: {
      //goods[xxx].list是一个数组
      type: Array,
      default() {
        return [];
      }
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image/jd_category/"
    },
    isDirection: {
      type: Boolean, //true 代表独占一行 false 代表不独占一行
      default: true
    }
  },
  components: {},
  computed: {},
  methods: {}
};
</script>
<style lang='less' scoped>
.goodsList {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  a {
    background-color: #fff;
    border: 1px solid #eeeeee;
  }
  .transverse {
    width: 96%;
  }
  .portrait {
    width: 48%;
  }
}
</style>

<template>
  <tab-content>
    <h2 slot="tabTitle">
      <img
        src="https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"
        alt
        width="95%"
      />
    </h2>
    <ul class="tabBody" v-if="tabType">
      <li v-for="(i,index) in goods[tabType].list" :key="index">
        <a href="JavaScript:;">
          <img :src="path+i.c3_img" alt width="80%" />
          <p>{{i.c3_name}}</p>
        </a>
      </li>
    </ul>
  </tab-content>
</template>

<script>
import tabContent from "components/common/tabcontent/TabContent";
export default {
  name: "home-tab-content",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/jd_category/"
    };
  },
  props: {
    goods: null,
    tabType: null
  },
  components: {
    tabContent
  }
};
</script>
<style lang='less' scoped>
h2 {
  flex: 1;
  margin: 0;
}
.tabBody {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 3%;
  li {
    width: 50%;
  }
}
</style>

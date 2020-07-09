<template>
  <div id="category">
    <h2>分类</h2>
    <router-link v-for="(i,index) in arr" :key="index" :to="'/category/'+i">{{i}}</router-link>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "category",
  data() {
    return {
      arr: ["phone", "idol"],
      details: {
        phone: ["华为", "vivo", "OPPO"]
      }
    };
  }
};
</script>
<style scoped>
a {
  padding: 10px;
  margin: 15px;
  background-color: rgb(228, 228, 228);
}
</style>
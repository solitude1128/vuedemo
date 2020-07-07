<template>
  <div>
    <h2>这是推荐的手机页面</h2>
    <h3>这是从父组件取的数据</h3>
    <li v-for="i in phone" :key="i">{{i}}</li>
  </div>
</template>

<script>
export default {
  name: "phone",
  data() {
    return {
      phone: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter-组件守卫导航第一");
    next(vm => {
      console.log(vm.$parent.details.phone);
      vm.phone = vm.$parent.details.phone;
    });
  }
};
</script>
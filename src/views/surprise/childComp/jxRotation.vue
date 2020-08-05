<template>
  <rotation obj="rotation">
    <rotation-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.href">
        <img :src="$store.state.path+'/banner/'+item.src" @load="imageLoad" />
      </a>
    </rotation-item>
  </rotation>
</template>

<script>
import Rotation from "components/common/rotation/Rotation";
import RotationItem from "components/common/rotation/RotationItem";
export default {
  name: "jxRotation",
  components: {
    Rotation,
    RotationItem,
  },
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    imageLoad() {
      this.$emit("bannerImgLoad");
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 93%;
  border-radius: 10px;
}
</style>
<template>
  <div :id="contId">
    <slot></slot>
    <div v-if="cIndex===0">
      <dl>
        <dt>{{cIndex}}</dt>
      </dl>
    </div>
    <div v-else>
      <dl>
        <dt>{{cIndex}}</dt>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabContent",
  props: {
    contId: {
      type: String,
      default: "tabContent",
    },
    cIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
</style>

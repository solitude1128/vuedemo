<template>
  <div :id="id">
    <div class="feature" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
      <slot></slot>
    </div>
    <div class="icator" v-if="showIcator">
      <slot name="icator"></slot>
    </div>
    <!-- 放小圆点 索引指示器 -->
    <div class="indexIcator">
      <slot name="indexIcator">
        <div
          v-for="(item,index) in itemLen"
          :key="index"
          class="round-item"
          :class="{active:index === currentIndex}"
          @click="indexIcatorClick(index)"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "feature",
  props: {
    id: {
      type: String,
      default: "featureBox"
    },
    showIndexIcator: {
      type: Boolean,
      default: true
    },
    showIcator: {
      type: Boolean,
      default: true
    },
    feature: {
      type: Array,
      default() {
        return [];
      }
    },
    animateDuration: {
      type: Number,
      default: 300 //移动基数
    },
    moveBase: {
      type: Number,
      default: 0.3 //移动基数
    },
    iscopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemLen: 0,
      totalWidth: 0,
      feaStyle: {},
      currentIndex: 0,
      touch: false,
      startX: 0, //拖拽的起始坐标点
      currentX: 0, //记录移动后的坐标点
      distance: 0 //记录两点的距离
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleDom();
    }, 500);
  },
  methods: {
    handleDom() {
      let divEl = document.querySelector(`#${this.id}`);
      divEl.style.position = "relative";
      divEl.style.overflow = "hidden";
      let feaEl = divEl.querySelector(`.feature`);
      let itemEls = feaEl.querySelectorAll(".item");
      this.itemLen = itemEls.length;
      this.totalWidth = feaEl.offsetWidth;
      this.feaStyle = feaEl.style;
      this.feaStyle.transition = `transform ${this.animateDuration}ms`;
      this.setTransfrom(0);
    },
    setTransfrom(position) {
      this.feaStyle.transform = `translateX(${position}px)`;
      this.feaStyle["-webkit-transform"] = `translateX(${position}px)`;
      this.feaStyle["-ms-transform"] = `translateX(${position}px)`;
    },
    // 移动正确位置
    scrollPosition(cp) {
      this.touch = true;
      this.setTransfrom(cp);
      this.touch = false;
    },
    touchStart(e) {
      if (this.touch) return;
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      if (!this.iscopy) {
        if (this.distance > 0 && this.currentIndex == 0) {
          // 第一页不能向右滑动了
          return;
        }
        if (this.distance < 0 && this.currentIndex == this.itemLen - 1) {
          // 第二页不能向左滑动了
          return;
        }
      }
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      this.setTransfrom(moveDistance);
    },
    touchEnd() {
      let currentMove = Math.abs(this.distance);
      // 判断最终的距离
      if (this.iscopy) {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.totalWidth * this.moveBase
        ) {
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.totalWidth * this.moveBase
        ) {
          this.currentIndex++;
        }
      } else {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.totalWidth * this.moveBase &&
          this.currentIndex == this.itemLen - 1
        ) {
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.totalWidth * this.moveBase &&
          this.currentIndex == 0
        ) {
          this.currentIndex++;
        }
      }
      this.setTransfrom(-this.currentIndex * this.totalWidth);
    },
    indexIcatorClick(index) {
      this.currentIndex = index;
      this.setTransfrom(-this.currentIndex * this.totalWidth);
    }
  }
};
</script>

<style lang="less" scoped>
.feature {
  display: flex;
}
.indexIcator {
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center;
  width: 100%;
  .round-item {
    width: 10px;
    height: 4px;
    border-radius: 5px;
    background-color: rgba(151, 151, 151, 0.486);
    font-size: 10px;
    margin: 5px;
  }
  .round-item.active {
    background-color: red;
  }
}
</style>
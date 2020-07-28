<template>
  <div :id="id">
    <div class="feature" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
      <slot></slot>
    </div>
    <!-- 放小圆点 索引指示器 -->
    <div class="indexIcator" v-if="feature.length > 1">
      <slot name="indexIcator">
        <div
          v-for="(item,index) in itemLen"
          :key="index"
          class="round-item"
          :class="{active:index === icatorIndex}"
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
      default: "featureBox",
    },
    showIcator: {
      type: Boolean,
      default: true,
    },
    feature: {
      type: Array,
      default() {
        return [];
      },
    },
    animateDuration: {
      type: Number,
      default: 300, //移动基数
    },
    moveBase: {
      type: Number,
      default: 0.3, //移动基数
    },
    iscopy: {
      //是否允许拷贝
      type: Boolean,
      default: false,
    },
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
      distance: 0, //记录两点的距离
      icatorIndex: 0,
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
      // 根据传递的参数,判断是否需要复制子对象
      if (this.iscopy && itemEls.length > 1) {
        let cloneFirst = itemEls[0].cloneNode(true);
        let cloneLast = itemEls[itemEls.length - 1].cloneNode(true);
        feaEl.appendChild(cloneFirst);
        feaEl.insertBefore(cloneLast, itemEls[0]);
        this.currentIndex = 1;
      }
      this.itemLen = itemEls.length;
      this.totalWidth = feaEl.offsetWidth;
      this.feaStyle = feaEl.style;
      this.setTransfrom(-this.currentIndex * this.totalWidth);
    },
    setTransfrom(position) {
      this.feaStyle.transform = `translateX(${position}px)`;
      this.feaStyle["-webkit-transform"] = `translateX(${position}px)`;
      this.feaStyle["-ms-transform"] = `translateX(${position}px)`;
    },
    // 移动正确位置
    scrollPosition(cp) {
      this.touch = true;
      this.feaStyle.transition = `transform ${this.animateDuration}ms`;
      this.setTransfrom(cp);
      if (this.iscopy) this.checkPosition();
      this.touch = false;
    },
    // 判断当前图片的位置(校正位置)
    checkPosition() {
      setTimeout(() => {
        // 把动画时间设置为0,瞬间转换图片
        this.feaStyle.transition = "0ms";
        if (this.currentIndex >= this.itemLen + 1) {
          this.currentIndex = 1;
          // this.icatorIndex = 0;
          this.setTransfrom(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // 左右滑动时会用到这里
          this.icatorIndex = 1;
          this.currentIndex = this.itemLen;
          this.setTransfrom(-this.currentIndex * this.totalWidth);
        }
      }, this.animateDuration);
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
          this.currentIndex <= 0 ? (this.icatorIndex = 1) : this.icatorIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.totalWidth * this.moveBase
        ) {
          this.currentIndex++;
          this.currentIndex >= this.itemLen + 1
            ? (this.icatorIndex = 0)
            : this.icatorIndex++;
        }
        this.scrollPosition(-this.currentIndex * this.totalWidth);
      } else {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.totalWidth * this.moveBase &&
          this.currentIndex != 0
        ) {
          this.currentIndex--;
          this.icatorIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.totalWidth * this.moveBase &&
          this.currentIndex != this.itemLen - 1
        ) {
          // 如果向左移动 && 移动基数 > 设定值 && 不是最后一个盒子
          this.currentIndex++;
          this.icatorIndex++;
        }
      }
      this.setTransfrom(-this.currentIndex * this.totalWidth);
    },
  },
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
<template>
  <div id="rotationBox">
    <!-- 放图片 -->
    <div
      :class="obj"
      class="rotation"
      @touchstart="touchStart"
      @touchend="touchEnd"
      @touchmove="touchMove"
    >
      <slot></slot>
    </div>
    <!-- 左右按钮 如果需要的时候,给插槽内放置左右按钮即可 -->
    <div class="icator" v-if="showIcator && slideCount>1">
      <slot name="icator"></slot>
    </div>
    <!-- 放小圆点 索引指示器 -->
    <div class="indexIcator" v-if="showIndexIcator && slideCount>1">
      <slot name="indexIcator">
        <div
          v-for="(item,index) in slideCount"
          :key="index"
          class="round-item"
          :class="{active:index === currentIndex-1}"
          @click="indexIcatorClick(index)"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
// 轮播图的实际操作事件,要在当前的rotation组件中创建
export default {
  name: "rotation",
  props: {
    obj: {
      type: String,
      default: undefined
    },
    interval: {
      type: Number,
      default: 3000 //轮播动画的时间,假设每三秒执行一次
    },
    moveBase: {
      type: Number,
      default: 0.3 //移动基数
    },
    animateDuration: {
      type: Number,
      default: 300 //移动基数
    },
    showIndexIcator: {
      type: Boolean,
      default: true
    },
    showIcator: {
      type: Boolean,
      default: true
    }
  },
  // 因为我们是封装了一个轮播图,有些特定的值,可能需要修改,所以我们需要动态的设定
  data() {
    return {
      slideCount: 0, //轮播图片的个数
      totalWidth: 0, //滚动的宽度
      currentIndex: 1, //当前的图片下标
      rotationStyle: {}, //因为要存储的是transform 有兼容问题,所以需要存多个
      scrolling: false, //轮播图是否在滚动
      playTimer: null, //接收定时器,用于定时器关闭
      startX: 0, //拖拽的起始坐标点
      currentX: 0, //记录移动后的坐标点
      distance: 0 //记录两点的距离
    };
  },
  mounted() {
    //页面渲染结束 挂载页面
    setTimeout(() => {
      // 设置dom属性
      if (this.obj) {
        this.handleDom();
        // 执行轮播定时器,轮播开始
        this.startTimer();
      }
    }, 500);
  },
  methods: {
    // 操作DOM
    handleDom() {
      // 获取页面的rotation元素
      console.log(`${this.obj}`);
      let rotationEl = document.querySelector(`.${this.obj}`);
      // 获取页面的slide元素
      let slideEls = rotationEl.querySelectorAll(".slide");
      // 保存个数
      this.slideCount = slideEls.length;
      if (this.slideCount > 1) {
        // 克隆第一张图
        // 克隆方法忘了 --- 原生js --- DOM操作
        let cloneFirst = slideEls[0].cloneNode(true);
        // 克隆最后一张图
        let cloneLast = slideEls[slideEls.length - 1].cloneNode(true);
        // 把克隆的第一张图插入图片的末尾 appendChild
        rotationEl.appendChild(cloneFirst);
        // 把克隆的最后一张图插入到图片的最前端 insertBefore 在什么之前插入什么
        rotationEl.insertBefore(cloneLast, slideEls[0]);
        // 获取滚动的宽度
        this.totalWidth = rotationEl.offsetWidth;
        // 对象赋值 两个对象用了同一个值
        this.rotationStyle = rotationEl.style;
      }
      this.setTransfrom(-this.totalWidth);
    },
    // 设置图片滚动的位置 相当于定义样式,图片的每次移动都需要样式的执行,把样式存储在data数据中
    setTransfrom(position) {
      this.rotationStyle.transform = `translateX(${position}px)`;
      this.rotationStyle["-webkit-transform"] = `translateX(${position}px)`;
      this.rotationStyle["-ms-transform"] = `translateX(${position}px)`;
    },
    // 设置轮播开始定时器
    startTimer() {
      this.playTimer = setInterval(() => {
        this.currentIndex++;
        this.scrollPosition(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    // 移动正确位置
    scrollPosition(cp) {
      this.scrolling = true;
      this.rotationStyle.transition = `transform ${this.animateDuration}ms`;
      this.setTransfrom(cp);
      this.checkPosition();
      this.scrolling = false;
    },
    stopTimer() {
      clearInterval(this.playTimer);
      // console.log("停止定时器");
    },
    // 判断当前图片的位置(校正位置)
    checkPosition() {
      setTimeout(() => {
        // 把动画时间设置为0,瞬间转换图片
        this.rotationStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransfrom(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // 左右滑动时会用到这里
          this.currentIndex = this.slideCount;
          this.setTransfrom(-this.currentIndex * this.totalWidth);
        }
      }, this.animateDuration);
    },
    // 在拖拽轮播图的时候,当当前轮播正在执行移动时,是不允许拖拽的,所以在轮播动画执行时,需要禁止拖拽
    // 开始拖拽
    touchStart(e) {
      if (this.scrolling) return;
      // 获取当前用户拖拽按下点的x坐标
      this.startX = e.touches[0].pageX;
      // 停止定时器
      this.stopTimer();
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX;
      // 获取移动前和移动后的距离差
      this.distance = this.currentX - this.startX;
      // 获取一下在手动移动前的图片位置
      let currentPosition = -this.currentIndex * this.totalWidth;
      // 当前移动的图片坐标加上移动的距离差,算出总共应该位移多少像素
      let moveDistance = this.distance + currentPosition;
      // console.log(this.distance);
      // console.log(currentPosition);
      // console.log(moveDistance);
      // 把当前算出移动后的值,设置给setTransform
      this.setTransfrom(moveDistance);
    },
    touchEnd() {
      // 获取移动的距离 一定要取正数
      let currentMove = Math.abs(this.distance);
      // 判断最终的距离
      if (this.distance == 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveBase
      ) {
        // 当结束点-起始点 > 0 则 向右移动 并且已经移动的值 > 移动基数值 图片--
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveBase
      ) {
        // 当结束点-起始点 < 0 则 向左移动  并且已经移动的值 > 移动基数值 图片++
        this.currentIndex++;
      }
      // 移动到正确的位置
      this.scrollPosition(-this.currentIndex * this.totalWidth);
      // 启用定时器
      // console.log("启用定时器");
      this.startTimer();
    },
    indexIcatorClick(index) {
      this.currentIndex = index + 1;
      this.scrollPosition(-this.currentIndex * this.totalWidth);
    }
  }
};
</script>

<style lang="less">
#rotationBox {
  overflow: hidden;
  position: relative;
  .rotation {
    display: flex;
  }
  .indexIcator {
    display: flex;
    position: absolute;
    justify-content: center;
    bottom: 5%;
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
}
</style>
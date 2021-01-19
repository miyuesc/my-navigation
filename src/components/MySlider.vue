<template>
  <div class="my-slider" :class="{ 'is-open': !mini }">
    <div class="logo"></div>
    <div class="nav-classification">
      <a
        class="nav-classification-item"
        :class="{ 'is-active': selected === i.id }"
        v-for="i in nav"
        :key="i.name"
        @click.stop="scrollToTarget(i)"
        @mouseenter="onHover = i.id"
        @mouseleave="onHover = ''"
      >
        <div class="nav-classification-item__icon">
          <svg class="iconfont" aria-hidden="true">
            <use v-bind="{ 'xlink:href': `#${i.icon}` }"></use>
          </svg>
        </div>
        <div class="nav-classification-item__name">{{ i.name }}</div>
        <transition name="fade-left">
          <div class="nav-classification-item__tooltip" v-if="mini && onHover === i.id">
<!--          <div class="nav-classification-item__tooltip">-->
            <div class="nav-classification-item__tooltip-ico"></div>
            <div class="nav-classification-item__tooltip-body">
              {{ i.name }}
            </div>
          </div>
        </transition>
      </a>
    </div>
  </div>
</template>

<script>
import { getNavigationArray } from "@/utils/bookmarks";

export default {
  name: "MySlider",
  props: {
    mini: Boolean,
  },
  data() {
    return {
      nav: [],
      selected: "",
      onHover: "",
    };
  },
  created() {
    this.nav = getNavigationArray();
    window.addEventListener("NOSChange", () => {
      this.nav = getNavigationArray() || [];
    });
  },
  methods: {
    scrollToTarget(target) {
      let targetEl = document.getElementById(target.id);
      this.selected = target.id;
      this.$emit("scroll-top", targetEl.offsetTop);
    },
  },
};
</script>

<style scoped>
.my-slider {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 64px;
  box-shadow: 6px 0 10px #f0f0f0;
  transition: all ease 0.32s;
  background: #f9f9f9;
  box-sizing: border-box;
  padding: 16px 0;
  z-index: 1001;
}
.my-slider.is-open {
  width: 240px;
}
.logo {
  height: 64px;
  background-image: url("data:image/png;base64,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");
  background-size: 48px 48px;
  background-repeat: no-repeat;
  background-position: top center;
}
.nav-classification {
  height: calc(100vh - 64px);
  overflow-y: auto;
  display: inline;
  flex-direction: column;
  width: 100%;
}
.nav-classification-item {
  width: 100%;
  height: 48px;
  color: #333333;
  display: inline-flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 16px;
  text-decoration: none;
  transition: all ease 0.12s;
  position: relative;
  align-items: center;
}
.nav-classification-item:hover {
  cursor: pointer;
}
.nav-classification-item:hover > * {
  color: coral;
  transition: all ease 0.12s;
}
.nav-classification-item.is-active > * {
  color: coral;
}
.nav-classification-item__name {
  flex: 1;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333333;
  text-decoration: none;
  font-size: 16px;
}
.nav-classification-item__ico {
  width: 40px;
  display: block;
  text-align: center;
  font-size: 18px;
}
.nav-classification-item__ico .iconfont {
  font-size: 18px;
}
.nav-classification-item__tooltip {
  position: absolute;
  right: -16px;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateX(100%);
  display: inline-flex;
  align-items: center;
}
.nav-classification-item__tooltip:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) translateX(-100%);
  border: 8px solid transparent;
  border-right-color: #ffffff;
}
.nav-classification-item__icon {
  width: 20px;
  height: 20px;
  border: 6px solid transparent;
}
.nav-classification-item__tooltip-body {
  background: #ffffff;
  width: max-content;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
}

.fade-left-leave,
.fade-left-enter-to {
  transform: translateX(100%);
  opacity: 1;
}
.fade-left-enter {
  transform: translateX(50%);
  opacity: 0;
}
.fade-left-leave-to {
  transform: translateX(150%);
  opacity: 0;
}
.fade-left-leave-active,
.fade-left-enter-active {
  transition: all ease 0.32s;
}
</style>

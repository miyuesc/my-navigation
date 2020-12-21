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
        <div class="nav-classification-item__ico">
          <i class="iconfont" :class="i.ico"></i>
        </div>
        <div class="nav-classification-item__name">{{ i.name }}</div>
        <transition name="fade-left">
          <div
            class="nav-classification-item__tooltip"
            v-if="mini && onHover === i.id"
          >
            <!--        <div class="nav-classification-item__tooltip" v-if="mini">-->
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
export default {
  name: "MySlider",
  props: {
    mini: Boolean
  },
  data() {
    return {
      nav: [],
      selected: "",
      onHover: ""
    };
  },
  created() {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      this.nav = JSON.parse(bookmarks);
    }
  },
  methods: {
    scrollToTarget(target) {
      let targetEl = document.getElementById(target.id);
      this.selected = target.id;
      this.$emit("scroll-top", targetEl.offsetTop);
    }
  }
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
  z-index: 10;
  box-sizing: border-box;
  padding: 16px 0;
}
.my-slider.is-open {
  width: 240px;
}
.logo {
  height: 64px;
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
}
.nav-classification-item__ico {
  width: 40px;
  display: block;
  text-align: center;
}
.nav-classification-item__tooltip {
  position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateX(100%);
  display: inline-flex;
  align-items: center;
}
.nav-classification-item__tooltip-ico {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-right: 6px solid #ffffff;
}
.nav-classification-item__tooltip-body {
  background: #ffffff;
  width: max-content;
  padding: 8px 16px;
  border-radius: 4px;
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

<template>
  <header class="my-header" :class="{ 'is-full': mini }">
    <div
      class="slider-control iconfont"
      :class="mini ? 'icon-indent' : 'icon-outdent'"
      @click="$emit('change-slider')"
    ></div>
    <div class="dark-mode" @click="$emit('setting-click')">
      <svg class="iconfont" aria-hidden="true">
        <use v-bind="{ 'xlink:href': '#icon-shezhi_huaban' }"></use>
      </svg>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "MyHeader",
  props: {
    mini: Boolean,
  },
};
</script>

<style scoped>
.my-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: inline-flex;
  justify-content: space-between;
  height: 64px;
  padding-left: 240px;
  box-sizing: border-box;
  transition: all ease 0.32s;
  background: #f9f9f9;
  z-index: 1000;
}
.my-header.is-full {
  padding-left: 64px;
}
.slider-control {
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  color: #cccccc;
}
.slider-control {
  cursor: pointer;
}
.dark-mode {
  height: 64px;
  width: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.dark-mode .iconfont {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
</style>

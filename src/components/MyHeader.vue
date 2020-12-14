<template>
  <header class="my-header" :class="{'is-full': mini}">
    <div class="slider-control iconfont" :class="mini ? 'icon-indent' : 'icon-outdent'" @click="$emit('change-slider')"></div>
  </header>
</template>

<script lang="ts">
export default {
  name: "MyHeader",
  props: {
    mini: Boolean
  }
}
</script>

<style scoped>
.my-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 64px;
  padding-left: 240px;
  box-sizing: border-box;
  transition:  all ease 0.32s;
  background: #f9f9f9;
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
</style>
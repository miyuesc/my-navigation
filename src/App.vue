<template>
  <div id="app">
    <my-slider :mini="isMiniSlider" @scroll-top="scrollToTargetType" />
    <my-header
      :mini="isMiniSlider"
      @change-slider="isMiniSlider = !isMiniSlider"
    />
    <div
      ref="mainContainer"
      class="main-container"
      :class="{ 'full-container': isMiniSlider }"
    >
      <search-box />
      <navigation-box />
    </div>
  </div>
</template>

<script>
import MySlider from "@/components/MySlider";
import MyHeader from "@/components/MyHeader";
import SearchBox from "@/components/SearchBox";
import NavigationBox from "@/components/NavigationBox";
import bookmarks from "../public/mine";

export default {
  name: "App",
  components: {
    NavigationBox,
    SearchBox,
    MySlider,
    MyHeader
  },
  data() {
    return {
      isMiniSlider: false
    };
  },
  mounted() {
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks.bookmarks));
    }
  },
  methods: {
    scrollToTargetType(top) {
      this.$refs.mainContainer.scrollTo({ top: top - 64, behavior: "smooth" });
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #eaeaea;
}
.main-container {
  box-sizing: border-box;
  padding: 80px 16px 16px 256px;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
  transition: all ease 0.32s;
}
.main-container.full-container {
  padding: 80px 16px 16px 80px;
}
.main-container * {
  transition: all ease 0.32s;
}
</style>

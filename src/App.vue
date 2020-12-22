<template>
  <div id="app">
    <my-slider :mini="isMiniSlider" @scroll-top="scrollToTargetType" />
    <my-header
      :mini="isMiniSlider"
      @change-slider="isMiniSlider = !isMiniSlider"
      @setting-click="settingVisible = !settingVisible"
    />
    <div
      ref="mainContainer"
      class="main-container"
      :class="{ 'full-container': isMiniSlider }"
    >
      <search-box />
      <navigation-box />
      <setting-drawer :visible.sync="settingVisible" />
    </div>
  </div>
</template>

<script>
import MySlider from "@/components/MySlider";
import MyHeader from "@/components/MyHeader";
import SearchBox from "@/components/SearchBox";
import NavigationBox from "@/components/NavigationBox";
import SettingDrawer from "@/components/SettingDrawer";

export default {
  name: "App",
  components: {
    SettingDrawer,
    NavigationBox,
    SearchBox,
    MySlider,
    MyHeader
  },
  data() {
    return {
      isMiniSlider: true,
      settingVisible: false
    };
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

.opacity-leave-active {
  transition: all ease 0.4s;
}
.opacity-enter-active {
  transition: all ease 0.2s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}

.trans-leave-active,
.trans-enter-active {
  transition: all ease 0.32s;
}
.trans-enter,
.trans-leave-to {
  transform: translateY(-10px);
}
.trans-enter-to,
.trans-leave {
  transform: translateY(0);
}


.fade-right-enter-active {
  animation: fade-right-in 0.32s ease;
}
.fade-right-leave-active {
  animation: fade-right-out 0.32s ease;
}
.fade-right-enter,
.fade-right-leave-to {
  transform: translatex(110%);
  opacity: 0;
}
.fade-right-enter-to,
.fade-right-leave {
  transform: translatex(0);
}
@keyframes fade-right-in {
  0% {
    transform: translateX(110%);
  }
  60% {
    transform: translateX(110%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fade-right-out {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(110%);
  }
}
</style>

<template>
  <div id="app">
    <my-slider :mini="isMiniSlider" @scroll-top="scrollToTargetType" />
    <my-header
      :mini="isMiniSlider"
      @change-slider="isMiniSlider = !isMiniSlider"
      @setting-click="settingVisible = !settingVisible"
    />
    <div ref="mainContainer" class="main-container" :class="{ 'full-container': isMiniSlider }">
      <search-box />
      <navigation-box @handle-edit="handleEditNavigation" />
      <setting-drawer :visible.sync="settingVisible" />

      <navigation-model :visible.sync="modelVisible" @close="closeModel">
        <div class="navigation-add__header">
          {{ Object.keys(navigationAddForm).length ? "修改网址" : "添加网址" }}
        </div>
        <el-form :model="navigationAddForm" label-width="100px">
          <el-form-item label="网站名称：">
            <el-input v-model="navigationAddForm.name" placeholder="请输入网站名称" />
          </el-form-item>
          <el-form-item label="网站类别：">
            <el-input v-model="navigationAddForm.name" placeholder="请输入网站名称"
          /></el-form-item>
          <el-form-item label="网站地址：">
            <el-input v-model="navigationAddForm.href" placeholder="请输入网站地址"
          /></el-form-item>
          <el-form-item label="图标类型：">
            <el-input v-model="navigationAddForm.type" placeholder="请输入图标类型"
          /></el-form-item>
          <el-form-item label="图标地址：">
            <el-input v-model="navigationAddForm.icon" placeholder="请输入图标地址或类名"
          /></el-form-item>
        </el-form>
        <div slot="footer" style="width: max-content;">
          <div class="model-button submit" @click="saveNavigation">
            保 存
          </div>
          <div class="model-button cancel" @click="handleCancel">取 消</div>
        </div>
      </navigation-model>
    </div>
  </div>
</template>

<script>
import MySlider from "@/components/MySlider";
import MyHeader from "@/components/MyHeader";
import SearchBox from "@/components/SearchBox";
import NavigationBox from "@/components/NavigationBox";
import NavigationModel from "@/components/NavigationModel";
import SettingDrawer from "@/components/SettingDrawer";
import { resetNavigationWithArray } from "@/utils/bookmarks";

export default {
  name: "App",
  components: {
    SettingDrawer,
    NavigationBox,
    NavigationModel,
    SearchBox,
    MySlider,
    MyHeader,
  },
  data() {
    return {
      modelVisible: false,
      onEditingFavIndex: 0,
      onEditingFavParent: null,
      isMiniSlider: true,
      settingVisible: false,
      navigationAddForm: {},
    };
  },
  methods: {
    scrollToTargetType(top) {
      this.$refs.mainContainer.scrollTo({ top: top - 64, behavior: "smooth" });
    },
    handleEditNavigation(nav, fav, index) {
      this.navigationAddForm = JSON.parse(JSON.stringify(fav));
      this.onEditingFavIndex = index;
      this.onEditingFavParent = nav;
      this.modelVisible = true;
    },
    addNavigation() {
      if (this.bookmarks && this.bookmarks[0] && this.bookmarks[0].id === "mine") {
        this.bookmarks[0].children.push(this.navigationAddForm);
      } else {
        const mine = {
          id: "mine",
          name: "我的收藏",
          ico: "icon-shoucang_huaban",
          children: [this.navigationAddForm],
        };
        this.bookmarks.unshift(mine);
      }
      this.modelVisible = false;
      this.navigationAddForm = {};
      resetNavigationWithArray(this.bookmarks);
      // this.initBookmarks();
      this.closeModel();
    },
    saveNavigation() {
      this.$set(
        this.onEditingFavParent.children,
        this.onEditingFavIndex,
        JSON.parse(JSON.stringify(this.navigationAddForm))
      );
      resetNavigationWithArray(this.bookmarks);
      // this.initBookmarks();
      this.closeModel();
    },
    handleCancel() {
      this.modelVisible = false;
    },
    closeModel() {
      this.modelVisible = false;
    },
  },
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

.navigation-add__header {
  height: 48px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 48px;
}
.model-button {
  display: block;
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
  width: 64px;
  height: 32px;
  float: left;
  cursor: pointer;
}
.model-button + .model-button {
  margin-left: 16px;
}
.submit {
  background: #f1404b;
}
.cancel {
  background: #333333;
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
</style>

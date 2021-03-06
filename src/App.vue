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
      <navigation-box @handle-edit="handleEditNavigation" @handle-add="handleEditNavigation({}, {}, -1)" />
      <setting-drawer :visible.sync="settingVisible" />

      <navigation-model :visible.sync="modelVisible" @close="closeModel">
        <div class="navigation-add__header">
          {{ Object.keys(navigationAddForm).length ? "修改网址" : "添加网址" }}
        </div>
        <el-form :model="navigationAddForm" label-width="90px">
          <el-form-item label="网站名称：">
            <el-input v-model="navigationAddForm.name" placeholder="请输入网站名称" />
          </el-form-item>
          <el-form-item label="网站类别：">
            <el-select v-model="navigationAddForm.parentId" placeholder="请选择网站类别">
              <el-option v-for="i in bookmarks" :key="i.id" :label="i.name" :value="i.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="网站地址：">
            <el-input v-model="navigationAddForm.href" placeholder="请输入网站地址" />
          </el-form-item>
          <el-form-item label="图标类型：">
            <el-select v-model="navigationAddForm.type" placeholder="请选择图标类型">
              <el-option label="图片" value="image" />
              <el-option label="字体图标" value="icon" />
              <el-option label="无" value="" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="!!navigationAddForm.type"
            :label="navigationAddForm.type === 'image' ? '图标地址：' : '图标类名：'"
          >
            <el-input v-model="navigationAddForm.icon" placeholder="请输入图标地址或类名" />
          </el-form-item>

          <el-form-item label-width="0">
            <p class="add-type-message">没有合适的分类? <a @click="openTypeModel">添加分类</a></p>
          </el-form-item>
        </el-form>
        <div slot="footer" style="width: max-content;">
          <div class="model-button submit" @click="saveNavigation">
            保 存
          </div>
          <div class="model-button cancel" @click="handleCancel">取 消</div>
        </div>
      </navigation-model>

      <navigation-model :visible.sync="typeModelVisible" @close="closeTypeModel">
        <div class="navigation-add__header">添加分类</div>
        <el-form :model="navigationTypeForm" label-width="90px">
          <el-form-item label="分类名称：">
            <el-input v-model="navigationTypeForm.name" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="分类ID：">
            <el-input v-model="navigationTypeForm.id" placeholder="请输入分类ID" />
          </el-form-item>
          <el-form-item label="分类图标：">
            <el-select v-model="navigationTypeForm.icon" placeholder="请选择分类icon" filterable allow-create>
              <el-option v-for="i in typeIconList" :key="i" :value="i">
                <svg class="iconfont option-icon" aria-hidden="true">
                  <use v-bind="{ 'xlink:href': `#${i}` }"></use>
                </svg>
                <span style="margin-left: 16px">{{ i }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" style="width: max-content;">
          <div class="model-button submit" @click="saveNavigationType">
            保 存
          </div>
          <div class="model-button cancel" @click="closeTypeModel">取 消</div>
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
import { getNavigationArray, resetNavigationWithArray } from "@/utils/bookmarks";
import { getSetting } from "@/utils/setting";

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
      typeModelVisible: false,
      onEditingFavIndex: 0,
      onEditingFavParent: null,
      settingVisible: false,
      navigationAddForm: {},
      navigationTypeForm: {},
      bookmarks: [],
      isMiniSlider: true,
      typeIconList: [
          "icon-wendang",
          "icon-html5",
          "icon-sucai",
          "icon-node-js",
          "icon-vuejs-alt",
          "icon-work",
          "icon-reactjs-line",
          "icon-javascript",
          "icon-shequ",
          "icon-language",
          "icon-tupian_huaban",
          "icon-youxiang_huaban",
          "icon-shezhi_huaban",
          "icon-shoucang_huaban",
          "icon-quanbu_huaban",
      ]
    };
  },
  created() {
    this.bookmarks = getNavigationArray();
    this.isMiniSlider = getSetting().miniSlider;
    window.addEventListener("NOSChange", () => {
      this.lineLimit = Number(getSetting().lineLimit);
      this.bookmarks = getNavigationArray() || [];
      this.isMiniSlider = getSetting().miniSlider;
    });
  },
  methods: {
    scrollToTargetType(top) {
      this.$refs.mainContainer.scrollTo({ top: top - 64, behavior: "smooth" });
    },
    handleEditNavigation(nav, fav, index) {
      this.navigationAddForm = { ...fav, parentId: nav.id };
      this.onEditingFavIndex = index;
      this.onEditingFavParent = nav;
      this.modelVisible = true;
    },
    saveNavigation() {
      // 新增
      if (this.onEditingFavIndex === -1) {
        this.bookmarks.map(nav => {
          if (nav.id === this.navigationAddForm.parentId) {
            nav.children.push({ ...this.navigationAddForm });
          }
        });
      } else {
        // 未改变父级类型
        if (this.navigationAddForm.parentId === this.onEditingFavParent.id) {
          this.bookmarks.map(nav => {
            if (nav.id === this.navigationAddForm.parentId) {
              this.$set(nav.children, this.onEditingFavIndex, {...this.navigationAddForm});
            }
          });
        } else {
          // 改变父级类型
          this.onEditingFavParent.children.splice(this.onEditingFavIndex, 1);
          this.bookmarks.map(nav => {
            if (nav.id === this.onEditingFavParent.id) {
              nav.children.splice(this.onEditingFavIndex, 1);
            }
            if (nav.id === this.navigationAddForm.parentId) {
              nav.children.push({ ...this.navigationAddForm });
            }
          });
        }
      }
      resetNavigationWithArray(this.bookmarks);
      window.dispatchEvent(this.$myEvent);
      this.closeModel();
    },
    saveNavigationType() {
      this.bookmarks.push({...this.navigationTypeForm, children: []});
      resetNavigationWithArray(this.bookmarks);
      window.dispatchEvent(this.$myEvent);
      this.closeTypeModel();
    },
    openTypeModel() {
      this.modelVisible = false;
      this.onEditingFavParent = {};
      this.typeModelVisible = true;
    },
    handleCancel() {
      this.modelVisible = false;
    },
    closeModel() {
      this.modelVisible = false;
      this.onEditingFavParent = {};
    },
    closeTypeModel() {
      this.typeModelVisible = false;
      this.modelVisible = false;
      this.onEditingFavParent = {};
    }
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
.add-type-message {
  font-size: 10px;
  color: #cccccc;
  display: inline-block;
  padding: 0 8px;
}
.add-type-message a {
  transition: all ease 0.2s;
  text-decoration: underline;
}
.add-type-message a:hover {
  cursor: pointer;
  color: #2a7aff;
  transition: all ease 0.2s;
}
.option-icon {
  width: 20px !important;
  height: 20px !important;
  transform: translateY(25%);
}
.el-select-dropdown__item.hover {
  color: #2a7aff;
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

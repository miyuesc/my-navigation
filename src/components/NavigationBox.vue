<template>
  <div class="navigation-box" @click="isEditing = ''" @contextmenu.self.prevent="isEditing = ''">
    <div class="navigation-add">
      <div class="navigation-add__button" @click="handleAddNavigation">+</div>
    </div>
    <div class="navigation-item" v-for="item in bookmarks" :key="item.id">
      <h4 :id="item.id"></h4>
      <div class="navigation-title"><i class="iconfont" :class="item.ico"></i>{{ item.name }}</div>
      <div class="navigation-item__body">
          <div class="favorite-item"
               v-for="(fi, fIndex) in item.children"
               :key="fi.name"
               @click="turnToTarget(fi)"
               @contextmenu.prevent="showCover(fi)">
            <div class="favorite-item__icon">
              <div v-if="!fi.type" class="favorite-item__icon-text">{{ fi.name.substring(0, 1) }}</div>
              <img v-if="fi.type === 'image'" class="favorite-item__icon-img" :src="fi.icon" alt="" />
              <svg v-if="fi.type === 'icon'" class="iconfont" aria-hidden="true">
                <use v-bind="{'xlink:href': `#${fi.icon}`}"></use>
              </svg>
            </div>
            <div class="favorite-item__title">{{ fi.name }}</div>
            <div class="favorite-item__href">{{ fi.href }}</div>
            <transition name="cover">
              <div class="favorite-item__cover" :key="fi.name + '_cover'" v-show="isEditing === fi.name" @click.stop>
                <div class="favorite-item__button favorite-item__edit" @click.stop="handleEditNavigation(fi, fIndex)">
                  <i class="iconfont icon-bianji_huaban"></i>
                </div>
                <div class="favorite-item__button favorite-item__delete" @click.stop="handleDeleteNavigation(item, fi, fIndex)">
                  <i class="iconfont icon-huishouzhan_huaban"></i>
                </div>
              </div>
            </transition>
          </div>
      </div>
    </div>

    <navigation-model :visible.sync="modelVisible">
      <div class="navigation-add__header">{{ isEditing.length ? "修改网址" : "添加网址" }}</div>
      <div class="navigation-add__form">
        <label>
          <span>网站名称：</span>
          <input v-model="navigationAddForm.name" placeholder="请输入网站名称">
        </label>
        <label>
          <span>网站地址：</span>
          <input v-model="navigationAddForm.href" placeholder="请输入网站地址">
        </label>
        <label>
          <span>图标类型：</span>
          <input v-model="navigationAddForm.type" placeholder="请输入图标类型">
        </label>
        <label>
          <span>图标地址：</span>
          <input v-model="navigationAddForm.icon" placeholder="请输入图标地址或类名">
        </label>
      </div>
      <div slot="footer" style="width: max-content;">
        <div v-if="isEditing && isEditing.length" class="model-button submit" @click="saveNavigation">保 存</div>
        <div v-else class="model-button submit" @click="addNavigation">添 加</div>
        <div class="model-button cancel" @click="modelVisible = false">取 消</div>
      </div>
    </navigation-model>
  </div>
</template>

<script>
import NavigationModel from "@/components/NavigationModel";
export default {
  name: "NavigationBox",
  components: {NavigationModel},
  data() {
    return {
      bookmarks: [],
      modelVisible: false,
      navigationAddForm: {},
      isEditing: ""
    }
  },
  created() {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      this.bookmarks = JSON.parse(bookmarks);
    }
    console.log(this);
  },
  methods: {
    turnToTarget(target) {
      window.open(target.href);
    },
    addNavigation() {
      if (this.bookmarks && this.bookmarks[0] && this.bookmarks[0].id === "mine") {
          this.bookmarks[0].children.push(this.navigationAddForm);
      } else {
        const mine = {
          id: "mine",
          name: "我的收藏",
          ico: "icon-shoucang_huaban",
          children: [this.navigationAddForm]
        }
        this.bookmarks.unshift(mine);
      }
      this.modelVisible = false;
      this.navigationAddForm = {};
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    },
    saveNavigation() {
      
    },
    showCover(fav) {
      this.isEditing = this.isEditing === fav.name ? "" : fav.name;
    },
    handleAddNavigation() {
      this.isEditing = "";
      this.navigationAddForm = {};
      this.modelVisible = true;
    },
    handleEditNavigation(fav, index) {
      this.navigationAddForm = JSON.parse(JSON.stringify(fav));
      this.onEditingNavIndex = index;
      this.modelVisible = true;
    },
    handleDeleteNavigation(nav, fav, index) {
      this.bookmarks.forEach(item => {
        if (item.id === nav.id) {
          item.children.splice(index, 1);
        }
      })
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    }
  }
}
</script>

<style scoped>
.navigation-box {
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 80vh;
}
.navigation-add__header {
  height: 48px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 48px;
}
.navigation-add__form {
  padding: 16px 16px 24px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.navigation-add__form label {
  display: flex;
  width: 100%;
}
.navigation-add__form label span {
  width: 100px;
  text-align: right;
  box-sizing: border-box;
  padding-right: 8px;
}
.navigation-add__form input {
  flex: 1;
  height: 32px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  background: #eeeeee;
}
.navigation-add__form label + label {
  margin-top: 16px;
}
.navigation-add__form input:hover {
  border-color: #409eff;
}
.navigation-add__form input:focus {
  border-color: #409eff;
  outline: none;
}
.navigation-add {
  display: block;
  width: 100%;
  height: 56px;
  background: rgba(204, 204, 204, 0.6);
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
}
.navigation-add__button {
  display: block;
  cursor: pointer;
  width: 120px;
  height: 40px;
  background: #f9f9f9;
  text-align: center;
  font-weight: 800;
  line-height: 40px;
  font-size: 24px;
  color: #aaaaaa;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all ease 0.2s;
}
.navigation-add__button:hover {
  background: #ffffff;
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
.navigation-title {
  width: 100%;
  height: 64px;
  display: inline-flex;
  align-items: center;
}
.navigation-title > * {
  font-size: 18px;
}
.navigation-title > i {
  margin-right: 12px;
}
.navigation-item__body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
}
.favorite-item {
  width: 100%;
  display: grid;
  grid-template-columns: 64px auto;
  grid-template-rows: 50% 50%;
  grid-gap: 0 16px;
  height: 80px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.2);
  transition: all ease 0.2s;
  position: relative;
  overflow: hidden;
}
.favorite-item:hover {
  cursor: pointer;
  transition: all ease 0.2s;
  box-shadow: 0 0 20px 2px #fefefe;
}
.favorite-item__icon {
  grid-row-start: 1;
  grid-row-end: 3;
}
.favorite-item__icon > * {
  max-width: 64px;
  max-height: 64px;
}
.favorite-item__icon .favorite-item__icon-ico {
  display: inline-flex;
  font-size: 32px;
  justify-content: center;
  align-items: center;
}
.favorite-item__icon .favorite-item__icon-img {
  width: 64px;
  height: 64px;
}
.favorite-item__icon .favorite-item__icon-text {
  width: 100%;
  height: 100%;
  display: inline-flex;
  font-size: 32px;
  justify-content: center;
  align-items: center;
  background: #5f9ea0;
  color: #f9f9f9;
  border-radius: 50%;
}
.favorite-item__title,
.favorite-item__href {
  display: block;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.favorite-item__title {
  font-size: 16px;
}
.favorite-item__href {
  font-size: 12px;
  color: #cccccc;
  line-height: 32px;
}
.favorite-item__cover {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: default;
}
.favorite-item__button {
  color: #eeeeee;
  font-weight: bold;
  padding: 6px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 4px solid #eeeeee;
  cursor: pointer;
}
.favorite-item__button .iconfont {
  font-size: 24px;
}
.favorite-item__edit:hover {
  color: #f48a40;
  border-color: #f48a40;
}
.favorite-item__delete:hover {
  color: #f1404b;
  border-color: #f1404b;
}
.cover-enter,
.cover-leave-to {
  height: 0;
}
.cover-enter-to,
.cover-leave {
  height: 100%;
}
.cover-enter-active,
.cover-leave-active {
  transition: all ease 0.2s;
}
</style>
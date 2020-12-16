<template>
  <div class="navigation-box">
    <div class="navigation-add">
      <div class="navigation-add__button" @click="modelVisible = true">+</div>
    </div>
    <div class="navigation-item" v-for="item in bookmarks" :key="item.id">
      <h4 :id="item.id"></h4>
      <div class="navigation-title"><i class="iconfont" :class="item.ico"></i>{{ item.name }}</div>
      <div class="navigation-item__body">
        <div class="favorite-item" v-for="fi in item.children" :key="fi.name" @click="turnToTarget(fi)">
          <div class="favorite-item__icon">
            <div v-if="!fi.type" class="favorite-item__icon-text">{{ fi.name.substring(0, 1) }}</div>
            <img v-if="fi.type === 'image'" class="favorite-item__icon-img" :src="fi.icon" alt="" />
            <svg v-if="fi.type === 'icon'" class="iconfont" aria-hidden="true">
              <use v-bind="{'xlink:href': `#${fi.icon}`}"></use>
            </svg>
          </div>
          <div class="favorite-item__title">{{ fi.name }}</div>
          <div class="favorite-item__href">{{ fi.href }}</div>
        </div>
      </div>
    </div>

    <navigation-model :visible.sync="modelVisible">
      <div class="navigation-add__header">添加网址</div>
      <div class="navigation-add__form">
        <input v-model="navigationAddForm.name" placeholder="请输入网站名称">
        <input v-model="navigationAddForm.href" placeholder="请输入网站地址">
        <input v-model="navigationAddForm.type" placeholder="请输入图标类型">
        <input v-model="navigationAddForm.icon" placeholder="请输入图标地址或类名">
      </div>
      <div slot="footer" style="width: max-content;">
        <div class="model-button submit" @click="addNavigation">添加</div>
        <div class="model-button cancel" @click="modelVisible = false">取消</div>
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
      navigationAddForm: {}
    }
  },
  created() {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      this.bookmarks = JSON.parse(bookmarks);
    }
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
.navigation-add__form input {
  height: 32px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  background: #eeeeee;
}
.navigation-add__form input + input {
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
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 0 20px -5px rgba(158,158,158,.2);
  transition: all ease 0.2s;
}
.favorite-item:hover {
  cursor: pointer;
  transform: translateY(-10px);
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
</style>
<template>
  <div class="navigation-box">
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
  </div>
</template>

<script>
export default {
  name: "NavigationBox",
  data() {
    return {
      bookmarks: []
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
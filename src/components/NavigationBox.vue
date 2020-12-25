<template>
  <div class="navigation-box" @click="isEditing = false">
    <div class="navigation-add">
      <div class="navigation-add__button" @click="$emit('handle-add')">+</div>
    </div>
    <div class="navigation-item" v-for="item in bookmarks" :key="item.id">
      <h4 :id="item.id"></h4>
      <div class="navigation-title"><i class="iconfont" :class="item.ico"></i>{{ item.name }}</div>
      <draggable
        class="navigation-item__body"
        :style="lineStyle"
        :list="item.children"
        group="navigation"
        @change="dragChange"
      >
        <div
          class="favorite-item"
          v-for="(fi, fIndex) in item.children"
          :key="fi.name"
          @click="turnToTarget(fi)"
          @contextmenu.prevent="showCover(fi)"
        >
          <div class="favorite-item__icon">
            <div v-if="!fi.type" class="favorite-item__icon-text">
              {{ fi.name.substring(0, 1) }}
            </div>
            <img v-if="fi.type === 'image'" class="favorite-item__icon-img" :src="fi.icon" alt="" />
            <svg v-if="fi.type === 'icon'" class="iconfont" aria-hidden="true">
              <use v-bind="{ 'xlink:href': `#${fi.icon}` }"></use>
            </svg>
          </div>
          <div class="favorite-item__title">{{ fi.name }}</div>
          <div class="favorite-item__href">{{ fi.href }}</div>
          <transition name="cover">
            <div class="favorite-item__cover" :key="fi.name + '_cover'" v-show="isEditing === fi.name" @click.stop>
              <div class="favorite-item__button favorite-item__edit" @click.stop="openModelOnEdit(item, fi, fIndex)">
                <i class="iconfont icon-bianji_huaban"></i>
              </div>
              <div
                class="favorite-item__button favorite-item__delete"
                @click.stop="handleDeleteNavigation(item, fi, fIndex)"
              >
                <i class="iconfont icon-huishouzhan_huaban"></i>
              </div>
            </div>
          </transition>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getNavigationArray, resetNavigationWithArray } from "@/utils/bookmarks";
import { getSetting } from "@/utils/setting";

export default {
  name: "NavigationBox",
  components: {
    draggable,
  },
  data() {
    return {
      bookmarks: [],
      isEditing: "",
      lineLimit: 4,
      openMethod: "",
    };
  },
  computed: {
    lineStyle() {
      return { "grid-template-columns": `repeat(${this.lineLimit}, 1fr)` };
    },
  },
  created() {
    this.lineLimit = Number(getSetting()?.lineLimit || "4");
    this.openMethod = getSetting()?.openMethod || "_blank";
    this.initBookmarks();
    window.addEventListener("NOSChange", () => {
      this.lineLimit = Number(getSetting().lineLimit);
      this.bookmarks = getNavigationArray() || [];
    });
  },
  methods: {
    initBookmarks() {
      this.bookmarks = getNavigationArray();
    },
    turnToTarget(target) {
      window.open(target.href, this.openMethod);
    },
    showCover(fav) {
      this.isEditing = this.isEditing === fav.name ? "" : fav.name;
    },
    openModelOnEdit(nav, fav, index) {
      this.$emit("handle-edit", nav, JSON.parse(JSON.stringify(fav)), index);
      this.isEditing = "";
    },
    handleDeleteNavigation(nav, fav, index) {
      this.bookmarks.forEach(item => {
        if (item.id === nav.id) {
          item.children.splice(index, 1);
        }
      });
      resetNavigationWithArray(this.bookmarks);
      this.$emit("handle-delete", nav, JSON.parse(JSON.stringify(fav)), index);
      window.dispatchEvent(this.$myEvent);
      this.initBookmarks();
    },
    dragChange() {
      this.$nextTick(() => {
        resetNavigationWithArray(this.bookmarks);
        window.dispatchEvent(this.$myEvent);
      });
    },
  },
};
</script>

<style scoped>
.navigation-box {
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 80vh;
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
  box-shadow: 0 0 20px -5px rgba(158, 158, 158, 0.2);
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
  backdrop-filter: blur(2px);
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
  transition: all ease 0.1s;
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

<template>
  <div class="search-box">
    <div class="search-box__input">
      <label>
        <input v-model="searchInput" placeholder="搜点儿什么吧！" @input="changeInput" @keyup.enter="searchResult" />
      </label>
      <div class="search-input__button" @click.stop="searchResult">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="search-target-engine">
      <div class="target-engine__item google" :class="{'is-active': engineType === 'google'}" @click.stop="engineType = 'google'">Google</div>
      <div class="target-engine__item baidu" :class="{'is-active': engineType === 'baidu'}" @click.stop="engineType = 'baidu'">百度</div>
      <div class="target-engine__item biying" :class="{'is-active': engineType === 'biying'}" @click.stop="engineType = 'biying'">必应</div>
    </div>
    <div class="external-open__button" @click="openExternal = !openExternal">
      <i class="iconfont external-open__button-icon" :class="openExternal ? 'icon-quxiaoquanping_huaban' : 'icon-quanping_huaban'"></i>
    </div>
    <div class="external-box" :class="{'is-opened': openExternal}"></div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      searchInput: "",
      engineType: "google",
      searchEngine: {
        google: "https://www.google.com/search?q=",
        baidu: "https://www.baidu.com/s?wd=",
        biying: "https://www.bing.com/search?q="
      },
      openExternal: false
    }
  },
  methods: {
    changeInput(e) {
      console.log(e);
    },
    searchResult() {
      window.open(`${this.searchEngine[this.engineType]}${this.searchInput}`);
    }
  }
}
</script>

<style scoped>
.search-box {
  width: 100%;
  box-sizing: border-box;
}
.external-open__button {
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  transition: all ease 0.2s;
  opacity: 0.4;
}
.external-open__button:hover {
  cursor: pointer;
  opacity: 0.8;
}
.external-open__button-icon {
  transform: rotate(-45deg);
}
.external-box {
  width: 100%;
  height: 0;
  overflow: hidden;
}
.external-box.is-opened {
  height: 240px;
}
.search-target-engine {
  margin: 16px auto;
  display: inline-flex;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  padding: 0 calc(50% - 300px);
}
.target-engine__item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  background: #fefefe;
  cursor: pointer;
}
.target-engine__item + .target-engine__item {
  margin-left: 8px;
}
.target-engine__item:hover {
  color: #f1404b;
}
.target-engine__item.is-active {
  background: #f1404b;
  color: #f0f0f0;
}
.target-engine__item.is-active:hover {
  color: #f0f0f0;
}
.search-box__input {
  margin: 0 auto;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  position: relative;
}
.search-box__input label {
  width: 80%;
  max-width: 600px;
}
.search-box__input input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 80px 0 16px;
  border: none;
  font-size: 20px;
}
.search-box__input input:focus {
  border: none;
  outline: none;
}
.search-input__button {
  position: absolute;
  top: 50%;
  right: calc(50% - 292px);
  height: 40px;
  width: 64px;
  background: #333333;
  border-radius: 4px;
  transform: translateY(-50%);
  text-align: center;
  color: #f9f9f9;
  font-size: 24px;
  cursor: pointer;
}
</style>
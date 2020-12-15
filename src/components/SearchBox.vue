<template>
  <div class="search-box">
    <div class="search-box__input">
      <label>
        <input v-model="searchInput" @input="changeInput" />
      </label>
      <div class="search-input__button">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      searchInput: ""
    }
  },
  methods: {
    changeInput(e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>
.search-box {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}
.search-box__input {
  margin: 0 auto;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  position: relative;
}
.search-box__input label {
  width: 600px;
}
.search-box__input input {
  width: 600px;
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